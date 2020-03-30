$(document).ready(function(){
	/*important variable declaration*/
	var game_play = false;
	var win = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]];
	var player = "", com = "";
	var com_turn = true;
	var gameboard = {1:"", 2:"", 3:"", 4:"", 5:"", 6:"", 7:"",8:"", 9:""};

	/*choosing X or O*/
	$("#game").hide();
	$("#result").hide();

	$("#tictactoe #choose button").click(function(){
		player = $(this).attr("value");
		com = (player == "X") ? "O" : "X";
		$("#choose").fadeOut(2000).hide();
		$("#game").fadeIn(2000).show();
		game_play = true;
	});

	setInterval(function(){
		if (game_play == true){
			if(com_turn === true){
					var temp = com_choice(gameboard);
					$("#tictactoe #game button[value=" + temp + "]").html(com);
					gameboard[temp] = com;

					winner = check_winner(gameboard);
							if (winner != ""){
								displayNreset(winner);
							}
			
					com_turn = false;
			}

			$("#tictactoe #game button").click(function(){
				if (com_turn == false){
					var val = $(this).attr("value");
					if (gameboard[val] == ""){
						$(this).html(player);
						gameboard[val] = player;
						com_turn = true;
					}
					winner = check_winner(gameboard);
					if (winner != ""){
						displayNreset(winner);
					}
				
				}
			});
			
		}
			
	}, 2000);

	function check_winner(gameboard){
		var count = 0;
		for (var i=0; i<8; i++){
			if (gameboard[win[i][0]] == gameboard[win[i][1]] && gameboard[win[i][0]] == gameboard[win[i][2]] && gameboard[win[i][0]]!=""){
				return gameboard[win[i][0]];
			}
		}
		for (var i=1; i<10; i++){
			if (gameboard[i] == ""){
				count++;
			}
		}

		if (count>0){
			return "";
		} else {
			return "tie";
		}
	}

	function displayNreset(val){
		var display;
		if (val == player){
			display = "Player wins!";
		} else if ( val == com){
			display = "Computer wins!";
		} else if (val == "tie"){
			display = "Ops! Its a tie";
		}
		$("#result").html(display);
		$("#game").fadeOut().delay(2000).fadeIn(2000);
		$("#result").fadeIn().delay(2000).fadeOut(2000);
		gameboard = {1:"", 2:"", 3:"", 4:"", 5:"", 6:"", 7:"",8:"", 9:""};
		$("#game button").html("");
	}

	function com_choice(board){
		var user = [], comp = [], empty = [];
		var corners = [1,3,7,9];
		if (board[5] == ""){
			return 5;
		}

		for (var i=1; i<10; i++){
			if (board[i] == player){
				user.push(i);
			} else if (board[i] == com){
				comp.push(i);
			} else {
				empty.push(i);
			}
		}
		

		for (var i=0; i<8; i++){
			var temp = win[i];
			var same = 0, is_empty;
			for (var j=0; j<3; j++){
				if (comp.indexOf(temp[j]) != -1){
					same++;
				} else {
					is_empty = temp[j];
				}
			}
			if (same == 2){
				if (board[is_empty] == ""){
					return is_empty;
				}
			}
		}

		for (var i=0; i<8; i++){
			var temp = win[i];
			var same = 0, is_empty;
			for (var j=0; j<3; j++){
				if (user.indexOf(temp[j]) != -1){
					same++;
				} else {
					is_empty = temp[j];
				}
			}
			if (same == 2){
				if (board[is_empty] == ""){
					return is_empty;
				}
			}
		}

		if (user.length==2){
			if (corners.indexOf(user[0]) != -1 && corners.indexOf(user[1]) != -1){
				return 2;
			} else {
				var temp1 = corners.indexOf(user[0]);
				var temp2 = corners.indexOf(user[1]);
				if (temp1 != -1 && temp2 == -1){
					var value;
					switch(user[0]){
						case 1:
						value = 9;
						break;

						case 3:
						value = 7;
						break;

						case 7:
						value = 3;
						break;

						case 9:
						value = 1;
						break;
					}
					if (board[value] == ""){
						return value;
					}
				}
				if (temp1 == -1 && temp2 != -1){
					var value;
					switch(user[1]){
						case 1:
						value = 9;
						break;

						case 3:
						value = 7;
						break;

						case 7:
						value = 3;
						break;

						case 9:
						value = 1;
						break;
					}
					if (board[value] == ""){
						return value;
					}
				}
			}					
		}

		for (var i=0; i<corners.length; i++){
			if (board[corners[i]] == ""){
				return corners[i];
			}
		}

		return empty[0];
	}
	
});