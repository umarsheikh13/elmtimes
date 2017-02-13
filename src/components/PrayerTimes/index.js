import preact from 'preact';
import Papa from 'papaparse';
import Helpers from '../../helpers';
import './style.scss';

class PrayerTimes extends preact.Component {

  constructor() {
    super();

    const getTimeFormat = Helpers.storageGet('time_format');
    const timeFormat = getTimeFormat || 'time12';

    this.state = {
      timeFormat,
      times: [
        {
          name: 'fajr',
          label: 'Fajr',
          meridiem: 'am',
          index: [2, 3]
        },
        {
          name: 'sunrise',
          label: 'Sunrise',
          meridiem: 'am',
          index: [4]
        },
        {
          name: 'zuhr',
          label: 'Dhuhr',
          meridiem: 'ampm',
          index: [5, 6]
        },
        {
          name: 'asr',
          label: 'Asr 1',
          meridiem: 'pm',
          index: [7, 9]
        },
        {
          name: 'asr2',
          label: 'Asr 2',
          meridiem: 'pm',
          index: [8]
        },
        {
          name: 'maghrib',
          label: 'Maghrib',
          meridiem: 'pm',
          index: [10, 11]
        },
        {
          name: 'isha',
          label: 'Isha',
          meridiem: 'pm',
          index: [12, 13]
        }
      ]
    };
  }

  componentDidMount() {
    this.setPrayerTimes();
  }

  /**
   * Sets the prayer time for a specific prayer and formats
   * the correct times
   * @return {void}
   */
  setPrayertTime(time) {
    const self = this;

    self.state.times.forEach((t, i) => {
      const times = self.state.times;

      t.index.forEach((ti, ii) => {
        const date = new Date();
        const timeStr = `${time[ti]}`;
        const timeSplit = timeStr.split('.');
        const minutes = Helpers.formatZeroTime(timeSplit[1]);
        const hourTwelve = timeSplit[0];

        let hourTwenty = 0;
        let meridiem = '';

        // Convert to 24 hour format

        if (t.meridiem === 'am') {
          hourTwenty = timeSplit[0] === 1 ? `0${timeSplit[0]}` : timeSplit[0];
          meridiem = t.meridiem;
        } else if (t.meridiem === 'ampm') {
          if (parseInt(timeSplit[0], 10) === 11 || parseInt(timeSplit[0], 10) === 12) {
            hourTwenty = timeSplit[0];
            meridiem = 'pm';
          } else {
            hourTwenty = 12 + parseInt(timeSplit[0], 10);
            meridiem = 'am';
          }
        } else if (t.meridiem === 'pm') {
          hourTwenty = 12 + parseInt(timeSplit[0], 10);
          meridiem = t.meridiem;
        }

        hourTwenty = Helpers.formatZeroTime(hourTwenty);

        // Check if active prayer

        const timestamp = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hourTwenty,
          minutes,
          date.getSeconds()
        );

        if (ii === 0) {
          if (timestamp.getTime() < date.getTime()) {
            times[i].active = true;
            if (times[i - 1]) {
              times[i - 1].active = false;
            }
          }
        }

        // Update times and state

        const newTime = {
          time12: `${hourTwelve}.${minutes}${meridiem}`,
          time24: `${hourTwenty}.${minutes}`,
        };

        if (ii === 0) {
          times[i].start = newTime;
        } else {
          times[i].jamaah = newTime;
        }

        self.setState({ times });
      });
    });
  }

  /**
   * Sets the prayer times for the current day
   * @return {void}
   */
  setPrayerTimes() {
    const self = this;
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    Papa.parse(`${window.location.href}assets/timetables/${date.getFullYear()}.csv?${Helpers.cacheBust()}`, {
      download: true,
      complete(results) {
        results.data.forEach((item) => {
          if (month == item[0] && day == item[1]) {
            self.setPrayertTime(item);
          }
        });
      }
    });
  }

  /**
   * Toggles the time format between 12hr and 24hr
   * @return {void}
   */
  toggleTimeFormat() {
    let timeFormat = this.state.timeFormat;
    timeFormat = (timeFormat === 'time12') ? 'time24' : 'time12';
    this.setState({ timeFormat });
    Helpers.storageSet('time_format', timeFormat, 60 * 60 * 24 * 365);
  }

  render(props, state) {
    return (
      <div className="prayer-times" onClick={() => this.toggleTimeFormat()}>
        <table>
          <thead>
            <tr>
              <th className="prayer-times__name">&nbsp;</th>
              <th className="prayer-times__start">Start</th>
              <th className="prayer-times__jamaah">Jama&apos;ah</th>
            </tr>
          </thead>
          <tbody>
            {state.times.map(time => (
              <tr id={time.name} className={time.active ? 'active' : null} key={time.name}>
                <td className="prayer-times__name"><span>{time.label}</span></td>
                <td
                  className="prayer-times__start"
                  data-twhr={time.start ? time.start.time12 : ''}
                  data-tfhr={time.start ? time.start.time24 : ''}
                ><span>{time.start ? time.start[state.timeFormat] : ''}</span></td>
                <td
                  className="prayer-times__jamaah"
                  data-twhr={time.jamaah ? time.jamaah.time12 : ''}
                  data-tfhr={time.jamaah ? time.jamaah.time24 : ''}
                ><span>{time.jamaah ? time.jamaah[state.timeFormat] : '—'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

}

preact.render(<PrayerTimes />, document.getElementById('prayer-times-container'));
