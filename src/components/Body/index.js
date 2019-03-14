import preact from 'preact';
import ReactGA from 'react-ga';
import Classes from '../../helpers/StateClasses';
import Home from '../Screens/Home';
import Videos from '../Screens/Videos';
import Settings from '../Screens/Settings';
import About from '../Screens/About';
import './style.scss';

export default class Body extends preact.Component {
    constructor(props) {
        super(props);

        // Setup the screens

        this.screens = [
            {
                id: 'home',
                title: 'Home',
                component: Home
            },
            {
                id: 'about',
                title: props.options.aboutTitle || 'About',
                component: About
            },
            {
                id: 'videos',
                title: 'Videos',
                component: Videos
            },
            {
                id: 'settings',
                title: 'Settings',
                component: Settings
            }
        ];

        // Remove the videos screen if the youtube key isn't set

        if (
            !('youTubeKey' in this.props.options) ||
            ('youTubeKey' in this.props.options && this.props.options.youTubeKey.length === 0)
        ) {
            this.screens.splice(2, 1);
        }
        this.state = {
            screen: 'home',
            menuOpen: false
        };
    }

    componentDidMount() {
        if ('gaid' in this.props.options) {
            ReactGA.initialize(this.props.options.gaid);
            ReactGA.pageview(window.location.pathname + window.location.search);
        }
    }

    /**
     * Toggles the display of the nav menu
     * @param  {object} e Th event object
     * @return void
     */
    toggleMenu(e) {
        e.preventDefault();
        this.setState({
            menuOpen: (this.state.menuOpen) ? false : true
        });
    }

    /**
     * Change the screen
     * @param  {object} e  The event object
     * @param  {string} id The screen ID
     * @return void
     */
    changeScreen(e, id) {
        this.setState({
            screen: id,
            menuOpen: false
        });
    }

    render(props, state) {
        return (
            <main className="body">
                <section className="body__toolbar">
                    <div className="body__left">
                        <a className={(state.menuOpen) ? ' ' + Classes.open : ''} onClick={e => this.toggleMenu(e)} role="button"><span /></a>
                        <nav className={`body__nav${(state.menuOpen) ? ' is-open' : ''}`}>
                            <ul>
                                {this.screens.map(screen => (
                                    <li className={(state.screen == screen.id) ? ' ' + Classes.active : ''} key={screen.id}><a onClick={e => this.changeScreen(e, screen.id)}>{ screen.title }</a></li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                    <div className="body__center"><img alt="Logo" src="assets/logos/logo.png" /></div>
                    <div className="body__right"></div>
                </section>
                {this.screens.map(screen => (
                    <article id={`screen-${screen.id}`} className={`screen-${screen.id} ${(state.screen == screen.id) ? ' ' + Classes.active : ''}`} key={screen.id}><screen.component ref={c => window.appGlobals.components[screen.id] = c} options={props.options} /></article>
                ))}
            </main>
        );
    }
}
