import preact from 'preact';

export default class Events extends preact.Component {
    render(props) {
        return (
            <section className="body__content">
                <div className="body__inner">
                    <h1 className="body__title">{ props.options.eventsTitle || 'Events' }</h1>
                    <div dangerouslySetInnerHTML={{ __html: props.options.events }}></div>
                </div>
            </section>
        );
    }
}