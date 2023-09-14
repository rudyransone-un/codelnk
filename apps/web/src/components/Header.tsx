import { Link } from 'react-router-dom';

export function Header() {
  return (
    <>
      <div className="w-full h-[40px] shadow-b-sm flex justify-between items-center">
        <div className="font-sans text-xl">Codelnk</div>
        <div className="flex items-center space-x-1 px-2">
          <Link to={'/'}>Home</Link>
          <Link to={'upload'}>Upload</Link>
          <Link to={'profile'}>Profile</Link>
        </div>
        <div className="flex items-center space-x-1 px-2">
          <Link to={'register'}>register</Link>
          <Link to={'login'}>login</Link>
        </div>
      </div>
    </>
  );
}
