import preact from 'preact';
import Config from '../../../config.json';
import Helpers from '../../helpers';
import './style.scss';

class Theme extends preact.Component {

  constructor() {
    super();
    this.state = {
      hasSecondary: !!Config.secondarycolor
    };
  }

  componentDidMount() {
    const body = document.getElementsByTagName('body')[0];
    const theme = Helpers.storageGet('theme_colour');

    body.classList.add(theme || 'primary-color');
  }

  /**
   * Switches the colour of the website theme
   * @param  {obj} e The click event
   * @return {void}
   */
  switchTheme(e) {
    e.preventDefault();

    if (this.state.hasSecondary) {
      const body = document.getElementsByTagName('body')[0];
      const theme = (body.classList.contains('primary-color')) ? 'secondary-color' : 'primary-color';

      body.className = '';
      body.classList.add(theme);

      Helpers.storageSet('theme_colour', theme, 60 * 60 * 24 * 365);
    }
  }

  render(props, state) {
    return (
      <div className={`theme${(state.hasSecondary) ? ' active' : ''}`}>
        <a onClick={e => this.switchTheme(e)}>Switch colour</a>
      </div>
    );
  }

}

preact.render(<Theme />, document.getElementById('theme-container'));
