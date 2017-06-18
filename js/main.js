$(function () {

    var model = new connectFour.Model();
    model.init();
    model.toString();

    // event for rendering the board every time a token is inserted
    $(model).on(model.EVENTS.CHANGE, renderBoard);

    // event for ending the game
    $(model).on(model.EVENTS.GAME_OVER, game_over);

    // keylsiteners for inerting tokens and restarting the game
    $(document).on("keydown", function (e) {
        if(e.keyCode >= 49 && e.keyCode <= 56){
            if(model.isInsertTokenPossibleAt(e.keyCode+2-50) === true) {
                model.insertTokenAt(e.keyCode+2-50);
            } else {
                alert("Insert not possible");
            }
        } else if(e.keyCode == 27) {
            alert("restarting the game");
            model.restartGame();
        }
    });

    // function called by event for rendering the board
    function renderBoard() {
        model.checkGameStatus();
        model.toString();
        model.checkGameStatus();
    }

    // function triggerd by event in case the game ends
    //alerts and auto restart commented because else it could not show the letters in uppercase
    function game_over() {
        if(model.winner == 0) {
            alert("Game over, it is a tie!");
            model.winner = 1;
        } else {
            if(this.turn === "x") {
                // alert("Player 1 Won!");
            } else {
                // alert("Player 2 Won!");
            }
        }
        model.tokensInserted = 0;
        // model.restartGame();
    }
});



