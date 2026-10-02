import { useEffect, useState } from "react";
import { FiBell } from "react-icons/fi";
import { getNotices, type Notice } from "./dashboard.service.ts";
import {
  EmptyState,
  PageHeader,
  card,
  noticeIcon,
  outlineBtn,
} from "./ui.tsx";

const Notifications = () => {
  const [items, setItems] = useState<Notice[] | null>(null);

  useEffect(() => {
    getNotices().then((r) => setItems(r.items));
  }, []);

  if (!items) return <p className="text-sm text-gray-500">Loading…</p>;

  const unread = items.filter((n) => !n.read).length;
  const markRead = (id?: string) =>
    setItems(items.map((n) => (!id || n.id === id ? { ...n, read: true } : n)));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notifications"
        text={
          unread
            ? `You have ${unread} unread notification${unread > 1 ? "s" : ""}.`
            : "You're all caught up."
        }
      >
        <button
          className={outlineBtn}
          disabled={!unread}
          onClick={() => markRead()}
        >
          Mark all as read
        </button>
      </PageHeader>
      {items.length === 0 ? (
        <div className={card}>
          <EmptyState
            icon={FiBell}
            title="No notifications yet"
            text="Booking, payment and check-in updates will show up here."
          />
        </div>
      ) : (
        <ul className={`${card} divide-y divide-gray-100`}>
          {items.map((n) => {
            const Icon = noticeIcon[n.type];
            return (
              <li key={n.id}>
                <button
                  onClick={() => markRead(n.id)}
                  className={`flex w-full items-start gap-3 p-4 text-left hover:bg-gray-50 ${n.read ? "" : "bg-indigo-50/40"}`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${n.read ? "bg-gray-100 text-gray-500" : "bg-indigo-100 text-indigo-600"}`}
                  >
                    <Icon />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm ${n.read ? "text-gray-600" : "font-medium text-black"}`}
                    >
                      {n.text}
                    </span>
                    <span className="text-xs text-gray-500">{n.time}</span>
                  </span>
                  {!n.read && (
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full bg-indigo-600"
                      aria-label="Unread"
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Notifications;
