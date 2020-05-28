/* 2-3 生成随机数动画 */
function showNumberWithAnimation(i, j, randNumber) {
    // console.log("i: " + i);
    // console.log("j: " + j);
    // console.log("randNumber: " + randNumber);

    var numberCell = $('#number-cell-' + i + '-' + j);

    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    numberCell.css('color', getNumberColor(randNumber));
    numberCell.text(randNumber);

    numberCell.animate({
        width: cellSideLength,
        height: cellSideLength,
        top: getTopPos(i, j),
        left: getLeftPos(i, j),
    }, 200);
}
/* 3-4 交互逻辑调试 */
function showMoveAnimation(fromx, fromy, tox, toy) {
    
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate({
        /* Use comma */
        top:  getTopPos (tox, toy),
        left: getLeftPos(tox, toy),
    }, 200);
}
/* 4-2 */
function updateScore(score) { 
    $('#score').text(score);
}