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
      });
  });
