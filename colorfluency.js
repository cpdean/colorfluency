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
				  var hex_color = $(this).val();
				  if(e.keyCode == 13
				    && hex_color != ""){
				    hex_color = cf.parseToHexColor(hex_color);
				    cf.log(hex_color);
				    $(this).val("");
				    $("#game-view").css("background","#"+hex_color);
				  }
				});
			      });
			    },
    /* COLOR:COLOR - You're presented a color, and you have to find the closest color */
    GAME_MODE_COLOR_COLOR : function(color_depth){
                              var SPACE_BAR = 32
			      var randomizeColors = function(){
				$("#color-color td").each(function(){
				  $(this).css("background","#"+cf.randColor(color_depth));
				});
			      }

			      $(document).ready(function(){
				$(document).keyup(function(e){
				  if(e.keyCode == SPACE_BAR){
				    randomizeColors();
				  }
				  return false;
				});

				$(document).click(function(){
				  randomizeColors();
				});

				var tick;
				var gameloop = function(){
				  randomizeColors();
				  //tick = setTimeout(gameloop, 2000);
				}
				gameloop();


				$("#color-color").show();
				window.goal = $(".goal_move")[0];
				goal.counter = 0;
				$("#color-color td").click(function(){
				  var target_color = $(this).css("background-color");
				  $(".player-pill").css("background-color", target_color);
				  clearTimeout(tick);
				  gameloop();
				  goal.counter++;
				  if(goal.counter > 3){
				    goal.counter = 0;
				    var newcolor = cf.randColor(1);
				    console.log(newcolor)
				    $(goal).css("background","#"+cf.randColor(1));
				    $("#level-change").show().fadeOut();
				  }
				});
			      });
			      },
    GAME_MODE_SIMPLE_MONO : function(){
			      // setup event handlers
			      $(document).ready(function(){
				// start typing from anywhere
				$(document).keydown(function(e){
				  $("#player input").focus();
				});

				// bind for player input
				$("#player input").keypress(function(e){
				  // hitting enter submits the attempt
				  var hex_color = $(this).val();
				  if(e.keyCode == 13
				    && hex_color != ""){
				    hex_color = cf.parseToHexColor(hex_color);
				    cf.log(hex_color);
				    $(this).val("");
				    $("#game-view").css("background","#"+hex_color);
				  }
				});
			      });
			    },
    score : function(target,user){
	      //stub
	      return 1; // a for effort!
	    },
    randColor : function(mode){
		  //generates a new color string depending on what you gave it
		  switch(mode){
		    case 1: // mono, one of 16 values
		      var c = "";
		      c += cf.randHex();
		      return cf.convertedForLength(c);
		      break;
		    case 2: //hues, tame
		      break;
		    case 3: // stick to lowbit colors
		      var c = ""
			for(var i = 0; i < 3; i++){
			  c += cf.randHex();
			}
		      c = cf.convertedForLength(c);
		      return c
		      break;
		    default: //free for all
		      var c = ""
			for(var i = 0; i < 6; i++){
			  c += cf.randHex();
			}
		      return c;
		  }
		},

    validHexiDecimals : "0123456789abcdef",
    randHex : function(){
		var i = Math.floor(Math.random()*16);
		return cf.validHexiDecimals[i];
	      },
    convertedForLength : function(input){
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
			},
    parseToHexColor : function(input){
			var convertedForLength = cf.convertedForLength(input)
			convertedForLength = convertedForLength.toLowerCase();

			var isValidHex = function(input){
			  for(var c in input){
			    var valid = cf.validHexiDecimals.indexOf(input[c]);
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
	    $("#logbox").stop();
	    var log_item = "<li>"+message+"</li>";
	    $("#logbox").append(log_item);
	    var lb_height = $("#logbox").prop("scrollHeight");
	    $("#logbox").animate({scrollTop : lb_height}, 1000);
	  }

  }
})(window)
