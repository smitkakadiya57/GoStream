// grasp all the required elements 
const mainAudio = document.querySelector(".music-right audio");
const playPause = document.getElementById("playPause");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const next = document.querySelector("#next");
const prev = document.querySelector("#prev");
const replay = document.querySelector("#replay");
const proArea = document.querySelector(".progress-area");
const proBar = document.querySelector(".progress-bar");
const musicCurrTime = document.querySelector(".currTime");
const musicDuration = document.querySelector(".duration");
const list = document.querySelector(".list");
const showlist = document.querySelector("#showlist");
const musicIMG=document.querySelector(".music-left img");
const skip = document.querySelector("#skip");
//load music function
let audioIndex = 0;
let musicStatus = false;
let loadMusic = (audioIndex) => {

    mainAudio.src = `music/${mysong[audioIndex].name}.mp3`;
    title.textContent = mysong[audioIndex].title;
    artist.textContent = mysong[audioIndex].artist;
    musicIMG.src=`img/${mysong[audioIndex].img}.jpg`;
}

playPause.addEventListener("click", () => {
    loadMusic(audioIndex);
    if (musicStatus) {
        pauseMusic();

    } else {
        playMusic();

    }
});

//play music function 
let playMusic = () => {
    mainAudio.play();
    musicStatus = true;
    playPause.textContent = "pause";
    list_item[audioIndex].querySelector("button").textContent="Playing...";
}
//pause funnction 
let pauseMusic = () => {
    mainAudio.pause();
    musicStatus = false;
    playPause.textContent = "play_arrow";
}

//next button function
next.addEventListener("click", () => {
    list_item[audioIndex].querySelector("button").textContent="Play";
    audioIndex = (audioIndex + 1) % mysong.length;
    loadMusic(audioIndex);
    playMusic();
   
});

//previus button function 
prev.addEventListener("click", () => {
    list_item[audioIndex].querySelector("button").textContent="Play";
    audioIndex = (audioIndex - 1 + mysong.length) % mysong.length;
    loadMusic(audioIndex);
    playMusic();
   
});
// automatic nextsong function
mainAudio.addEventListener("ended", () => {
    list_item[audioIndex].querySelector("button").textContent="Play";
    audioIndex = (audioIndex + 1) % mysong.length;
    loadMusic(audioIndex);
    playMusic();
});

//replay button function
replay.addEventListener("click", () => {
    list_item[audioIndex].querySelector("button").textContent="Play";
    loadMusic(audioIndex);
    playMusic();
})




//progressbar work 
mainAudio.addEventListener("timeupdate", (e) => {
    let CurrTime = e.target.currentTime;
    let Duration = e.target.duration;
    
    let Pro_time = (CurrTime / Duration) * 100;

    proBar.style.width = `${Pro_time}%`;

    let min_duration = Math.floor(Duration / 60);
    let sec_duration = Math.floor(Duration % 60);
    if (sec_duration < 10) {
        sec_duration = `0${sec_duration}`;
    }
    let tot_duration = `${min_duration}:${sec_duration}`;
    if (Duration) {

        musicDuration.textContent = `${tot_duration}`;
    }

    let min_currtime = Math.floor(CurrTime / 60);
    let sec_currtime = Math.floor(CurrTime % 60);
    if (sec_currtime < 10) {
        sec_currtime = `0${sec_currtime}`;
    }
    let tot_currtime = `${min_currtime}:${sec_currtime}`;

    musicCurrTime.textContent = `${tot_currtime}`;
})

// skip button functionality 

skip.addEventListener("click",()=>{
    mainAudio.currentTime+=10;
});
// progressbar click functionality 

proArea.addEventListener("click", (e) => {
    let pro_width = proArea.clientWidth;
    let clickedoffX = e.offsetX;
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedoffX / pro_width) * songDuration;
});


let loadPlaylist = () => {
    list.innerHTML = ``;
    for (let i = 0; i < mysong.length; i++) {

        list.innerHTML += `
                <div class="list-item">
                    <img src="img/${mysong[i].img}.jpg" alt="">
                    <div class="list-item-detail">
                        <div class="list-title">${mysong[i].title}</div>
                        <div class="list-artist">${mysong[i].artist}</div>
                    </div>
                    <button class="list-btn" onclick="changeMusic(${i})">Play</button>
                </div>
`;
    }
};

loadPlaylist();
const list_item = document.querySelectorAll(".list .list-item");


showlist.addEventListener("click", () => {
    if(list.style.display=="none"){
        list.style.display="block";
        showlist.textContent="close";
    }else{
        list.style.display="none";
        showlist.textContent="featured_play_list  ";
    }
})

//change music when click on playlist button 

let changeMusic=(newIndex)=>{
list_item[audioIndex].querySelector("button").textContent="Play";
audioIndex=newIndex;
loadMusic(audioIndex);
playMusic();
}

window.addEventListener("keydown",(e)=>{
    if(e.code=="Space"){
        if (musicStatus) {
            pauseMusic();
    
        } else {
            playMusic();
    
        }
    }
})