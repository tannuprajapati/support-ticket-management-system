import PrismaPackage from "@prisma/client";

const { PrismaClient } = PrismaPackage;

const prisma = new PrismaClient();

const tickets = [
  {
    title: "Unable to reset account password",
    description:
      "Customer receives an error when trying to reset their account password.",
    customerEmail: "john.doe@example.com",
    priority: "HIGH",
    status: "OPEN",
  },

  {
    title: "Payment failed during checkout",
    description:
      "Customer reports that their card payment fails during checkout.",
    customerEmail: "sarah.wilson@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },

  {
    title: "Invoice download not working",
    description:
      "Customer cannot download the invoice from the billing section.",
    customerEmail: "michael.brown@example.com",
    priority: "MEDIUM",
    status: "OPEN",
  },

  {
    title: "Account email update request",
    description:
      "Customer wants to update the email address associated with their account.",
    customerEmail: "emma.davis@example.com",
    priority: "LOW",
    status: "RESOLVED",
  },

  {
    title: "Dashboard loading slowly",
    description:
      "Customer reports that the dashboard takes several seconds to load.",
    customerEmail: "alex.miller@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
  },

  {
    title: "Unable to upload profile image",
    description:
      "Profile image upload fails with an unexpected error message.",
    customerEmail: "olivia.taylor@example.com",
    priority: "LOW",
    status: "OPEN",
  },

  {
    title: "Subscription cancellation issue",
    description:
      "Customer is unable to cancel their current subscription.",
    customerEmail: "daniel.anderson@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },

  {
    title: "Incorrect billing amount",
    description:
      "Customer was charged a different amount than shown during checkout.",
    customerEmail: "sophia.thomas@example.com",
    priority: "HIGH",
    status: "OPEN",
  },

  {
    title: "Two-factor authentication problem",
    description:
      "Customer is not receiving the two-factor authentication code.",
    customerEmail: "william.jackson@example.com",
    priority: "HIGH",
    status: "RESOLVED",
  },

  {
    title: "Missing order confirmation email",
    description:
      "Customer completed an order but did not receive a confirmation email.",
    customerEmail: "ava.white@example.com",
    priority: "MEDIUM",
    status: "OPEN",
  },

  {
    title: "Mobile application crashes",
    description:
      "Customer reports that the mobile application crashes after login.",
    customerEmail: "james.harris@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },

  {
    title: "Change subscription plan",
    description:
      "Customer wants to upgrade from the basic subscription plan.",
    customerEmail: "isabella.martin@example.com",
    priority: "LOW",
    status: "RESOLVED",
  },

  {
    title: "Refund status request",
    description:
      "Customer is asking for an update regarding their refund.",
    customerEmail: "benjamin.thompson@example.com",
    priority: "MEDIUM",
    status: "OPEN",
  },

  {
    title: "Unable to access previous orders",
    description:
      "Previous orders are not appearing in the customer's account.",
    customerEmail: "mia.garcia@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
  },

  {
    title: "Promo code not applying",
    description:
      "Customer's promotional code is not being accepted at checkout.",
    customerEmail: "lucas.martinez@example.com",
    priority: "LOW",
    status: "RESOLVED",
  },

  {
    title: "Unexpected logout",
    description:
      "Customer is repeatedly logged out while using the application.",
    customerEmail: "charlotte.robinson@example.com",
    priority: "MEDIUM",
    status: "OPEN",
  },

  {
    title: "Shipping address cannot be changed",
    description:
      "Customer cannot update the shipping address for their order.",
    customerEmail: "henry.clark@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },

  {
    title: "Product search returns no results",
    description:
      "Customer reports that searching for existing products returns no results.",
    customerEmail: "amelia.rodriguez@example.com",
    priority: "MEDIUM",
    status: "RESOLVED",
  },

  {
    title: "Order appears duplicated",
    description:
      "Customer sees the same order listed twice in their order history.",
    customerEmail: "alexander.lewis@example.com",
    priority: "LOW",
    status: "OPEN",
  },

  {
    title: "Unable to update phone number",
    description:
      "Customer receives an error when updating their phone number.",
    customerEmail: "harper.lee@example.com",
    priority: "LOW",
    status: "RESOLVED",
  },

  {
    title: "Checkout page not loading",
    description:
      "Checkout page remains blank after selecting a product.",
    customerEmail: "sebastian.walker@example.com",
    priority: "HIGH",
    status: "OPEN",
  },

  {
    title: "Incorrect account name",
    description:
      "Customer's account displays an incorrect name.",
    customerEmail: "evelyn.hall@example.com",
    priority: "LOW",
    status: "RESOLVED",
  },

  {
    title: "Unable to add payment method",
    description:
      "Customer cannot save a new payment method.",
    customerEmail: "jack.allen@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },

  {
    title: "Notification preferences not saving",
    description:
      "Changes to notification preferences are not being saved.",
    customerEmail: "camila.young@example.com",
    priority: "LOW",
    status: "OPEN",
  },

  {
    title: "Order tracking information missing",
    description:
      "Customer cannot see tracking information for their shipment.",
    customerEmail: "matthew.king@example.com",
    priority: "MEDIUM",
    status: "RESOLVED",
  },

  {
    title: "Application shows incorrect currency",
    description:
      "Prices are displayed in the wrong currency for the customer.",
    customerEmail: "luna.wright@example.com",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
  },

  {
    title: "Customer cannot delete account",
    description:
      "Account deletion request fails with an error.",
    customerEmail: "david.scott@example.com",
    priority: "HIGH",
    status: "OPEN",
  },

  {
    title: "Missing product image",
    description:
      "One of the products is displayed without its product image.",
    customerEmail: "grace.green@example.com",
    priority: "LOW",
    status: "RESOLVED",
  },

  {
    title: "Login verification email delayed",
    description:
      "Customer reports a significant delay in receiving the login verification email.",
    customerEmail: "ethan.baker@example.com",
    priority: "MEDIUM",
    status: "OPEN",
  },

  {
    title: "Order cancellation request",
    description:
      "Customer wants to cancel an order that has not shipped yet.",
    customerEmail: "chloe.adams@example.com",
    priority: "HIGH",
    status: "IN_PROGRESS",
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing tickets so running the seed again
  // does not create duplicate records.
  await prisma.ticket.deleteMany();

  await prisma.ticket.createMany({
    data: tickets,
  });

  console.log(`Created ${tickets.length} tickets.`);
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });