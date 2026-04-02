import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supportApi } from "../api/support.js";
import Button from "../components/ui/Button.jsx";
import { Input, Select, Textarea } from "../components/ui/index.js";

export default function CreateSupportTicketPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    subject: "",
    description: "",
    category: "other",
    priority: "medium",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.subject || !form.description) {
      setError("Заполните тему и описание");
      return;
    }
    setLoading(true);
    try {
      await supportApi.createTicket(form);
      navigate("/profile/tickets");
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка создания обращения");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-semibold mb-8">Создать обращение</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5">
        {error && (
          <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">{error}</div>
        )}
        <Input
          label="Тема *"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          required
        />
        <Textarea
          label="Описание *"
          rows={5}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Select
            label="Категория"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            <option value="order">Заказ</option>
            <option value="product">Товар</option>
            <option value="delivery">Доставка</option>
            <option value="payment">Оплата</option>
            <option value="account">Аккаунт</option>
            <option value="technical">Техническая проблема</option>
            <option value="other">Другое</option>
          </Select>
          <Select
            label="Приоритет"
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value })}
          >
            <option value="low">Низкий</option>
            <option value="medium">Средний</option>
            <option value="high">Высокий</option>
            <option value="urgent">Срочный</option>
          </Select>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" loading={loading}>Создать</Button>
          <Button variant="ghost" onClick={() => navigate(-1)}>Отмена</Button>
        </div>
      </form>
    </div>
  );
}