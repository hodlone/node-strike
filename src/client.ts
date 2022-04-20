import axios, { Axios, AxiosError, AxiosResponse } from 'axios';
import {
  CreateSubscriptionRequest,
  Event,
  FetchInvoicesResponse,
  GetEventsResponse,
  GetRatesResponse,
  GetSubscriptionsResponse,
  Invoice,
  NewInvoiceRequest,
  PublicProfile,
  Quote,
  UpdateSubscriptionRequest,
  WebhookSubscription,
} from './types';

export class NodeStrike {
  public baseUrl: string = 'https://api.strike.me';
  private client: Axios;

  /**
   * @param apiKey the strike secret token.
   * @param apiVersion (defaults to v1).
   */
  constructor(apiKey: string, apiVersion = 'v1') {
    this.baseUrl = 'https://api.strike.me/' + apiVersion;
    this.client = axios.create({
      baseURL: this.baseUrl,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * @returns a promise to a list of current rates.
   */
  async getRates(): Promise<GetRatesResponse> {
    const response: AxiosResponse = await this.client.get('/rates/ticker');

    return response.data;
  }

  /**
   * @param {string} id the profile's id.
   * @returns a promise to a user's public profile.
   */
  async fetchPublicProfileById(id: string): Promise<PublicProfile> {
    const response: AxiosResponse = await this.client.get(
      `/accounts/${id}/profile`
    );

    return response.data;
  }

  /**
   * @param handle the profile's handle.
   * @returns a promise to the user's public profile.
   */
  async fetchPublicProfileByHandle(handle: string): Promise<PublicProfile> {
    const response: AxiosResponse = await this.client.get(
      `/accounts/handle/${handle}/profile`
    );

    return response.data;
  }

  /**
   * @returns a promise to an array of events.
   */
  async getEvents(): Promise<GetEventsResponse> {
    try {
      const response: AxiosResponse = await this.client.get(`/events`);

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @param id the event id.
   * @returns a promise to an event.
   */
  async findEventById(id: string): Promise<Event> {
    try {
      const response: AxiosResponse = await this.client.get(`/events/${id}`);

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @returns a promise to an array of invoices.
   */
  async getInvoices(): Promise<FetchInvoicesResponse> {
    const response: AxiosResponse = await this.client.get('/invoices');

    return response.data;
  }

  /**
   * @param request the invoice request.
   * @returns a promise to the created invoice.
   */
  async newInvoice(request: NewInvoiceRequest): Promise<Invoice> {
    const response: AxiosResponse = await this.client.post(
      '/invoices',
      request
    );

    return response.data;
  }

  /**
   * @param id the invoice id
   * @returns a promise to an already created invoice.
   */
  async findInvoiceById(id: string): Promise<Invoice> {
    const response: AxiosResponse = await this.client.get(`invoices/${id}`);

    return response.data;
  }

  /**
   * @param handle the receiver's profile handle.
   * @returns a promise to the created invoice.
   */
  async newInvoiceForReceiver(
    handle: string,
    request: NewInvoiceRequest
  ): Promise<Invoice> {
    const response: AxiosResponse = await this.client.post(
      `/invoices/handle/${handle}`,
      request
    );

    return response.data;
  }

  /**
   * @param invoiceId the id of the invoice.
   * @returns a promise to a quote for the passed invoice.
   */
  async newQuote(invoiceId: string): Promise<Quote> {
    try {
      const response: AxiosResponse = await this.client.post(
        `/invoices/${invoiceId}/quote`
      );

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @param invoiceId the id of the invoice to be cancelled.
   * @returns a promise to the cancelled invoice.
   */
  async cancelInvoice(invoiceId: string): Promise<Invoice> {
    try {
      const response: AxiosResponse = await this.client.patch(
        `/invoices/${invoiceId}/cancel`
      );

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @returns a promise to an array of alreadt created webhook subscriptions.
   */
  async getSubscriptions(): Promise<GetSubscriptionsResponse> {
    try {
      const response: AxiosResponse = await this.client.get('/subscriptions');

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @param request the create subscription request.
   * @returns a promise to the created webhook subscription
   */
  async createSubscription(
    request: CreateSubscriptionRequest
  ): Promise<WebhookSubscription> {
    try {
      const response: AxiosResponse = await this.client.post(
        '/subscriptions',
        request
      );

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @param id the webhook subscription id.
   * @returns a promise to a webhook subscription.
   */
  async getSubscriptionById(id: string): Promise<WebhookSubscription> {
    try {
      const response: AxiosResponse = await this.client.get(
        `/subscriptions/${id}`
      );

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  /**
   * @param id the webhook subscription id.
   * @param request the request body.
   * @returns a promise to the udpated webhook subscription.
   */
  async updateSubscription(
    id: string,
    request: UpdateSubscriptionRequest
  ): Promise<WebhookSubscription> {
    try {
      const response: AxiosResponse = await this.client.patch(
        `/subscriptions/${id}`,
        request
      );

      return response.data;
    } catch (e) {
      this.extractErrorMessage(e);
    }
  }

  /**
   * @param id a webhook subscription id.
   * @returns a promise to void if succesful.
   */
  async deleteSubscription(id: string): Promise<void> {
    try {
      const response: AxiosResponse = await this.client.delete(
        `/subscriptions/${id}`
      );

      return response.data;
    } catch (error) {
      this.extractErrorMessage(error);
    }
  }

  extractErrorMessage(error: AxiosError) {
    const customError = new Error('Request Failed');

    if (error.response && error.response.data) {
      throw Object.assign(customError, error.response.data);
    }

    throw Object.assign(customError, {
      status: error.response.status,
      statusText: error.response.statusText,
    });
  }
}
