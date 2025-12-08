'use client';

import { FC, useState } from 'react';
import Link from 'next/link';
import { 
  FaClipboardCheck, 
  FaRegNewspaper, 
  FaChartLine, 
  FaBookReader, 
  FaUsers, 
  FaFileAlt, 
  FaUserPlus, 
  FaLock, 
  FaDownload,
  FaChartBar,
  FaChartPie,
  FaArrowUp,
  FaArrowDown
} from 'react-icons/fa';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';

// Define the type for the summary cards
interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: FC<{ className?: string }>;
  bgColor: string;
  link: string;
}

// Chart data
const complianceData = [
  { name: 'Jan', cases: 20 },
  { name: 'Feb', cases: 35 },
  { name: 'Mar', cases: 25 },
  { name: 'Apr', cases: 40 },
  { name: 'May', cases: 30 },
  { name: 'Jun', cases: 50 },
];

const resourceData = [
  { name: 'Posts', value: 45 },
  { name: 'Documents', value: 28 },
  { name: 'Images', value: 15 },
  { name: 'Videos', value: 12 },
];

const userData = [
  { name: 'Active', value: 45 },
  { name: 'Pending', value: 5 },
  { name: 'Suspended', value: 2 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Reusable component for the summary cards (modified to include Link)
const SummaryCard: FC<SummaryCardProps> = ({ title, value, icon: Icon, bgColor, link }) => {
  const isIncrease = typeof value === 'number' && value > 0;
  const isDecrease = typeof value === 'number' && value < 0;
  
  return (
    <Link 
      href={link} 
      className={`${bgColor} text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between h-full`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium opacity-80 mb-1">{title}</p>
          <p className="text-3xl font-bold">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </p>
        </div>
        <div className={`p-3 rounded-lg bg-white bg-opacity-10`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {(isIncrease || isDecrease) && (
        <div className="mt-4 flex items-center text-sm">
          <span className={`flex items-center ${isIncrease ? 'text-green-300' : 'text-red-300'}`}>
            {isIncrease ? (
              <>
                <FaArrowUp className="mr-1" />
                {value}%
              </>
            ) : (
              <>
                <FaArrowDown className="mr-1" />
                {Math.abs(Number(value))}%
              </>
            )}
            <span className="ml-2">vs last month</span>
          </span>
        </div>
      )}
    </Link>
  );
};

// Dashboard metrics data
const complianceMetrics: SummaryCardProps[] = [
  { 
    title: 'New Compliance Reports (7d)', 
    value: 12, 
    icon: FaClipboardCheck, 
    bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
    link: '/admin/compliance',
  },
  { 
    title: 'Cases Pending Review', 
    value: 8, 
    icon: FaChartLine, 
    bgColor: 'bg-gradient-to-br from-orange-500 to-orange-600',
    link: '/admin/compliance?status=pending',
  },
  { 
    title: 'Resolution Rate', 
    value: 12, // This will show as +12% with an up arrow
    icon: FaChartPie, 
    bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
    link: '/admin/compliance',
  },
];

const resourceMetrics: SummaryCardProps[] = [
  { 
    title: 'Total Posts', 
    value: 45, 
    icon: FaRegNewspaper, 
    bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
    link: '/admin/posts/manage',
  },
  { 
    title: 'New Documents (30d)', 
    value: 7, 
    icon: FaBookReader, 
    bgColor: 'bg-gradient-to-br from-teal-500 to-teal-600',
    link: '/admin/elibrary/manage',
  },
  { 
    title: 'Total Downloads', 
    value: 5, // This will show as +5% with an up arrow
    icon: FaDownload, 
    bgColor: 'bg-gradient-to-br from-indigo-500 to-indigo-600',
    link: '/admin/elibrary/manage',
  },
];

const userMetrics: SummaryCardProps[] = [
  { 
    title: 'Active Users', 
    value: 45, 
    icon: FaUsers, 
    bgColor: 'bg-gradient-to-br from-gray-600 to-gray-700',
    link: '/admin/users',
  },
  { 
    title: 'Pending Approvals', 
    value: 3, 
    icon: FaUserPlus, 
    bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
    link: '/admin/users?status=pending',
  },
  { 
    title: 'Active Now', 
    value: 15, 
    icon: FaChartBar, 
    bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600',
    link: '/admin/users?filter=active',
  },
];

const ChartCard: FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
    <div className="h-80">
      {children}
    </div>
  </div>
);

export default function DashboardPage() {
  const userName = "Ato Elias Kebede";
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="mt-1 text-gray-600">Welcome back, <span className="font-medium">{userName}</span>. Here's what's happening with your Woreda 3 admin panel.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="inline-flex rounded-lg border border-gray-200 bg-white p-1">
            {['overview', 'reports', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === tab 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complianceMetrics.map((data, index) => (
          <SummaryCard key={`compliance-${index}`} {...data} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Compliance Trends">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={complianceData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="cases" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                dot={false}
                activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: 'white' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Resource Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={resourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {resourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 gap-6">
        <ChartCard title="User Activity">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={userData} margin={{ top: 10, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280', fontSize: 12 }}
              />
              <Tooltip 
                contentStyle={{
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar 
                dataKey="value" 
                radius={[4, 4, 0, 0]}
              >
                {userData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...resourceMetrics, ...userMetrics].map((data, index) => (
          <SummaryCard key={`metric-${index}`} {...data} />
        ))}
      </div>
    </div>
  );
}