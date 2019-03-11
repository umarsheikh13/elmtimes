import preact from 'preact';
import App from './components/App';
import './scss/main.scss';

// Save the components globally

window.appGlobals = {
    components: {}
};

// Render the App

preact.render(<App ref={c => window.appGlobals.components.app = c} />, document.getElementById('app'));

// Register service worker

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('Service Worker is registered', registration);
            })
            .catch(err => {
                console.error('Registration failed:', err);
            });
    });
}
