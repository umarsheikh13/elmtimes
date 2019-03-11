import preact from 'preact';

export default class About extends preact.Component {
    render(props) {
        return (
            <section className="body__content">
                <div className="body__inner">
                    <h1 className="body__title">{ props.options.aboutTitle || 'About' }</h1>
                    <div dangerouslySetInnerHTML={{ __html: props.options.about }}></div>
                </div>
            </section>
        );
    }
}
