export type InvoiceState = 'UNPAID' | 'PAID' | 'CANCELLED' | 'PENDING';
export type EventTypes = "invoice.created" | "invoice.updated";
export type Currencies = "BTC" | "USD" | "EUR" | "USDT" | "GBP";

export interface NewInvoiceRequest {
  correlationId?: string;
  description?: string;
  amount: {
    currency: Currencies;
    amount: string;
  };
}

export interface CreateSubscriptionRequest {
  webhookUrl: string;
  webhookVersion: "v1";
  secret: string;
  enabled: boolean;
  eventTypes: EventTypes[];
}

export interface Rate {
  amount: string;
  sourceCurrency: Currencies;
  targetCurrency: Currencies;
}

export interface GetRatesResponse extends Array<Rate> {}

export interface PublicProfile {
  handle: string;
  avatarUrl: string;
  description: string;
  canReceive: boolean;
  currencies: {
    currency: Currencies;
    isDefaultCurrency: boolean;
    isAvailable: boolean;
    isInvoiceable: boolean;
  }[];
}

export interface Event {
  id: string;
  eventType: string;
  webhookVersion: 'v1';
  data: any;
  created: string;
  deliverySuccess: boolean
}

export interface GetEventsResponse {
  items: Event[];
  count: number
}

export interface Invoice {
  invoiceId: string;
  amount: {
    currency: Currencies;
    amount: string
  };
  state: InvoiceState;
  created: string;
  correlationId: string;
  description: string;
  issuerId: string;
  receiverId: string
}

export interface FetchInvoicesResponse {
  items: Invoice[];
  count: number;
}

export interface Quote {
  quoteId: string;
  description: string;
  lnInvoice: string;
  onchainAddress: string;
  expiration: string;
  expirationInSec: number;
  targetAmount: {
    currency: Currencies;
    amount: string
  };
  sourceAmount: {
    currency: Currencies;
    amount: string
  };
  conversionRate: {
    amount: string;
    sourceCurrency: Currencies;
    targetCurrency: Currencies
  }
}

export interface WebhookSubscription {
  id: string;
  webhookUrl: string;
  webhookVersion: 'v1';
  enabled: boolean;
  created: string;
  eventTypes: EventTypes[];
}

export interface UpdateSubscriptionRequest {
  webhookUrl?: string;
  webhookVersion?: 'v1';
  enabled?: boolean;
  created?: string;
  eventTypes?: EventTypes[];
}

export interface GetSubscriptionsResponse {
  items: WebhookSubscription[];
  count: number;
}
