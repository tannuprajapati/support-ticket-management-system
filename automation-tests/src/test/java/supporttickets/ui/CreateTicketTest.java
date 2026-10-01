package supporttickets.ui;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

public class CreateTicketTest extends BaseUiTest {

        @Test
        public void userShouldCreateTicket() {

                WebDriverWait wait = new WebDriverWait(
                                driver,
                                Duration.ofSeconds(20));

                // Wait until React dashboard is loaded.
                wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.xpath("//*[contains(text(),'Support Ticket Dashboard')]")));

                WebElement createTicketButton = wait.until(
                                ExpectedConditions.elementToBeClickable(
                                                By.xpath("//button[contains(normalize-space(), 'Create Ticket')]")));

                createTicketButton.click();

                // Wait for the create-ticket modal.
                WebElement title = wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.id("title")));

                title.sendKeys("Selenium Automated Support Ticket");

                // Customer email
                WebElement email = wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.id("customerEmail")));

                email.sendKeys("selenium.test@example.com");

                // Description
                WebElement description = wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.id("description")));

                description.sendKeys(
                                "This ticket was created automatically using Selenium.");

                // Select HIGH priority.
                WebElement highPriority = wait.until(
                                ExpectedConditions.elementToBeClickable(
                                                By.xpath(
                                                                "//button[normalize-space()='HIGH']")));

                highPriority.click();

                WebElement submitButton = wait.until(
                                ExpectedConditions.elementToBeClickable(
                                                By.cssSelector("button[type='submit']")));

                submitButton.click();

                // Wait for the modal to disappear.
                wait.until(
                                ExpectedConditions.invisibilityOfElementLocated(
                                                By.id("title")));

                // Verify that the created ticket appears.
                WebElement createdTicket = wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.xpath(
                                                                "//*[contains(text(),'Selenium Automated Support Ticket')]")));

                Assert.assertTrue(
                                createdTicket.isDisplayed(),
                                "Created ticket should appear on the dashboard");
        }
}