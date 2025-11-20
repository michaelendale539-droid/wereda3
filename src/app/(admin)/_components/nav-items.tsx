interface Props{
    item:React.ReactNode,
    isActive:boolean,
    onClick:()=>{}
}
const navigationItems = [
  { name: 'Overview', key: 'overview', icon: LayoutDashboard },
  { name: 'Users Dashboard', key: 'users', icon: Users },
  { name: 'E-Library', key: 'e-library', icon: BookOpen },
  { name: 'Complaints', key: 'complaints', icon: Flag },
];
const NavItem = ({ item, isActive, onClick }:Props) => {
  const baseClasses = "flex items-center px-4 py-3 rounded-xl transition duration-150 ease-in-out cursor-pointer group font-medium";
  const activeClasses = "bg-indigo-600 text-white shadow-lg";
  const inactiveClasses = "text-gray-300 hover:bg-gray-700 hover:text-white";

  const IconComponent = item.icon;

  return (
    <div
      className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
      onClick={onClick}
    >
      <IconComponent className="h-5 w-5 mr-3" />
      <span>{item.name}</span>
    </div>
  );
};