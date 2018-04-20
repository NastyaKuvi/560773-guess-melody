export default (audio) => {
  return `<div class="player-wrapper">
            <div class="player">
              ${audio}
              <button class="player-control player-control--pause"></button>
              <div class="player-track">
                <span class="player-status"></span>
              </div>
            </div>
          </div>`;
};
