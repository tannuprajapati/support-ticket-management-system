package supporttickets.api;

import io.restassured.http.ContentType;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class TicketValidationTest extends BaseApiTest {

    @Test
    public void shouldRejectInvalidEmail() {

        String requestBody = """
                {
                    "title": "Invalid email test",
                    "description": "Testing backend validation",
                    "customerEmail": "invalid-email",
                    "priority": "HIGH",
                    "status": "OPEN"
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(requestBody)
        .when()
                .post("/tickets")
        .then()
                .statusCode(400)
                .body("success", equalTo(false));

    }
}