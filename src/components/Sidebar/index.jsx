import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  const getStyles = ({ isActive }) => {
    return isActive
      ? 'flex items-center gap-2 px-2 py-1 rounded-md bg-indigo-200 text-indigo-900 font-semibold'
      : 'flex items-center gap-2 px-2 py-1 rounded-md text-gray-700 hover:bg-indigo-100 hover:text-indigo-800';
  };

  return (
    <aside className="flex flex-col gap-4 border-r-2 border-gray-300 w-[150px] h-screen p-4 bg-white">
      <NavLink to="/" className={getStyles}>
        <span className="material-symbols-outlined">home</span>
        <span>Home</span>
      </NavLink>

      <NavLink to="/Archive" className={getStyles}>
        <span className="material-symbols-outlined">archive</span>
        <span>Archive</span>
      </NavLink>

      <NavLink to="/Important" className={getStyles}>
        <span className="material-symbols-outlined">label_important</span>
        <span>Important</span>
      </NavLink>

      <NavLink to="/Bin" className={getStyles}>
        <span className="material-symbols-outlined">delete</span>
        <span>Bin</span>

      </NavLink>
    </aside>
  );
};
