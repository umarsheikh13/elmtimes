import $ from 'cash-dom';
import Papa from 'papaparse';
import Functions from '../helpers/Functions';

export default class PrayerTimes {
    constructor(options = {}) {
        this.options = options;
        this.fileCache = {};
        this.times = [
            {
                name: 'fajr',
                label: 'Fajr',
                meridiem: 'am',
                index: [2, 3]
            },
            {
                name: 'sunrise',
                label: 'Sunrise',
                meridiem: 'am',
                index: [4]
            },
            {
                name: 'zuhr',
                label: 'Dhuhr',
                meridiem: 'ampm',
                index: [5, 6]
            },
            {
                name: 'asr',
                label: 'Asr 1',
                meridiem: 'pm',
                index: [7, 9]
            },
            {
                name: 'asr2',
                label: 'Asr 2',
                meridiem: 'pm',
                index: [8]
            },
            {
                name: 'maghrib',
                label: 'Maghrib',
                meridiem: 'pm',
                index: [10, 11]
            },
            {
                name: 'isha',
                label: 'Isha',
                meridiem: 'pm',
                index: [12, 13]
            }
        ];

        // Check if asr 2 has been disabled

        if ('disableAsr2' in this.options) {
            this.times.splice(4, 1);
            this.times[3].label = 'Asr';
            this.times[3].index = [7, 8];
            this.times[4].index = [9, 10];
            this.times[5].index = [11, 12];
        }
    }

    /**
     * Formats the prayer times with the csv row array
     * @return {void}
     */
    formatPrayertTime(time) {
        let newTimes = {};

        $.each(this.times, (t, i) => {
            const times = this.times;

            $.each(t.index, (ti, ii) => {
                const date = new Date();
                const timeStr = `${time[ti]}`;
                const timeSplit = (((/\./).test(timeStr)) ? timeStr : `${timeStr}.00`).split('.');
                const minutes = Functions.formatZeroTime(timeSplit[1]);
                const hourTwelve = timeSplit[0];

                let hourTwenty = 0;
                let meridiem = '';

                // Convert to 24 hour format

                if (t.meridiem === 'am') {
                    hourTwenty = timeSplit[0] === 1 ? `0${timeSplit[0]}` : timeSplit[0];
                    meridiem = t.meridiem;
                } else if (t.meridiem === 'ampm') {
                    if (parseInt(timeSplit[0], 10) === 11) {
                        hourTwenty = timeSplit[0];
                        meridiem = 'am';
                    } else if (parseInt(timeSplit[0], 10) === 12) {
                        hourTwenty = timeSplit[0];
                        meridiem = 'pm';
                    } else if (parseInt(timeSplit[0], 10) < 11) {
                        hourTwenty = 12 + parseInt(timeSplit[0], 10);
                        meridiem = 'pm';
                    }
                } else if (t.meridiem === 'pm') {
                    hourTwenty = 12 + parseInt(timeSplit[0], 10);
                    meridiem = t.meridiem;
                }

                hourTwenty = Functions.formatZeroTime(hourTwenty);

                // Check if active prayer

                const timestamp = new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate(),
                    hourTwenty,
                    minutes,
                    date.getSeconds()
                );

                if (ii === 0) {
                    if (timestamp.getTime() < date.getTime()) {
                        times[i].active = true;
                        if (times[i - 1]) {
                            times[i - 1].active = false;
                        }
                    }
                }

                // Update times and state

                const newTime = {
                    '12hour': `${hourTwelve}.${minutes}${meridiem}`,
                    '24hour': `${hourTwenty}.${minutes}`
                };

                if (ii === 0) {
                    times[i].start = newTime;
                } else {
                    times[i].jamaah = newTime;
                }

                newTimes = times;
            });
        });

        return newTimes;
    }

    /**
     * Generate and return the prayer times
     * @param  {string}   chosenDate The date to choose
     * @param  {function} callback   The callback function
     * @return {object}            The prayer times
     */
    generate(chosenDate, callback = false) {
        const self = this;
        const date = chosenDate.split('-');
        const month = parseInt(date[1], 10);
        const day = parseInt(date[2], 10);
        const year = parseInt(date[0], 10);

        if (year in this.fileCache) {
            $.each(this.fileCache[year], (item) => {
                if (month == item[0] && day == item[1] && callback) {
                    callback(self.formatPrayertTime(item));
                }
            });
        } else {
            Papa.parse(`assets/timetables/${year}.csv?${Functions.cacheBust()}`, {
                download: true,
                complete(results) {
                    self.fileCache[year] = results.data;
                    $.each(results.data, (item) => {
                        if (month == item[0] && day == item[1] && callback) {
                            callback(self.formatPrayertTime(item));
                        }
                    });
                }
            });
        }
    }
}
