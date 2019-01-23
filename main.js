const snakeBoard = (function(){
    
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = 'white';

    let gameCanvas = document.getElementById('gameCanvas');

    let ctx = gameCanvas.getContext('2d');

    let dx = 10;
    let dy = 0;
    
    let speed = 520;
    
    document.addEventListener('keydown', changeDirection);

    let snake = [
        {x: 150, y:150},
        {x: 140, y:150},
        {x: 130, y:150},
        {x: 120, y:150},
        {x: 110, y:150}
    ];

    let score = 0;
    
    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
    }
    
    function clearBoard(){
        ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
        ctx.strokestyle = CANVAS_BORDER_COLOUR;
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }
    
    function drawSnakeParts(snakePart){
        ctx.fillStyle = random_rgba();
        ctx.strokestyle = random_rgba;
        
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function drawSnakeFull(){
        snake.forEach(drawSnakeParts);
    };

    function snakeMovement(){
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        const ateFood = (snake[0].x === foodXPosition && snake[0].y === foodYPosition);
        if(ateFood && speed > 10){
            addScore();
            changeSpeed();
            createFood();
        }else if(ateFood){
            addScore();
            createFood()
        }else{
            snake.pop();
        }
    }
        

    function changeDirection(event){
        const LEFT_KEY = 72;
        const RIGHT_KEY = 76;
        const UP_KEY = 75;
        const DOWN_KEY = 74;
        
        if(directionFlag) return;

        directionFlag = true;

        const keyPressed = event.keyCode;
        const goingUp = dy === -10;
        const goingDown = dy === 10;
        const goingRight = dx === 10;
        const goingLeft = dx === -10;

        if(keyPressed === LEFT_KEY && !goingRight){
            dx = -10;
            dy = 0;
        };
        if(keyPressed === UP_KEY && !goingDown){
            dx = 0;
            dy = -10;
        };
        if(keyPressed === RIGHT_KEY && !goingLeft){
            dx = 10;
            dy = 0;
        };
        if(keyPressed === DOWN_KEY && !goingUp){
            dx = 0;
            dy = 10;
        };
    }

    function randomPosition(min, max){
        return Math.round((Math.random() * (max - min) + min)/10)* 10;
    }

    function createFood(){
        foodXPosition = randomPosition(0, gameCanvas.width - 10);
        foodYPosition = randomPosition(0, gameCanvas.height - 10);

        snake.forEach(function IsFoodOnSnake(part){
            const foodIsOnSnake = (part.x == foodXPosition && part.y == foodYPosition);
            if(foodIsOnSnake){
                createFood();
            }
        });
    }

    function drawFood(){
        ctx.fillStyle = random_rgba();
        ctx.strokestyle = random_rgba();
        ctx.fillRect(foodXPosition, foodYPosition, 10, 10);
        ctx.strokeRect(foodXPosition, foodYPosition, 10, 10);
    }

    function addScore(){
        score += 100;
        document.getElementById('score').textContent = score;
    }

    function changeSpeed(){
        speed -= 20;
        document.getElementById('speed').textContent = (10/speed).toFixed(3);
    }

    function main(){
        let state = endGame()
        if(endGame()){
            gameOver();
            return
        }else{
            setTimeout(function onTick(){
                directionFlag = false;
                snakeMovement();
                clearBoard();
                drawFood()
                drawSnakeFull();
                main();
            }, speed);
    }
    }
    function startGame(){
        state = false;
        changeSpeed();
        snake = [
        {x: 150, y:150},
        {x: 140, y:150},
        {x: 130, y:150},
        {x: 120, y:150},
        {x: 110, y:150}
        ];
        main();
        createFood();
    } 
          
    function endGame(){
        for(let i = 4; i < snake.length; i++){
            const colision = (snake[i].x === snake[0].x && snake[i].y === snake[0].y);
            if(colision == true) return true;
        }
        const hitLeft = snake[0].x < 0;
        const hitRight = snake[0].x > gameCanvas.width - 10;
        const hitUp = snake[0].y < 0;
        const hitDown = snake[0].y > gameCanvas.height - 10;

        return hitLeft || hitRight || hitUp || hitDown;

    }

    function gameOver(){
        alert(`Game Over! Your score: ${score}`);
    }

    return{
        startGame,
    }
}())

const btn = document.getElementById('startBtn');
btn.addEventListener('click', snakeBoard.startGame);