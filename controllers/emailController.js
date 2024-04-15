const nodemailer = require('nodemailer');
const cron = require('node-cron');
const sequelize = require('../utils/sequelize');

// Send Mail
exports.sendMail = async (req, res) => {
    const { email, subject, message } = req.body;
    const attachment = req.file;

    console.log(req.body);

    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: subject || "Sending Email With React And Nodejs",
            html: `<h1>${message}</h1>`
        };

        if (attachment) {
            const attachmentTypes = ['jpg', 'jpeg', 'png', 'pdf', 'xlsx'];
            const attachmentSizeLimit = {
                'jpg': 6 * 1024 * 1024, // 6 MB
                'jpeg': 6 * 1024 * 1024, // 6 MB
                'png': 6 * 1024 * 1024, // 6 MB
                'pdf': 6 * 1024 * 1024, // 6 MB
                'xlsx': 10 * 1024 * 1024 // 10 MB
            };

            if (attachmentTypes.includes(attachment.type) && attachment.size <= attachmentSizeLimit[attachment.type]) {
                mailOptions.attachments = [{
                    filename: attachment.name,
                    content: attachment.content
                }];
            } else {
                throw new Error('Invalid attachment type or size.');
            }
        }

        // Send mail
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent:", info.response);
        res.status(201).json({ status: 201, info });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).json({ status: 400, error: error.message });
    }
};

const sendMailWithCount = async (count) => {
  try {
      const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD
          }
      });

      // Construct mail options
      const mailOptions = {
          from: process.env.EMAIL,
          to: process.env.EMAIL, 
          subject: "Email Count",
          html: `<h1>Number of emails sent: ${count}</h1>`
      };

      // Send mail
      return await transporter.sendMail(mailOptions);
  } catch (error) {
      throw new Error("Error sending email: " + error.message);
  }
};

// Schedule cron job to send email with count every 5 minutes
cron.schedule('*/1 * * * *', async () => {
  try {
      // Update the email count in the database
      const [result, metadata] = await sequelize.query('UPDATE emailcount SET emailCount = emailCount + 1');
      
      // Check if the update was successful
      if (metadata && metadata.changedRows > 0) {
          // Fetch the updated email count from the database
          const [countResult, countMetadata] = await sequelize.query('SELECT emailCount FROM emailcount');
          const count = countResult[0].emailCount;

          // Send email with the updated count
          const info = await sendMailWithCount(count);
          console.log(`Email sent with count ${count}:`, info.response);
      } else {
          throw new Error("Failed to update email count in the database.");
      }
  } catch (error) {
      console.error("Error sending email:", error);
  }
});

// Endpoint to sending email with count
exports.sendMailCount = async (req, res) => {
  try {
      // Fetch email count from the database
      const [emailCount, metadata] = await sequelize.query('SELECT emailCount FROM emailcount');
      
      // Check if the query returned any result
      if (emailCount && emailCount.length > 0) {
          const count = emailCount[0].emailCount;

          // Send email with the count
          const info = await sendMailWithCount(count);
          console.log(`Email sent with count ${count}:`, info.response);

          res.status(201).json({ status: 201, message: "Success" });
      } else {
          throw new Error("No email count found in the database.");
      }
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(400).json({ status: 400, error: error.message });
  }
};


// Endpoint to sending email with count
exports.sendMailCount = async (req, res) => {
  try {
      // Fetch email count from the database
      const emailCount = await sequelize.query('SELECT emailCount FROM emailcount', { type: sequelize.QueryTypes.SELECT });
      const count = emailCount[0].emailCount;

      // Send email with the count
      const info = await sendMailWithCount(count);

      console.log(`Email sent with count ${count}:`, info.response);

      res.status(201).json({ status: 201, message: "Success" });
  } catch (error) {
      console.error("Error sending email:", error);
      res.status(400).json({ status: 400, error: error.message });
  }
};
