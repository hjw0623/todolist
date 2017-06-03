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
				"SELECT *  FROM todo";
	
	//UPDATE query
	 static final String UPDATE =
			"UPDATE todo SET\n"
			+ "todo = :todo,"
			+ "completed = :completed\n"
			+ "WHERE id = :id" ;
	
	//getter
	public static String getSelectAll() {
		return SELECT_ALL;
	}
	public static String getDeleteById() {
		return DELETE_BY_ID;
	}
	public static String getSelectById() {
		return SELECT_BY_ID;
	}
	public static String getUpdate() {
		return UPDATE;
	}
	
}
