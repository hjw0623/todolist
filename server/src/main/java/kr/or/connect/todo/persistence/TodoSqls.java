package kr.or.connect.todo.persistence;

public class TodoSqls {
	//DELETE query
	static final String DELETE_BY_ID =
			"DELETE FROM todo WHERE id= :id";
	//DELETE by completed
	static final String DELETE_BY_COMPLETED=
			"DELETE FROM todo WHERE completed= :completed" ; 
	//select query by id
	static final String SELECT_BY_ID =
			"SELECT id, todo, completed, date FROM todo WHERE id= :id";
	//SELECT All query
	 static final String SELECT_ALL =
			"SELECT id, todo, completed, date  FROM todo";
	
	//UPDATE query
	 static final String UPDATE =
			"UPDATE todo SET\n"
			+ "completed = :completed\n"
			+ "WHERE id = :id" ;
}
