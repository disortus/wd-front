import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supportApi } from "../../api/support.js";
import Card from "../../components/ui/Card.jsx";
import { Badge, StatusBadge } from "../../components/ui/index.js";
import {
  TICKET_PRIORITY_LABELS,
  TICKET_PRIORITY_COLORS,
} from "../../types/index.js";
import Button from "../../components/ui/Button.jsx";
import { mapApiError } from "../../utils/format.js";

export default function OpenTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [processingId, setProcessingId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    supportApi.getOpenTickets().then(({ data }) => {
      setTickets(data.data || []);
      setLoading(false);
    }).catch((err) => {
      setError(mapApiError(err, "Не удалось загрузить открытые тикеты"));
      setLoading(false);
    });
  }, []);

  const handleAccept = async (id) => {
    setProcessingId(id);
    try {
      await supportApi.acceptTicket(id);
      navigate(`/support/tickets/${id}`);
    } catch (err) {
      setError(mapApiError(err, "Не удалось принять тикет"));
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
          Нет доступных тикетов
        </div>
      )}

      {tickets.map((ticket) => (
        <Card key={ticket._id}>
          <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-medium">{ticket.ticketNumber}</p>
              <p className="text-sm text-gray-500">{ticket.subject}</p>
              <p className="text-sm text-gray-500">{ticket.userSnapshot?.fullname}</p>
              <div className="flex gap-2 mt-1">
                <Badge>{ticket.category}</Badge>
                <StatusBadge
                  status={ticket.priority}
                  labels={TICKET_PRIORITY_LABELS}
                  colors={TICKET_PRIORITY_COLORS}
                />
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button size="sm" onClick={() => handleAccept(ticket._id)} loading={processingId === ticket._id}>
                Принять
              </Button>
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