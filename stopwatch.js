

console.log("setInterval functions and functionalities");

window.addEventListener("DOMContentLoaded", stopWatch)
window.addEventListener("DOMContentLoaded", clock)
//window.addEventListener("DOMContentLoaded", pomodoro)

function stopWatch(){
    let minutes = 0
    let seconds = 0
    let tens = 0

    const addMinute = document.querySelector("#stopwatch-minute");
    const addSecond = document.querySelector("#stopwatch-second")
    const addTens = document.querySelector("#stopwatch-tens")
    const startBtn = document.querySelector("#stopwatch-start")
    const resetBtn = document.querySelector("#stopwatch-reset")
    const stopBtn = document.querySelector("#stopwatch-stop")
    let interval

    startBtn.addEventListener("click", () => {
        interval = setInterval(counter, 10)
    })
    stopBtn.addEventListener("click", () => {
        clearInterval(interval)
    })
    resetBtn.addEventListener("click", () => {
        minutes = 0;
        seconds = 0;
        tens = 0;
        addMinute.innerHTML = "0"+ minutes;
        addSecond.innerHTML = "0" + seconds;
        addTens.innerHTML = "0" + tens;
    })

    function counter(){
        tens++;

        if (tens<9){
            addTens.innerHTML = `0${tens}`;
        }
        if(tens >9){
            addTens.innerHTML = tens;
        }
        if(tens>99){
            seconds++;
            addSecond.innerHTML = `0${seconds}`;
            tens = 0
            addTens.innerHTML= "0"+0
        }
        if(seconds >9){
            addSecond.innerHTML = seconds;
        }
        if(seconds>59){
            minutes++;
            addMinute.innerHTML = `0${minutes}`;
            seconds = 0
            addSecond.innerHTML = "0"+0
            tens = 0
            addTens.innerHTML = "0"+0
        }
    }
}

function clock(){
    function currentTime(){
        let date = new Date();
        let hour = date.getHours();
        if(hour<10){hour = "0"+ hour}
        let minutes = date.getMinutes();
        if(minutes < 10){minutes = "0"+minutes};
        let seconds = date.getSeconds();  
        if (seconds < 10){seconds = "0"+seconds};
        
        return {date, hour, minutes, seconds}
    }
    
    function renderClock(){
        const clockHour = document.querySelector("#clock-hour");
        const clockMinute = document.querySelector("#clock-minute");
        const clockSecond = document.querySelector("#clock-second");
        clockHour.innerHTML = currentTime().hour;
        clockMinute.innerHTML = currentTime().minutes;
        clockSecond.innerHTML = currentTime().seconds;
    
        //é setado o intervalo dentro da função de render, que se chama para renderizar novamente. Fora é chamada "recursivamente" a função de renderizar.
        setTimeout(renderClock, 1000);
    }
    
    renderClock();
    
}

//function pomodoro(){

    //functionalities buttons
    const pomodoroTime = document.querySelector("#pomodoro-time")
    const shortBreak = document.querySelector("#short-break");
    const longBreak = document.querySelector("#long-break")
    const pomodoroStartBtn = document.querySelector("#pomodoro-start");
    const pomodoroResetBtn = document.querySelector("#pomodoro-reset");
    const pomodoroStopBtn = document.querySelector("#pomodoro-stop");
    const settingsBtn = document.querySelector("#settings");
    const settingsModal = document.querySelector("#ambient");
    const volumeSlider = document.querySelector("#whitenoise-volume-slider");
   
    //numbers display
    const removeMinute = document.querySelector("#pomodoro-minute");
    const removeSecond = document.querySelector("#pomodoro-second");
    
    // "global" variables
    let pomodoroMinutes = 25;
    let pomodoroSeconds = 00;
    let interval;
    let pomodoroFlag = true;
    let shortFlag = false;
    let longFlag = false;
    let pomodoroFlagMinutes = 25;
    let shortFlagMinutes = 5;
    let longFlagMinutes = 10;
    let pomodoroTotal = 0
    let runningFlag = false

    //audio variables
    const beep = document.querySelector("#beep");
    const radioNoise = document.querySelector("#whitenoise-audio");
    const restaurantNoise = document.querySelector("#restaurant-audio");
    const rainNoise = document.querySelector("#rain-audio");
    const fireplaceNoise = document.querySelector("#fireplace-audio")
    // whitenoiseVolume precisa ser ajustável pelo usuário
    let whitenoiseVolume = 0.1;

    //main counter function
    function counter(){
        //fazendo o preload do alarme
        beep.load()

        //iniciando a contagem regressiva
        pomodoroSeconds--

        //DOM and variables
        removeMinute.innerHTML = pomodoroMinutes;
        removeSecond.innerHTML = pomodoroSeconds;
        if(pomodoroSeconds < 10){
            removeSecond.innerHTML = `0${pomodoroSeconds}`;
        }

        if(pomodoroSeconds < 0){
            pomodoroMinutes--
            removeMinute.innerHTML = pomodoroMinutes;
            pomodoroSeconds = 59
            removeSecond.innerHTML = pomodoroSeconds;
        }

        if(pomodoroMinutes < 10){
            removeMinute.innerHTML = `0${pomodoroMinutes}`
        }
        if(pomodoroMinutes === 0 && pomodoroSeconds === 0){
            clearInterval(interval);
            pomodoroTotal++
            //toca o alarme indicando que o tempo acabou
            beep.volume = 0.2;
            beep.play();
            //para o whitenoise
            whitenoise.pause()
            //flag muda
            runningFlag = false
        }
    }

    pomodoroStartBtn.addEventListener("click", () => {
        runningFlag = true;
        if (pomodoroMinutes === 0 && pomodoroSeconds === 0){
            pomodoroMinutes = pomodoroFlagMinutes;
            pomodoroSeconds = 0;
            removeMinute.innerHTML = pomodoroMinutes;
            removeSecond.innerHTML = `0${pomodoroSeconds}`;
            interval = setInterval(counter, 1000);
            playNoise();
        } else
        interval = setInterval(counter, 1000);
        playNoise();
    })
    pomodoroStopBtn.addEventListener("click", () => {
        runningFlag = false;
        if (!whitenoise){
            console.log("there was no whitenoise");
        }else whitenoise.pause()
        clearInterval(interval);
    })
    pomodoroResetBtn.addEventListener("click", () => {
        runningFlag = false;
        if(pomodoroFlag === true){
            pomodoroMinutes = pomodoroFlagMinutes;
            pomodoroSeconds = 0;
            removeMinute.innerHTML = pomodoroMinutes;
            removeSecond.innerHTML = `0${pomodoroSeconds}`;
        }
        if(shortFlag === true){
            pomodoroMinutes = shortFlagMinutes;
            pomodoroSeconds = 0;
            removeMinute.innerHTML = `0${pomodoroMinutes}`;
            removeSecond.innerHTML = `0${pomodoroSeconds}`;
        }
        if(longFlag === true){
            pomodoroMinutes = longFlagMinutes;
            pomodoroSeconds = 0;
            removeMinute.innerHTML = pomodoroMinutes;
            removeSecond.innerHTML = `0${pomodoroSeconds}`;
        }
    })

    pomodoroTime.addEventListener("click", pomodoroFun);
    shortBreak.addEventListener("click", shortBreakFun);
    longBreak.addEventListener("click", longBreakFun);

    function pomodoroFun(){
        clearInterval(interval)
        pomodoroFlag = true;
        shortFlag = false;
        longFlag = false;
        pomodoroMinutes = pomodoroFlagMinutes;
        pomodoroSeconds = 0;
        removeMinute.innerHTML = pomodoroMinutes;
        removeSecond.innerHTML = `0${pomodoroSeconds}`;
    }

    function shortBreakFun(){
        clearInterval(interval)
        pomodoroFlag = false;
        shortFlag = true;
        longFlag = false;
        pomodoroMinutes = shortFlagMinutes;
        pomodoroSeconds = 0;
        removeMinute.innerHTML = `0${pomodoroMinutes}`;
        removeSecond.innerHTML = `0${pomodoroSeconds}`;
    }

    function longBreakFun(){
        clearInterval(interval)
        pomodoroFlag = false;
        shortFlag = false;
        longFlag = true;
        pomodoroMinutes = longFlagMinutes;
        pomodoroSeconds = 0;
        removeMinute.innerHTML = pomodoroMinutes;
        removeSecond.innerHTML = `0${pomodoroSeconds}`;
    }

     //whitenoise buttons and audio selection
    let whitenoise
    const noiseTypeBtns = document.querySelectorAll(".noise-type-btn");
    noiseTypeBtns.forEach(button => {
        button.addEventListener("click", () => {
            switch (true){
                case (button.id === "white-noise"):{
                    whitenoise = radioNoise;
                    break
                }case (button.id === "restaurant"):{
                    whitenoise = restaurantNoise;
                    break;
                }case (button.id === "rain"):{
                    whitenoise = rainNoise;
                    break;
                }case (button.id === "fireplace"):{
                    whitenoise = fireplaceNoise;
                    break;
                }    
            }    
        })
    })

    //settings controls
    settingsBtn.addEventListener("click", () => {
        settingsModal.classList.toggle("modal")
    })

    //whitenoise volume slider
    volumeSlider.addEventListener("click", () => {
        console.log(volumeSlider.value);
        //controle de volume do whitenoise
        whitenoise.volume = (volumeSlider.value / 100);
    })

    function playNoise(){
        if(!whitenoise){
            return
        }
        //fazendo preload do whitenoise
        whitenoise.load();
        //tocando
        if(pomodoroFlag === true){
          whitenoise.play();
        } 
      }
//}


//==========================LEGACY CODE==========================
// const radioNoiseButton = document.querySelector("#white-noise");
    // const restaurantNoiseButton = document.querySelector("#restaurant");
    // const rainNoiseButton = document.querySelector("#rain");
    // const fireplaceNoiseButton = document.querySelector("#fireplace");

    // radioNoiseButton.addEventListener("click", () => {
    //     //radioNoise.setAttribute("loop", "loop");
    //     whitenoise = radioNoise;
    // })
    // restaurantNoiseButton.addEventListener("click", () => {
    //     //estaurantNoise.setAttribute("loop", "loop");
    //     whitenoise = restaurantNoise;
    // })
    // rainNoiseButton.addEventListener("click", () => {
    //     //rainNoise.setAttribute("loop", "loop");
    //     whitenoise = rainNoise;
    // })
    // fireplaceNoiseButton.addEventListener("click", () => {
    //     //fireplaceNoise.setAttribute("loop", "loop");
    //     whitenoise = fireplaceNoise;
    // })


