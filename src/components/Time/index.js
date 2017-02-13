import preact from 'preact';
import Helpers from '../../helpers';
import './style.scss';

class Time extends preact.Component {

  constructor() {
    super();
    this.state = {
      time: '00.00',
      date: '',
      timer: null,
      interval: 1000 * 60
    };
  }

  componentDidMount() {
    this.setTime();
    this.setDate();

    if (Helpers.mq(740)) {
      this.state.timer = setInterval(() => this.setTime(), this.state.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  /**
   * Sets the current time
   * @return {void}
   */
  setTime() {
    const date = new Date();

    this.setState({
      time: `${Helpers.formatZeroTime(date.getHours())}.${Helpers.formatZeroTime(date.getMinutes())}`,
    });
  }

  /**
   * Sets the current date
   * @return {void}
   */
  setDate() {
    const date = new Date();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];

    this.setState({
      date: `${Helpers.formatZeroTime(date.getDate())} ${months[date.getMonth()]} ${date.getFullYear()}`,
    });
  }

  render(props, state) {
    return (
      <div className="time">
        <span className="time__time">{state.time}</span>
        <span className="time__date">{state.date}</span>
      </div>
    );
  }

}

preact.render(<Time />, document.getElementById('time-container'));
