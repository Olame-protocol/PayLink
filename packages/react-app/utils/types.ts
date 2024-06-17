export type Client = {
  name: string;
  email: string;
  phone: string;
  service: string;
  owner: `0x${string}`;
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
};
