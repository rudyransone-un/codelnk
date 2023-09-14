import { NavLink, Link } from 'react-router-dom';

export function Header() {
  const isActivePage = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'underline' : '';

  return (
    <div className="fixed top-0 left-0 px-5 py-5 w-[100%] h-[50px] shadow-b-sm flex justify-between items-center border-b-[1px] border-slate-100">
      <Link to={'/'} className="font-sans text-xl">
        Codelnk
      </Link>
      <div className="flex items-center space-x-3 px-2">
        <NavLink to={'/'} className={isActivePage}>
          Home
        </NavLink>
        <NavLink to={'/upload'} className={isActivePage}>
          Upload
        </NavLink>
        <NavLink to={'/profile'} className={isActivePage}>
          Profile
        </NavLink>
      </div>
      <div className="flex items-center space-x-3 px-2">
        <Link to={'/register'}>Sign-Up</Link>
        <Link to={'/login'}>Sign-In</Link>
      </div>
    </div>
  );
}
