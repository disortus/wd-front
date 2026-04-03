import { useEffect, useState } from "react";
import { supportApi } from "../../api/support.js";
import Card from "../../components/ui/Card.jsx";
import { StatusBadge } from "../../components/ui/index.js";
import {
  TICKET_STATUS,
  TICKET_STATUS_LABELS,
  TICKET_STATUS_COLORS,
} from "../../types/index.js";
import Button from "../../components/ui/Button.jsx";

export default function SupportMyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supportApi.getMyTickets().then(({ data }) => {
      setTickets(data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleResolve = async (id) => {
    try {
      await supportApi.resolveTicket(id);
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch {
      // Silent fail
    }
  };

  const handleClose = async (id) => {
    try {
      await supportApi.closeTicket(id);
      setTickets((prev) => prev.filter((t) => t._id !== id));
    } catch {
      // Silent fail
    }
  };

  if (loading) return <p className="py-20 text-center">Загрузка...</p>;

  return (
    <div className="space-y-4">
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
              {(ticket.status === TICKET_STATUS.OPEN || ticket.status === TICKET_STATUS.ASSIGNED) && (
                <Button size="sm" onClick={() => handleResolve(ticket._id)}>
                  Решить
                </Button>
              )}
              {ticket.status === TICKET_STATUS.RESOLVED && (
                <Button size="sm" variant="secondary" onClick={() => handleClose(ticket._id)}>
                  Закрыть
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}