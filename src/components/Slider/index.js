import preact from 'preact';
import Classes from '../../helpers/StateClasses';
import './style.scss';

export default class Slider extends preact.Component {
    constructor() {
        super();
        this.interval = null;
        this.state = {
            slide: 1
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let newSlideNo = this.state.slide + 1;
            if (this.props.options.noSlides < newSlideNo) {
                newSlideNo = 1;
            }
            this.setState({
                slide: newSlideNo
            });
        }, this.props.options.sliderSpeed * 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    /**
     * Gets the all slides jsx in an array
     * @return {array} The slides jsx
     */
    getSlides() {
        const slides = [];

        for (let i = 0; i < this.props.options.noSlides; i++) {
            slides.push(<li className={(this.state.slide == (i + 1)) ? Classes.active : ''} style={{ backgroundImage: `url('assets/slides/slide-${i + 1}.jpg')` }} />);
        }

        return slides;
    }

    render() {
        return (
            <section className="slider">
                <ul>{ this.getSlides() }</ul>
            </section>
        );
    }
}
