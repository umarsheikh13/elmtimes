import preact from 'preact';
import Config from '../../../config.json';

class Tips extends preact.Component {

  constructor() {
    super();
    this.state = {
      timer: null,
      interval: 4000,
      tip: 0,
      tips: Config.tips,
    };
  }

  componentDidMount() {
    if (this.state.tips.length) {
      this.state.timer = setInterval(() => this.setTip(), this.state.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  /**
   * Sets the tip from the tips array
   * @return {void}
   */
  setTip() {
    let tip = this.state.tip + 1;
    tip = (tip > (this.state.tips.length - 1)) ? 0 : tip;
    this.setState({ tip });
  }

  render(props, state) {
    return (
      <div className="tips">{state.tips[state.tip]}</div>
    );
  }

}

preact.render(<Tips />, document.getElementById('tips-container'));
