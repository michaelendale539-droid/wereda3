'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave, FaUserEdit } from 'react-icons/fa';

// Reuse the types from the users page
import { SystemUser, UserRole, UserStatus } from '../page';

// Mock function to fetch user data - replace with actual API call
const fetchUser = async (id: string): Promise<SystemUser | null> => {
  // In a real app, this would be an API call
  const mockUsers: SystemUser[] = [
    { id: 1, name: "Ato Elias Kebede", email: "elias.k@w3pp.gov", role: 'admin', status: 'Active', lastLogin: '2025-12-05' },
    { id: 2, name: "W/ro Selamawit T.", email: "selamawit.t@w3pp.gov", role: 'staff', status: 'Active', lastLogin: '2025-12-04' },
    { id: 3, name: "Mr. Tewodros G.", email: "tewodros.g@w3pp.gov", role: 'staff', status: 'Pending', lastLogin: 'N/A' },
    { id: 4, name: "Ms. Chaltu M.", email: "chaltu.m@w3pp.gov", role: 'staff', status: 'Suspended', lastLogin: '2025-11-20' },
    { id: 5, name: "Dr. Abera H.", email: "abera.h@w3pp.gov", role: 'staff', status: 'Active', lastLogin: '2025-12-05' },
  ];
  
  const user = mockUsers.find(user => user.id === parseInt(id));
  return user || null;
};

export default function EditUserPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<SystemUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Omit<SystemUser, 'id' | 'lastLogin'>>({ 
    name: '', 
    email: '', 
    role: 'staff', 
    status: 'Active' 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await fetchUser(params.id);
        if (userData) {
          setUser(userData);
          const { id, lastLogin, ...userFormData } = userData;
          setFormData(userFormData);
        } else {
          // Handle user not found
          router.push('/admin/dashboard/users');
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [params.id, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to update the user
      console.log('Updating user:', { id: params.id, ...formData });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message and redirect back to users list
      alert('User updated successfully!');
      router.push('/admin/dashboard/users');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">User not found</p>
        <button 
          onClick={() => router.push('/admin/dashboard/users')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => router.back()}
          className="mr-4 p-2 hover:bg-gray-100 rounded-full"
          aria-label="Go back"
        >
          <FaArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">
          <FaUserEdit className="inline mr-2 text-blue-600" />
          Edit User: {user.name}
        </h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="admin">Admin</option>
                <option value="staff">Staff</option>
                <option value="auditor">Auditor</option>
                <option value="guest">Guest</option>
              </select>
            </div>

            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Active">Active</option>
                <option value="Pending">Pending</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <button
              type="button"
              onClick={() => router.push('/admin/dashboard/users')}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isSubmitting}
            >
              <FaSave className="mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}