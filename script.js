const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector('audio');
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//Music
const songs = [
	{
		name: "jacinto-1",
		displayName: "Electric Chill Machine",
		artist: "Jacinto Design",
	},
	{
		name: "jacinto-2",
		displayName: "Seven Nation Army (Remix)",
		artist: "Jacinto Design",
	},
	{
		name: "jacinto-3",
		displayName: "GoodNight, Disco Queen",
		artist: "Jacinto Design",
	},
	{
		name: "metric-1",
		displayName: "Front Row (Remix)",
		artist: "Metric/Jacinto Design",
	},
];

// Check if playing
let isPlaying = false;

//Play
function PlaySong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

//Pause
function PauseSong() {
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

// Play or Pause event listener
playBtn.addEventListener('click', () => (isPlaying ? PauseSong() : PlaySong()));


//Update Dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

//Current Song
let songIndex = 0;

//Previous Song
function prevSong() {
	songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
	loadSong(songs[songIndex]);
	PlaySong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    PlaySong();

}

// On Load - select first song
loadSong(songs[songIndex])

// Update progress bar & time

function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        //Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay Switching duration Elemet to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        //Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentSeconds) {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

//Set Progress bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = music;
    music.currentTime = (clickX / width) * duration
}

//Event Listeners
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
music.addEventListener("ended", nextSong);
progressContainer.addEventListener("click", setProgressBar);
