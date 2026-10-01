package supporttickets.ui;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.Test;

public class TicketUpdateUITest extends BaseUiTest {

        @Test
        public void userShouldUpdateTicket() {

                WebDriverWait wait = new WebDriverWait(
                                driver,
                                Duration.ofSeconds(20));

                JavascriptExecutor js = (JavascriptExecutor) driver;

                wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.xpath("//h1[contains(normalize-space(), 'Support Ticket Dashboard')]")));

                js.executeScript("window.scrollBy(0, 500);");

                WebElement firstTicket = wait.until(
                                ExpectedConditions.presenceOfElementLocated(
                                                By.cssSelector("tbody tr:first-child")));

                js.executeScript(
                                "arguments[0].scrollIntoView({block:'center'});",
                                firstTicket);

                wait.until(
                                ExpectedConditions.elementToBeClickable(firstTicket));

                firstTicket.click();

                WebElement statusElement = wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.id("status")));

                WebElement priorityElement = wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.id("priority")));

                Select status = new Select(statusElement);
                status.selectByValue("IN_PROGRESS");

                Select priority = new Select(priorityElement);
                priority.selectByValue("HIGH");

                WebElement saveButton = wait.until(
                                ExpectedConditions.elementToBeClickable(
                                                By.xpath("//button[normalize-space()='Save Changes']")));

                saveButton.click();
                WebElement backToDashboardButton = wait.until(
                                ExpectedConditions.elementToBeClickable(
                                                By.xpath("//button[contains(normalize-space(), 'Back to Dashboard')]")));

                backToDashboardButton.click();

                wait.until(
                                ExpectedConditions.invisibilityOfElementLocated(
                                                By.xpath("//button[normalize-space()='Back to Dashboard']")));

                wait.until(
                                ExpectedConditions.visibilityOfElementLocated(
                                                By.xpath("//h1[normalize-space()='Support Ticket Dashboard']")));

                js.executeScript("window.scrollBy(0, 500);");

                WebElement firstTicketAgain = wait.until(
                                ExpectedConditions.presenceOfElementLocated(
                                                By.cssSelector("tbody tr:first-child")));

                js.executeScript(
                                "arguments[0].scrollIntoView({block:'center'});",
                                firstTicketAgain);

                wait.until(
                                ExpectedConditions.elementToBeClickable(firstTicketAgain));

                firstTicketAgain.click();

                Select persistedStatus = new Select(
                                wait.until(
                                                ExpectedConditions.visibilityOfElementLocated(
                                                                By.id("status"))));

                Select persistedPriority = new Select(
                                wait.until(
                                                ExpectedConditions.visibilityOfElementLocated(
                                                                By.id("priority"))));

                Assert.assertEquals(
                                persistedStatus
                                                .getFirstSelectedOption()
                                                .getAttribute("value"),
                                "IN_PROGRESS",
                                "Status was not persisted");

                Assert.assertEquals(
                                persistedPriority
                                                .getFirstSelectedOption()
                                                .getAttribute("value"),
                                "HIGH",
                                "Priority was not persisted");
        }
}