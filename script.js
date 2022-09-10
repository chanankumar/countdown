let countdownArray = [];
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

function addCountdown() {
    let countdownTitle = document.getElementById("countdown-title").value;
    let countdownDate = document.getElementById("datetime").value;
    countdownDate = new Date(countdownDate).getTime() - new Date().getTime();
    let countdown = {
        countdownTitle,
        countdownDate
    }
    countdownArray.push(countdown);
    addCountdownToPage(countdown);
}

function addCountdownToPage(countdown) {

        let days = Math.floor(countdown.countdownDate / day);
        let hours = Math.floor((countdown.countdownDate % day) / hour);
        let minutes = Math.floor((countdown.countdownDate % hour) / minute);
        let seconds = Math.floor((countdown.countdownDate % minute) / second);
    
        var div = document.createElement("div");
        div.classList.add('countdown');
        div.innerHTML = `${countdown.countdownTitle}<br/>
            Days : ${days}<br/>
            Hours : ${hours}<br/>
            Minutes : ${minutes}<br/>
            Seconds : ${seconds}<br/>`;
    document.getElementById('countdown-grid').appendChild(div);
}

function addCountdownToPageOnLoad() {

    countdownArray.forEach((item) => {
        let days = Math.floor(item.countdownDate / day);
        let hours = Math.floor((item.countdownDate % day) / hour);
        let minutes = Math.floor((item.countdownDate % hour) / minute);
        let seconds = Math.floor((item.countdownDate % minute) / second);
        
        var titleDiv = document.createElement("div");
        titleDiv.classList.add('title-countdown-component');
        var countdownDiv = document.createElement("div");
        countdownDiv.classList.add('title-countdown-component');
        titleDiv.innerHTML = `${item.countdownTitle}<br/>`
        countdownDiv.innerHTML = `Days : ${days}<br/>
            Hours : ${hours}<br/>
            Minutes : ${minutes}<br/>
            Seconds : ${seconds}<br/>`;
        document.getElementById('countdown-grid').appendChild(div);
    })    
}