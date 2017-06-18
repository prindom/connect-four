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
            this.winner = 1;
            // EVENTS for the game
            this.EVENTS = {
                CHANGE:"change",
                GAME_OVER:"gameover"
            }

            this.tokensInserted = 0;
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
            this.tokensInserted++;
            this.checkGameStatus();
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
                    $(this).trigger(this.EVENTS.CHANGE);
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
            if(this.tokensInserted === window.connectFour.CONFIG.numColumns * window.connectFour.CONFIG.numRows) {
                this.winner = 0;
                $(this).trigger(this.EVENTS.GAME_OVER);
                return true;
            }
            let player = this.turn;
            // the following 4 for
            for (let j = 0; j<window.connectFour.CONFIG.numRows-3 ; j++ ){
                for (let i = 0; i<window.connectFour.CONFIG.numColumns; i++){
                    if (this.board[i][j] == player && this.board[i][j+1] == player && this.board[i][j+2] == player && this.board[i][j+3] == player && this.board[i][j] != "-"){
                        this.board[i][j] = player.toUpperCase();
                        this.board[i][j+1] = player.toUpperCase();
                        this.board[i][j+2] = player.toUpperCase();
                        this.board[i][j+3] = player.toUpperCase();
                        this.winner = player;
                        $(this).trigger(this.EVENTS.GAME_OVER);
                        return true;
                    }
                }
            }
            for (let i = 0; i<window.connectFour.CONFIG.numColumns-3 ; i++ ){
                for (let j = 0; j<window.connectFour.CONFIG.numRows; j++){
                    if (this.board[i][j] == player && this.board[i+1][j] == player && this.board[i+2][j] == player && this.board[i+3][j] == player && this.board[i][j] != "-"){
                        this.board[i][j] = player.toUpperCase();
                        this.board[i+1][j] = player.toUpperCase();
                        this.board[i+2][j] = player.toUpperCase();
                        this.board[i+3][j] = player.toUpperCase();
                        this.winner = player;
                        $(this).trigger(this.EVENTS.GAME_OVER);
                        return true;
                    }
                }
            }
            for (let i=3; i<window.connectFour.CONFIG.numColumns; i++){
                for (let j=0; j<window.connectFour.CONFIG.numRows-3; j++){
                    if (this.board[i][j] == player && this.board[i-1][j+1] == player && this.board[i-2][j+2] == player && this.board[i-3][j+3] == player && this.board[i][j] != "-") {
                        this.board[i][j] = player.toUpperCase();
                        this.board[i-1][j+1] = player.toUpperCase();
                        this.board[i-2][j+2] = player.toUpperCase();
                        this.board[i-3][j+3] = player.toUpperCase();
                        this.winner = player;
                        $(this).trigger(this.EVENTS.GAME_OVER);
                        return true;
                    }
                }
            }
            for (let i=3; i<window.connectFour.CONFIG.numColumns; i++){
                for (let j=3; j<window.connectFour.CONFIG.numRows; j++){
                    if (this.board[i][j] == player && this.board[i-1][j-1] == player && this.board[i-2][j-2] == player && this.board[i-3][j-3] == player && this.board[i][j] != "-") {
                        this.board[i][j] = player.toUpperCase();
                        this.board[i-1][j-1] = player.toUpperCase();
                        this.board[i-2][j-2] = player.toUpperCase();
                        this.board[i-3][j-3] = player.toUpperCase();
                        this.winner = player;
                        $(this).trigger(this.EVENTS.GAME_OVER);
                        return true;
                    }
                }
            }
            return false;
        }

        toString() {
            this.$Output.html("x=Spieler 1, o=Spieler 2, Großbuchstaben=gewonnene Stene, Bindestriche: leere Felder <br/>");
            for(let i = 0; i < window.connectFour.CONFIG.numRows; i++) {
                // inside one row
                for(let j = 0; j < window.connectFour.CONFIG.numColumns; j++) {
                    // inside one column
                    this.$Output.append(this.board[j][i]);

                }
                this.$Output.append("<br/>");
            }
        }

        restartGame() {
            for(let i = 0; i < this.board.length; i++) {
                // inside one row
                for(let j = 0; j < this.board[i].length; j++) {
                    // inside one column
                    this.board[i][j] = "-";
                }
            }
            this.turn = "x";
            $(this).trigger(this.EVENTS.CHANGE);
        }


        // --------- private ---------


    }

    namespace.Model = Model;

})(window.connectFour, window);