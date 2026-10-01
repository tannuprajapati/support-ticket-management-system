package supporttickets.ui;

import org.testng.Assert;
import org.testng.annotations.Test;

public class DashboardTest extends BaseUiTest {

    @Test
    public void dashboardShouldLoadSuccessfully() {

        String pageTitle = driver.getTitle();

        Assert.assertNotNull(pageTitle);

        String pageSource =
                driver.getPageSource();

        Assert.assertTrue(
                pageSource.contains(
                        "Support Ticket Dashboard"
                )
        );

        Assert.assertTrue(
                pageSource.contains("Create Ticket")
        );
    }
}