score = 0;
cross = true;

audio = new Audio('tommus.mp3');
audiogo = new Audio('gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function (e) {
    console.log("Key code is: ", e.keyCode)
    if (e.keyCode == 38) {
        person = document.querySelector('.person');
        person.classList.add('animateperson');
        setTimeout(() => {
            person.classList.remove('animateperson')
        }, 700);
    }
    if (e.keyCode == 39) {
        person = document.querySelector('.person');
        dinoX = parseInt(window.getComputedStyle(person, null).getPropertyValue('left'));
        person.style.left = dinoX + 112 + "px";
    }
    if (e.keyCode == 37) {
        person = document.querySelector('.person');
        dinoX = parseInt(window.getComputedStyle(person, null).getPropertyValue('left'));
        person.style.left = (dinoX - 112) + "px";
    }
}

setInterval(() => {
    person = document.querySelector('.person');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(person, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(person, null).getPropertyValue('top'));

    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over - Press ENTER to Play Again"
        obstacle.classList.remove('obstacleAni');
        cross=false;
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        document.onclick = function(){
            location.reload();
        }
        document.onkeydown = function(e){
            if(e.keyCode==13){
                location.reload();
            }
        }
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation duration: ', newDur)
        }, 500);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}
// if (offsetX < 73 && offsetY < 52) {
//     document.onclick = function(){
//         location.reload();
//     }
//     document.onkeydown = function(e){
//         if(e.keyCode==13){
//             location.reload();
//         }
//     }
// }