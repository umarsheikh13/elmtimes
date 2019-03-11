
/* eslint-disable */

import { expect } from 'chai';
import fs from 'fs';

const date = new Date();
const year = date.getFullYear();
const days = (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) ? 366 : 365;
const csvFile = `assets/timetables/${year}.csv`;

describe(`${year} Prayer Times CSV File`, () => {
    it('should exist', () => {
        const csvFileExists = fs.existsSync(csvFile);
        expect(csvFileExists).to.equal(true);
    });

    it(`should have ${days} records`, () => {
        const csvFileExists = fs.existsSync(csvFile);

        let passed = true;

        if (csvFileExists) {
            const csv = fs.readFileSync(csvFile);
            const lines = csv.toString().split('\n');
            const records = [];

            let record;

            for (let i = 0; i < lines.length; i++) {
                record = lines[i].toString();

                if (record.length) {
                    records.push(record.split(','));
                }
            }

            passed = records.length == days;
        } else {
            passed = false;
        }

        expect(passed).to.equal(true);
    });
});
