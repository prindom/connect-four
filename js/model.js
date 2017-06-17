window.connectFour = window.connectFour || {};

(function (namespace, window) {
    'use strict';

    class Model {
        constructor() {
            // creating the first array for the board
            this.board = [];
            this.$Output = $("#output");

            // filling the array with the amount of colums given
            for(let i = 0; i < window.connectFour.CONFIG.numColumns; i++) {
                this.board[i] = new Array(window.connectFour.CONFIG.numRows);
            }
            this.lastCol;
            this.lastRow;
            this.turn = "x";
        }

        // --------- public ---------

        init() {
            // initialising the board with empty fields
            for(let i = 0; i < this.board.length; i++) {
                // inside one row
                for(let j = 0; j < this.board[i].length; j++) {
                    // inside one column
                    if(this.board[i][j] === undefined) {
                        this.board[i][j] = "-";
                    }

                }
            }
        }

        insertTokenAt(columnIndex) {
            columnIndex--;
            this.lastCol = columnIndex;
            for(let i = this.board[columnIndex].length; i >= 0; i--) {
                if(this.board[columnIndex][i] == "-") {
                    if(this.turn == "x") {
                        this.lastRow = i;
                        this.board[columnIndex][i] = "x";
                        this.turn = "o";
                    } else if(this.turn == "o"){
                        this.lastRow = i;
                        this.board[columnIndex][i] = "o";
                        this.turn = "x";
                    }
                    return;
                }
            }
        }

        isInsertTokenPossibleAt(columnIndex) {
            columnIndex--;

            let result = true;
            for(let i = 0; i < this.board[columnIndex].length; i ++) {
                if(this.board[columnIndex][i] == "-") {
                    return true;
                } else result = false;
            }
            return result;
        }

        checkGameStatus() {
            let player = this.turn;
            // horizontalCheck
            for (let j = 0; j<window.connectFour.CONFIG.numRows-3 ; j++ ){
                for (let i = 0; i<window.connectFour.CONFIG.numColumns; i++){
                    if (this.board[i][j] == player && this.board[i][j+1] == player && this.board[i][j+2] == player && this.board[i][j+3] == player){
                        let winner = player.toUpperCase();
                        this.board[i][j] = "X";
                        this.board[i][j+1] = winner;
                        this.board[i][j+2] = winner;
                        this.board[i][j+3] = winner;
                        return true;
                    }
                }
            }
            // verticalCheck
            for (let i = 0; i<window.connectFour.CONFIG.numColumns-3 ; i++ ){
                for (let j = 0; j<window.connectFour.CONFIG.numRows; j++){
                    if (this.board[i][j] == player && this.board[i+1][j] == player && this.board[i+2][j] == player && this.board[i+3][j] == player){
                        return true;
                    }
                }
            }
            // ascendingDiagonalCheck
            for (let i=3; i<window.connectFour.CONFIG.numColumns; i++){
                for (let j=0; j<window.connectFour.CONFIG.numRows-3; j++){
                    if (this.board[i][j] == player && this.board[i-1][j+1] == player && this.board[i-2][j+2] == player && this.board[i-3][j+3] == player)
                        return true;
                }
            }
            // descendingDiagonalCheck
            for (let i=3; i<window.connectFour.CONFIG.numColumns; i++){
                for (let j=3; j<window.connectFour.CONFIG.numRows; j++){
                    if (this.board[i][j] == player && this.board[i-1][j-1] == player && this.board[i-2][j-2] == player && this.board[i-3][j-3] == player)
                        return true;
                }
            }
            return false;
        }

        toString() {
            this.$Output.html("x=Spieler 1, o=Spieler 2, Großbuchstaben=gewonnene Stene, Bindestriche: leere Felder <br/>");
            for(let i = 0; i < this.board.length; i++) {
                // inside one row
                for(let j = 0; j < this.board[i].length; j++) {
                    // inside one column
                    this.$Output.append(this.board[j][i]);

                }
                this.$Output.append("<br/>");
            }
        }


        // --------- private ---------

        checkLeft(col, row) {
            if(col >= 3) {
                if(this.board[col][row] === this.board[col-1][row]) {
                    return true;
                } else return false;
            } else return false;

        }

        checkRight(col, row) {
            if(col <= 2) {
                if(this.board[col][row] === this.board[col+1][row]) {
                    return true;
                } else return false;
            } else return false;
        }

        checkTop(col, row) {
            if(this.board[col][row] === this.board[col][row-1]) {
                return true;
            } else return false;
        }

        checkBottom(col, row) {
            if(this.board[col][row] === this.board[col][row+1]) {
                return true;
            } else return false;
        }
    }

    namespace.Model = Model;

})(window.connectFour, window);

