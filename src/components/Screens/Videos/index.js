import preact from 'preact';
import axios from 'axios';
import $ from 'cash-dom';
import Functions from '../../../helpers/Functions';

export default class Videos extends preact.Component {
    constructor() {
        super();
        this.state = {
            title: null,
            date: null,
            video: null
        };
    }

    componentDidMount() {
        if (this.props.options.youTubeKey) {
            this.getYouTubeVideo();
        }
    }

    /**
     * Gets the latest youtube video
     * @return {void}
     */
    getYouTubeVideo() {
        const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${this.props.options.youTubeKey}&channelId=${this.props.options.youTubeChannelId}&part=snippet,id&order=date&maxResults=5&${Functions.cacheBust()}`;
        const cachedTitle = Functions.storageGet('videoTitle');
        const cachedDate = Functions.storageGet('videoDate');
        const cachedVideo = Functions.storageGet('videoId');

        // Retrieve video details from cache

        if (cachedTitle) {
            this.setState({
                title: cachedTitle,
                date: cachedDate,
                video: cachedVideo
            });
        } else {
            axios.get(endpoint)
                .then((response) => {
                    const data = response.data;
                    const videos = data.items;

                    if (videos.length) {
                        let title = data.items[0].snippet.title;
                        let video = data.items[0].id.videoId;
                        let date = data.items[0].snippet.publishedAt;

                        // Skip Bangla khutbah

                        if (this.props.options.elm) {
                            title = '';
                            $.each(videos, (ytVideo) => {
                                if (
                                    (/khutbah/i).test(ytVideo.snippet.title) &&
                                    !(/bangla/i).test(ytVideo.snippet.title) &&
                                    title === ''
                                ) {
                                    title = ytVideo.snippet.title.match(/([^|]+)/g)[2].trim();
                                    video = ytVideo.id.videoId;
                                }
                            });
                        }

                        // Format the date

                        const dateObj = new Date(date);
                        date = `${(dateObj.getDate() < 10) ? '0' + dateObj.getDate() : dateObj.getDate()}/${((dateObj.getMonth() + 1) < 10) ? '0' + (dateObj.getMonth() + 1) : ''}/${(`${dateObj.getFullYear()}`).slice(-2)}`;

                        // Save to cache and set states

                        Functions.storageSet('videoTitle', title);
                        Functions.storageSet('videoDate', date);
                        Functions.storageSet('videoId', video);

                        this.setState({ title, video, date });
                    }
                });
        }
    }

    render(props, state) {
        return (
            <section className="body__content">
                <div className="body__inner">
                    <h1 className="body__title">Videos</h1>
                    <p><strong>{ state.title }</strong></p>
                    <div className="video">
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${state.video}`} frameBorder="0" allowFullScreen />
                    </div>
                    <p><strong>Uploaded:</strong> { state.date }</p>
                </div>
            </section>
        );
    }
}
