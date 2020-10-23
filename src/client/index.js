import { connect, play } from './networking';
import { startRendering, stopRendering } from './renderer';
import { startCapturingInput, stopCapturingInput } from './input';
import { downloadAssets} from './assets';
import { initState } from './state';
import { setLeaderboardHidden } from './leaderboard';

import './css/bootstrap-reboot.css';
import './css/main.css';

const playMenu = document.getElementById('play-menu');
const playButton = document.getElementById('play-button');
const usernameInput  = document.getElementById('username-input');

Promise.all([
    connect(onGameOver),
    downloadAssets(),
]).then(() => {
    playMenu.classList.remove('hidden');
    usernameInput.focus();
    playButton.onclick = () => {
        play(usernameInput.value);
        playMenu.classList.add('hidden');
        initState();
        startCapturingInput();
        startRendering();
        setLeaderboardHidden(false);
    };
}).catch(console.error);

function onGameOver() {
    stopCapturingInput();
    stopRendering();
    playMenu.classList.remove('hidden');
    setLeaderboardHidden(true);
}