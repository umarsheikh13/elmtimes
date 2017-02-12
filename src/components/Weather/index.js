import preact from 'preact';
import Config from '../../../config.json';
import Helpers from '../../helpers';
import './style.scss';

class Weather extends preact.Component {

  constructor() {
    super();
    this.state = {
      temp: null,
      icon: null,
    };
  }

  componentDidMount() {
    if (Config.owmapikey) {
      this.getWeather();
    }
  }

  /**
   * Gets the current weather for the mosque
   * @return {void}
   */
  getWeather() {
    const cachedTemp = Helpers.storageGet('weather_temp');
    const cachedCond = Helpers.storageGet('weather_cond');
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${Config.latitude}&lon=${Config.longitude}&units=metric&APPID=${Config.owmapikey}`;

    // Retrieve video details from cache

    if (cachedTemp) {
      this.setState({
        temp: cachedTemp,
        cond: cachedCond,
      });
    } else {
      // Get weather from API

      fetch(endpoint, {
        method: 'get',
      })
      .then(resp => resp.json())
      .then((data) => {
        const weather = data;
        const cnd = weather.weather[0].id;
        const time = new Date().getTime() / 1000;

        // Choose correct letter for current weather condition

        let cond = '/';

        if ([200, 201, 202, 210, 211, 212, 221, 230, 231, 232].includes(cnd)) { // Thunderstorm
          cond = 'Y';
        } else if ([300, 301, 302, 310, 311, 312, 321].includes(cnd)) { // Drizzle
          cond = 'M';
        } else if ([500, 501, 502, 503, 504].includes(cnd)) { // Rain with sun
          cond = 'J';
        } else if ([511].includes(cnd)) { // Freezing rain
          cond = 'O';
        } else if ([520, 521, 522].includes(cnd)) { // Rain
          cond = 'K';
        } else if ([600, 601, 602, 611, 621].includes(cnd)) { // Snow
          cond = 'I';
        } else if ([701, 711, 721, 731, 741].includes(cnd)) { // Atmosphere
          cond = '…';
        } else if ([800].includes(cnd)) { // Clear
          if (time > weather.sys.sunset) {
            cond = '6';
          } else {
            cond = '1';
          }
        } else if ([801].includes(cnd)) { // Few clouds
          if (time > weather.sys.sunset) {
            cond = 'A';
          } else {
            cond = 'a';
          }
        } else if ([802, 803, 804].includes(cnd)) { // Clouds
          cond = '3';
        }

        // Save to cache and set states

        const temp = Math.round(weather.main.temp);

        Helpers.storageSet('weather_temp', temp, 60 * 60);
        Helpers.storageSet('weather_cond', cond, 60 * 60);

        this.setState({ temp, cond });
      });
    }
  }

  render(props, state) {
    return (
      <div className="weather__inner">
        <span className="weather__temp">{state.temp}</span>
        <span className="weather__icon">{state.cond}</span>
      </div>
    );
  }

}

preact.render(<Weather />, document.getElementById('weather-container'));
