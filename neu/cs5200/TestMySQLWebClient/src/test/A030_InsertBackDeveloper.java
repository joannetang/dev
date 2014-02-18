package test;

import java.sql.*;

import sun.font.CreatedFontTracker;

public class A030_InsertBackDeveloper {

	public static void main(String[] args) {

		Connection conn = null;
		try {
			
			String url = "jdbc:mysql://localhost/wam";
			Class.forName ("com.mysql.jdbc.Driver").newInstance();
			conn = DriverManager.getConnection (url, "root", null);
			
			// @new
			String insertDeveloperSql = "INSERT INTO DEVELOPER VALUES (6, 'Edward', 'Norton');";
			Statement stmt = conn.createStatement();
			stmt.executeUpdate(insertDeveloperSql);
			
		} catch(Exception e) {
			e.printStackTrace();
		} finally {
			try {
				conn.close();
			} catch(Exception e) {
				e.printStackTrace();
			}
		}
	}

}
