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
