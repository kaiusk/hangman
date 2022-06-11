const words = ['TEERULL', 'KAALIKAS', 'TRAKTOR', 'PÄÄSUKE', 'ROHELINE', 'MAASTIK', 'PASTAKS', 'PESUKARU'];
let word = '';
let result = [];
let lives = 6;

const wordElement = document.querySelector('#word');
const livesElement = document.querySelector('#lives');
const alert = document.querySelector('#alert');
const d20Btn = document.querySelector('#d20');
const dPrtBtn = document.querySelector('#dprsnt');
const guessBtn = document.querySelector('#guess');
const charInp = document.querySelector('#char');


document.querySelector('#d20').addEventListener('click', () => {
    const rnd = Math.floor(Math.random() * 20) + 1;
    if (rnd === 1) {
        gameOver()
    } else {
        if (rnd === 20) {
            lives++;
            livesElement.innerHTML = lives.toString();
        }
        showAlert('Veeretasid D20, tulemuseks on ' + rnd);
        d20Btn.disabled = true;
        dPrtBtn.disabled = false;
    }
});

document.querySelector('#dprsnt').addEventListener('click', () => {
    let rnd = (Math.floor(Math.random() * 9) + 1) * 10;
    if (rnd === 0) {
        rnd = 100;
    }
    const prt = (word.length * (rnd / 2)) / 100;
    const letsOpen = Math.floor(prt);
    for (let i = 0; i < letsOpen; i++) {
        const rndChar = Math.floor(Math.random() * word.length);
        result[rndChar] = word.split('')[rndChar];
    }
    showWord();

    showAlert('Veeretasid D%, mille tulemuseks on ' + rnd.toString() +
        '.<br>Valitud sõnas on ' + word.length.toString() + ' tähte, seega ' + (rnd / 2).toString() + '% ' + word.length + '-st on ' + prt.toString() +
        ', ehk kasutajale avatakse ' + letsOpen.toString() + ' tähte.')

    dPrtBtn.disabled = true;
    charInp.disabled = false;
    guessBtn.disabled = false;
});

guessBtn.addEventListener('click', () => {
    let char = charInp.value;
    if (char) {
        char = char.toUpperCase();
        if (word.includes(char)) {
            let success = false;
            word.split('').forEach((c, index) => {
                if (c === char) {
                    if (result[index] !== c) {
                        result[index] = c;
                        success = true;
                    }
                }
            });
            if (!success) {
                showAlert(char + ' tähte rohkem ei esine :(');
                lives--;
                livesElement.innerHTML = lives.toString();
                if (lives === 0) {
                    gameOver()
                }
            }
            showWord();
            if (result.filter(c => c === '_').length === 0) {
                showAlert('Sinu võit');
                charInp.disabled = true;
                guessBtn.disabled = true;
            }
        } else {
            showAlert(char + ' tähte ei esine :(');
            lives--;
            livesElement.innerHTML = lives.toString();
            if (lives === 0) {
                gameOver()
            }
        }
    }
    charInp.value = '';
});

window.onload = () => {
    const rnd = Math.floor(Math.random() * words.length);
    word = words[rnd];
    result = new Array(word.length).fill('_');
    showWord();
    livesElement.innerHTML = lives.toString();
    alert.style.display = 'none';
}

function showAlert(msg) {
    alert.innerHTML = msg;
    alert.style.display = 'block';
    setTimeout(() => {
        alert.style.display = 'none';
    }, 5000)
}

function showWord() {
    wordElement.innerHTML = result.join(' ');
}

function gameOver() {
    wordElement.innerHTML = word;
    showAlert('Mäng läbi :(');
    charInp.disabled = true;
    guessBtn.disabled = true;
    d20Btn.disabled = true;
}

