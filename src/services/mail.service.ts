import fs from "fs";
import nodemailer, { SendMailOptions, Transporter } from "nodemailer";
import path from "path";

import config from "../config";

export interface MailOptions {
  replacements?: Record<string, string>;
  subject: string;
  template: string;
  to: string | string[];
}

class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      auth: {
        pass: config.MAIL.AUTH_PASSWORD || "password",
        user: config.MAIL.AUTH_USER || "username",
      },
      host: config.MAIL.HOST,
      port: Number(config.MAIL.PORT) || 587,
      secure: config.MAIL.SECURE, // true for 465, false for other ports
    });

    this.transporter.verify((error, _) => {
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
      html: htmlContent,
      subject: options.subject,
      to: options.to,
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

const fillTemplate = (template: string, replacements: Record<string, string> | undefined) => {
  let templateFile = fs.readFileSync(path.resolve(__dirname, `../templates/${template}.html`), "utf-8");

  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, "g");
    templateFile = templateFile.replace(regex, replacements[key]);
  }

  return templateFile;
};

export default new MailService();
