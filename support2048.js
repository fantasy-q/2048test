documentWidth = window.screen.availWidth;
gridContainerWidth = 0.92 * documentWidth;
cellSideLength = 0.18 * documentWidth;
cellSpace = 0.04 * documentWidth;

/* 1-4 构建页面元素*/
function getTopPos(i, j) {
    return cellSpace + i * (cellSpace + cellSideLength);
}

function getLeftPos(i, j) {
    return cellSpace + j * (cellSpace + cellSideLength);
}
/* 2-1 游戏逻辑*/
function getNumberBackgroundColor(number) {
    switch (number) {
        case 2: return "#eee4da"; break;
        case 4: return "#ede0c8"; break;
        case 8: return "#f26179"; break;
        case 16: return "#f59563"; break;
        case 32: return "#f67c5f"; break;
        case 64: return "#f65e3b"; break;
        case 128: return "#edcf72"; break;
        case 256: return "#edcc61"; break;
        case 512: return "#99cc00"; break;
        case 1024: return "#33b5e5"; break;
        case 2048: return "#0099cc"; break;
        case 4096: return "#aa66cc"; break;
        case 8192: return "#9933cc"; break;
    }
    return "black";
}

function getNumberColor(number) {
    if (number <= 4) {
        return "#776c65";
    }
    return "white";
}
/* 2-2 页面初始化分析 */
function noSpace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (board[i][j] === 0)
                return false;
        }
    }
    return true;
}
/* 3-3 交互细节 */
function canMoveLeft() {
    /*  1. Does number exists on the left 
        2. Does the number equal  */
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {     /* Number Exists */
                if (board[i][j - 1] == 0 || board[i][j - 1] == board[i][j]) {
                    /* don't exists || equals */
                    return true;
                }
            }
        }
    }
    /* Can't move left */
    return false;
}
function canMoveRight() {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                if (board[i][j + 1] == 0 || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveUp() {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                if (board[i - 1][j] == 0 || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown() {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                if (board[i + 1][j] == 0 || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
/* 3-4 交互逻辑调试 */
function noBlockHorizontal(row, col1, col2, board) {

    for (var i = col1 + 1; i < col2; i++) {
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}

function noBlockVertical(col, row1, row2, board) {
    for (var i = row1 + 1; i < row2; i++) {
        if (board[i][col] != 0) {
            return false;
        }
    }
    return true;
}
/* 4-1 GameOver部分 */
function noMove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || 
        canMoveUp(board) || canMoveDown(board)) {
            return false;
    }
    return true;
}