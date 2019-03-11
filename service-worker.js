
/* eslint-disable */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.0.0/workbox-sw.js');

if (workbox) {
    workbox.routing.registerRoute(
        new RegExp('/'),
        new workbox.strategies.NetworkFirst()
    );
}
