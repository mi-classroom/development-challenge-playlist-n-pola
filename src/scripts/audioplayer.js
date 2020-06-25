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
      const play = song.querySelector('[data-js-song-play]');
      const stop = song.querySelector('[data-js-song-stop]');
      this.songsObjs.push({ play, stop, song: sound });

      song.addEventListener('click', () => {
        this.play(i);
      });
    });
  }

  play(index) {
    const { currentSong } = this;
    if (currentSong != null) {
      this.songsObjs[currentSong].song.stop();
      this.songsObjs[currentSong].stop.classList.remove('playlist__icon--active');
      this.songsObjs[currentSong].play.classList.add('playlist__icon--active');
    }
    if (currentSong != index) {
      this.songsObjs[index].song.play();
      this.songsObjs[index].stop.classList.add('playlist__icon--active');
      this.songsObjs[index].play.classList.remove('playlist__icon--active');
      this.currentSong = index;
    } else {
      this.currentSong = null;
    }
  }
}

// eslint-disable-next-line import/extensions
const playlistWrap = document.querySelector('[data-js-playlist-section]');
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
