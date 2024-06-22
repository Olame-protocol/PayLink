import type { NextApiRequest, NextApiResponse } from "next";
import { MailerSend, EmailParams, Recipient } from "mailersend";
import { DetailedInvoice } from "@/utils/types";
import { FRONTEND_URL } from "@/utils/const";

const mailersend = new MailerSend({
  apiKey: process.env.SEND_MAILER_API_KEY ?? "",
});

type Data = {
  invoice: DetailedInvoice;
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
          var: "item",
          value: body.invoice.product.name,
        },
        {
          var: "price",
          value: body.invoice.product.price.toString(),
        },
        {
          var: "amount",
          value: body.invoice.amount,
        },
        {
          var: "quantity",
          value: body.invoice.quantity,
        },
        {
          var: "clientName",
          value: body.invoice.client.name,
        },
        {
          var: "clientEmail",
          value: body.invoice.client.email,
        },
        {
          var: "description",
          value: body.invoice.product.description,
        },
        {
          var: "invoiceDate",
          value: body.invoice.created_at.split("T")[0],
        },
        {
          var: "paymentLink",
          value: FRONTEND_URL + "invoices/" + body.invoice.id + "/payment",
        },
        {
          var: "bandingImage",
          value: body.invoice.branding.image,
        },
        {
          var: "brandingName",
          value: body.invoice.branding.name,
        },
        {
          var: "brandingEmail",
          value: body.invoice.branding.contact,
        },
        {
          var: "clientService",
          value: body.invoice.client.service,
        },
        {
          var: "walletAddress",
          value: body.invoice.owner,
        },
        {
          var: "paymentDueDate",
          value: body.invoice.due_date.split("T")[0],
        },
        {
          var: "brandingAddress",
          value: body.invoice.branding.address,
        },
      ],
    },
  ];

  const emailParams = new EmailParams()
    .setFrom({
      email: "paylinkcredentials@gmail.com",
      name: "Paylink",
    })
    .setTo(recipients)
    .setSubject(`${body.invoice.product.name}: Payment Invoice (${body.invoice.branding.name})`)
    .setTemplateId("jy7zpl9myp0g5vx6")
    .setVariables(variables);

  await mailersend.email.send(emailParams);

  res.status(200).send("Sent");
}
