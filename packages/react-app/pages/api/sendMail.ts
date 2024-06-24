import type { NextApiRequest, NextApiResponse } from "next";
import { MailerSend, EmailParams, Recipient } from "mailersend";
import { DetailedInvoice } from "@/utils/types";
import { FRONTEND_URL } from "@/utils/const";

const mailersend = new MailerSend({
  apiKey: process.env.SEND_MAILER_API_KEY ?? "",
});

type Data = {
  invoice: DetailedInvoice & { invoicePaymentLink: string };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = JSON.parse(req.body) as Data;
  console.log({ body });
  const recipients = [new Recipient(body.invoice.client.email, body.invoice.client.name)];

  const variables = [
    {
      email: body.invoice.client.email,
      substitutions: [
        {
          var: "clientName",
          value: body.invoice.client.name,
        },
        {
          var: "clientEmail",
          value: body.invoice.client.email,
        },
        {
          var: "invoiceDate",
          value: body.invoice.created_at.split("T")[0],
        },
        {
          var: "productName",
          value: body.invoice.product.name,
        },
        {
          var: "brandingName",
          value: body.invoice.branding.name,
        },
        {
          var: "productPrice",
          value: body.invoice.product.price.toString(),
        },
        {
          var: "brandingImage",
          value: body.invoice.branding.image,
        },
        {
          var: "invoiceAmount",
          value: body.invoice.amount,
        },
        {
          var: "walletAddress",
          value: body.invoice.owner || "0x000000000000000000000000000000",
        },
        {
          var: "paymentDueDate",
          value: body.invoice.due_date.split("T")[0],
        },
        {
          var: "brandingAddress",
          value: body.invoice.branding.address,
        },
        {
          var: "brandingContact",
          value: body.invoice.branding.contact,
        },
        {
          var: "invoiceQuantity",
          value: body.invoice.quantity,
        },
        {
          var: "invoiceDescription",
          value: body.invoice.product.description,
        },
        {
          var: "invoicePaymentLink",
          value: body.invoice.invoicePaymentLink,
        },
        {
          var: "productDescription",
          value: body.invoice.product.description,
        },
      ],
    },
  ];

  const emailParams = new EmailParams()
    .setFrom({
      email: "paylinkcredentials@trial-zr6ke4njdwmgon12.mlsender.net",
      name: "Paylink",
    })
    .setTo(recipients)
    .setSubject(`${body.invoice.product.name}: Payment Invoice`)
    .setTemplateId("vywj2lpde9ml7oqz")
    .setVariables(variables);

  await mailersend.email.send(emailParams);

  res.status(200).send("Sent");
}
