package kr.or.connect.todo.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	@Autowired
	static TodoDao dao; //TodoDao injection
	//  /api/todos/{id}의 경로에 REST 스타일로 수정, 삭제 API를 구현
	//update query
	public TodoService(TodoDao dao){
		this.dao = dao;
	}
	public boolean update(Todo todo){
		int affected = dao.update(todo);
		return affected==1;
		
	}
	//delete query
	public boolean delete(Integer id){
		int affected = dao.deleteById(id);
		return affected == 1;
	}
	//select id query
	public Todo findById(Integer id){
		return dao.selectById(id);
	}
	//select all query
	public List<Todo> findAll(){
		return dao.selectAll();
	}
	
	//
	public Todo create(Todo todo){
		Integer id = dao.insert(todo);
		todo.setId(id);
		return todo;
	}
}
