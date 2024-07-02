import classNames from "classnames";
import React from "react";

const InvoiceStatus = ({ paid, sent }: { paid: boolean; sent: boolean }) => {
  const statusDescription = () => {
    if (paid && sent) return "Paid";
    if (sent && !paid) return "Unpaid";
    if (!sent && !paid) return "Pending";
  };

  return (
    <div
      className={classNames("flex min-w-10 items-center justify-start gap-1 rounded-full px-2 text-[0.5rem]", {
        "bg-paid-invoice-status-background text-white": paid && sent,
        "bg-pending-invoice-status-background text-pending-invoice-status-foreground": !sent && !paid,
        "bg-unpaid-invoice-status-background text-unpaid-invoice-status-foreground": sent && !paid,
      })}
    >
      <span
        className={classNames("size-2 rounded-full", {
          "bg-white": paid && sent,
          "bg-unpaid-invoice-status-foreground": sent && !paid,
          "bg-pending-invoice-status-foreground": !sent && !paid,
        })}
      />
      <span>{statusDescription()}</span>
    </div>
  );
};

export default InvoiceStatus;
