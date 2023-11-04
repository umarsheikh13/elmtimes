import preact from 'preact';
import Marquee from 'react-text-marquee';

export default class ScrollingText extends preact.Component {
    render({ text }) {
        return (
            <Marquee
                text={text || 'No major news for now.'}
                hoverToStop={true}
                loop={true}
                leading={600}
                trailing={600} />
        );
    }
}
