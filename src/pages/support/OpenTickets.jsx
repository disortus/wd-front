import { useEffect, useState } from "react";
import { supportApi } from "../../api/support.js";
import Card from "../../components/ui/Card.jsx";
import { Badge, StatusBadge } from "../../components/ui/index.js";
import {
  TICKET_PRIORITY_LABELS,
  TICKET_PRIORITY_COLORS,
} from "../../types/index.js";
import Button from "../../components/ui/Button.jsx";

export default function OpenTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supportApi.getOpenTickets().then(({ data }) => {
      setTickets(data.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleAccept = async (id) => {
    try {
      await supportApi.acceptTicket(id);
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
              <Button size="sm" onClick={() => handleAccept(ticket._id)}>
                Принять
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}