package kr.or.connect.todo.api;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.setup.MockMvcBuilders.*;

import java.sql.Timestamp;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.context.WebApplicationContext;


@RunWith(SpringRunner.class)
@SpringBootTest
@WebAppConfiguration
public class TodoControllerTest {

	@Autowired
	WebApplicationContext wac;
	MockMvc mvc;
	
	@Before
	public void setUp() {
		this.mvc = webAppContextSetup(this.wac)
			.alwaysDo(print(System.out))
			.build();
	}
	
	@Test
	public void shouldCreate() throws Exception {
		String requestBody = "{\"todo\":\"할일1\", \"completed\":\"0\", \"date\":\"1496727924214\"}";
		mvc.perform(
			post("/api/todos/147")
				.contentType(MediaType.APPLICATION_JSON)
				.content(requestBody)
			)
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.id").exists())
			.andExpect(jsonPath("$.todo").value("할일1"))
			.andExpect(jsonPath("$.completed").value("0"))
			.andExpect(jsonPath("$.date").value("1496727924214"));
	}

	@Test
	public void shouldDelete() throws Exception{
		mvc.perform(
			delete("/api/todos/1")
				.contentType(MediaType.APPLICATION_JSON)
		)
		.andExpect(status().isNoContent());
	}
}
