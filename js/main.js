$(function () {

  var model = new connectFour.Model();
  model.init();
  model.toString();

  setInterval(function () {
      model.toString();
  }, 1000);


  //console.log(model.isInsertTokenPossibleAt(1));

  $(document).on("keydown", function (e) {
    if(e.keyCode >= 49 && e.keyCode <= 56){
      if(model.isInsertTokenPossibleAt(e.keyCode+2-50) == true) {
          model.insertTokenAt(e.keyCode+2-50);
          console.log(model.checkGameStatus());
      } else {
        alert("Insert not possible");
      }
    }
  });


});



