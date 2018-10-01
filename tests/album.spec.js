import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

import { getAlbum, getAlbums, getAlbumTracks } from '../src/album';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {

  it('should have getAlbum method', () => {
    expect(getAlbum).to.exist;
  });

  it('should have getAlbums method', () => {
    expect(getAlbums).to.exist;
  });

  it('should have getAlbumTracks method', () => {
    expect(getAlbumTracks).to.exist;
  });

  let stubedFetch;
  let promise;

  beforeEach(() => {
    stubedFetch = sinon.stub(global, 'fetch');
    promise = stubedFetch.returnsPromise()
  });

  afterEach(() => {
    stubedFetch.restore();
  });

  describe('getAlbum', () => {

    it('should call fetch method', () => {
      const album = getAlbum();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should be call fetch with the correct url', () => {
      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy');

      const album2 = getAlbum('4aawyAB9vmqN3uQ7FjRGTk');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const album = getAlbum('4aawyAB9vmqN3uQ7FjRGTy');
      expect(album.resolveValue).to.be.eql({ album: 'name' });

    });
  });

  describe('getAlbums', () => {

    it('should call fetch method', () => {
      const albums = getAlbums();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should be call fetch with the correct url', () => {
      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/?ids=4aawyAB9vmqN3uQ7FjRGTy,4aawyAB9vmqN3uQ7FjRGTk');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const albums = getAlbums(['4aawyAB9vmqN3uQ7FjRGTy', '4aawyAB9vmqN3uQ7FjRGTk']);
      expect(albums.resolveValue).to.be.eql({ album: 'name' });

    });
  });

  describe('getAlbumTrack', () => {

    it('should call fetch method', () => {
      const albumTrack = getAlbumTracks();
      expect(stubedFetch).to.have.been.calledOnce;
    });

    it('should be call fetch with the correct url', () => {
      const albumTrack = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(stubedFetch).to.have.been.calledWith('https://api.spotify.com/v1/albums/4aawyAB9vmqN3uQ7FjRGTy/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const albumTrack = getAlbumTracks('4aawyAB9vmqN3uQ7FjRGTy');
      expect(albumTrack.resolveValue).to.be.eql({ album: 'name' });

    });
  });

});
