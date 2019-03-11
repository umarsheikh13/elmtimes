import preact from 'preact';
import axios from 'axios';
import Functions from '../../helpers/Functions';
import Body from '../Body';
import Slider from '../Slider';
import Loading from '../Loading';
import { debounce } from 'underscore';

export default class App extends preact.Component {
    constructor() {
        super();
        this.state = {
            loaded: false,
            options: {},
            screenX: this.getScreenSize().x
        };

        // Save the theme

        this.saveTheme = (theme) => {
            this.state.options.theme = theme;
            this.setState({
                options: this.state.options
            });
        };
    }

    componentDidMount() {
        axios.get('config.json')
            .then((response) => {
                const theme = Functions.storageGet('theme') || response.data.theme;
                response.data.theme = theme;
                this.setState({
                    options: response.data
                });
                setTimeout(() => {
                    this.setState({
                        loaded: true
                    });
                }, 1000);
            });

        // Set the screen x size for the slider

        window.addEventListener('resize', debounce(() => {
            this.setState({
                screenX: this.getScreenSize().x
            });
        }, 100));
    }

    /**
     * Gets the window screen size
     * @return {object} The screen size
     */
    getScreenSize() {
        const w = window;
        const d = document;
        const e = d.documentElement;
        const g = d.getElementsByTagName('body')[0];
        const x = w.innerWidth || e.clientWidth || g.clientWidth;
        const y = w.innerHeight || e.clientHeight || g.clientHeight;

        return { x, y };
    }

    render(props, state) {
        return (
            <div className={`wrapper theme-${state.options.theme}${(state.loaded) ? ' is-loaded' : ''}`}>
                {!state.loaded &&
                    <Loading />
                }
                {state.loaded && state.screenX > 768 &&
                    <Slider options={state.options} />
                }
                {state.loaded &&
                    <Body options={state.options} />
                }
            </div>
        );
    }
}
