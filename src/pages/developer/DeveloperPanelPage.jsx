import { useEffect, useState } from "react";
import { developerApi } from "../../api/developer.js";
import { formatDate } from "../../utils/format.js";

const LOG_LEVELS = [
  { value: "", label: "Все" },
  { value: "info", label: "Info", color: "blue" },
  { value: "warn", label: "Warning", color: "yellow" },
  { value: "error", label: "Error", color: "red" },
  { value: "debug", label: "Debug", color: "gray" },
];

export default function DeveloperPanelPage() {
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [level, setLevel] = useState("");
  const [pagination, setPagination] = useState({});

  useEffect(() => {
    fetchLogs();
  }, [page, level]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 20 };
      if (level) params.level = level;
      
      const res = await developerApi.getLogs(params);
      setLogs(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch logs:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await developerApi.getLogStats({ days: 7 });
      setStats(res.data.data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case "error": return "bg-red-100 text-red-800 border-red-200";
      case "warn": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "info": return "bg-blue-100 text-blue-800 border-blue-200";
      case "debug": return "bg-gray-100 text-gray-800 border-gray-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getMethodColor = (method) => {
    switch (method) {
      case "GET": return "bg-green-100 text-green-800";
      case "POST": return "bg-blue-100 text-blue-800";
      case "PUT": return "bg-yellow-100 text-yellow-800";
      case "PATCH": return "bg-purple-100 text-purple-800";
      case "DELETE": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Developer Panel</h1>
          <p className="text-gray-500 mt-1">Логи и мониторинг системы</p>
        </div>
        <div className="flex gap-2">
          {LOG_LEVELS.map((l) => (
            <button
              key={l.value}
              onClick={() => { setLevel(l.value); setPage(1); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                level === l.value
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Всего запросов</p>
            <p className="text-3xl font-bold text-gray-900">
              {stats.summary?.total || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Ошибки</p>
            <p className="text-3xl font-bold text-red-600">
              {stats.summary?.errors || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Предупреждения</p>
            <p className="text-3xl font-bold text-yellow-600">
              {stats.summary?.warnings || 0}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500 mb-1">Ср. время отклика</p>
            <p className="text-3xl font-bold text-green-600">
              {Math.round(stats.summary?.avgResponseTime || 0)}ms
            </p>
          </div>
        </div>
      )}

      {/* Level Distribution */}
      {stats?.byLevel && (
        <div className="grid grid-cols-4 gap-4">
          {Object.entries(stats.byLevel).map(([lvl, count]) => (
            <div key={lvl} className={`rounded-xl p-4 border ${getLevelColor(lvl)}`}>
              <p className="text-sm opacity-75 capitalize">{lvl}</p>
              <p className="text-2xl font-bold">{count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Recent Errors */}
      {stats?.recentErrors?.length > 0 && (
        <div className="bg-red-50 rounded-xl border border-red-200 p-5">
          <h3 className="font-semibold text-red-800 mb-3">Последние ошибки</h3>
          <div className="space-y-2">
            {stats.recentErrors.map((err, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 border border-red-100">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-red-100 text-red-800">
                    {err.level}
                  </span>
                  <span className="text-sm font-medium">{err.action}</span>
                </div>
                <p className="text-sm text-gray-600 truncate">
                  {err.errorMessage || "No error message"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatDate(err.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Logs Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Логи запросов</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Время</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Уровень</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Метод</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Путь</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Время</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Пользователь</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {logs.map((log) => (
                    <tr key={log._id} className="hover:bg-gray-50">
                      <td className="px-5 py-3 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(log.timestamp)}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded border ${getLevelColor(log.level)}`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getMethodColor(log.method)}`}>
                          {log.method}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm font-mono text-gray-900 max-w-xs truncate">
                        {log.path}
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          log.statusCode >= 500 ? "bg-red-100 text-red-800" :
                          log.statusCode >= 400 ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }`}>
                          {log.statusCode || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-600">
                        {log.responseTime ? `${log.responseTime}ms` : "—"}
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-500">
                        {log.userId?.fullname || log.userRole || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Страница {pagination.page} из {pagination.pages}
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Назад
                  </button>
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={page >= pagination.pages}
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
                  >
                    Вперед
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
