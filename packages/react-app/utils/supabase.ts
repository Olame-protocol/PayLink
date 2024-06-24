import { GlobalPaymentData } from "@/hooks/usePaylink";
import { createClient } from "@supabase/supabase-js";
import { Branding, Client, Product, SaveInvoice } from "./types";
import { uuid } from "uuidv4";

const FIXED_PAYMENT_LINKS_TABLE_NAME = "fixed_payment_links";
const GLOBAL_PAYMENT_LINKS_TABLE_NAME = "global_payment_links";
const FIXED_PAYMENTS_TABLE_NAME = "fixed_payments";
const GLOBAL_PAYMENTS_TABLE_NAME = "global_payments";
const PRODUCTS_TABLE_NAME = "products";
const CLIENT_TABLE_NAME = "clients";
const BRANDINGS_TABLE_NAME = "brandings";
const INVOICES_TABLE_NAME = "invoices";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export const saveGlobalPaymentLinks = async (
  data: GlobalPaymentData & {
    transactionHash: string;
    walletAddress: string;
  },
) => {
  const result = await supabase.from(GLOBAL_PAYMENT_LINKS_TABLE_NAME).insert({
    payment_link_id: data.paymentLinkId,
    transaction_hash: data.transactionHash,
    owner: data.walletAddress,
    description: data.description,
    has_expired: false,
  });

  return result;
};

export const retreivePaymentLinks = async (type: "global" | "fixed", walletAddress: string) => {
  const result = await supabase
    .from(type === "global" ? GLOBAL_PAYMENT_LINKS_TABLE_NAME : FIXED_PAYMENT_LINKS_TABLE_NAME)
    .select("*")
    .eq("owner", walletAddress);
  return result;
};

export const retreivePaymentLinksById = async (paymentId: string, type: "global" | "fixed") => {
  return await supabase
    .from(type === "global" ? GLOBAL_PAYMENT_LINKS_TABLE_NAME : FIXED_PAYMENT_LINKS_TABLE_NAME)
    .select("*")
    .eq("payment_link_id", paymentId);
};

export const savePaymentRecord = async (
  type: "global" | "fixed",
  data: {
    amount: string;
    transactionHash: string;
    paymentLinkId: string;
    from: `0x${string}`;
    to: `0x${string}`;
  },
) => {
  return await supabase.from(type === "global" ? GLOBAL_PAYMENTS_TABLE_NAME : FIXED_PAYMENTS_TABLE_NAME).insert({
    amount: data.amount,
    transaction_hash: data.transactionHash,
    payment_link_id: data.paymentLinkId,
    from: data.from,
    to: data.to,
  });
};

export const retreivePaymentRecord = async (type: "global" | "fixed", walletAddress: `0x${string}`) => {
  return await supabase
    .from(type === "global" ? GLOBAL_PAYMENTS_TABLE_NAME : FIXED_PAYMENTS_TABLE_NAME)
    .select("*")
    .eq("to", walletAddress);
};

export const saveFixedPaymentLinks = async (
  data: GlobalPaymentData & {
    transactionHash: string;
    walletAddress: string;
    amount: string;
  },
) => {
  const result = await supabase.from(FIXED_PAYMENT_LINKS_TABLE_NAME).insert({
    payment_link_id: data.paymentLinkId,
    transaction_hash: data.transactionHash,
    owner: data.walletAddress,
    description: data.description,
    has_expired: false,
    amount: data.amount,
  });

  return result;
};

export const updatedPaymentLinkStatus = async (type: "global" | "fixed", paymentLinkId: string) => {
  const result = await supabase
    .from(type === "global" ? GLOBAL_PAYMENT_LINKS_TABLE_NAME : FIXED_PAYMENT_LINKS_TABLE_NAME)
    .update({
      has_expired: true,
    })
    .eq("payment_link_id", paymentLinkId);
  return result;
};

export const saveClient = async (client: Client) => {
  return await supabase.from(CLIENT_TABLE_NAME).insert(client);
};

export const retreiveClients = (address: `0x${string}`) => {
  return supabase.from(CLIENT_TABLE_NAME).select<any, Client & { id: string }>("*").eq("owner", address);
};

export const saveProduct = (product: Product) => {
  return supabase.from(PRODUCTS_TABLE_NAME).insert(product);
};

export const retreiveProducts = (address: `0x${string}`) => {
  return supabase.from(PRODUCTS_TABLE_NAME).select<any, Product & { id: string }>("*").eq("owner", address);
};

export const saveBranding = (branding: Branding) => {
  return supabase.from(BRANDINGS_TABLE_NAME).insert(branding).select<any, Branding & { id: string }>();
};

export const updateBranding = (branding: Branding) => {
  return supabase.from(BRANDINGS_TABLE_NAME).update(branding).eq("owner", branding.owner);
};

export const retreiveBrandings = (address: `0x${string}`) => {
  return supabase.from(BRANDINGS_TABLE_NAME).select<any, Branding & { id: string }>("*").eq("owner", address);
};

export const saveBrandingImage = async (file: File) => {
  return await supabase.storage.from("images/brandings").upload(`branding-${uuid()}`, file);
};

export const saveInvoice = (invoice: SaveInvoice) => {
  return supabase.from(INVOICES_TABLE_NAME).insert(invoice).select();
};

export const updateInvoiceSentStatus = (invoiceId: string) => {
  return supabase.from(INVOICES_TABLE_NAME).update({ sent: true }).eq("id", invoiceId);
};

export const updateInvoicePaidStatus = (invoiceId: string) => {
  return supabase.from(INVOICES_TABLE_NAME).update({ paid: true }).eq("id", invoiceId);
};

export const deleteInvoice = (invoiceId: string) => {
  return supabase.from(INVOICES_TABLE_NAME).delete().eq("id", invoiceId);
};

export const retrieveInvoicesByWalletAddress = (address: `0x${string}`) => {
  return supabase.from(INVOICES_TABLE_NAME).select("*").eq("owner", address);
};

export const retreiveInvoiceByInvoiceId = (id: string) => {
  return supabase
    .from(INVOICES_TABLE_NAME)
    .select(
      `
    *,
    branding(*),
    client(*),
    product(*)
  `,
    )
    .eq("id", id);
};
