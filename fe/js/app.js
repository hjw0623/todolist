(function (window) {
	'use strict';
	var URL = '/api/todos';
	//var TodoLeft = 0;
	var todo ;

	//Todo Object for update
	function TodoObj(id, todo, completed, date){
		this.id = id;
		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}

	//Delete 
	$('.todo-list').on("click", ".destroy", function(){
		//var todo = new Object();
		todo = $(this).parent();
		var deleteTarget = todo.get(0).id;
		var deleteUrl = URL+'/'+deleteTarget;
		doDelete (deleteUrl, todo);
		$(this).parents('li').remove();
	});
	function doDelete(deleteUrl, data){
		$.ajax({
			type:'DELETE',
			url: deleteUrl,
			success : function(element){
					getList(URL);
				}
		});
	}

	//완료 목록 전체 삭제 이벤트 처리
	$('.clear-completed').on("click", function(){

		$.ajax({
			type:'DELETE',
			url:URL,
			success:function(){
				getList(URL);
			}
		})

	})
	//Insert
	$('.new-todo').keyup(function(e){
		if(e.keyCode==13){ 
			console.log("enter pressed");
			var newTodoText = $('.new-todo').val(); //text input
			if(newTodoText != ''){
				//삽입할 Todo 객체
				var newTodo = new Object();
				newTodo.todo = newTodoText;
				var jsonData = JSON.stringify(newTodo); //json화 시킨다
				doInsert(URL, jsonData);
			}
		}
	});
	function doInsert(insertUrl, data){
		console.log("data:",data);
		$.ajax({
			method:"POST",
			url: insertUrl,
			contentType: "application/json; charset=utf-8",
			dataType: "json",
			data: data,
			success: function(){
					getList(URL);
			}	
		}).done(function(element){
			//clear .new-todo buffer 
			$('.new-todo').val(''); 
			var todo = new Object();
			todo.id = element.id;
			todo.todo = element.todo;
			todo.completed = element.completed;
			todo.date = element.date;
			//console.log(todo.date);
			//삽입시, 미완성 리스트이므로 All과 Active에서만 보이도록 집어넣는다.
			if($('#All').hasClass('selected')|| $('#Active').hasClass('selected')){
				var TXT = '<li><div class="view" id="' 
					+ todo.id + '"><input class="toggle" type="checkbox"><label>' 
					+ todo.todo + '</label><button class="destroy"></button></div></li>';

			$('.todo-list').append(TXT);
			var len = Number($('.todo-count').children('strong').text())+1;
			$('.todo-count').children('strong').text(len);

			}
			
		});
	
	} //end of Insert
	//Update
	$('.todo-list').on("click", ".toggle", function(){
		//console.log($(this));
		var $li = $(this).parents('li');
		var isCompleted = 0;
		var id =  $(this).parent().get(0).id;
		var td =  $li.text();

		if($(this).parents('li').hasClass("completed")){
			$(this).parents('li').removeClass("completed");
			$(this).prop("checked", false);
			isCompleted =0;
		}
		else{
			$(this).parents('li').addClass("completed");
			$(this).prop("checked", true);
			isCompleted=1;
		}
		var todo = new TodoObj(id,td, isCompleted,0);
		var jsonData = JSON.stringify(todo);
			$.ajax({
				method: "PUT",
				url: URL+'/'+id,
				data: jsonData,
				headers:{
	 					"Content-Type":"application/json"
				},
				success: function(){
					//doCheckFilter();			
					getList(URL);
				}
			});
	});
	
	//Filter
	//selectedFilter를 통해 현재 클릭된 a 태그의 href를 읽는다.
	//selectedFilter에 따라 전체 리스트를 filter를 통해 hide, show선택한다.
	//선택된 a태그에 class="selected"를 부여한다.
	$('.filters').on("click", "a", function(event){
		event.preventDefault(); //event cancel option
		var selectedFilter = $(this).attr("href");
		console.log(selectedFilter);
		//if completed selected,
		filterView(selectedFilter);
	});
	//삽입, 완료, 삭제시 filter를 체크한다.
	function doCheckFilter(){
		var selectedFilter;
		if($('#All').hasClass('selected')){
			selectedFilter ='#/';
		}else if($('#Active').hasClass('selected')){
			selectedFilter ='#/active';
		}else if($('#Completed').hasClass('selected')){
			selectedFilter = "#/completed";
		}
		filterView(selectedFilter);
	}
	//filter view - filter체크를 통해 분류한 리스트를 보여준다.
	function filterView(selectedFilter){
		$('.filters a').removeClass();
		if(selectedFilter ==="#/completed"){
			$('.todo-list').children('li').filter(function(){
				if($(this).hasClass("completed")){
					$(this).show();
				}else{
					$(this).hide();
				}
			});
			console.log($('.filters a'));
			$('#Completed').addClass('selected');
		}
		//if active selected,
		else if(selectedFilter==="#/active"){
			$('.todo-list').children('li').filter(function(){
				if($(this).hasClass("completed")){
					$(this).hide();
				}else{
					$(this).show();
				}
			});
			$('#Active').addClass('selected');
		}
		//show All
		else{
			$('.todo-list').children('li').filter(function(){
				$(this).show();
			});
			$('#All').addClass('selected');
		}
	}

	//Get List -- 모든 목록을 가져온다.
	function getList(listUrl){
		$.ajax({
			type:'GET',
			url: listUrl,
			success: function (list){
				$('.todo-list').empty();
				
				var todoCount = 0; //미완성 Todo를 카운트한다.

				$.each(list, function(){
					var element = $(this).get(0);
					var text;
					if(element.completed==1){
						text = '<li class="completed"><div class="view" id="' 
							+ element.id + '"><input class="toggle" type="checkbox" checked="checked"><label>' 
							+ element.todo + '</label><button class="destroy"></button></div></li>';
					}
					else{
						text = '<li><div class="view" id="' 
							+ element.id + '"><input class="toggle" type="checkbox"><label>' 
							+ element.todo + '</label><button class="destroy"></button></div></li>';
							todoCount++;
					}
					$('.todo-list').append(text);
					$('.todo-count').children('strong').text(todoCount);
				});

				//필터링 작업
				doCheckFilter();
			
			}, //end of success
		})
	}
	//초기 화면 혹은 새로고침 화면은 All로 한다. 
	getList(URL, 'All');

})(window);

