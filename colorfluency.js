(function(win, undefined){
  win.cf = {
    start : function(mode){
      mode();
    },
    GAME_MODE_INPUT : function(){
      alert("input mode started!");
    }
  }
})(window)
