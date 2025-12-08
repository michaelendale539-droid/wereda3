// app/admin/users/page.tsx
'use client';

import { useState, useMemo, ChangeEvent, FC, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaUsers, FaUserPlus, FaSort, FaCheckCircle, FaTimesCircle, FaEdit, FaTimes, FaClock } from 'react-icons/fa';

// --- Type Definitions ---
export type UserRole = 'admin' | 'staff';
export type UserStatus = 'Active' | 'Pending' | 'Suspended';

export interface SystemUser {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastLogin: string;
}

// --- Placeholder Data ---
const systemUsers: SystemUser[] = [
  { id: 1, name: "Ato Elias Kebede", email: "elias.k@w3pp.gov", role: 'admin', status: 'Active', lastLogin: '2025-12-05' },
  { id: 2, name: "W/ro Selamawit T.", email: "selamawit.t@w3pp.gov", role: 'staff', status: 'Active', lastLogin: '2025-12-04' },
  { id: 3, name: "Mr. Tewodros G.", email: "tewodros.g@w3pp.gov", role: 'staff', status: 'Pending', lastLogin: 'N/A' },
  { id: 4, name: "Ms. Chaltu M.", email: "chaltu.m@w3pp.gov", role: 'staff', status: 'Suspended', lastLogin: '2025-11-20' },
  { id: 5, name: "Dr. Abera H.", email: "abera.h@w3pp.gov", role: 'staff', status: 'Active', lastLogin: '2025-12-05' },
];

const allRoles: UserRole[] = ['admin', 'staff'];
const allStatuses: UserStatus[] = ['Active', 'Pending', 'Suspended'];

// --- Helper Components ---

interface IconProps {
  className?: string;
}

const StatusBadge: FC<{ status: UserStatus, className?: string }> = ({ status, className = '' }) => {
  const baseClasses = "inline-flex items-center px-3 py-1 text-xs font-medium rounded-full";
  let colorClasses = '';
  let Icon: FC<IconProps> = FaCheckCircle;

  switch (status) {
    case 'Active': colorClasses = 'bg-green-100 text-green-800'; break;
    case 'Pending': colorClasses = 'bg-yellow-100 text-yellow-800'; Icon = FaClock; break;
    case 'Suspended': colorClasses = 'bg-red-100 text-red-800'; Icon = FaTimesCircle; break;
  }
  return <span className={`${baseClasses} ${colorClasses}`}><Icon className="mr-1" /> {status}</span>;
};

// --- Main Component ---

export default function UserManagementPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filtering Logic
  const filteredUsers = useMemo(() => {
    return systemUsers
      .filter(user => 
        selectedRole === 'All' || user.role === selectedRole
      )
      .filter(user =>
        selectedStatus === 'All' || user.status === selectedStatus
      )
      .filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, selectedRole, selectedStatus]);

  const handleNewUserSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // --- IMPORTANT: API Call to create user ---
    alert('Simulated: New User Added. (Integration required)');
    setIsModalOpen(false);
    // In a real app, you would fetch the new user list here
  };


  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center">
        <FaUsers className="mr-3 text-blue-600" /> System User Management
      </h1>
      <p className="text-gray-600 mb-8">
        Manage staff access, roles, and account status for all Woreda 3 administrators.
      </p>

      {/* --- Controls and Filters --- */}
      <div className="bg-white shadow-md rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
        
        <div className="flex space-x-4">
            <select
              value={selectedRole}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedRole(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-sm"
            >
              <option value="All">Filter by Role</option>
              {allRoles.map(r => <option key={r} value={r} className='capitalize'>{r}</option>)}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedStatus(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-sm"
            >
              <option value="All">Filter by Status</option>
              {allStatuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
        </div>

        <div className="flex space-x-3">
            <input
                type="text"
                placeholder="Search Name or Email..."
                value={searchTerm}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border text-sm w-48"
            />
            <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150"
            >
                <FaUserPlus className="mr-2" /> Add New User
            </button>
        </div>
      </div>

      {/* --- Users Table --- */}
      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
              <th className="relative px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                    <tr key={user.id} className="hover:bg-blue-50/50 transition duration-100">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{user.role}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm"><StatusBadge status={user.status} /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastLogin}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => router.push(`/admin/dashboard/users/edit/${user.id}`)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          <FaEdit className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                ))
            ) : (
                <tr>
                    <td colSpan={7} className="text-center py-10 text-lg text-gray-500">
                        No users match your current filters.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* --- Add New User Modal --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md p-6">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Create New System User</h2>
              <button onClick={() => setIsModalOpen(false)}><FaTimes className="w-5 h-5 text-gray-500 hover:text-gray-800" /></button>
            </div>
            <form onSubmit={handleNewUserSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input type="text" id="name" name="name" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email (Woreda Domain)</label>
                <input type="email" id="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <select id="role" name="role" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border">
                  {allRoles.map(r => <option key={r} value={r} className='capitalize'>{r}</option>)}
                </select>
              </div>
              
              <div className="pt-2 border-t">
                <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium transition duration-150">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}