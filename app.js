const container=document.querySelector(".container");
const image=document.querySelector("#music-image");
const audio=document.querySelector("#music-audio");
const title=document.querySelector("#music-details .title");
const singer=document.querySelector("#music-details .singer");
const prev=document.querySelector("#controls #prev");
const play=document.querySelector("#controls #play");
const next=document.querySelector("#controls #next");
const currentTime=document.querySelector("#current-time");
const duration=document.querySelector("#duration");
const progressBar=document.querySelector("#progress-bar");
const volume=document.querySelector("#volume");
const volumeBar=document.querySelector("#volume-bar");
const musics=document.querySelector("#music-list ul");

const player=new MusicPlayer(musicList);

let volumeState="sesli";

window.addEventListener("load",()=>{
    let music=player.getMusic();
    displayMusic(music);
    fillMusics(player.musicList);
    isPlay();
});

function displayMusic(music){
    image.src="./img/"+music.img;
    audio.src="./mp3/"+music.file;
    title.innerText=music.getName();
    singer.innerText=music.singer;
}

play.addEventListener("click",()=>{
    const isMusicPlay= container.classList.contains("playing");
    isMusicPlay? pauseMusic():playMusic();
});

function pauseMusic(){
    container.classList.remove("playing");
    play.querySelector("i").classList="fa-solid fa-play";
    audio.pause();
}

function playMusic(){
    container.classList.add("playing");
    play.querySelector("i").classList="fa-solid fa-pause";
    audio.play();
}

next.addEventListener("click",()=> {
    nextMusic();    
});

function nextMusic(){
    player.next();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlay();
}

prev.addEventListener("click",()=> {
    prevMusic();    
});

function prevMusic(){
    player.prev();
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlay();
}

audio.addEventListener("loadedmetadata",()=>{
    duration.textContent=calculateTime(audio.duration);
    progressBar.max=Math.floor(audio.duration);
});

const calculateTime=(seconds)=>{
    const minute=Math.floor(seconds/60);
    const second=Math.floor(seconds%60);
    const resultSecond=second<10?`0${second}`:`${second}`;
    return `${minute}:${resultSecond}`;
}

audio.addEventListener("timeupdate",()=>{
    progressBar.value=Math.floor(audio.currentTime);
    currentTime.textContent=calculateTime(progressBar.value);
});

progressBar.addEventListener("input",()=>{
    currentTime.textContent=calculateTime(progressBar.value);
    audio.currentTime=progressBar.value;
})

volume.addEventListener("click",()=>{
    if(volumeState==="sesli"){
        audio.muted=true;
        volumeState="sessiz";
        volume.classList="fa-solid fa-volume-xmark";
        volumeBar.value=0;
    }else{
        audio.muted=false;
        volumeState="sesli";     
        volume.classList="fa-solid fa-volume-high";
        volumeBar.value=100;
        audio.volume=1;
    }
})

volumeBar.addEventListener("input",(e)=>{
    const volumeBarValue=e.target.value;
    audio.volume=(volumeBarValue)/100;
    if(volumeBarValue==0){
        audio.muted=true;
        volumeState="sessiz";
        volume.classList="fa-solid fa-volume-xmark";
    }else{
        audio.muted=false;
        volumeState="sesli";     
        volume.classList="fa-solid fa-volume-high";
    }
})

const fillMusics=(allMusics)=>{
    for(let i=0;i<allMusics.length;i++){
        let liTag=`<li li-index="${i}" onclick="selectedMusic(this)" class="list-group-item d-flex justify-content-between align-item-center">
                                <span>${allMusics[i].getName()}</span>
                                <span id="music-${i}" class="badge bg-primary"></span>
                                <audio class="music-${i}" src="./mp3/${allMusics[i].file}"></audio>
                            </li>  `;

        musics.insertAdjacentHTML('beforeend',liTag);
        let liAudioDuration=musics.querySelector(`#music-${i}`);
        let liAudioTag=musics.querySelector(`.music-${i}`);

        liAudioTag.addEventListener("loadeddata",()=>{
            liAudioDuration.textContent=calculateTime(liAudioTag.duration);
        });
     }
       
   
}

const selectedMusic=(m)=>{
    player.index=m.getAttribute("li-index");
    let music=player.getMusic();
    displayMusic(music);
    playMusic();
    isPlay();
}

const isPlay=()=>{
    for(let i of musics.querySelectorAll("li")){
        if(i.classList.contains("playing")){
            i.classList.remove("playing");
        }

        
        if(i.getAttribute("li-index")==player.index){
            i.classList.add("playing");
        }
    }
}

audio.addEventListener("ended",()=>{
    nextMusic();
})