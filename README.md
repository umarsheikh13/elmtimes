![Build Status](https://api.travis-ci.org/umarsheikh13/elmtimes.svg?branch=master)

# ELM Times - Single Page Prayer Times Web App

This is a simple single page prayer times web app built using [Preact](https://github.com/developit/preact) and [Webpack](https://github.com/webpack). It displays the prayer times for a specific mosque including the time, date and latest video from the mosque's YouTube channel.

## Using ELM Times for your own mosque

Feel free to use the code for your own mosque by following the steps below.

Examples:

- [Coventry Cross Mosque](http://coventrycrossmosque.co.uk/)
- [Nusratul Islam Masjid](http://nimtimes.com/)

## Version 2.0

ELM Times has been rewritten in version 2.0 so there will be some breaking changes if you're currently using the previous version. In this version we've made it even easier to get up and running without having any development knowledge.

## Installation

1. [Download the code](#1-download-the-code)
2. [Update config.json](#2-update-config-json)
3. [Update index.html](#3-update-index-html)
4. [Update manifest.json](#4-update-manifest-json)
5. [Add assets](#5-add-assets)
6. [Upload files](#6-upload-files)

### 1. Download the code

Get the ELM Times codebase by cloning this repo or [downloading the zip](https://github.com/umarsheikh13/elmtimes/archive/master.zip) and extracting it.

### 2. Update config.json

Open the `config.json` file in a text editor and update the options for your mosque.

Option | Value | Requirement | Description
--- | --- | --- | ---
`theme` | maroon, navy, teal, purple | Required | The colour theme for the app
`noSlides` | integer | Required | The number of slides for the desktop version e.g. 3
`sliderSpeed` | integer | Required | The speed of the slider in seconds e.g. 3
`aboutTitle` | string | Optional | The title for the About page
`about` | string | Required | The html content for the About page
`youtubeKey` | string | Optional | The YouTube [api key](https://console.cloud.google.com/apis/library/youtube.googleapis.com). If you do not include this option the "Videos" page will be removed.
`youTubeChannelId` | string | Optional | The YouTube channel ID. Required if youtubeKey has been set.
`gaid` | string | Optional | Your Google Analytics ID
`elm` | boolean | Required | If you're using ELM's times and functionality then set this as true otherwise false
`disableAsr2` | boolean | Optional | If your mosque doesn't have the times for Asr Mithl 2 then you can disable it by including this option. You can remove this Asr time from your timetable CSV file.

### 3. Update index.html

Open the `index.html` file in a text editor and update the meta tags for your mosque.

```
<!-- Page meta -->
<meta name="description" content="...">
<meta name="keywords" content="...">

<!-- Facebook -->
<meta property="og:title" content="...">
<meta property="og:image" content="...">
<meta property="og:url" content="...">
<meta property="og:description" content="...">
<meta property="og:site_name" content="...">
```

### 4. Update manifest.json

This file allows your users to save the web app to their mobile homescreens and let them use the app offline.

Option | Value | Description
--- | --- | ---
`short_name` | string | The name under the app icon so make it short e.g. ELM
`name` | string | The website name e.g. East London Mosque
`background_color` | string | The hex colour for the app e.g. #95112d
`theme_color` | string | The hex colour for the app e.g. #95112d

If you want to match the `background_color` and `theme_color` with the prayer times theme colour then have a look at the colour codes in `src/scss/_variables.scss`.

### 5. Add assets

All the images live in subdirectories inside the root `assets` folder:

Folder | Description | Files
--- | --- | ---
`icons` | Contains the app icons used for mobile homescreens | Replace all the images in this folder using the same filenames
`logos` | Contains the logo images in 3 different sizes | Replace all the images in this folder using the same filenames
`slides` | Contains the slideshow images used for desktop browsers | You can add any number of images in this folder and the filenames should follow this style `slide-n.jpg` where `n` is the number of the slide. They will be displayed in alphabetical order according to filename.
`social` | Contains the thumbnail used when sharing a link on social media (i.e. Facebook) | Replace the image keeping the same filename
`timetables` | Contains the prayer times in comma delimited CSV format | See below for more information

### 6. Upload files

Once you're done with the above steps then all you need to do is upload the following files and folders to your web hosting server:

- /assets
- /css
- /js
- config.json
- index.html
- manifest.json
- service-worker.js

## Timetables

The timetables should go into the `assets/timetables` folder and should meet the following requirements:

1. Should be in a comma delimited CSV format.
2. Should contain all the times for the year.
3. Should have a filename of the year itself i.e. 2017.csv.
4. Should not contain a header row i.e. Month, Date, Fajr Start etc.
5. Should be in 12 hour format i.e. 2.36.
6. Should contain rows of prayer times in the following order:

`Month, Date, Fajr Start Time, Fajr Jamaah Time, Sunrise Time, Dhuhr Start Time, Dhuhr Jamaah Time, Asr Start Time (1st Mihtl), Asr Start Time (2nd Mithl), Asr Jamaah Time, Maghrib Start Time, Maghrib Jamaah Time, Isha Start Time, Isha Jamaah Time`

Example:

`2,9,5.45,6.15,7.22,12.20,12.45,2.38,3.16,3.45,5.08,5.13,6.39,7.15`

## Developers

As mentioned above this app has been developed using preact/webpack. Follow these steps to get started:

1. Install yarn globally: `npm install -g yarn`
2. Install dependencies: `yarn`
3. Run the dev server [http://localhost:8080](http://localhost:8080): `yarn dev`
4. To make a build run: `yarn build`
5. To test run: `yarn test`

## Contributing

1. Fork it!
2. Create your feature/hotfix branch: `git checkout -b feature/my-super-feature`
3. Commit your changes: `git commit -m "Added some feature"`
4. Push to the branch: `git push origin feature/my-super-feature`
5. Submit a pull request

## License

[MIT License](http://opensource.org/licenses/MIT)
