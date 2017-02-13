import preact from 'preact';
import Helpers from '../../helpers';
import './style.scss';

class Slideshow extends preact.Component {

  constructor() {
    super();
    this.state = {
      timer: null,
      slides: vars.slides,
      slide: 0,
      interval: 4000
    };
  }

  componentDidMount() {
    const slidesCount = this.state.slides.length;

    if (slidesCount > 1) {
      this.setSlides();
      if (!Helpers.mq(740)) {
        this.state.timer = setInterval(() => {
          const currentSlide = this.state.slide;

          this.setState({
            slide: ((slidesCount - 1) === currentSlide) ? 0 : currentSlide + 1,
          });
        }, this.state.interval);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  /**
   * Gets the images and compresses them through webpack
   * using require and sets them to the state
   * @return {void}
   */
  setSlides() {
    const slides = [];

    this.state.slides.forEach((slide) => {
      slides.push(require(`../../../assets/slides/${slide}`));
    });

    this.setState({ slides });
  }

  render(props, state) {
    return (
      <ul>
        {state.slides.map((slide, i) => (
          <li className={state.slide === i ? 'active' : null} style={{ backgroundImage: `url('${slide}')` }} key={i} />
        ))}
      </ul>
    );
  }

}

preact.render(<Slideshow />, document.getElementById('slideshow-container'));
