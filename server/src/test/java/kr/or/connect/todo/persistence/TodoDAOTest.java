package kr.or.connect.todo.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;


import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import java.sql.Timestamp;
import java.util.List;
import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TodoDAOTest {
	@Autowired
	private TodoDao dao;
	
	@Test
	public void shouldfindAll(){
		List<Todo> allTodos = dao.selectAll();
		assertThat(allTodos, is(notNullValue()));
	}
	@Test
	public void shouldUpdate(){
		//given
		Todo todo = new Todo("할일2",0, new Timestamp(System.currentTimeMillis()) );
		Integer id = dao.insert(todo);
		todo.setId(id);
		//check When completed is updated
		todo.setCompleted(1);
		int affected = dao.update(todo);
		
		//update 확인
		assertThat(affected, is(1));
		Todo updated = dao.selectById(id);
		assertThat(updated.getCompleted(), is(1));
	}
	@Test
	public void shouldDelete(){
		//given
		Todo todo = new Todo("할일3",0, new Timestamp(System.currentTimeMillis()) );
		Integer id = dao.insert(todo);
		
		//when
		int affected = dao.deleteById(id);
		
		//Then
		assertThat(affected, is(1));
	}
	@Test
	public void shouldInsertAndSelect(){
		//given
		Todo todo = new Todo("할일0",0, new Timestamp(System.currentTimeMillis()) );
		//when
		Integer id = dao.insert(todo);
		//then
		Todo selected = dao.selectById(id);
		System.out.println(selected);
		assertThat(selected.getTodo(), is("할일0"));
	}
	@Test
	public void shouldDeleteCompleted(){
		//given
		Todo todo = new Todo("할일3",1, new Timestamp(System.currentTimeMillis()) );
		Todo todo2 = new Todo("할일4",1, new Timestamp(System.currentTimeMillis()) );
		//when
		Integer id = dao.insert(todo);
		Integer id2 = dao.insert(todo2);
		//then
		int affected = dao.deleteByCompleted();
		System.out.println(todo);
		System.out.println(todo2);
		assertThat(affected, is(2)); //DB에 기존에 저장된 completed==1인게 없다면 정상통과한다.
	}
}
