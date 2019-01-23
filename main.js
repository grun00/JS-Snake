const snakeBoard = (function(){
    const CANVAS_BORDER_COLOUR = 'black';
    const CANVAS_BACKGROUND_COLOUR = 'white';

    let gameCanvas = document.getElementById('gameCanvas');

    let ctx = gameCanvas.getContext('2d');
    
    function clearBoard(){
        ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
        ctx.strokestyle = CANVAS_BORDER_COLOUR;
        ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
        ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
    }
    
    clearBoard();
    let dx = 0; 

    let dy = -10;

    let snake = [
        {x: 150, y:150},
        {x: 140, y:150},
        {x: 130, y:150},
        {x: 120, y:150},
        {x: 110, y:150}
    ];

    function drawSnakeParts(snakePart){
        ctx.fillStyle ='lightgreen';
        ctx.strokestyle = 'darkgreen';
        
        ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
        ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
    }

    function drawSnakeFull(){
        snake.forEach(drawSnakeParts);
    };

    function snakeMovement(){
        let head = {x: snake[0].x + dx, y: snake[0].y + dy};
        snake.unshift(head);

        snake.pop();
        clearBoard();
        drawSnakeFull();
    }

    function changeDirection(event){
        const LEFT_KEY = 72;
        const RIGHT_KEY = 76;
        const UP_KEY = 75;
        const DOWN_KEY = 74;

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

    function main(){
        setTimeout(function onTick(){
            snakeMovement();
            main();
            document.addEventListener('keydown', changeDirection);
        }, 1000);
    }
       
    return{
        drawSnakeFull,    
        snakeMovement,  
        snake,
        main, 
    }
}())


