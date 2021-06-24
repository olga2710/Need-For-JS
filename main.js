const score = document.querySelector('.score');
const gameArea = document.querySelector('.gameArea');
const playButton = document.querySelector('.button-start');
const x1 = document.querySelector('.easy');
const x5 = document.querySelector('.media');
const x7 = document.querySelector('.hard');
const buttons = document.querySelector('.buttons');
const start = document.querySelector('.start');
const car = document.createElement('div');
const game = document.querySelector('.game');
const restart = document.querySelector('.restart');
const music = document.querySelector('.music');
const openMusic = document.querySelector('.open-music');
const closeMusic = document.querySelector('.close-music');
const btnMusic = document.querySelector('.button-music');
const mainPage = document.querySelector('.home');
const playerRecords = document.querySelector('.records');
const recordSpan = document.querySelector('.record-span');
let record =0;
car.classList.add('car');

restart.addEventListener('click', startGame);
playButton.addEventListener('click', normal);
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight:false,
    ArrowLeft:false,
};

var setting = {
    start: false,
    score: 0,
    speed:3,
    traffic:3,
};
function togglePlay() {
    return music.paused ? music.play() : music.pause();
};    

btnMusic.addEventListener('click', () =>{
    openMusic.classList.toggle('hide');
    closeMusic.classList.toggle('hide');
    togglePlay();
});
x1.addEventListener('click', easy);
x5.addEventListener('click', media);
x7.addEventListener('click', hard);
mainPage.addEventListener('click', goMainPage);s

function getQuantityElements(heightElement){
    return document.documentElement.clientHeight/ heightElement +1;

}
function easy (){
    setting.speed = 2;
    setting.traffic = 2;
    startGame();
}
function normal(){
    setting.traffic = 3;
    setting.speed = 3;
    startGame();
}
function media(){
    setting.speed = 4;
    setting.traffic = 6;
    console.log(setting);
    startGame();
}

function hard (){
    setting.speed = 5;
    setting.traffic = 8;
    startGame();
}
function startGame (){
    start.classList.add('hide');
    gameArea.classList.remove('hide');
    game.classList.remove('auto');
    game.classList.add('tree');
    score.classList.remove('hide');
    restart.classList.add('hide');
    buttons.classList.add('hide');
    playerRecords.classList.remove('hide');
    mainPage.classList.add('hide');
    btnMusic.style.boxShadow = '10px 10px 20px  rgba(230, 150, 7, 0.6)';
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';

    

    for (let i=0; i< getQuantityElements(50); i++){
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i*100) + 'px';
        line.y = i *100;
        gameArea.appendChild(line);
    }

    for (let i=0; i < getQuantityElements(100* setting.traffic);i++){
      const enemy = document.createElement('div');
      enemy.classList.add('enemy');
      enemy.y = -100 * setting.traffic * (i+1);
      enemy.style.left =Math.floor(Math.random()* (gameArea.offsetWidth - 50)) + 'px';
      enemy.style.top = enemy.y + 'px';
      enemy.style.background=`transparent url('./image/enemy` +(Math.floor(Math.random() * (6 - 1 + 1)) + 1) +`.png') center /cover no-repeat`;
      gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
};

function playGame(){
    moveRoad();
    moveEnemy();
    if (setting.start){
        setting.score+=setting.speed;
        score.innerHTML = 'SCORE<br>'+setting.score;
        if (keys.ArrowLeft && setting.x >0){
            setting.x -= setting.speed;
            console.log('r');
        }
        if (keys.ArrowRight && setting.x<(gameArea.offsetWidth - car.offsetWidth)){
            setting.x+= setting.speed;
            console.log('l');
        }
        if (keys.ArrowDown && setting.y<(gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed;
            console.log('t');

        }
        if (keys.ArrowUp && setting.y>0){
            setting.y -=setting.speed;
            console.log('b');

        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';
        requestAnimationFrame(playGame);
    }
 
};

function startRun (event){
    event.preventDefault();
    keys[event.key] = true;
};

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}

function moveRoad(){
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(item){
        item.y += setting.speed;
        item.style.top = item.y + 'px';

        if (item.y>= document.documentElement.clientHeight){
            item.y=-100;
        }

    })
}
function moveEnemy(){
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if ((carRect.top<= enemyRect.bottom)
        &&(carRect.right>=enemyRect.left) 
        &&(carRect.left<=enemyRect.right)
        &&(carRect.bottom>=enemyRect.top)){
            if(setting.score> record){
                record = setting.score;
                alert('Поздравлем, Вы побили рекорд');
            };
            recordSpan.textContent = record;
            setting.start = false;
            console.warn('ДТП');
            mainPage.classList.remove('hide');
            restart.classList.remove('hide');
        };
        item.y += setting.speed/2;
        item.style.top = item.y +'px';
        if (item.y>= document.documentElement.clientHeight){
            item.y = -100 * setting.traffic;
            item.style.left = Math.floor(Math.random()* (gameArea.offsetWidth - 50)) + 'px';
        }

    });

   
}









 function goMainPage(){
    start.classList.remove('hide');
    mainPage.classList.add('hide');
    gameArea.classList.add('hide');
    game.classList.add('auto');
    game.classList.remove('tree');
    score.classList.add('hide');
    restart.classList.add('hide');
    buttons.classList.remove('hide');
    playerRecords.classList.add('hide');
    btnMusic.style.boxShadow = '10px 10px 20px  rgba(6, 133, 252, 0.6)';
 }