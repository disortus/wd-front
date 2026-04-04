import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supportApi } from "../../api/support.js";
import Button from "../../components/ui/Button.jsx";
import { Badge, StatusBadge } from "../../components/ui/index.js";
import { TICKET_STATUS, TICKET_STATUS_COLORS, TICKET_STATUS_LABELS } from "../../types/index.js";
import { formatDate, mapApiError } from "../../utils/format.js";

export default function SupportTicketChatPage() {
  const { ticketId } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [processing, setProcessing] = useState("");
  const [error, setError] = useState("");

  const messages = useMemo(() => (Array.isArray(ticket?.messages) ? ticket.messages : []), [ticket]);

  const fetchTicket = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data } = await supportApi.getTicket(ticketId);
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

  const handleAccept = async () => {
    setProcessing("accept");
    setError("");
    try {
      await supportApi.acceptTicket(ticketId);
      await fetchTicket();
    } catch (err) {
      setError(mapApiError(err, "Не удалось принять тикет"));
    } finally {
      setProcessing("");
    }
  };

  const handleRelease = async () => {
    setProcessing("release");
    setError("");
    try {
      await supportApi.releaseTicket(ticketId);
      navigate("/support/open");
    } catch (err) {
      setError(mapApiError(err, "Не удалось отказаться от тикета"));
      setProcessing("");
    }
  };

  const handleResolve = async () => {
    setProcessing("resolve");
    setError("");
    try {
      await supportApi.resolveTicket(ticketId);
      await fetchTicket();
    } catch (err) {
      setError(mapApiError(err, "Не удалось перевести тикет в решенные"));
    } finally {
      setProcessing("");
    }
  };

  const handleClose = async () => {
    setProcessing("close");
    setError("");
    try {
      await supportApi.closeTicket(ticketId);
      await fetchTicket();
    } catch (err) {
      setError(mapApiError(err, "Не удалось закрыть тикет"));
    } finally {
      setProcessing("");
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSending(true);
    setError("");
    try {
      await supportApi.addMessage(ticketId, { message: message.trim() });
      setMessage("");
      await fetchTicket();
    } catch (err) {
      setError(mapApiError(err, "Не удалось отправить сообщение"));
    } finally {
      setSending(false);
    }
  };

  const status = ticket?.status;
  const canAccept = status === TICKET_STATUS.OPEN;
  const canRelease = status === TICKET_STATUS.ASSIGNED;
  const canResolve = status === TICKET_STATUS.ASSIGNED;
  const canClose = status === TICKET_STATUS.RESOLVED;
  const canSendMessage = status === TICKET_STATUS.ASSIGNED || status === TICKET_STATUS.RESOLVED;

  if (loading) return <p className="py-20 text-center text-neutral-500">Загрузка чата...</p>;

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Тикет {ticket?.ticketNumber || ""}</h1>
          <p className="text-sm text-neutral-500">Просмотр всей переписки с пользователем</p>
        </div>
        <div className="flex items-center gap-2">
          <Link to="/support/open" className="text-sm px-3 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100">
            Открытые
          </Link>
          <Link to="/support/tickets" className="text-sm px-3 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100">
            Мои тикеты
          </Link>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {ticket && (
        <article className="rounded-2xl border border-neutral-200 bg-white p-5">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
              <div>
                <p className="font-semibold text-lg">{ticket.subject}</p>
                <p className="text-sm text-neutral-500 mt-1 whitespace-pre-wrap">{ticket.description}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3">
                  {ticket.category && <Badge>{ticket.category}</Badge>}
                  {ticket.priority && <Badge>{ticket.priority}</Badge>}
                </div>
              </div>

              <StatusBadge
                status={ticket.status}
                labels={TICKET_STATUS_LABELS}
                colors={TICKET_STATUS_COLORS}
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {canAccept && (
                <Button size="sm" onClick={handleAccept} loading={processing === "accept"}>
                  Принять тикет
                </Button>
              )}

              {canRelease && (
                <Button size="sm" variant="secondary" onClick={handleRelease} loading={processing === "release"}>
                  Отказаться от тикета
                </Button>
              )}

              {canResolve && (
                <Button size="sm" onClick={handleResolve} loading={processing === "resolve"}>
                  Отметить как решенный
                </Button>
              )}

              {canClose && (
                <Button size="sm" variant="outline" onClick={handleClose} loading={processing === "close"}>
                  Закрыть
                </Button>
              )}
            </div>
          </div>
        </article>
      )}

      <div className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
        <div className="space-y-3 max-h-[420px] overflow-auto pr-1">
          {messages.length === 0 ? (
            <p className="text-sm text-neutral-500">Сообщений пока нет</p>
          ) : (
            messages.map((item, idx) => {
              const isSupport = item.senderRole === "support";

              return (
                <div key={`${item.createdAt}-${idx}`} className={`flex ${isSupport ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl px-3 py-2 border ${isSupport ? "bg-black text-white border-black" : "bg-neutral-50 border-neutral-200"}`}>
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className={`text-[11px] uppercase ${isSupport ? "text-neutral-300" : "text-neutral-500"}`}>
                        {item.senderRole || "user"}
                      </span>
                      <span className={`text-[11px] ${isSupport ? "text-neutral-300" : "text-neutral-500"}`}>
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

        <form onSubmit={handleSend} className="mt-4 space-y-3">
          <textarea
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите ответ пользователю..."
            disabled={!canSendMessage}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black disabled:bg-neutral-100 disabled:text-neutral-500"
          />

          <div className="flex justify-end">
            <Button type="submit" loading={sending} disabled={!message.trim() || !canSendMessage}>
              Отправить сообщение
            </Button>
          </div>

          {!canSendMessage && (
            <p className="text-xs text-neutral-500">
              {status === TICKET_STATUS.OPEN
                ? "Чтобы ответить пользователю, сначала примите тикет в работу."
                : "Тикет закрыт: доступен только просмотр переписки."}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
