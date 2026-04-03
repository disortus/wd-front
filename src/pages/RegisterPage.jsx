import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Input } from "../components/ui/index.js";
import Button from "../components/ui/Button.jsx";

export default function RegisterPage() {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    if (!fullname || !phone || !password) {
      setFormError("Имя, телефон и пароль обязательны");
      return;
    }

    if (password.length < 6) {
      setFormError("Пароль должен быть не менее 6 символов");
      return;
    }

    setLoading(true);
    const result = await register(fullname, phone, password);
    setLoading(false);

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-2xl font-bold">Store</Link>
          <h1 className="mt-6 text-3xl font-semibold">Создать аккаунт</h1>
          <p className="mt-2 text-gray-500">Заполните данные для регистрации</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          {(formError || error) && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
              {formError || error}
            </div>
          )}
          <Input
            label="Имя"
            type="text"
            placeholder="Иван Иванов"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            autoComplete="name"
          />
          <Input
            label="Телефон"
            type="tel"
            placeholder="+77001234567"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
          <Button fullWidth loading={loading}>Зарегистрироваться</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Уже есть аккаунт?{" "}
          <Link to="/login" className="text-black font-medium hover:underline">
            Войти
          </Link>
        </p>
      </div>
    </div>
  );
}