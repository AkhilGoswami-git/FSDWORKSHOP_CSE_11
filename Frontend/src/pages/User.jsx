import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../components/api.js';
import './User.css';

function User() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [newUserCount, setNewUserCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All roles');
  const [statusFilter, setStatusFilter] = useState('All statuses');
  const [selectedUser, setSelectedUser] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isCurrentRequest = true;

    const loadUsers = async () => {
      setLoading(true);
      setError('');

      try {
        const token = localStorage.getItem('userToken');
        const response = await api.get('http://localhost:5000/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (isCurrentRequest) {
          setUsers(response.data.users);
          setNewUserCount(response.data.summary?.newUsers ?? 0);
        }
      } catch {
        if (isCurrentRequest) {
          setError('Users could not be loaded. Check your connection and try again.');
        }
      } finally {
        if (isCurrentRequest) {
          setLoading(false);
        }
      }
    };

    loadUsers();
    return () => {
      isCurrentRequest = false;
    };
  }, [retryCount]);

  useEffect(() => {
    if (!selectedUser) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setSelectedUser(null);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [selectedUser]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const normalizedSearch = search.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    const matchesSearch = [user.name, user.email, user.id]
      .some((value) => String(value ?? '').toLowerCase().includes(normalizedSearch));
    const matchesRole = roleFilter === 'All roles' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'All statuses' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter((user) => user.status?.toLowerCase() === 'active').length;
  const roles = [...new Set(users.map((user) => user.role).filter(Boolean))];
  const statuses = [...new Set(users.map((user) => user.status).filter(Boolean))];

  const formatDate = (value) => {
    if (!value) return 'Not recorded';
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? 'Not recorded'
      : new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
  };

  const statusClass = (status) => {
    const normalizedStatus = status?.toLowerCase();
    return ['active', 'inactive', 'suspended'].includes(normalizedStatus)
      ? normalizedStatus
      : 'unknown';
  };

  return (
    <main className="users-dashboard">
      <div className="users-shell">
        <header className="users-header">
          <div>
            <p className="users-eyebrow">USER MANAGEMENT</p>
            <h1>Users</h1>
            <p className="users-subtitle">Manage and view all registered users</p>
          </div>
          <button className="logout-button" type="button" onClick={handleLogout}>Log out</button>
        </header>

        <section className="user-stats" aria-label="User statistics">
          <article className="user-stat">
            <span className="stat-label">Total Users</span>
            <strong>{loading ? '—' : users.length}</strong>
            <span className="stat-note">Registered accounts</span>
          </article>
          <article className="user-stat">
            <span className="stat-label">Active Users</span>
            <strong>{loading ? '—' : activeUsers}</strong>
            <span className="stat-note">Currently active</span>
          </article>
          <article className="user-stat">
            <span className="stat-label">New Users</span>
            <strong>{loading ? '—' : newUserCount}</strong>
            <span className="stat-note">Registered in the last 30 days</span>
          </article>
        </section>

        <section className="users-panel" aria-labelledby="directory-title">
          <div className="directory-heading">
            <div>
              <h2 id="directory-title">User directory</h2>
              <p>{loading ? 'Loading registered accounts' : `${filteredUsers.length} of ${users.length} users`}</p>
            </div>
          </div>

          <div className="table-toolbar">
            <label className="search-control">
              <span className="search-icon" aria-hidden="true">⌕</span>
              <span className="visually-hidden">Search users by name, email, or ID</span>
              <input
                type="search"
                placeholder="Search users..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <div className="filter-controls">
              <label>
                <span className="visually-hidden">Filter by role</span>
                <select value={roleFilter} onChange={(event) => setRoleFilter(event.target.value)}>
                  <option>All roles</option>
                  {roles.map((role) => <option key={role}>{role}</option>)}
                </select>
              </label>
              <label>
                <span className="visually-hidden">Filter by status</span>
                <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option>All statuses</option>
                  {statuses.map((status) => <option key={status}>{status}</option>)}
                </select>
              </label>
            </div>
          </div>

          {error ? (
            <div className="table-message error-message" role="alert">
              <p>{error}</p>
              <button type="button" onClick={() => setRetryCount((count) => count + 1)}>Retry</button>
            </div>
          ) : (
            <div className="table-scroll" aria-busy={loading}>
              <table className="users-table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col">Status</th>
                    <th scope="col">Registered</th>
                    <th scope="col"><span className="visually-hidden">Actions</span></th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? Array.from({ length: 5 }, (_, index) => (
                    <tr className="skeleton-row" key={index} aria-hidden="true">
                      {Array.from({ length: 7 }, (_, cellIndex) => (
                        <td key={cellIndex}><span className="skeleton-bar" /></td>
                      ))}
                    </tr>
                  )) : filteredUsers.map((user) => (
                    <tr key={user.id}>
                      <td className="user-id">{user.id}</td>
                      <td className="user-name">{user.name || '—'}</td>
                      <td className="user-email">{user.email || '—'}</td>
                      <td><span className="role-badge">{user.role || 'User'}</span></td>
                      <td>
                        <span className={`status-badge status-${statusClass(user.status)}`}>
                          <span className="status-dot" />{user.status || 'Unknown'}
                        </span>
                      </td>
                      <td className="registered-date">{formatDate(user.registeredAt)}</td>
                      <td><button className="view-button" type="button" onClick={() => setSelectedUser(user)}>View</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {!loading && users.length === 0 && (
                <div className="table-message">No registered users found.</div>
              )}
              {!loading && users.length > 0 && filteredUsers.length === 0 && (
                <div className="table-message">No users match your search and filters.</div>
              )}
            </div>
          )}
        </section>
      </div>

      {selectedUser && (
        <div className="user-modal-backdrop" onClick={(event) => {
          if (event.target === event.currentTarget) setSelectedUser(null);
        }}>
          <section className="user-modal" role="dialog" aria-modal="true" aria-labelledby="user-modal-title">
            <div className="modal-heading">
              <div>
                <p className="users-eyebrow">USER DETAILS</p>
                <h2 id="user-modal-title">{selectedUser.name || 'User'}</h2>
              </div>
              <button className="modal-close" type="button" aria-label="Close user details" onClick={() => setSelectedUser(null)}>×</button>
            </div>
            <dl className="user-details">
              <div><dt>ID</dt><dd>{selectedUser.id}</dd></div>
              <div><dt>Email</dt><dd>{selectedUser.email || 'Not recorded'}</dd></div>
              <div><dt>Role</dt><dd>{selectedUser.role || 'User'}</dd></div>
              <div><dt>Status</dt><dd>{selectedUser.status || 'Unknown'}</dd></div>
              <div><dt>Registered</dt><dd>{formatDate(selectedUser.registeredAt)}</dd></div>
            </dl>
          </section>
        </div>
      )}
    </main>
  );
}

export default User;
