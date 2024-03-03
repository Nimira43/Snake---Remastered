document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')

    const width = 10
    let currentIndex = 0 // so first div in the grid
    let appleIndex = 0 // so first div in the grid
    let currentSnake = [2,1,0] // so the div in the grid being 2 for the head and 0 being the tail with the 1's being the body 

    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0

    // start and restart game

    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple()
        direction = 1
        scoreDisplay.innerText = score
        intervalTime = 1000
        currentSnake = [2,1,0]
        currentIndex = 0
        currentSnake.forEach(index => squares[index].classList.add('snake'))
        interval = setInterval(moveOutcomes, intervalTime)
    }

    // function that deals with all move outcomes of the snake

    function moveOutcomes() {
        
        // deals with snake hitting the border or itself

        if (
            (currentSnake[0] + width >= (width * width) && direction === width) || // if snake hits bottom
            (currentSnake[0] % width === width -1 && direction === 1) || // if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1) || // if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width) || // if snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake') // if snake hits itself
        ) {
            return clearInterval(interval) // this clear interval if any of the above happen
        }
    
        const tail = currentSnake.pop()
        squares[tail].classList.remove('snake')
        currentSnake.unshift(currentSnake[0] + direction)

        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple')
            squares[tail].classList.add('snake')
            currentSnake.push(tail)
            randomApple()
            score++
            scoreDisplay.textContent = score
            clearInterval(interval)
            intervalTime = intervalTime * speed
            interval = setInterval(moveOutcomes, intervalTime)
        }   
        squares[currentSnake[0]].classList.add('snake')
    }
        
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length)
        } while (squares[appleIndex].classList.contains('snake'))
        squares[appleIndex].classList.add('apple')
    }
    
    // assign functions to keycodes

    function control(e) {
        squares[currentIndex].classList.remove('snake') // removing class of snake from all squares
        if(e.keyCode === 39) {
            direction = 1 // right arrow pressed, snake moves one div right
        } else if (e.keyCode === 38) {
            direction = -width // up arrow pressed, snake goes back ten divs, appears to move up
        } else if (e.keyCode === 37) {
            direction = -1 // left arrow pressed, snake moves on div left
        } else if (e.keyCode === 40) {
            direction = +width // down arrow pressed, snake appears to go down
        }
    }
    document.addEventListener('keyup', control)   
    startBtn.addEventListener('click', startGame) 
})