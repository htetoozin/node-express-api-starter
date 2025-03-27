import nodemailer from "nodemailer";
import MarkDownIt from "markdown-it";
import { mail } from "../config/mail";

const md = new MarkDownIt({
  html: true,
  linkify: true,
  typographer: true,
});

const htmlTemplate = ({
  name,
  title,
  description,
}: {
  name: string;
  title: string;
  description: string;
}) => {
  return `
<div style="text-align: center;">
  <h1>🚀 ${title} 🚀</h1>
  <p>Hello ${name},</p>
  <p>${description}</p>
</div>

<hr/>

<div style="text-align: center;">
  <p>Made With ❤️ by <strong>Htet Oo Zin</strong></p>
</div>
`;
};

/**
 * Send email
 *
 * @param email
 * @param subject
 * @param title
 * @param description
 */
export const sendEmail = async (
  email: string,
  subject: string,
  name: string = "John Doe",
  title: string = "Welcome to Node Express Typescript Starter!",
  description: string = "Welcome to Node Description"
) => {
  const htmlContent = md.render(htmlTemplate({ name, title, description }));

  try {
    const transporter = nodemailer.createTransport({
      host: mail.host,
      port: mail.port,
      secure: mail.secure,
      auth: {
        user: mail.username,
        pass: mail.password,
      },
    });

    const info = await transporter.sendMail({
      from: mail.address,
      to: email,
      subject,
      text: description,
      html: htmlContent,
    });

    console.log("Email sent successfully", info.messageId);
    return info;
  } catch (error) {
    console.log(error, "error");
  }
};
