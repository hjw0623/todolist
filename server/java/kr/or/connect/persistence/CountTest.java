package kr.or.connect.persistence;

import static org.junit.Assert.*;

import org.junit.Test;
import org.junit.Before;
import org.junit.Test;
import static org.hamcrest.CoreMatchers.*;

import java.util.Properties;
public class CountTest {

	private int count = 0;
    @Before
    public void setUp() {
        System.out.print(count++);
    }

    @Test
    public void testPlus() {
        System.out.print(count++);
    }

    @Test
    public void increase (){
        System.out.print(count++);
    }

}
