/* 1-3 2048 游戏架构 */
var board = new Array();
var score = 0;
    /* 4-3 */
var hasConflited = new Array();
var hasGameOver = false;

/* 6-2 获取触控位置的控制信息 */
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

/* 1-4 构建页面元素*/
$(document).ready(
    function () {
        prepareForMobile();
        newgame();
    }
);
/* 5-2 移动端支持 */
function prepareForMobile() {
    if(documentWidth > 500) {
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }
    $('#grid-container').css('width', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('height', gridContainerWidth - 2 * cellSpace);
    $('#grid-container').css('padding', cellSpace);
    $('#grid-container').css('border-radius', 0.02 * gridContainerWidth);

    $('.grid-cell').css('width', cellSideLength);
    $('.grid-cell').css('height', cellSideLength);
    $('.grid-cell').css('border-radius', 0.02 * cellSideLength);
}

function newgame() {
    // initialization
    init();
    // 2 cell RNG
    generatorOneNumber();
    generatorOneNumber();
}

function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            /* Don't forget "#" */
            var gridCell = $("#grid-cell-" + i + "-" + j);
            gridCell.css('top', getTopPos(i, j));
            gridCell.css('left', getLeftPos(i, j));
            // console.log(getLeftPos(i, j));
        }
    }
    /* 2_1 游戏逻辑 */
    for (var i = 0; i < 4; i++) {
        board[i] = new Array();
        hasConflited[i] = new Array();
        for (var j = 0; j < 4; j++) {
            board[i][j] = 0;
            hasConflited[i][j] = false;
        }
    }
    updateBoardView();

    score = 0;
    $('#score').text(score);

}

function updateBoardView() {
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            /* DO NOT FORGOT THE # SIGN!!!! */
            $("#grid-container").append(
                '<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            var theNemberCell = $('#number-cell-' + i + '-' + j);

            if (board[i][j] == 0) {
                /* You can just type a number without px*/
                theNemberCell.css('width', '0px');
                theNemberCell.css('height', '0px');
                theNemberCell.css('top', getTopPos(i, j) + cellSideLength / 2);
                theNemberCell.css('left', getLeftPos(i, j) + cellSideLength / 2);
            }
            else {
                theNemberCell.css('width', cellSideLength);
                theNemberCell.css('height', cellSideLength);
                theNemberCell.css('top', getTopPos(i, j));
                theNemberCell.css('left', getLeftPos(i, j));

                theNemberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                theNemberCell.css('color', getNumberColor(board[i][j]));
                theNemberCell.text(board[i][j]);
            }
            hasConflited[i][j] = false;
        }
    }
    $('.number-cell').css('line-height', cellSideLength + 'px');
    $('.number-cell').css('font-size', 0.6 * cellSideLength + 'px');
}
/* 2-3 生成随机数动画 */
function generatorOneNumber(number) {

    if (noSpace(board)) {
        return false;
    }
    // Random Position Generator
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    // console.log("randx: " + randx);
    // console.log("randy: " + randy);
    // console.log("board[x][y]: " + board[randx][randy]);
    var times = 0;
    while (times <50) {
        if (board[randx][randy] === 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));
    }
    /* 4-4 */
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }
    }
    
    // Random Number Generator
    var randNumber = Math.random() < 0.5 ? 2 : 4;
    // console.log("randNumber: " + randNumber);
    // Show number at a Random position
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}
/* 3-2 基于玩家相应的循环*/
$(document).keydown(function (event) {

    // console.log("keyDown");
    switch (event.keyCode) {
        case 37:    /* Left */
        event.preventDefault();
        // console.log("keyCode: 37");
        if (moveLeft()) {
            // console.log("moveLeft");
            // generatorOneNumber();
            // isGameOver();
            setTimeout("updateBoardView()", 200);
            setTimeout("generatorOneNumber()", 210);
        }
            break;
        case 38:    /* Up */
        event.preventDefault();
            if (moveUp()) {
                // generatorOneNumber();
                // isGameOver();
                setTimeout("updateBoardView()", 200);
                setTimeout("generatorOneNumber()", 210);
            }
            break;
        case 39:    /* Right */
        event.preventDefault();
        if (moveRight()) {
            // generatorOneNumber();
            // isGameOver();
            setTimeout("updateBoardView()", 200);
            setTimeout("generatorOneNumber()", 210);
        }
            break;
        case 40:    /* Down */
        event.preventDefault();
        if (moveDown()) {
            // generatorOneNumber();
            // isGameOver();
            setTimeout("updateBoardView()", 200);
            setTimeout("generatorOneNumber()", 210);
        }
        break;

        default:
            break;
    }
    if(!hasGameOver) {
        isGameOver();
        return;
    }
});
/* 3-3 交互细节 */
function moveLeft() {
    if (!canMoveLeft(board)) {
        return false;
    }
    // moveLeft
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {     /* Number Exists */
                for (var k = 0; k < j; k++) {
                    /* No number exist */
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    /* Number equals */
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflited[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] *= 2;
                        board[i][j] = 0;
                        // addscore
                        score += board[i][k];
                        updateScore(score);
                        hasConflited[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }
    // setTimeout("updateBoardView()", 200);
    return true;
}
/* Understande the Logic, */
function moveRight() {
    if (!canMoveRight(board)) {
        return false;
    }
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {     /* Number Exists */
                for (var k = 3; k > j; k--) {
                    /* No number exist */
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    /* Number equals */
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflited[i][k]) {
                        // move
                        showMoveAnimation(i, j, i, k);
                        // add
                        board[i][k] *= 2;
                        board[i][j] = 0;

                        score += board[i][k];
                        updateScore(score);
                        hasConflited[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }
    // setTimeout("updateBoardView()", 200);
    return true;
}

function moveUp() {
    if (!canMoveUp(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {     /* Number Exists */
                for (var k = 0; k < i; k++) {
                    /* No number exist */
                    if (board[k][j] == 0 && noBlockVertical(j, k, i, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    /* Number equals */
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, k, i, board) && !hasConflited[i][k]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        // add
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflited[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }
    // setTimeout("updateBoardView()", 200);
    return true;
}

function moveDown() {
    if (!canMoveDown(board)) {
        return false;
    }
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {     /* Number Exists */
                for (var k = 3; k > i; k--) {
                    /* No number exist */
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    /* Number equals */
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflited[i][k]) {
                        // move
                        showMoveAnimation(i, j, k, j);
                        // add
                        board[k][j] *= 2;
                        board[i][j] = 0;
                        score += board[i][k];
                        updateScore(score);
                        hasConflited[i][k] = true;

                        continue;
                    }
                }
            }
        }
    }
    // setTimeout("updateBoardView()", 200);
    return true;
}
/* 4-1 GameOver部分 */
function isGameOver() {
    if(noSpace(board) && noMove(board)) {
        gameOver();
        hasGameOver = true;
    }
}

function gameOver() {
    // setTimeout("alert('gameover!')", 300);
    alert('gameover!');
}

/* 6-2 */
document.addEventListener('touchstart', 
function(event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;
});

document.addEventListener('touchmove', 
function(event) {
    event.preventDefault();
});

document.addEventListener('touchend', function(event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if(deltaX > 0) {
            // move right
            if (moveRight()) {
                setTimeout("updateBoardView()", 200);
                setTimeout("generatorOneNumber()", 210);
            }
        }
        else {
            // move left
            if (moveLeft()) {
                setTimeout("updateBoardView()", 200);
                setTimeout("generatorOneNumber()", 210);
            }
        }
    } 
    else if (Math.abs(deltaX) < Math.abs(deltaY)) {
        if (deltaY > 0) {
            // move down
            if (moveDown()) {
                setTimeout("updateBoardView()", 200);
                setTimeout("generatorOneNumber()", 210);
            }
        }
        else {
            // move up
            if (moveUp()) {
                setTimeout("updateBoardView()", 200);
                setTimeout("generatorOneNumber()", 210);
            }
        }
    }

    if(!hasGameOver) {
        isGameOver();
        return;
    }
});


