///////////////
// NameSpace //
///////////////
var Minesweeper = {
    // Property
    level : 'normal',

    position : [],

    config : {
        row : 9,
        col : 9,
        mineCout : 10
    },

    // Unility
    unility : {
        // Cell Construction
        mineCell : {
            // Is there a mine ?
            isMine : false,
            // Is there a number ?
            isNumber : true,
            // What's the number ?
            number : undefined
        },

        // Create some different couple random numbers (eg: [x, y])
        randomPosition : function (rowMax, colMax, cout) {
            // Create couples of random digits in a array
            var positionX = [],
                positionY = [];

            while (positionY.length < cout) {
                // var index = 0;
                positionX.push(Math.floor(colMax * Math.random() + 1));
                positionY.push(Math.floor(rowMax * Math.random() + 1));
                // if array has two children array, compare them
                if (positionY.length > 1) {
                    for (var i = 0; i < positionY.length - 1; i++) {
                        if (positionX[positionX.length - 1] == positionX[i] && positionY[positionY.length - 1] == positionY[i]) {
                            positionY[positionY.length - 1] = Math.floor(rowMax * Math.random() + 1);
                            i = 0;
                        }
                    }
                    console.log("Compare finished!");
                }
            }
            for (var i = 0; i < positionX.length; i++) {
                Minesweeper.position.push([positionX[i], positionY[i]]);
            }
        },


        // set game config
        setConfig : function (level) {
            if (level == 'easy') {
                Minesweeper.config.row = 9;
                Minesweeper.config.col = 9;
                Minesweeper.config.mineCout = 10;
            } else if (level == 'normal') {
                Minesweeper.config.row = 16;
                Minesweeper.config.col = 16;
                Minesweeper.config.mineCout = 40;
            } else if (level == 'hard') {
                Minesweeper.config.row = 16;
                Minesweeper.config.col = 30;
                Minesweeper.config.mineCout = 99;
            } else {
                Minesweeper.config.row = 5;
                Minesweeper.config.col = 5;
                Minesweeper.config.mineCout = 2;
            }
        },


        // set mine position
        setMine : function (position, config) {
            
            var cell = document.getElementsByClassName('cell');
            for (var i = 0; i < Minesweeper.position.length; i++) {
                var index = (Minesweeper.position[i][0] - 1) * Minesweeper.config.col + (Minesweeper.position[i][1] - 1);
                // Add property isMine 
                cell[index].setAttribute('ismine', 'true');
                cell[index].setAttribute('class','cell danger');
            }
        },

        // set number of mines beside
        setNumber : function (config) {
            // Add property number and isNumber

            var mine = document.getElementsByClassName('danger');
            var cell = document.getElementsByClassName('cell');

            for (var i = 0; i < cell.length; i++) {
                var mineNumber = 0;
                var element = cell[i];

                // not left edge
                if (i % Minesweeper.config.col >= 1) {
                    // top
                    if (i >= Minesweeper.config.col) {
                        if (cell[i - Minesweeper.config.col - 1].classList.contains('danger')) {;
                            mineNumber ++;
                        }
                    }
                    // middle
                    if(cell[i - 1].classList.contains('danger')) {
                        mineNumber ++;
                    }
                    // bottom
                    if (i < Minesweeper.config.col * (Minesweeper.config.row - 1)) {
                        if(cell[i + Minesweeper.config.col - 1].classList.contains('danger')) {
                            mineNumber ++;
                        }
                    }
                }
                // not right edge
                if (i % Minesweeper.config.col < Minesweeper.config.col - 1) {
                    // top
                    if (i >= Minesweeper.config.col) {
                        if (cell[i - Minesweeper.config.col + 1].classList.contains('danger')) {;
                            mineNumber ++;
                        }
                    }
                    // middle
                    if(cell[i + 1].classList.contains('danger')) {
                        mineNumber ++;
                    }
                    // bottom
                    if (i < Minesweeper.config.col * (Minesweeper.config.row - 1)) {
                        if(cell[i + Minesweeper.config.col + 1].classList.contains('danger')) {
                            mineNumber ++;
                        }
                    }
                }
                // center
                // top
                if (i >= Minesweeper.config.col) {
                    if (cell[i - Minesweeper.config.col].classList.contains('danger')) {;
                        mineNumber ++;
                    }
                }
                // middle
                if(cell[i].classList.contains('danger')) {
                    mineNumber ++;
                }
                // bottom
                if (i < Minesweeper.config.col * (Minesweeper.config.row - 1)) {
                    if(cell[i + Minesweeper.config.col].classList.contains('danger')) {
                        mineNumber ++;
                    }
                }



                if (!cell[i].classList.contains('danger')) {
                    cell[i].classList.add('isnumber');
                    cell[i].classList.add('isnumber' + mineNumber);
                }
            }


        },


        //  [extend description]
        //  @param  {[DOM Element]} center
        extend : function (center) {
            if (!center.classList.contains('isnumber0')) {
                return;
            } else {
                var beginIndex = center.className.indexOf('index') + 5,
                    endIndex = center.className.indexOf(' isnumber');

                // Get index of table cells;
                var index = center.className.substring(beginIndex, endIndex);

                var col = Minesweeper.config.col,
                    row = Minesweeper.config.row;

                // Around cells of center cell
                var around = [];

                var cells = document.getElementsByClassName('cell');
                
                // Exist Left
                if (index % col > 0) {
                    // Exist Left Top
                    if (index > col) {
                        around.push(cells[index - col - 1]);
                    }
                    // Left Middle
                    around.push(cells[index -1]);
                    // Exist Left Bottom
                    if (index < col * (row - 1)) {
                        around.push(cells[index - (-col) - 1]);
                    }
                }

                // Exist Right
                if (index % col < col - 1) {
                    // Exist Right Top
                    if (index > col) {
                        around.push(cells[index - col - (-1)]);
                    }
                    // Right Middle
                    around.push(cells[index - (-1)]);
                    // Exist Right Bottom
                    if (index < col * (row - 1)) {
                        around.push(cells[index - (-col) - (-1)]);
                    }
                }

                // Center
                // Exist Center Top
                if (index > col) {
                    around.push(cells[index - col]);
                }
                // Exist Center Bottom
                if (index < col * (row - 1)) {
                    around.push(cells[index - (-col)]);
                }


                for (var i = 0; i < around.length; i ++) {
                    if (!around[i].classList.contains('open')) {
                        around[i].classList.add('open');
                        Minesweeper.unility.extend(around[i]);
                    }
                    // if (around[i].classList.contains('isnumber0')) {
                    //     around[i].click();
                    // }
                }
            }
        },


        // Alert Game Over 
        gameOver : function () {
            var mines = document.getElementsByClassName('danger');
            for (var i = 0; i < mines.length; i++) {
                mines[i].classList.add('mine');
            }
            setTimeout(function(){
                alert('Game Over');
                if (confirm('Restart game ?')) {
                    location.reload();
                }
            }, 1000);
        },



        // Alert Win
        gameWin : function () {
            setTimeout(function(){
                alert('You Win !');
                if (confirm('Restart game ?')) {
                    location.reload();
                }
            }, 1000);
        }



    }

};





(function (nameSpace) {
    var timer;
    var time = 0;



    var setConfig = nameSpace.unility.setConfig;
    var randomPosition = nameSpace.unility.randomPosition;
    var setMine = nameSpace.unility.setMine;
    var setNumber = nameSpace.unility.setNumber;
    var extend = nameSpace.unility.extend;
    var gameOver = nameSpace.unility.gameOver;
    var gameWin = nameSpace.unility.gameWin;
    var clock = nameSpace.unility.clock;



    //////////////////
    // Create cells //
    //////////////////
    setConfig(nameSpace.level);

    console.log(nameSpace.config);
    

    // Define mine position before
    // like:
    // [
    //   [x1, y1],
    //   [x2, y2],
    //   [x3, y3],
    //   ...
    // ]
    randomPosition(nameSpace.config.row, nameSpace.config.col, nameSpace.config.mineCout);
    console.log(nameSpace.position);

    // Set mine
    var table = document.createElement('table');

    for (var i = 0; i < nameSpace.config.row; i++) {

        var tr = document.createElement('tr');    // create row

        for (var j = 0; j < nameSpace.config.col; j++) {
            var td = document.createElement('td');    // create col

            td.setAttribute('class','cell');    // set class
            td.setAttribute('ismine','false');    // 
            td.classList.add('index' + (i * nameSpace.config.col + j));

            // Add 'Left Click' event
            td.addEventListener('click', function(e){
                // Over ?
                if (this.classList.contains('danger')) {
                    gameOver();
                } else {
                    this.classList.add('open');
                    if (this.classList.contains('isnumber')) {
                        extend(this);
                    }
                    // Win ?
                    var bombCout = nameSpace.config.mineCout,
                        opened = document.getElementsByClassName('open').length,
                        all = nameSpace.config.col * nameSpace.config.row;
                    if (bombCout == (all - opened)) {
                        gameWin();
                    }
                }
            }, false);

            // Add 'Right Click' event
            var times = 1;
            td.addEventListener('contextmenu', function(e){
                var e = e || window.event;
                this.classList.toggle("safe");

                var restBomb = document.getElementsByClassName('safe').length;
                document.getElementsByClassName('bomb')[0].value = nameSpace.config.mineCout - restBomb;
                

                // Delete default menu
                e.returnValue = false;
            }, false);

            tr.appendChild(td);
        }
        table.appendChild(tr);
    }

    document.getElementsByClassName('game-content')[0].appendChild(table);



    /////////////////
    // Add propety //
    /////////////////
    setMine(nameSpace.position, nameSpace.config);

    setNumber(nameSpace.position, nameSpace.config);



    
    document.getElementsByTagName('table')[0].addEventListener('click', clock, false);

    function clock () {
        timer = setInterval(function () {
            time ++;
            document.getElementsByClassName('time')[0].value = time;
        }, 1000);
        // document.getElementsByTagName('table')[0].removeEvent('click');
    }




    // Chose game level
    // var form = document.getElementsByTagName('form')[0];
    // var inputs = form.getElementsByTagName('input');
    // for (var i = 0; i < inputs.length; i++) {
    //     inputs[i].addEventListener('click', function(){
    //         nameSpace.level = inputs.value;
    //         setConfig(nameSpace.level);
    //         randomPosition(nameSpace.config.row, nameSpace.config.col, nameSpace.config.mineCout);
    //     }, false);
    // }
    // console.log(form);
    // console.log(input);



} (Minesweeper));






// Something useful 
(function () {


    Array.prototype.unique = function () {
        var obj = {},
            newArr = [];
        for (var i = 0; i < this.length; i++) {
            if (!obj[this[i]]) {
                obj[this[i]] = true;
                newArr.push(this[i]);
            }
        }
        return newArr;
    }


    // Array.prototype.contains = function () {

    // }


} ());