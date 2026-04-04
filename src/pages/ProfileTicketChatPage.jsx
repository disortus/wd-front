import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supportApi } from "../api/support.js";
import Button from "../components/ui/Button.jsx";
import { StatusBadge } from "../components/ui/index.js";
import { TICKET_STATUS_COLORS, TICKET_STATUS_LABELS } from "../types/index.js";
import { formatDate, mapApiError } from "../utils/format.js";

export default function ProfileTicketChatPage() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const messages = useMemo(() => (Array.isArray(ticket?.messages) ? ticket.messages : []), [ticket]);

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await supportApi.getPublicTicket(ticketId);
      setTicket(data?.data || null);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить тикет"));
    } finally {
      setLoading(false);
    }
  }, [ticketId]);

  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    setError("");

    try {
      await supportApi.addPublicMessage(ticketId, { message: message.trim() });
      setMessage("");
      await fetchTicket();
    } catch (err) {
      setError(mapApiError(err, "Не удалось отправить сообщение"));
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-neutral-500">Загрузка чата...</div>;
  }

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Чат с поддержкой</h1>
          <p className="text-sm text-neutral-500 mt-1">{ticket?.ticketNumber || "Тикет"}</p>
        </div>
        <Link to="/profile/tickets" className="text-sm text-neutral-600 hover:text-black">
          ← К списку
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {ticket && (
        <article className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5 mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <p className="font-medium">{ticket.subject}</p>
              <p className="text-sm text-neutral-500 mt-1">Категория: {ticket.category}</p>
            </div>

            <StatusBadge
              status={ticket.status}
              labels={TICKET_STATUS_LABELS}
              colors={TICKET_STATUS_COLORS}
            />
          </div>
        </article>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
        <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
          {messages.length === 0 ? (
            <p className="text-sm text-neutral-500">Сообщений пока нет</p>
          ) : (
            messages.map((item, idx) => {
              const isMine = item.senderRole === "user";

              return (
                <div key={`${item.createdAt}-${idx}`} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-2xl px-3 py-2 border ${isMine ? "bg-black text-white border-black" : "bg-neutral-50 border-neutral-200"}`}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className={`text-[11px] uppercase ${isMine ? "text-neutral-300" : "text-neutral-500"}`}>
                        {isMine ? "Вы" : "Поддержка"}
                      </span>
                      <span className={`text-[11px] ${isMine ? "text-neutral-300" : "text-neutral-500"}`}>
                        {formatDate(item.createdAt, { dateStyle: "short", timeStyle: "short" })}
                      </span>
                    </div>
                    <p className="text-sm whitespace-pre-wrap">{item.message}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <form onSubmit={handleSendMessage} className="mt-4 space-y-3">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Опишите проблему или уточнение..."
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
          <div className="flex justify-end">
            <Button type="submit" loading={sending} disabled={!message.trim()}>
              Отправить
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}