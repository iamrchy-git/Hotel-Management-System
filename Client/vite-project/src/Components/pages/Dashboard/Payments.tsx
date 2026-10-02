import { useEffect, useState, type ReactNode } from "react";
import { FiCreditCard } from "react-icons/fi";
import { getPayments, type Loaded, type Payment } from "./dashboard.service.ts";
import {
  Badge,
  DetailList,
  EmptyState,
  Modal,
  PageHeader,
  card,
  fmtDate,
  money,
  outlineBtn,
  primaryBtn,
} from "./ui.tsx";

const cols = "md:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]";

const Payments = () => {
  const [data, setData] = useState<Loaded<Payment> | null>(null);
  const [receipt, setReceipt] = useState<Payment | null>(null);

  useEffect(() => {
    getPayments().then(setData);
  }, []);

  if (!data) return <p className="text-sm text-gray-500">Loading…</p>;

  const items = [...data.items].sort((a, b) => b.date.localeCompare(a.date));
  const sumBy = (s: string) =>
    items
      .filter((p) => p.status.toLowerCase() === s)
      .reduce((t, p) => t + p.amount, 0);
  const latest = items[0];
  const stats: [string, ReactNode][] = [
    ["Total Paid", money(sumBy("paid"))],
    ["Pending Amount", money(sumBy("pending"))],
    [
      "Latest Payment",
      latest ? (
        <>
          {money(latest.amount)} · {fmtDate(latest.date)}
        </>
      ) : (
        "—"
      ),
    ],
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Payments" text="Your payment history and receipts." />
      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map(([label, value]) => (
          <div key={label} className={`${card} p-4`}>
            <p className="text-lg font-semibold">{value}</p>
            <p className="text-xs text-gray-500">{label}</p>
          </div>
        ))}
      </div>

      <section>
        <h3 className="mb-3 font-semibold">Payment History</h3>
        {items.length === 0 ? (
          <div className={card}>
            <EmptyState
              icon={FiCreditCard}
              title="No payments yet"
              text="Payments for your bookings will appear here."
            />
          </div>
        ) : (
          <ul className="space-y-3 md:space-y-0 md:divide-y md:divide-gray-100 md:overflow-hidden md:rounded-xl md:border md:border-gray-200 md:bg-white md:shadow-sm">
            <li
              className={`hidden bg-gray-50 px-4 py-2 text-xs text-gray-500 md:grid md:gap-4 ${cols}`}
            >
              <span>Booking ID</span>
              <span>Date</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Status</span>
              <span />
            </li>
            {items.map((p) => (
              <li
                key={p.id}
                className={`${card} flex flex-col gap-2 p-4 text-sm md:grid md:items-center md:gap-4 md:rounded-none md:border-0 md:shadow-none ${cols}`}
              >
                <span className="font-medium">{p.bookingId}</span>
                <span className="text-gray-600">
                  {p.date ? fmtDate(p.date) : "—"}
                </span>
                <span className="font-medium">{money(p.amount)}</span>
                <span className="text-gray-600">{p.method}</span>
                <Badge status={p.status} />
                <span className="md:text-right">
                  {p.status.toLowerCase() === "paid" ? (
                    <button
                      className={outlineBtn}
                      onClick={() => setReceipt(p)}
                    >
                      View Receipt
                    </button>
                  ) : (
                    <span className="hidden text-gray-400 md:inline">—</span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {receipt && (
        <Modal title={`Receipt ${receipt.id}`} onClose={() => setReceipt(null)}>
          <DetailList
            rows={[
              ["Booking ID", receipt.bookingId],
              ["Payment date", fmtDate(receipt.date)],
              ["Method", receipt.method],
              ["Status", <Badge status={receipt.status} />],
            ]}
          />
          <div className="my-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <span className="text-sm text-gray-500">Amount paid</span>
            <span className="text-xl font-semibold">
              {money(receipt.amount)}
            </span>
          </div>
          <div className="flex justify-end gap-2">
            <button className={outlineBtn} onClick={() => setReceipt(null)}>
              Close
            </button>
            <button className={primaryBtn} disabled title="Coming soon">
              Download PDF
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Payments;
