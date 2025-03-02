console.log("welcome to spotify");

//initialize the variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgreesBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songlist') );
let songs =[
    {songName: "sun sahiba", filePath: "songs/1.mp3" , coverPath: "covers/1.jpg"},
    {songName: "Sanam Teri Kasam", filePath: "song/2.mp3" , coverPath: "covers/2.jpg"},
    {songName: "Hamari Adhuri kahani", filePath: "song/3.mp3" , coverPath: "covers/3.jpg"},
    {songName: "Mahakumbh Mei Dubki Laga", filePath: "song/4.mp3" , coverPath: "covers/4.jpg"},
    {songName: "Tera Nasha", filePath: "song/5.mp3" , coverPath: "covers/.jpg"},
    {songName: "Sukriya", filePath: "song/6.mp3" , coverPath: "covers/6.jpg"},
//     // {songName: "sun sahiba", filePath: "song/1.mp3" , coverPath: "covers/1.jpg"}
]
songItems.forEach((element ,i)=>{
    //console.log(element ,i );
    //element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innertext = songs[i].songName;
})

// audioElement.play();

//handle play.pauseclick
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity=0;
    }
})

// //Listen to events
audioElement.addEventListener('timeupdate' , ()=>{
  console.log('timeupdate');
  //update seekbar
  progress = parseInt((audioElement.currentTime/audioElement.duration )*100 );
  console.log(progress);
  myProgreesBar.value = progress;
})
myProgreesBar.addEventListener('change' , ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songlistPlays')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    

    })
}

Array.from(document.getElementsByClassName('songlistPlays')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
    console.log(e.target);
    makeAllPlays();
    songIndex=parseInt(e.target.id);
    e.target.classList.remove('fa-circle-play');
    e.target.classList.add('fa-circle-pause');
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    gif.style.opacity =1;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

    }) 
})

document.getElementById('next').addEventListener('click' , ()=>{
    if(songIndex>= songs.length-1){
        songIndex=0;
    }
    else{
    songIndex+=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

document.getElementById('previous').addEventListener('click' , ()=>{
    if(songIndex<=0){
        songIndex=songs.length-1;
        
    }
    else{
    songIndex-=1;
    }
    audioElement.src=`songs/${songIndex+1}.mp3`;
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})