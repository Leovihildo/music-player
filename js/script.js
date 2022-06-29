// Setting the variables
let background = document.querySelector(".blur-background");
let cover_img = document.querySelector(".track-img");
let track_title = document.querySelector(".track-title");
let track_artist = document.querySelector(".artist");

let current_time = document.querySelector(".current-time");
let progress = document.querySelector(".timer");
let total_time = document.querySelector(".total-time");
let btn_prev = document.querySelector(".prev-track");
let btn_next = document.querySelector(".next-track");
let play_pause = document.querySelector(".play-pause");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// function to play and pause track

document.querySelector(".play-pause").addEventListener("click", ()=>{
    if(!isPlaying){
        playTrack();
    }
    else{
        pauseTrack();
    }
});

btn_next.addEventListener('click', function(){
    if (track_index < (track_list.length-1)){
        track_index += 1;
    }
    else{
        track_index = 0;
    }

    loadTrack(track_index);
    playTrack();
});

btn_prev.addEventListener('click', function(){
    if (track_index > 0){
        track_index -= 1;
    }
    else{
        track_index = track_list.length - 1;
    }

    loadTrack(track_index);
    playTrack();
});

// Creating audio element for the player
let current_track  = document.createElement('audio');

// THE TRACK LISTS
let track_list = [
    {
        title: "Dangerously",
        artist: "Charlie Puth",
        cover: "../Songs/Track_images/dangerously.jpg",
        path: "../Songs/Charlie Puth - Dangerously Official Audio.mp3"
    },
    {
        title: "FIA",
        artist: "Davido",
        cover: "../Songs/Track_images/fia.jpg",
        path: "../Songs/Davido - FIA (Official Music Video).mp3"
    },
    {
        title: "Again",
        artist: "Wande Coal",
        cover: "../Songs/Track_images/again.jpg",
        path: "../Songs/Wande Coal - Again (Official Video).mp3"
    },
    {
        title: "Like I do",
        artist: "Fireboy DML",
        cover: "../Songs/Track_images/fireboy.jpg",
        path: "../Songs/Fireboy DML - Like I Do (Audio).mp3"
    },
    {
        title: "Lagos Vibes",
        artist: "Wizkid",
        cover: "../Songs/Track_images/lagos_vibes.jpeg",
        path: "../Songs/WizkidLagos Vibes.mp3"
    }
];

function loadTrack(track_index){
    // clear previous timer
    clearInterval(updateTimer);
    resetValues();

    // load a new track
    current_track.src = track_list[track_index].path;
    current_track.load();

    // cover image AND background of the track
    cover_img.style.backgroundImage = "url("+track_list[track_index].cover+")";
    background.style.backgroundImage = "url("+track_list[track_index].cover+")";
    track_title.textContent = track_list[track_index].title;
    track_artist.textContent = track_list[track_index].artist;

    updateTimer = setInterval(seekUpdate, 1000);

    current_track.addEventListener("ended", nextTrack);
}

loadTrack(track_index);

// function to reset all values
function resetValues(){
    current_time.textContent = "00:00";
    total_time.textContent = "00:00";
    progress.value = 0;
}

// Function to play track
function playTrack(){
    current_track.play;
    isPlaying = true;

    play_pause.innerHTML = '<i class="fa fa-pause-circle fa-3x" aria-hidden="true"></i>';
}

// Function to pause track
function pauseTrack(){
    current_track.pause;
    isPlaying = false;

    play_pause.innerHTML = '<i class="fa fa-play-circle fa-3x" aria-hidden="true"></i>';
}

function seekTo(){
    seekto = current_track.duration * (progress.value / 100);
    current_track.currentTime = seekto;
}

function seekUpdate(){
    let seekPosition = 0;

    if (!isNaN(current_track.duration)){
        seekPosition = current_track.currentTime * (100/current_track.duration);
        progress.value = seekPosition;

        let currentmin = Math.floor(current_track.currentTime/60);
        let currentsec = Math.floor(current_track.currentTime - currentmin*60);
        let durationmin = Math.floor(current_track.duration/60);
        let durationsec = Math.floor(current_track.duration - durationmin*60);

        if (currentsec < 10){
            currentsec = "0" + currentsec;
        }
        if (durationsec < 10){
            durationtsec = "0" + durationsec;
        }
        if (currentmin < 10){
            currentmin = "0" + currentmin;
        }
        if (durationsec < 10){
            durationsec = "0" + durationsec;
        }

        current_time.textContent = currentmin + ":" + currentsec;
        total_time.textContent = durationmin + ":" + durationsec;
    }
}


