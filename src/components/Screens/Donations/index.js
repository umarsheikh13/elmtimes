import preact from 'preact';
import './style.scss';

export default class Donations extends preact.Component {
    render(props) {
        return (
            <section className="body__content">
                <div className="body__inner">
                    <h1 className="body__title">Donations</h1>
                    <div dangerouslySetInnerHTML={{ __html: props.options.donations }}></div>
                    <a
                        className="donations_button"
                        target='_blank'
                        href={props.options.donationsLink || 'https://www.muslimgiving.org/coventrycrossmasjid'}>
                        <button>Donate Now</button>
                    </a>
                </div>
            </section>
        );
    }
}