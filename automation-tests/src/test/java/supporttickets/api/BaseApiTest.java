package supporttickets.api;

import io.restassured.RestAssured;
import org.testng.annotations.BeforeClass;

public class BaseApiTest {

    protected static final String BASE_URL =
            "http://localhost:5000/api";

    @BeforeClass
    public void setup() {

        RestAssured.baseURI = BASE_URL;

    }
}