import {
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import axios from "axios";

@Injectable()
export class NotificationService {
  private readonly brevoApiUrl =
    "https://api.brevo.com/v3/smtp/email";
  private readonly apiKey: string;
  private readonly senderEmail: string;
  private readonly senderName: string;

  constructor() {
    // Inicializa as variáveis de ambiente
    this.apiKey = process.env.BREVO_API_KEY || "";
    this.senderEmail =
      process.env.BREVO_SENDER_EMAIL ||
      "pedrohenriquesj.pro@gmail.com";
    this.senderName = process.env.BREVO_SENDER_NAME || "Example App";

    if (!this.apiKey) {
      throw new Error(
        "BREVO_API_KEY is not defined in environment variables",
      );
    }
  }

  async sendEmail(
    to: string,
    subject: string,
    htmlContent: string,
    name?: string,
  ): Promise<void> {
    const payload = {
      sender: {
        name: this.senderName,
        email: this.senderEmail,
      },
      to: [
        {
          email: to,
          name: name ?? to.split("@")[0], // Usa o nome antes do "@" como nome do destinatário
        },
      ],
      subject: subject,
      htmlContent: htmlContent,
    };

    try {
      const response = await axios.post(this.brevoApiUrl, payload, {
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": this.apiKey,
        },
      });

      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.message,
      );
      throw new InternalServerErrorException("Failed to send email");
    }
  }

  async sendAccountConfirmationEmail(
    to: string,
    token: string,
  ): Promise<void> {
    const subject = "Account Confirmation";
    const htmlContent = `
      <h1>Account Confirmation</h1>
      <p>Click <a href="${process.env.SERVER_URL}/api/user/account-confirmation/${token}">here</a> to confirm your account</p>
    `;

    await this.sendEmail(to, subject, htmlContent);
  }
}
