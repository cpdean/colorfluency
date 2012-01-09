(function(win, undefined){
  win.cf = {
    start : function(mode){
	      mode();
	    },

    GAME_MODE_INPUT : function(){
			// setup event handlers
			$(document).ready(function(){
			  // start typing from anywhere
			  $(document).keydown(function(e){
			    $("#player input").focus();
			  });

			  // bind for player input
			  $("#player input").keypress(function(e){
			    // hitting enter submits the attempt
			    var message = $(this).val();
			    if(e.keyCode == 13
			      && message != ""){
			      cf.log(message);
			      $(this).val("");
			    }
			  });
			});

		      },
    log : function(message){
	var log_item = "<li>"+message+"</li>";
	$("#logbox").append(log_item);
      }

  }
})(window)
