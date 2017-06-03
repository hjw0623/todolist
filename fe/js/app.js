(function (window) {
	'use strict';
	var URL = '/api/todos';
	// Your starting point. Enjoy the ride!
	//show current todoList
	getListAll(URL, 'All');
	//getList('all');
})(window);
	
//insert
function doInsert(postUrl, data){
	$.ajax({

			type: 'POST',
			url:URL,
			data: data,
			success: function(todo){
					if($('#All').hasClass('selected') || $('#Active').hasClass('selected')){
						$('.todo-list').append('<li><div class="view" id="'+ todo.id+'"><input class ="toggle" type="checkbox"><label>'+todo.todo+'</label><button class="destroy"></button></div></li>');
						console.log("appended");
					}

					$('.todo-count').attr('strong', todo.length);
					$('.new-todo').val(''); //clear 
					var currentCnt = Number($('.todo-count').children('strong').text())+1;
					$('.todo-count').children('strong').text(currentCnt);
			}
	});
}

$('.new-todo').keyup(function(e){
		if(e.keyCode==13){ 
			console.log("enter");
		var val = $('.new-todo').val();
		var data = JSON.stringify ({ "todo" : val }); 
		if(val != "") doInsert(URL, data);
	}
});



//get List All
function getListAll(getUrl, filter){
 $.ajax({
 	type: 'GET',
 	url : getUrl,
 	success: function(todo){
	 		$('.todo-list').empty(); //기존 포멧 비우기
	 		$('.todo-count').children('strong').text(todo.length); //남은 todo list 개수 
	 		doCheck(filter);

	 		todo = doFilter(todo, filter);

	 		$.each(todo, function(){
	 			var now = $(this).get(0);
	 			var text;
	 			if(now.completed==1){
	 				text = '<li class="completed"><div class="view" id="' + now.id + '"><input class="toggle" type="checkbox" checked="checked"><label>' + now.todo + '</label><button class="destroy"></button></div></li>';
	 			}
	 			else{
					text = '<li><div class="view" id="' + now.id + '"><input class="toggle" type="checkbox"><label>' + now.todo + '</label><button class="destroy"></button></div></li>';	 			}
	 			$('.todo-list').append(text);
	 		});
	 		//filter : 제공된 함수로 구현된 테스트를 통과하는 모든 요소가 있는 새로운 배열을 만듭
 		}
 	});
}

function doFilter(todo, filter){
	todo = todo.filter(function(now){
		var isCompleted = now.completed;

		if(filter=='Active')return ((isCompleted==0) ==true);
		else if(filter == 'Completed') return ((isCompleted == 1) == true);
		else true;
	});
	return todo;
}
function doCheck(filter){
 	if(filter == 'All'){
 		$('#All').attr('class', 'selected');
 		$('#Active').attr('class', '');
		$('#Completed').attr('class', '');
 	}
 	else if(filter == 'Active'){
 		$('#All').attr('class', '');
 		$('#Active').attr('class', 'selected');
 		$('#Completed').attr('class', '');
 	}
 	else{
 		$('#All').attr('class', '');
		$('#Active').attr('class', '');
 		$('#Completed').attr('class', 'selected');
 	}
}



	


/*
$('#All').on('click', function() {
 	getListAll(url, 'All');
});

$('#active').click(function(){
	getList('active');
})
$('#completed').click(function(){
	getList('completed');
});
*/
/*
function getList('all'){
	$('.todo-list').empty();
	$.ajax({
		type:'GET',
		url: URL,
		success: function (response){
			var liClassType="";
			var inputCheckType="";

			for(var i=0; response.length; i++){
				if(response[i].completed==1){
					liClassType = 'class="completed"';
					inputCheckType = 'checked';
				}
				$('.todo-list').append(
					   "<li id='" + response[i].id + "'" + liClassType + ">" +
                         "<div class='view'>" +
                         "<input class='toggle' type='checkbox'" + inputCheckType + ">" +
                        "<label>" + response[i].todo + "</label>" +
                        "<button class='destroy'></button> " +
                        "</div>" +
                        "</li>"
				);
				 $('.todo-count > strong').text($('.todo-list > li').length);
			}
		}, //end of success
	})

}*/

/*
//insert
$('.new-todo').keyup(function(e){
	if(e.keyCode==13){ //enter
		var todoData = new Object();

		var todoData.todo = $(this).val(); 

		if(todoData.todo==''){
			alert('empty todo');
			return;
		}

		$.ajax({
			type:"POST"
			url: "/api/todos"
			data: todoData.todo,
			success:function(data){
				console.log(data);
				todoData.id = data.id;
				todoData.completed = data.completed;

				if($('#all').hasClass('selected')||$('#active').hasClass('selected')){
					$('.todo-list').prepend('<li><div class="view" id="'+data.id+'"><input class="toggle" type="checkbox"><label>'+data.todo+'</label><button class="destroy"></button></div></li>');
				}
				console.log(data.length);
				$('.todo-count').attr('strong', data.length);
			}
		});


	}
});
*/


