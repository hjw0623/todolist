(function (window) {
	'use strict';
	var URL = '/api/todos';

	var itemLeft=0; 
	var $todoList = $('.todo-list');
	// Your starting point. Enjoy the ride!
	//show current todoList
	
	//object 설정
	function ToDo(id, todo, completed, date){
		this.id = id;
		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}


	// todo-list 클래스의 하위 리스트 기본 포맷
    function getTodoListHtml(strCompleted, strChecked, strTodo){
         return '<li' + strCompleted
                 + '><div class="view"><input class="toggle" type="checkbox"'
                 + strChecked +'><label>' + strTodo
                 + '</label><button class="destroy"></button></div><input class="edit" value="Rule the web"></li>';
    }
    //초기화시 리스트 비우기
	function init(){
		$('.todo-list').empty();
	}
	init();

	//Todo 리스트 조회
	$.get(url, function(data){
		loadTodoAll(data);
	});

	function loadTodoAll(todoList){
		var i;
		for(i=0; i<todoList.length; i++){
			todo = new Todo(todoList[i].id, todoList[i].todo,
				todoList[i].completed, todoList[i].date);
			var isCompleted="";
			var isChecked ="";
			if(todo.completed === 1){
				isCompleted = ' class="completed"';
				isChecked = ' checked';
			}else{
				itemLeft++;
			}
			$todoList.append(getTodoListHtml(strCompleted, strChecked, todo.todo));
			$todoList.children().last().data("todo", todo);
			//남은 할일 
			$('.todo-count').children('strong').text(itemLeft); 
		}
	}
	loadTodoAll(URL); //페이지 시작시 DB의 리스트를 가져온다.
	// 할 일 등록하기
    // 할 일을 등록하는 input box가 있다.
    // 커서를 두고 입력한 후 enter키를 누른다.
    // 하단에 페이지 갱신 없이 글이 등록된다.
    // 빈 문자이면 등록되지 않는다.
    // 새로 고침을 해도 같아야 한다.
    $('.new-todo').keypress(function(e) {
         if (e.which == 13) {    // 엔터키 = 13
             var newTodoVal = $('.new-todo').val();  // 입력 값
             if(newTodoVal != ""){
                 var requestTodo = new RequestTodo(newTodoVal);  // 입력 값, false(완료X), 현재시간
                 var jsonData = JSON.stringify(requestTodo);
                 $.ajax({
                     method: "POST",
                     url: "/api/todo",
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     data: jsonData
                 }).done(function(data){
                     $('.new-todo').val(''); // input 텍스트 초기화
                     todo = new ToDo(data.id, data.todo, data.completed, data.date);
                     $todoList.prepend(getTodoListHtml("","",todo.todo));    // 리스트 삽입
                     $todoList.children().first().data("todo", todo);    // todo 데이터 저장
                     countItemLeft++;
                     $('.todo-count strong').text(itemLeft);    // 남은 할 일 갱신
                 });
             } else {
                 alert("Please write what you need to be done.");
             }
         }
     });




})(window);


/*
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

*/

	


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


