package kr.or.connect.persistence;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.domain.Book;

import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;

import kr.or.connect.AppConfig;
import kr.or.connect.persistence.BookDao;

@RunWith(SpringRunner.class)
@ContextConfiguration(classes = AppConfig.class)
@Transactional

public class BookDAOTest {
	@Autowired
	private BookDao dao;
	
	@Test
	public void shouldUpdate(){
		//Given 일단 추
		Book book = new Book("네이버 자바", "네이버", 142);
		Integer id = dao.insert(book);
		// When id와 타이틀 변경. affected는 updated된 row 개
		book.setId(id);
		book.setTitle("네이버 자바2");
		int affected = dao.update(book);
		
		// Then 업데이트 된 것이 1개 인지, 업데이트 된 title은 네이버 자바2 인지 확
		assertThat(affected, is(1));
		Book updated = dao.selectById(id);
		assertThat(updated.getTitle(), is("네이버 자바2"));
	}
	@Test
	public void shouldDelete() {
		// given
		Book book = new Book("네이버 자바", "네이버", 142);
		Integer id = dao.insert(book);

		// when
		int affected = dao.deleteById(id);

		// Then
		assertThat(affected, is(1));
	}
	
	@Test
	public void shouldCount() {
		int count = dao.countBooks();
		System.out.println(count);
	}
	@Test
	public void shouldInsertAndSelect(){
		//given
		Book book = new Book("Java 웹개발", "네이버", 342);
		//when
		Integer id = dao.insert(book);
		//then
		Book selected = dao.selectById(id);
		System.out.println(selected);
		assertThat(selected.getTitle(), is("Java 웹개발"));
	}
}
