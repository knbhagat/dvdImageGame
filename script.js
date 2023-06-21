document.addEventListener("DOMContentLoaded", () => {
    const dvdImage = document.getElementById("dvd");
    const container = document.getElementById("game-container");
    const startButton = document.getElementById("start-button");
    const stopButton = document.getElementById("stop-button");
    const counter = document.getElementById("game-counter");
    const cssLink = document.getElementById("color-sheet");

    let x = 300; // initial x position - set to 200 to be even
    let y = 200; // initial y position
    let dx = 10;  // x velocity
    let dy = 10;  // y velocity
    let animationId;
    let wallCount = 0;

    function updateImagePosition() {
        x += dx;
        y += dy;

        // Check if the ball hits the side
        if (x + dvdImage.offsetWidth >= container.offsetWidth + 25 || x <= 35) {
            dx = -dx; // reverse the x velocity
            incrementCount(++wallCount);
            if ((y + dvdImage.offsetHeight - 15 >= container.offsetHeight) || (y <= 35)) { //check if ball hits edge
                dy = -dy;
                hitCounter(wallCount);
                wallCount = 0;
                incrementCount(wallCount);
                changeColor();
            }
        }

        else if (y + dvdImage.offsetHeight - 15  >= container.offsetHeight  || y <= 35) {
            dy = -dy; // reverse the y velocity
            incrementCount(++wallCount);          
        }

        dvdImage.style.left = x + "px";
        dvdImage.style.top = y + "px";

        animationId = requestAnimationFrame(updateImagePosition);
    }

    function changeColor() {
        const colors = ["black", "blue" , "green" , "white"];
        pickedColor = colors[Math.floor(Math.random() * colors.length)];
        cssLink.href = "styles-" + pickedColor + ".css";
        console.log(pickedColor);
    }

    function incrementCount(wallCount) {
        counter.textContent = "Wall Count: " + wallCount;
    }

    function start() {
        animationId = requestAnimationFrame(updateImagePosition);
    }

    function stop() {
        cancelAnimationFrame(animationId);
    }

    // function hitCounter(count) {
    //     var hitCounter = document.getElementById("hit-counter");
    //     hitCounter.innerText = "Hits: " + count;
    //     console.log(count);
    // }

    startButton.addEventListener("click", start);
    stopButton.addEventListener("click", stop);
});
