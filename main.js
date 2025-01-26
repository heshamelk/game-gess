// set main varebales and static elements
let gameName = 'gess word';
document.querySelector('h1').innerHTML = gameName;
document.title = gameName;
document.querySelector('footer').innerHTML = `<span>${gameName}</span> &copy created by front end`;
let inputsPlace  = document.querySelector('.inputs');
let chickButton = document.querySelector('.control .chick');
let hintsButton = document.querySelector('.control .hints');
let message = document.querySelector('.message');

let words = ['hesham', 'update', 'school', 'delete', 'elzero'];
let randomWord = words[Math.floor(Math.random() * words.length)];
let randomLetters = Array.from(randomWord);
console.log(randomWord);


let trys = 6;
let letters = 6;
let currnetTry = 1;
let hints = 2;

let userNa = prompt('your name');
document.querySelector('.name span').innerHTML = userNa;
let targ = document.querySelector('.catog .targ');
targ.innerHTML = currnetTry;
document.querySelector('.catog span.all').innerHTML = trys;

let hintNum = document.querySelector('.hints span');
hintNum.innerHTML = hints;

function showMessage() {
    setTimeout(() => {
        message.innerHTML = '';
        message.classList.remove('win');
        message.classList.remove('lose');

    }, 2000);
}
hintsButton.onclick = () => {
    if(hintNum.innerHTML > 0) {
        hintNum.innerHTML--;
        message.innerHTML = `you have a <span>${hintNum.innerHTML}<span> hint`;
        showMessage();
        // get random input
        let allActiveInputs = Array.from(document.querySelectorAll(`.try-${currnetTry} input`));
        let emptyInputsActive = allActiveInputs.filter((input) => input.value == '');
        let position = emptyInputsActive[Math.floor(Math.random() * emptyInputsActive.length)];
        let positionIndex = allActiveInputs.indexOf(position);
        // get random letter
        let randomLet = randomLetters[positionIndex];
        position.value = randomLet;
    } else {
        hintsButton.classList.add('disabled');
    }
}


chickButton.onclick = () => {
    let status = false;
    let allActiveInputs = Array.from(document.querySelectorAll(`.try-${currnetTry} input`));
    for(let i = 0; i < allActiveInputs.length; i++) {
        if(allActiveInputs[i].value == randomLetters[i]) {
            allActiveInputs[i].classList.add('yes-in-place');
            status = true; 
        } else if(randomLetters.includes(allActiveInputs[i].value)) {
            allActiveInputs[i].classList.add('not-in-place');
            status = false; 
        } else {
            allActiveInputs[i].classList.add('no');
            status = false;
        }
    }
        if(status) {
            chickButton.classList.add('disabled');
            message.classList.add('win')
            message.innerHTML = `you win after <span>${currnetTry}</span> trys good for you`;
            showMessage();
        } else {
            if(currnetTry < trys) {
                message.classList.add('lose');
                message.innerHTML = `you have an ather try, shoud be use it to win`;
                showMessage();
                document.querySelector(`.try-${currnetTry}`).classList.add('disabled');
                currnetTry++;
                targ.innerHTML++;
                document.querySelector(`.try-${currnetTry}`).classList.remove('disabled');
                let nextEL =  document.querySelectorAll(`.try-${currnetTry} input`);
                nextEL.forEach(ele => {
                    ele.disabled = false;
                });
                nextEL[0].focus();
                handilEvents();
            } else {
                chickButton.classList.add('disabled');
                message.innerHTML = `you are lose finally after <span>${currnetTry}</span> trys, ooh! we have big loser here`;
                showMessage();
            }
        }
   

}

function handilEvents() {
    let allActiveInputs = Array.from(document.querySelectorAll(`.try-${currnetTry} input`));
    allActiveInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let currnetInput = allActiveInputs.indexOf(e.target);
            let nextInput = currnetInput + 1;
            if(nextInput) {
                allActiveInputs[nextInput].focus();
            }
        });
        input.addEventListener('keydown', (e) => {
            if(e.key == "ArrowRight") {
                let currnetInput = allActiveInputs.indexOf(e.target);
                let nextInput = currnetInput + 1;
                if(nextInput <= allActiveInputs.length) {
                    allActiveInputs[nextInput].focus();
                } 
            }
            if(e.key === "ArrowLeft") {
                let currnetInput = allActiveInputs.indexOf(e.target);
                let prevInput = currnetInput - 1;
                if(prevInput >= 0) {
                        allActiveInputs[prevInput].focus();
                }
            }
            if(e.key === "Backspace") {
                let currnetInput = allActiveInputs.indexOf(e.target);
                let prevInput = currnetInput - 1;
                if(prevInput >= 0) {
                    allActiveInputs[currnetInput].focus();
                    allActiveInputs[currnetInput].value = "";
                    allActiveInputs[prevInput].focus();
                    allActiveInputs[prevInput].value = "";
                }
            }
        });
    });
}

function generateInputs() {
    //generate input divs
    for(let i = 1; i <= trys; i++) {
        let div = document.createElement('div');
        div.classList.add(`try-${i}`);
        let span = document.createElement('span');
        span.appendChild(document.createTextNode(`try-${i}`));
        div.appendChild(span);
        if(i !== currnetTry) {
            div.classList.add('disabled');
        }
        //generate inputs elements
        for(let j = 1; j <= letters; j++) {
            let input = document.createElement('input');
            input.id = `gess-${i}-letter-${j}`;
            input.maxLength = 1;
            div.appendChild(input);
        }
        inputsPlace.appendChild(div);
        inputsPlace.children[0].children[1].focus();
    }
    let allInputsInDisabledDivs = document.querySelectorAll('.inputs > .disabled input');
    allInputsInDisabledDivs.forEach(input => {
        input.disabled = true;
    });

    handilEvents(); 
}






document.onload = generateInputs();
