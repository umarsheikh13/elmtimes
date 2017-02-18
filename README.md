# ELM Times - Single Page Prayer Times Web App

This is a simple single page prayer times web app built using Preact and Webpack. It displays the prayer times for a specific mosque including the time, date, current weather (at the mosque's location) and latest video from the mosque's YouTube channel.

## Using ELM Times for your own mosque

Feel free to use the code for your own mosque by following the steps below.

## Installation

1. [Download the code](#1-download-the-code)
2. [Install packages](#2-install-packages)
3. [Configure details](#3-configure-details)
4. [Add assets](#4-add-assets)
5. [Testing](#5-testing)
6. [Build it](#6-build-it)

### 1. Download the code

Get the ELM Times codebase by cloning this repo or [downloading the zip](https://github.com/umarsheikh13/elmtimes/archive/master.zip) and extracting it.

### 2. Install packages

Go to the [Node.js](https://nodejs.org/en/) website and download the LTS package. Once downloaded, run the installer and you're done. Open up command prompt (Windows) or terminal (OSX), navigate to the project folder and then run:

```
npm install -g yarn
```

Then install all the packages by running:

```
yarn
```

### 3. Configure details

Edit the `config.json` file and change the options accordingly (see file for examples).

Option | Type | Required | Description
--- | --- | --- | ---
*title* | `string` | Yes | The title of the app
*tagline* | `string` | Yes | The tagline of the app
*description* | `string` | Yes | The description of the app (used for SEO)
*keywords* | `string` | Yes | The keywords for the app (used for SEO)
*domain* | `string` | Yes | The domain name
*path* | `string` | Yes | If you're app lives in a subdirectory like `elmtimes.com/app` then set it as `"/app/"` otherwise use `"/"`
*tips* | `array` | Yes | These are the tips shown to the user in the footer. We recommend keeping the first 2 in the list.
*primarycolor* | `string` | Yes | The main app colour in hex code
*gaid* | `string` | Yes | Your Google Analytics UA ID
*secondarycolor* | `string` | No | The secondary app colour the user can switch to
*latitude* | `float` | No | The latitude of the mosque's location. Required if `owmapikey` is set.
*longitude* | `float` | No | The longitude of the mosque's location. Required if `owmapikey` is set.
*owmapikey* | `string` | No | Your [Open Weather Map](https://openweathermap.org/) API key
*channelid* | `string` | No | Your YouTube channel ID. Required if `ytapikey` is set
*ytapikey* | `string` | No | Your [Google API Key](https://console.developers.google.com/) used to
*ELM* | `boolean` | No | This is only used if you're fetching East London Mosque's YouTube feed

### 4. Add assets

All the images live in subdirectories inside the root `assets` folder:

Folder | Description | Files
--- | --- | ---
`icons` | Contains the app icons used for mobile homescreens | Replace all the images in this folder using the same filenames
`logos` | Contains the logo images in 3 different sizes | Replace all the images in this folder using the same filenames
`slides` | Contains the slideshow images used for desktop browsers | You can add any number of images in this folder and the filenames can be anything. They will be displayed in alphabetical order according to filename.
`social` | Contains the thumbnail used when sharing a link on social media (i.e. Facebook) | Replace the image keeping the same filename
`timetables` | Contains the prayer times in comma delimited CSV format | See below for more information

#### Timetables

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

### 5. Test the code

After configuring the app and adding all the assets you're good to go however I suggest running some tests to see if everything's in working order. See below for more information:

1. Checks if your `config.json` file contains all the required options
2. Checks if your timetable CSV file exists and contains all the rows
3. Checks the weather API if you've set an Open Weather Map API key
4. The last test checks the YouTube API if you've set the API key. This will only work if your key is unrestricted.

You can run all the tests by running:

```
yarn run test
```

### 6. Build the app

The final step is to actually build the app, go ahead and do that by running:

```
yarn run build
```

If you just want to transfer the static files to a hosting server you'll need the following files after your build:

```
/assets
/css
/fonts
/img
/js
config.json
favicon.ico
index.html
```

## Contributing

1. Fork it!
2. Create your feature/hotfix branch: `git checkout -b feature/my-super-feature`
3. Commit your changes: `git commit -m "Added some feature"`
4. Push to the branch: `git push origin feature/my-super-feature`
5. Submit a pull request

## License

[MIT License](http://opensource.org/licenses/MIT)
