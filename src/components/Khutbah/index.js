import preact from 'preact';
import Axios from 'axios';
import Config from '../../../config.json';
import Helpers from '../../helpers';
import './style.scss';

class Khutbah extends preact.Component {

  constructor() {
    super();
    this.state = {
      title: null,
      video: null,
      entered: false
    };
  }

  componentDidMount() {
    if (Config.ytapikey) {
      this.getYouTubeVideo();
    }
  }

  /**
   * Gets the latest youtube video
   * @return {void}
   */
  getYouTubeVideo() {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${Config.ytapikey}&channelId=${Config.channelid}&part=snippet,id&order=date&maxResults=5&${Helpers.cacheBust()}`;
    const cachedTitle = Helpers.storageGet('video_title');
    const cachedVideo = Helpers.storageGet('video_id');

    // Retrieve video details from cache

    if (cachedTitle && process.env.NODE_ENV !== 'development') {
      this.setState({
        title: cachedTitle,
        video: cachedVideo
      });
    } else {
      // Get latest video from API

      Axios.get(endpoint)
        .then((res) => {
          const data = res.data;
          const videos = data.items;

          if (videos.length) {
            let title = data.items[0].snippet.title;
            let video = data.items[0].id.videoId;

            // Skip Bangla khutbah

            if (Config.ELM) {
              title = '';
              videos.forEach((ytVideo) => {
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

            // Save to cache and set states

            Helpers.storageSet('video_title', title, 60 * 60 * 24);
            Helpers.storageSet('video_id', video, 60 * 60 * 24);

            this.setState({ title, video });
          }
        });
    }
  }

  render(props, state) {
    return (
      <div className={`khutbah${((state.entered) ? ' active' : '')}`} onMouseEnter={() => this.setState({ entered: true })}>
        {state.video &&
          <div className="khutbah__inner">
            <h3 className="khutbah__title">{state.title}</h3>
            <div className="video">
              <iframe width="560" height="315" src={`https://www.youtube.com/embed/${state.video}`} frameBorder="0" allowFullScreen />
            </div>
          </div>
        }
      </div>
    );
  }

}

preact.render(<Khutbah />, document.getElementById('khutbah-container'));
