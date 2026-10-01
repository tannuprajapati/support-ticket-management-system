package supporttickets.ui;

import java.time.Duration;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;

public class BaseUiTest {

    protected WebDriver driver;
    protected WebDriverWait wait;

    protected static final String BASE_URL =
            "http://localhost:5173";

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts()
                .implicitlyWait(Duration.ofSeconds(2));

        wait = new WebDriverWait(
                driver,
                Duration.ofSeconds(30)
        );

        // Open frontend.
        driver.get(BASE_URL);

        // Give Vite/React time to initialize.
        wait.until(webDriver ->
                webDriver.getCurrentUrl()
                        .startsWith(BASE_URL)
        );

        // Print what Selenium actually loaded.
        System.out.println(
                "========================================"
        );

        System.out.println(
                "Selenium URL: " + driver.getCurrentUrl()
        );

        System.out.println(
                "Page title: " + driver.getTitle()
        );

        System.out.println(
                "Page source length: " +
                driver.getPageSource().length()
        );

        System.out.println(
                "========================================"
        );
    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }
    }
}