import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supportApi } from "../api/support.js";
import { StatusBadge } from "../components/ui/index.js";
import { TICKET_STATUS_COLORS, TICKET_STATUS_LABELS } from "../types/index.js";
import { formatDate, mapApiError } from "../utils/format.js";

export default function ProfileTicketsPage() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true);
      setError("");

      try {
        const { data } = await supportApi.getMyPublicTickets({ limit: 20 });
        setTickets(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        setError(mapApiError(err, "Не удалось загрузить обращения"));
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">Мои обращения</h1>
        <Link to="/support/create" className="px-4 py-2 rounded-xl bg-black text-white text-sm">
          Создать
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center text-neutral-500">Загрузка обращений...</div>
      ) : tickets.length === 0 ? (
        <div className="rounded-2xl border border-neutral-200 p-8 text-center text-neutral-500 bg-white">
          У вас нет обращений в поддержку
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((ticket) => (
            <article key={ticket._id} className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-5">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="font-medium">{ticket.ticketNumber}</p>
                  <p className="text-sm text-neutral-500">{ticket.subject}</p>
                </div>

                <StatusBadge
                  status={ticket.status}
                  labels={TICKET_STATUS_LABELS}
                  colors={TICKET_STATUS_COLORS}
                />
              </div>

              <div className="mt-4 flex items-center justify-between gap-3 text-sm">
                <span className="text-neutral-500">Создано: {formatDate(ticket.createdAt)}</span>
                <Link
                  to={`/profile/tickets/${ticket._id}`}
                  className="px-3 py-2 rounded-xl border border-neutral-200 hover:bg-neutral-100"
                >
                  Открыть чат
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}