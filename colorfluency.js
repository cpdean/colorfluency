(function(win, undefined){
  win.cf = {
    start : function(mode){
	      mode();
	    },

    GAME_MODE_INPUT_DEBUG : function(){
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
    parseToHexColor : function(input){
			var in_length = input.length;
			var out = "";
			// dumb implementation, before I actually parse the hex
			switch (in_length){
			  case 1:
			    out = input+input+input+input+input+input; //lol
			    break;
			  case 3:
			    var R = input[0];
			    var G = input[1];
			    var B = input[2];
			    out = R+R+ G+G+ B+B; // semi lol
			    break;
			  case 6:
			    out = input;
			    break;
			  default:
			    out = "sorry, input = " + in_length;
			}
			return out;

		      },

    log : function(message){
	    var hex_color = cf.parseToHexColor(message);
	    message = hex_color;
	    $("#logbox").stop();
	    var log_item = "<li>"+message+"</li>";
	    $("#logbox").append(log_item);
	    var lb_height = $("#logbox").prop("scrollHeight");
	    $("#logbox").animate({scrollTop : lb_height}, 1000);
	  }

  }
})(window)
