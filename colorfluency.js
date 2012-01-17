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
			var convertedForLength = (function(input){
			  // translate shorthand to a full hex number
			  var in_length = input.length;
			  var out = "";
			  switch (in_length){
			    case 1: //monochrome single hexidecimal
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
			      // till i come up with a more graceful strategy
			      out = "888888";  //default to grey
			  }
			  return out;
			})(input);

			convertedForLength = convertedForLength.toLowerCase();

			var isValidHex = function(input){
			  var validHexiDecimals = "0123456789abcdef";
			  for(var c in input){
			    var valid = validHexiDecimals.indexOf(input[c]);
			    if(valid == -1){
			      return false;
			    }
			  }
			  return true;
			};
			  
			// return hex if valid
			if (isValidHex(convertedForLength)){
			  return convertedForLength.toUpperCase();
			}
			else{
			  return "FF0000"; // bad hex
			}



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
