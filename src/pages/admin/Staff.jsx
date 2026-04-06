import { useEffect, useState } from "react";
import { adminApi } from "../../api/admin.js";
import { formatDate } from "../../utils/format.js";
import { ROLES, ROLE_LABELS } from "../../types/index.js";

const STAFF_ROLES = [ROLES.MODERATOR, ROLES.COURIER, ROLES.SUPPORT, ROLES.DEVELOPER];

export default function StaffManagementPage() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  useEffect(() => {
    fetchStaff();
  }, [page, search, roleFilter]);

  const fetchStaff = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10 };
      if (search) params.search = search;
      if (roleFilter) params.role = roleFilter;
      
      const res = await adminApi.getStaff(params);
      setStaff(res.data.data);
      setPagination(res.data.pagination);
    } catch (err) {
      console.error("Failed to fetch staff:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStaff = async (id, permanent = false) => {
    try {
      await adminApi.deleteStaff(id, permanent);
      setShowDeleteModal(null);
      fetchStaff();
    } catch (err) {
      console.error("Failed to delete staff:", err);
    }
  };

  const handleToggleActive = async (id) => {
    try {
      await adminApi.toggleUserActive(id);
      fetchStaff();
    } catch (err) {
      console.error("Failed to toggle staff status:", err);
    }
  };

  const getRoleBadgeColor = (role) => {
    switch (role) {
      case ROLES.MODERATOR: return "bg-purple-100 text-purple-800";
      case ROLES.COURIER: return "bg-green-100 text-green-800";
      case ROLES.SUPPORT: return "bg-blue-100 text-blue-800";
      case ROLES.DEVELOPER: return "bg-orange-100 text-orange-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Управление персоналом</h1>
          <p className="text-gray-500 mt-1">Создание, редактирование и удаление сотрудников</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          + Добавить сотрудника
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Поиск по имени или телефону..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
        </div>
        <select
          value={roleFilter}
          onChange={(e) => { setRoleFilter(e.target.value); setPage(1); }}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        >
          <option value="">Все роли</option>
          {STAFF_ROLES.map(role => (
            <option key={role} value={role}>{ROLE_LABELS[role]}</option>
          ))}
        </select>
      </div>

      {/* Staff Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Сотрудник</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Роль</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата найма</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                  </td>
                </tr>
              ) : staff.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-5 py-8 text-center text-gray-500">
                    Сотрудники не найдены
                  </td>
                </tr>
              ) : (
                staff.map((member) => (
                  <tr key={member._id} className="hover:bg-gray-50">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{member.fullname}</p>
                        <p className="text-sm text-gray-500">{member.phone}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleBadgeColor(member.role)}`}>
                        {ROLE_LABELS[member.role] || member.role}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        member.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {member.isActive ? "Активен" : "Неактивен"}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {member.staffInfo?.hireDate ? formatDate(member.staffInfo.hireDate) : "—"}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleActive(member._id)}
                          className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                            member.isActive 
                              ? "bg-red-100 text-red-700 hover:bg-red-200" 
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          }`}
                        >
                          {member.isActive ? "Деактивировать" : "Активировать"}
                        </button>
                        <button
                          onClick={() => setShowDeleteModal(member)}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
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
      </div>

      {/* Create Staff Modal */}
      {showCreateModal && (
        <CreateStaffModal 
          onClose={() => setShowCreateModal(false)} 
          onSuccess={() => { setShowCreateModal(false); fetchStaff(); }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteStaffModal 
          staff={showDeleteModal}
          onClose={() => setShowDeleteModal(null)}
          onConfirm={(permanent) => handleDeleteStaff(showDeleteModal._id, permanent)}
        />
      )}
    </div>
  );
}

function CreateStaffModal({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    fullname: "",
    phone: "",
    password: "",
    role: ROLES.MODERATOR
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await adminApi.createUser(form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Ошибка при создании сотрудника");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Добавить сотрудника</h2>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">ФИО</label>
            <input
              type="text"
              required
              value={form.fullname}
              onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Телефон</label>
            <input
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Пароль</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Роль</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900"
            >
              {STAFF_ROLES.map(role => (
                <option key={role} value={role}>{ROLE_LABELS[role]}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Отмена
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
            >
              {loading ? "Создание..." : "Создать"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DeleteStaffModal({ staff, onClose, onConfirm }) {
  const [permanent, setPermanent] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-2">Удалить сотрудника</h2>
        <p className="text-gray-600 mb-4">
          Вы уверены, что хотите удалить сотрудника <strong>{staff.fullname}</strong>?
        </p>
        
        <label className="flex items-center gap-2 mb-4">
          <input
            type="checkbox"
            checked={permanent}
            onChange={(e) => setPermanent(e.target.checked)}
            className="w-4 h-4"
          />
          <span className="text-sm text-gray-600">Полностью удалить из базы данных</span>
        </label>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Отмена
          </button>
          <button
            onClick={() => onConfirm(permanent)}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Удалить
          </button>
        </div>
      </div>
    </div>
  );
}
