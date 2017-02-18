import { expect } from 'chai';
import axios from 'axios';
import Config from '../config.json';

describe('Weather', () => {
  it('should have an API key', () => {
    expect(Config.owmapikey).to.exist;
  });

  it('should have coordinates set', () => {
    expect(Config.latitude).to.exist;
    expect(Config.longitude).to.exist;
  });

  it('should receive data from the API', (done) => {
    const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${Config.latitude}&lon=${Config.longitude}&units=metric&APPID=${Config.owmapikey}`;

    axios.get(endpoint)
      .then((resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.data.weather).to.exist;
        done();
      })
      .catch((err) => {
        done(new Error(err.message));
      });
  });
});
