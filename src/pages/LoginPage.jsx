import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.js";
import { Input } from "../components/ui/index.js";
import Button from "../components/ui/Button.jsx";

export default function LoginPage() {
  const { login, error, clearError } = useAuth();
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    clearError();
    if (!phone || !password) {
      setFormError("Заполните все поля");
      return;
    }
    setLoading(true);
    const result = await login(phone, password);
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
          <h1 className="mt-6 text-3xl font-semibold">Войти</h1>
          <p className="mt-2 text-gray-500">Введите данные аккаунта</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm space-y-5">
          {(formError || error) && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-xl">
              {formError || error}
            </div>
          )}
          <Input
            label="Телефон"
            type="tel"
            placeholder="+77001234567"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (formError) setFormError("");
              if (error) clearError();
            }}
            autoComplete="tel"
          />
          <Input
            label="Пароль"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (formError) setFormError("");
              if (error) clearError();
            }}
            autoComplete="current-password"
          />
          <Button fullWidth loading={loading}>Войти</Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Нет аккаунта?{" "}
          <Link to="/register" className="text-black font-medium hover:underline">
            Зарегистрироваться
          </Link>
        </p>
      </div>
    </div>
  );
}