import static com.jayway.restassured.RestAssured.expect;
import static org.hamcrest.Matchers.equalTo;

import org.junit.Test;

public class StatusResourceIT extends AbstractJettyTest {

    @Test
    public void shouldInvokeJsonStatusResource() {
        expect().body("value", equalTo("StatusResource::Status:OK"))
                .when()
                .get("/status/json");
    }
}
