import { expect } from 'chai';
import axios from 'axios';
import Config from '../config.json';

describe('YouTube', () => {
  it('should have an API key', () => {
    expect(Config.ytapikey).to.exist;
  });

  it('should have a channel ID', () => {
    expect(Config.channelid).to.exist;
  });

  it('should receive data from the API', (done) => {
    const endpoint = `https://www.googleapis.com/youtube/v3/search?key=${Config.ytapikey}&channelId=${Config.channelid}&part=snippet,id&order=date&maxResults=5`;

    axios.get(endpoint)
      .then((resp) => {
        expect(resp.status).to.equal(200);
        expect(resp.data.items).to.not.be.empty;
        done();
      })
      .catch((err) => {
        done(new Error(err.message));
      });
  });
});
