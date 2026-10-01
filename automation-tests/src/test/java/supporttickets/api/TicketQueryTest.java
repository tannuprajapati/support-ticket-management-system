package supporttickets.api;

import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class TicketQueryTest extends BaseApiTest {

    @Test
    public void shouldFilterTicketsByStatusAndPriority() {

        given()
                .queryParam("status", "OPEN")
                .queryParam("priority", "HIGH")
                .queryParam("page", 1)
                .queryParam("limit", 10)

        .when()
                .get("/tickets")

        .then()
                .statusCode(200)
                .body("success", equalTo(true))
                .body("data.tickets", notNullValue())
                .body("data.pagination", notNullValue());

    }
}