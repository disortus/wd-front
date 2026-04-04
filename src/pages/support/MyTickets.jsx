import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supportApi } from "../../api/support.js";
import Card from "../../components/ui/Card.jsx";
import { StatusBadge } from "../../components/ui/index.js";
import {
  TICKET_STATUS_LABELS,
  TICKET_STATUS_COLORS,
} from "../../types/index.js";
import Button from "../../components/ui/Button.jsx";
import { mapApiError } from "../../utils/format.js";

export default function SupportMyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await supportApi.getMyTickets({ limit: 50 });
      setTickets(data.data || []);
    } catch (err) {
      setError(mapApiError(err, "Не удалось загрузить тикеты"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTickets();
  }, [fetchTickets]);

  const handleResolve = async (id) => {
    setProcessingId(`resolve-${id}`);
    try {
      await supportApi.resolveTicket(id);
      await fetchTickets();
    } catch (err) {
      setError(mapApiError(err, "Не удалось отметить тикет как решенный"));
    } finally {
      setProcessingId("");
    }
  };

  const handleClose = async (id) => {
    setProcessingId(`close-${id}`);
    try {
      await supportApi.closeTicket(id);
      await fetchTickets();
    } catch (err) {
      setError(mapApiError(err, "Не удалось закрыть тикет"));
    } finally {
      setProcessingId("");
    }
  };

  const handleRelease = async (id) => {
    setProcessingId(`release-${id}`);
    try {
      await supportApi.releaseTicket(id);
      await fetchTickets();
    } catch (err) {
      setError(mapApiError(err, "Не удалось отказаться от тикета"));
    } finally {
      setProcessingId("");
    }
  };

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-4">
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {tickets.length === 0 && (
        <div className="rounded-xl border border-dashed border-neutral-300 px-4 py-8 text-sm text-neutral-500 text-center">
          У вас нет назначенных/закрытых тикетов
        </div>
      )}

      {tickets.map((ticket) => (
        <Card key={ticket._id}>
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">{ticket.ticketNumber}</p>
              <p className="text-sm text-gray-500">{ticket.subject}</p>
              <p className="text-sm text-gray-500">{ticket.userSnapshot?.fullname}</p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <StatusBadge
                status={ticket.status}
                labels={TICKET_STATUS_LABELS}
                colors={TICKET_STATUS_COLORS}
              />
              {ticket.status === "assigned" && (
                <Button
                  size="sm"
                  onClick={() => handleResolve(ticket._id)}
                  loading={processingId === `resolve-${ticket._id}`}
                >
                  Решить
                </Button>
              )}
              {ticket.status === "assigned" && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleRelease(ticket._id)}
                  loading={processingId === `release-${ticket._id}`}
                >
                  Отказаться
                </Button>
              )}
              {ticket.status === "resolved" && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleClose(ticket._id)}
                  loading={processingId === `close-${ticket._id}`}
                >
                  Закрыть
                </Button>
              )}
              <Link
                to={`/support/tickets/${ticket._id}`}
                className="text-xs text-neutral-600 hover:text-black"
              >
                Открыть чат
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}