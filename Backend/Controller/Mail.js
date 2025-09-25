import axios from "axios";
import nodemailer from "nodemailer";
import cron from "node-cron";
import User from "../Model/User.js";
import dotenv from "dotenv";
dotenv.config();
// Email transporter setup (use environment variables)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // App Password only!
  },
});

// Function to send an email
const sendEmail = async (email, contest) => {
  if (!email) {
    console.warn(
      `Skipping email for contest "${contest.contestName}" due to missing email.`
    );
    return;
  }

  const startTime = new Date(contest.contestStartDate).toLocaleString();

  const mailOptions = {
    from: `"Code Minder" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: `Reminder: ${contest.contestName} is happening tomorrow!`,
    text: `Hello,

Don't forget about the upcoming contest!

📅 Contest Name: ${contest.contestName}
⏰ Starts At: ${startTime}
🔗 Link: ${contest.contestUrl}

Good Luck!
    `,
    html: `
      <p>Hello,</p>
      <p>Don't forget about the upcoming contest!</p>
      <ul>
        <li><strong>📅 Contest Name:</strong> ${contest.contestName}</li>
        <li><strong>⏰ Starts At:</strong> ${startTime}</li>
        <li><strong>🔗 Link:</strong> <a href="${contest.contestUrl}">${contest.contestUrl}</a></li>
      </ul>
      <p>Good Luck!</p>
    `,
  };

  await transporter.sendMail(mailOptions);
  console.log(`Reminder email sent to ${email} for ${contest.contestName}`);
};

// Function to check contests happening tomorrow and send emails
const checkAndSendEmails = async () => {
  try {
    const users = await User.find({}, "email"); // Fetch all user emails
    if (!users?.length) {
      console.log("No users found to send emails.");
      return;
    }

    const { data } = await axios.get(
      "https://node.codolio.com/api/contest-calendar/v1/all/get-upcoming-contests"
    );

    const contests = data?.data || [];
    if (!contests.length) {
      console.log("No upcoming contests found.");
      return;
    }

    // Normalize today & tomorrow
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const tomorrowTime = tomorrow.getTime();

    const contestsTomorrow = contests.filter((contest) => {
      const contestDate = new Date(contest.contestStartDate);
      contestDate.setHours(0, 0, 0, 0);
      return contestDate.getTime() === tomorrowTime;
    });

    if (!contestsTomorrow.length) {
      console.log("No contests scheduled for tomorrow.");
      return;
    }

    // Send emails in parallel
    const emailPromises = [];
    contestsTomorrow.forEach((contest) => {
      users
        .filter((u) => u.email)
        .forEach((user) => {
          emailPromises.push(sendEmail(user.email, contest));
        });
    });

    const results = await Promise.allSettled(emailPromises);
    const failed = results.filter((r) => r.status === "rejected");
    if (failed.length) {
      console.error(`Failed to send ${failed.length} emails.`);
    }
  } catch (error) {
    console.error("Error in checkAndSendEmails:", error.message);
  }
};

// Schedule job to run at 9:00 AM daily
cron.schedule("0 9 * * *", checkAndSendEmails);

console.log("Email scheduler is running...");

export { checkAndSendEmails };
