import { Outlet, NavLink } from 'react-router-dom';
import { useUnit } from 'effector-react';
import { Dropdown } from 'primereact/dropdown';
import { globalEvents, globalStores } from './state';
import { languages } from './i18n/constants';

export const AppLayout = () => {
  const language = useUnit(globalStores.$language);

  const onChangeLanguage = (e: { value: string }) => {
    globalEvents.changeLanguage(e.value);
  };

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
        <div className="mt-auto">
          <Dropdown
            value={language}
            options={languages}
            onChange={onChangeLanguage}
            optionLabel="label"
            optionValue="code"
            placeholder="Idioma"
            className="w-full"
          />
        </div>
      </nav>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};
