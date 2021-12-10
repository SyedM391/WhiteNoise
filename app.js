const app = function() {
    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    //sounds
    const sounds = document.querySelectorAll('.sound-picker button');
    //time display
    const timeDisplay = document.querySelector('.time-display');
    // Time Select 
    const timeSelect = document.querySelectorAll('.time-select button');
 
    // get the length of the outline
    const outLineLength = outline.getTotalLength();
    //duration
    let fakeDuration = 600; 

    outline.style.strokeDasharray = outLineLength;
    outline.style.strokeDashoffset = outLineLength;

    //Pick different Sounds
    sounds.forEach(function(sound) {
        sound.addEventListener('click', function() {
            song.src = this.getAttribute('data-sound');
            video.src = this.getAttribute('data-video');
            checkPlaying(song);
        })
    })

    //play sound 
    play.addEventListener('click', function() {
        checkPlaying(song);
    });

    //Select Sound
     timeSelect.forEach(function(option) {
         option.addEventListener('click', function() {
             fakeDuration = this.getAttribute('data-time');
             timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
         })
     })

    //create a function specific to stop and play the sounds
     const checkPlaying = function(song) {
         if(song.paused) {
             song.play();
             video.play();
             play.src = "./svg/pause.svg";
         }else {
             song.pause();
             video.pause();
             play.src = "./svg/play.svg";
         }
     }

     // animate the circle
     song.ontimeupdate = function() {
         let currentTime = song.currentTime;
         let elapsed = fakeDuration - currentTime;
         let seconds = Math.floor(elapsed % 60);
         let minutes = Math.floor(elapsed / 60); 
         
         //Animate the circle

         let progress = outLineLength - (currentTime / fakeDuration) * outLineLength;
         outline.style.strokeDashoffset = progress;

         //Animate the text 
         timeDisplay.textContent = `${minutes}:${seconds}`;


         // Reset time 
         if(currentTime >= fakeDuration){
             song.pause();
             song.currentTime = 0;
             play.src = './svg/play.svg'
         }
     }
 }
app();