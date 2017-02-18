import { expect } from 'chai';
import Config from '../config.json';

describe('Configuration file', () => {
  it('should exist', () => {
    expect(Config).to.exist;
  });

  it('should contain the required fields', () => {
    expect(Config.title).to.exist;
    expect(Config.tagline).to.exist;
    expect(Config.description).to.exist;
    expect(Config.keywords).to.exist;
    expect(Config.domain).to.exist;
    expect(Config.path).to.exist;
    expect(Config.tips).to.exist;
    expect(Config.primarycolor).to.exist;
    expect(Config.gaid).to.exist;
  });
});
