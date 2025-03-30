import nodemailer, { Transporter, SendMailOptions } from "nodemailer";
import config from "../config";
import fs from "fs";
import path from "path";

export interface MailOptions {
  to: string | string[];
  subject: string;
  template: string;
  replacements?: Record<string, string>;
}

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.MAIL.HOST,
      port: Number(config.MAIL.PORT) || 587,
      secure: config.MAIL.SECURE, // true for 465, false for other ports
      auth: {
        user: config.MAIL.AUTH_USER || "username",
        pass: config.MAIL.AUTH_PASSWORD || "password",
      },
    });

    this.transporter.verify((error, success) => {
      if (error) {
        console.error("Error connecting to the SMTP server:", error);
      } else {
        console.log("SMTP server is ready to take messages.");
      }
    });
  }

  public async sendEmail(options: MailOptions): Promise<void> {
    const htmlContent = fillTemplate(options.template, options.replacements);

    const mailOptions: SendMailOptions = {
      from: config.MAIL.FROM,
      to: options.to,
      subject: options.subject,
      html: htmlContent,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.info(`Email sent successfully: ${info.messageId}`);
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }
}

const fillTemplate = (
  template: string,
  replacements: Record<string, string>,
) => {
  let templateFile = fs.readFileSync(
    path.resolve(__dirname, `../templates/${template}.html`),
    "utf-8",
  );

  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, "g");
    templateFile = templateFile.replace(regex, replacements[key]);
  }

  return templateFile;
};

export default new MailService();
