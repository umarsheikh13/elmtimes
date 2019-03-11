class Functions {
    /**
     * Add zeroes to the beginning of the hours/minutes
     * @param  {int}   dt The time (hour or minute)
     * @return {mixed}    The formatted time
     */
    formatZeroTime(dt) {
        const dateTime = parseInt(dt, 10);

        if (dateTime === 0) {
            return '00';
        } else if (dateTime < 10) {
            return `0${dateTime}`;
        }

        return dateTime;
    }

    /**
     * Checks to see if localStorage is available
     * @return {bool} If localStorage available
     */
    storageAvailable() {
        try {
            const x = '__storage_test__';
            const storage = window.localStorage;

            storage.setItem(x, x);
            storage.removeItem(x);

            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * Gets an item from localStorage
     * @param    {str}     key The key to retrieve
     * @return {mixed}         The value if exists
     */
    storageGet(key) {
        if (this.storageAvailable()) {
            const item = localStorage.getItem(key);
            const itemCache = localStorage.getItem(`${key}_cache`);
            const time = new Date().getTime() / 1000;

            if (item && item !== '' && time <= parseInt(itemCache, 10)) {
                return item;
            }
        }
        return false;
    }

    /**
     * Sets an item to localStorage
     * @param  {str}   key   The key to set
     * @param  {mixed} value The value to save
     * @param  {int}   time  The time in seconds to store value
     * @return {void}
     */
    storageSet(key, value, time = 86400) {
        if (this.storageAvailable()) {
            const now = (new Date().getTime() / 1000) + time;

            localStorage.setItem(key, value);
            localStorage.setItem(`${key}_cache`, now);
        }
    }

    /**
     * Tests to see if viewport within the specified width
     * @param  {int} width The viewport width to Check
     * @return {bool}
     */
    mq(width) {
        const w = window;
        const d = document;
        const e = d.documentElement;
        const g = d.getElementsByTagName('body')[0];
        const x = w.innerWidth || e.clientWidth || g.clientWidth;
        return x <= width;
    }

    /**
     * Creates a hash based on time type
     * @param  {str} type The time for the cache string
     * @return {int}         The cache busting string
     */
    cacheBust(type = 'daily') {
        const date = new Date();
        return `${date.getFullYear()}${date.getMonth()}${date.getDate()}${(type === 'hourly') ? date.getHours() : ''}`;
    }
}

export default new Functions();
