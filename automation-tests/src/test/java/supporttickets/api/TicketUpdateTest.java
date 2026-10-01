package supporttickets.api;

import io.restassured.http.ContentType;
import io.restassured.response.Response;
import org.testng.annotations.Test;

import static io.restassured.RestAssured.*;
import static org.hamcrest.Matchers.*;

public class TicketUpdateTest extends BaseApiTest {

    @Test
    public void shouldUpdateTicketStatusAndPriority() {

        // Get an existing ticket from the database.
        Response response =
                given()
                .queryParam("page", 1)
                .queryParam("limit", 1)

                .when()
                .get("/tickets")

                .then()
                .statusCode(200)
                .extract()
                .response();

        int ticketId =
                response
                .jsonPath()
                .getInt("data.tickets[0].id");

        String requestBody = """
                {
                    "status": "RESOLVED",
                    "priority": "HIGH"
                }
                """;

        given()
                .contentType(ContentType.JSON)
                .body(requestBody)

        .when()
                .patch("/tickets/" + ticketId)

        .then()
                .statusCode(200)
                .body("success", equalTo(true))
                .body("data.status", equalTo("RESOLVED"))
                .body("data.priority", equalTo("HIGH"));
    }
}