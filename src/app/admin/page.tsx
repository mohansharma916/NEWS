"use client";

import { useEffect, useState } from "react";
import {useAuth} from "../../context/authContext"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell,  AreaChart, Area
} from "recharts";
import { 
  EyeIcon, 
  DocumentTextIcon, 
  ChartBarIcon, 
  FireIcon 
} from "@heroicons/react/24/outline";

// --- Types ---
interface DashboardData {
  overview: {
    totalPosts: number;
    totalViews: number;
    avgViews: number;
  };
  topPosts: {
    id: string;
    title: string;
    views: number;
  }[];
  categoryData: {
    name: string;
    count: number;
  }[];
  activityTrend: {
    name: string;
    views: number;
  }[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8", "#82ca9d"];

export default function AdminDashboard() {
  const { token } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/admin/stats`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const json = await res.json();
        setData(json);
      } catch {
        console.error("Failed to load stats");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (isLoading || !data) return <div className="p-8">Loading Dashboard...</div>;

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>

      {/* 1. Scorecards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <ScoreCard 
          title="Total Views" 
          value={data.overview.totalViews.toLocaleString()} 
          icon={EyeIcon} 
          color="text-blue-600" 
          bgColor="bg-blue-100"
        />
        <ScoreCard 
          title="Total Articles" 
          value={data.overview.totalPosts} 
          icon={DocumentTextIcon} 
          color="text-purple-600" 
          bgColor="bg-purple-100"
        />
        <ScoreCard 
          title="Avg. Views" 
          value={data.overview.avgViews.toLocaleString()} 
          icon={ChartBarIcon} 
          color="text-green-600" 
          bgColor="bg-green-100"
        />
        <ScoreCard 
          title="Trending Score" 
          value="High" 
          icon={FireIcon} 
          color="text-orange-600" 
          bgColor="bg-orange-100"
        />
      </div>

      {/* 2. Charts Row 1 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        
        {/* Activity Trend (Line/Area Chart) */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Traffic Trend (Last 7 Days)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.activityTrend}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="views" stroke="#3B82F6" fillOpacity={1} fill="url(#colorViews)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top 5 Articles (Bar Chart) */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Top 5 Performing Articles</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={data.topPosts} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis dataKey="title" type="category" width={150} tick={{fontSize: 12}} />
                <Tooltip />
                <Bar dataKey="views" fill="#8884d8" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* 3. Charts Row 2 */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        
        {/* Category Distribution (Pie Chart) */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-1">
          <h3 className="mb-4 text-lg font-medium text-gray-900">Content Distribution</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="count"
                >
                  {data.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            {/* Custom Legend */}
            <div className="mt-4 flex flex-wrap justify-center gap-2">
               {data.categoryData.map((entry, index) => (
                 <div key={index} className="flex items-center text-xs text-gray-600">
                    <span className="mr-1 block h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                    {entry.name} ({entry.count})
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* Quick Links / Recent Actions (Simple List) */}
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm lg:col-span-2">
            <h3 className="mb-4 text-lg font-medium text-gray-900">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
                <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <span className="text-2xl mb-2">+</span>
                    <span className="text-sm font-medium">Write New Article</span>
                </button>
                <button className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                    <span className="text-2xl mb-2">📂</span>
                    <span className="text-sm font-medium">Manage Categories</span>
                </button>
            </div>
        </div>

      </div>
    </div>
  );
}

// Simple Sub-component for the top cards
function ScoreCard({
  title,
  value,
  icon: Icon,
  color,
  bgColor,
}: {
  title: string;
  value: React.ReactNode;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
  bgColor: string;
}) {
  return (
    <div className="flex items-center rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className={`mr-4 flex h-12 w-12 items-center justify-center rounded-full ${bgColor}`}>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
}