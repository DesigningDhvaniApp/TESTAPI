import axios from "axios";
import {
  CreatePayment,
  CreatePaymentJsonInput,
} from "../types/interfaces/IPaypal";
import Logger from "../logger";
import { DateTime } from "luxon";
import config from "../config";

class PaypalService {
  private clientId: string;
  private clientSecret: string;
  private baseUrl: string;

  constructor(clientId: string, clientSecret: string, baseUrl: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.baseUrl = baseUrl;
  }

  public createPaymentJson = (input: CreatePaymentJsonInput): CreatePayment => {
    return {
      intent: "CAPTURE",
      purchase_units: [
        {
          reference_id: crypto.randomUUID(),
          amount: {
            currency_code: input.currency,
            value: input.amount?.toString(),
          },
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            brand_name: "Dhvani Foundation",
            locale: "en-US",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: input.returnUrl,
            cancel_url: input.cancelUrl,
          },
        },
      },
    };
  };

  private async getAccessToken(): Promise<string> {
    const url = `${this.baseUrl}/v1/oauth2/token`;
    const auth = Buffer.from(`${this.clientId}:${this.clientSecret}`).toString(
      "base64",
    );

    const params = new URLSearchParams();
    params.append("grant_type", "client_credentials");

    try {
      const headers = {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "PayPal-Request-Id": crypto.randomUUID(),
          Authorization: `Basic ${auth}`,
        },
      };

      const response = await axios.post(url, params.toString(), headers);
      return response.data.access_token;
    } catch (error: any) {
      const err = error.response?.data || error.message;
      Logger.error("Failed to get PayPal access token:", err);
      throw error;
    }
  }

  public async createPayment(
    paymentRequest: CreatePayment,
  ): Promise<string | null> {
    try {
      const accessToken = await this.getAccessToken();

      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const url = `${this.baseUrl}/v2/checkout/orders`;
      const response = await axios.post(url, paymentRequest, headers);

      const links: Record<string, string>[] = response.data.links || [];
      console.log(links);
      return links.find((link) => link.rel === "payer-action")?.href || null;
    } catch (error: any) {
      const err = error.response?.data || error.message;
      Logger.error("Failed to create payment:", err);
      throw error;
    }
  }

  public async capturePayment(
    orderId: string,
  ): Promise<{ orderId: string; createdDate: DateTime }> {
    try {
      const accessToken = await this.getAccessToken();

      const headers = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const url = `${this.baseUrl}/v2/checkout/orders/${orderId}/capture`;
      const response = await axios.post(url, {}, headers);
      const captureTime =
        response.data.purchase_units[0]?.payments?.captures[0]?.create_time;

      return {
        orderId: response.data.id,
        createdDate: DateTime.fromISO(captureTime, { zone: "utc" }),
      };
    } catch (error: any) {
      const err = error.response?.data || error.message;
      Logger.error("Failed to capture payment:", err);
      throw error;
    }
  }
}

const { CLIENT_ID, CLIENT_SECRET, API } = config.PAYPAL;

export default new PaypalService(CLIENT_ID, CLIENT_SECRET, API);
