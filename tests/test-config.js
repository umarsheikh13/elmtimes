
/* eslint-disable */

import { expect } from 'chai';
import Config from '../config.json';

describe('Configuration file', () => {
    it('should exist', () => {
        expect(Config).to.exist;
    });

    it('should contain the required fields', () => {
        expect(Config.theme).to.exist;
        expect(Config.noSlides).to.exist;
        expect(Config.sliderSpeed).to.exist;
        expect(Config.about).to.exist;
        expect(Config.elm).to.exist;
    });
});
