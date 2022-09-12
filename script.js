let countdownArray = [];
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
let liveUpdate = false;
function addCountdown() {
    let countdownTitle = document.getElementById("countdown-title").value;
    let countdownDate = document.getElementById("datetime").value;
    countdownDate = new Date(countdownDate).getTime();
    let countdown = {
        countdownTitle,
        countdownDate
    }
    countdownArray.push(countdown);
    addCountdownToPage(countdown,countdownArray.length+1);
    updateValues(countdownArray.length-1)

}
function deleteAllInterval () {
    const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

// Clear any timeout/interval up to that id
    for (let i = 1; i < interval_id; i++) {
    window.clearInterval(i);
    }
}
function addCountdownToPage(countdown,count) {
        if(countdown.countdownDate > 0) {
            addComponentToDOM(countdown,count);
            localStorage.setItem("details", JSON.stringify(countdownArray));

        } else {
            alert('Select appropriate date and time')
        }
}

function addCountdownToPageOnLoad() {
    let detailsStored = JSON.parse(localStorage.getItem('details'));
    if(detailsStored !== null && detailsStored.length>0) {
        countdownArray = detailsStored;
        countdownArray.forEach((item,index) => {
            addComponentToDOM(item,index+2);
        })   
        updateValues(0);
    }
}

function addComponentToDOM(item,count) {
    let countdownDate = item.countdownDate-  new Date().getTime();
    let countdownDivClass = `countdown-div-${count}`;
    // let countdownTitleClass = `title-countdown-component-${count}`

    let countdownCounterClass = `counter-countdown-component-${count}`
    let days = Math.floor(countdownDate / day);
    let hours = Math.floor((countdownDate % day) / hour);
    let minutes = Math.floor((countdownDate % hour) / minute);
    let seconds = Math.floor((countdownDate % minute) / second);
    var div = document.createElement("div");
    div.setAttribute("id",countdownDivClass)
    document.getElementById('countdown-grid').appendChild(div);
    var titleDiv = document.createElement("div");
    titleDiv.classList.add('title-countdown-component');
    var countdownDiv = document.createElement("div");
    countdownDiv.classList.add(countdownCounterClass);
    titleDiv.innerHTML = `${item.countdownTitle}<br/>`;
    if(countdownDate <= 0) {
        countdownDiv.innerHTML = "Completed";
    } else {
    countdownDiv.innerHTML = `Days : ${days}<br/>
        Hours : ${hours}<br/>
        Minutes : ${minutes}<br/>
        Seconds : ${seconds}<br/>`;
    }
    document.getElementById(countdownDivClass).appendChild(titleDiv);
    document.getElementById(countdownDivClass).appendChild(countdownDiv);

    var button = document.createElement("button")
    button.innerHTML = 'Remove Counter'
    button.classList.add('Remove-Counter');
    button.addEventListener("click", function (){deleteCounter(count)});
    document.getElementById(countdownDivClass).appendChild(button);
}
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function deleteCounter(counter) {
    countdownArray.splice(counter-2,1)
    this.localStorage.setItem("details", JSON.stringify(countdownArray));
    const container = document.querySelector('#countdown-grid');
    removeAllChildNodes(container);
    deleteAllInterval();
    addCountdownToPageOnLoad();
}
function updateValues (value) {
    // countdownArray.forEach((item,index) => {
    //     updateCounter(item,index);
    // }) 
    for (let i= value;i<countdownArray.length;i++) {
        updateCounter(countdownArray[i],i);
    }
}
function updateCounter (item,index) {
    liveUpdate = true;
    let countdownupate  = item.countdownDate-  new Date().getTime();
    setInterval(() => {
        // let now = new Date().getTime();

        countdownupate = countdownupate - 1000;
        let countdownCounterClass = `counter-countdown-component-${index+2}`
        if(countdownupate <= 0) {
            document.getElementsByClassName(countdownCounterClass)[0].innerHTML = `Completed`
        } else {
            let days = Math.floor(countdownupate / day);
            let hours = Math.floor((countdownupate % day) / hour);
            let minutes = Math.floor((countdownupate % hour) / minute);
            let seconds = Math.floor((countdownupate % minute) / second);
            document.getElementsByClassName(countdownCounterClass)[0].innerHTML = `Days : ${days}<br/>
            Hours : ${hours}<br/>
            Minutes : ${minutes}<br/>
            Seconds : ${seconds}<br/>`;
        }
    }, 1000);
}

window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    // this.localStorage.setItem("details", JSON.stringify(countdownArray));
});

addCountdownToPageOnLoad();