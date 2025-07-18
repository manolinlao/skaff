import { Outlet, NavLink } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="w-60 bg-gray-100 p-4 border-r">
        <h2 className="text-xl font-bold mb-4">☕ Coffee Journal</h2>
        <ul className="space-y-2">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'font-bold' : '')}
            >
              Nueva cata
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/tastings"
              className={({ isActive }) => (isActive ? 'font-bold' : '')}
            >
              Listado
            </NavLink>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
