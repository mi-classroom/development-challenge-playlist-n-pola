class Playlist {
  constructor(playlist) {
    this.playlist = playlist;
    this.songs = playlist.querySelectorAll(playlist.dataset.jsPlaylist);
    this.currentSong = null;
    this.songsObjs = [];
    this.songs.forEach((song, i) => {
      const sound = new Howl({
        src: [song.dataset.jsSongSrc],
      });
      console.log(sound);
      this.songsObjs.push(sound);

      song.addEventListener('click', () => {
        this.play(i);
      });
    });
  }

  play(index) {
    const { currentSong } = this;
    if (currentSong != null) { this.songsObjs[currentSong].stop(); }
    if (currentSong != index) {
      this.songsObjs[index].play();
      this.currentSong = index;
    }
  }
}

// eslint-disable-next-line import/extensions
const playlistWrap = document.querySelector('[data-js-playlist-section]');
playlistWrap.addEventListener;
fetch('./json/playlist.json')
  .then((response) => response.json())
  .then((data) => {
    fetch('./templates/playlist.mustache')
      .then((response) => response.text())
      .then((template) => {
        const rendered = Mustache.render(template, data);
        playlistWrap.innerHTML = rendered;
        const playlist = document.querySelector('[data-js-playlist]');
        new Playlist(playlist);
      });
  });
