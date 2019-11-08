import preact from 'preact';
import $ from 'cash-dom';
import Classes from '../../../helpers/StateClasses';
import PrayerTimes from '../../../services/PrayerTimes';
import Functions from '../../../helpers/Functions';
import './style.scss';

export default class Home extends preact.Component {
    constructor(props) {
        super();
        const timeFormat = Functions.storageGet('timeFormat') || '24hour';
        const theme = Functions.storageGet('theme') || props.options.theme;
        this.pt = null;
        this.date = new Date();
        this.state = {
            screen: 'home',
            menuOpen: false,
            times: [],
            time: this.getCurrentTime(timeFormat),
            date: this.getCurrentDate(),
            settings: {
                timeFormat: {
                    label: 'Time Format',
                    value: timeFormat,
                    type: 'select',
                    options: [
                        {
                            label: '12 Hour',
                            value: '12hour'
                        },
                        {
                            label: '24 Hour',
                            value: '24hour'
                        }
                    ]
                },
                theme: {
                    label: 'Colour Theme',
                    value: theme,
                    type: 'select',
                    options: [
                        {
                            label: 'Maroon',
                            value: 'maroon'
                        },
                        {
                            label: 'Navy',
                            value: 'navy'
                        },
                        {
                            label: 'Teal',
                            value: 'teal'
                        },
                        {
                            label: 'Purple',
                            value: 'purple'
                        }
                    ]
                }
            }
        };
        this.todaysDate = this.state.date;

        // Save the settings

        this.saveSettings = (settings) => {
            $.each(Object.keys(settings), (settingKey) => {
                this.state.settings[settingKey].value = settings[settingKey];
            });
            this.setState(this.state);
        };
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                time: this.getCurrentTime(this.state.settings.timeFormat.value)
            });
        }, 1000);

        setInterval(() => {
            this.pt.generate(this.getTimesDateString(), (times) => {
                this.setState({ times });
            });
        }, 1000 * 60);

        // Get the prayer times for today

        this.pt = new PrayerTimes(this.props.options);
        this.pt.generate(this.getTimesDateString(), (times) => {
            this.setState({ times });
        });
    }

    /**
     * Gets the date string for the prayer times
     * @param  {string} dir The direction to set the date
     * @return void
     */
    getTimesDateString(dir = '') {
        if (dir == 'prev') {
            this.date.setDate(this.date.getDate() - 1);
        } else if (dir == 'next') {
            this.date.setDate(this.date.getDate() + 1);
        } else {
            this.date = new Date();
        }

        // Set the new date

        this.setState({
            date: this.getCurrentDate()
        });

        const year = this.date.getFullYear();
        const month = this.date.getMonth() + 1;
        const date = this.date.getDate();

        return `${year}-${(month < 10) ? '0' + month : month}-${(date < 10) ? '0' + date : date}`;
    }

    /**
     * Changes the times date
     * @param  {string} dir The direction to set the date
     * @return void
     */
    changeTimesDate(dir) {
        this.pt.generate(this.getTimesDateString(dir), (times) => {
            this.setState({ times });
        });
    }

    /**
     * Get the date string
     * @return {string} The date
     */
    getCurrentDate() {
        const months = [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
        ];
        const days = [
            'Sun',
            'Mon',
            'Tue',
            'Wed',
            'Thu',
            'Fri',
            'Sat'
        ];
        return `${days[this.date.getDay()]} ${(this.date.getDate() < 10) ? '0' + this.date.getDate() : this.date.getDate()} ${months[this.date.getMonth()]} ${this.date.getFullYear()}`;
    }

    /**
     * Get the current time
     * @param  {string} timeFormat The time format
     * @return {string} The time
     */
    getCurrentTime(timeFormat) {
        const date = new Date();
        const minutes = date.getMinutes();
        let hours = date.getHours();
        let time = '';

        if (timeFormat == '12hour') {
            hours = (hours > 12) ? hours - 12 : hours;
            time = `${(hours < 10) ? '0' + hours : hours}.${(minutes < 10) ? '0' + minutes : minutes}`;
        } else {
            time = `${(hours < 10) ? '0' + hours : hours}.${(minutes < 10) ? '0' + minutes : minutes}`;
        }

        return {
            string: time,
            postfix: (timeFormat == '12hour') ? (date.getHours() > 11) ? 'pm' : 'am' : ''
        };
    }

    render(props, state) {
        return (
            <section className="body__content">
                <div className="screen-home__time">
                    <div className="screen-home__date-time" onClick={() => this.changeTimesDate()}>
                        <h1>
                            <span>{ state.time.string }</span>
                            {state.time.postfix.length > 0 &&
                                <span className="screen-home__time-postfix">{ state.time.postfix }</span>
                            }
                        </h1>
                        <p>{ state.date }</p>
                    </div>
                    {this.todaysDate !== state.date &&
                        <a className="screen-home__prev-next screen-home__prev" onClick={() => this.changeTimesDate('prev')} role="button"></a>
                    }
                    <a className="screen-home__prev-next screen-home__next" onClick={() => this.changeTimesDate('next')} role="button"></a>
                </div>
                <div className={`screen-home__prayer-times${('disableAsr2' in props.options) ? ' screen-home__prayer-times--no-asr2' : ''}`}>
                    <ul>
                        <li>
                            <span>&nbsp;</span>
                            <span>Start</span>
                            <span>Jamaah</span>
                        </li>
                        {state.times.map(time => (
                            <li id={time.name} className={time.active ? Classes.active : ''} key={time.name}>
                                <span>{ time.label }</span>
                                <span>{ time.start ? time.start[state.settings.timeFormat.value] : '' }</span>
                                <span>{ time.jamaah ? time.jamaah[state.settings.timeFormat.value] : '—' }</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        );
    }
}
