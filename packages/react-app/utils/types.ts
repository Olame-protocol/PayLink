export type Client = {
  name: string;
  email: string;
  phone: string;
  service: string;
  owner: `0x${string}`;
};

export type PaymentLink = {
  id: string;
  payment_link_id: string;
  description: string;
  amount?: number;
};

export type Product = {
  name: string;
  quantity: number;
  price: number;
  description: string;
  owner: `0x${string}`;
};

export type Branding = {
  name: string;
  description: string;
  address: string;
  contact: string;
  owner: string;
  image: string;
};

export type SaveInvoice = {
  client: string;
  branding: string;
  product: string;
  due_date: string;
  amount: string;
  quantity: string;
  owner: string;
};

export type DetailedInvoice = {
  id: string;
  created_at: string;
  client: Client & { id: string };
  branding: Branding & { id: string };
  product: Product & { id: string };
  due_date: string;
  amount: string;
  quantity: string;
  sent: boolean;
  paid: boolean;
  owner: string;
};
