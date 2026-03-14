import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot, getDocs } from 'firebase/firestore';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { db, auth } from '../firebase';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  LayoutDashboard, Users, Calendar, Map, LogOut, Activity, Smartphone, Globe
} from 'lucide-react';

const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function Dashboard() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        fetchData();
      }
    });

    return () => unsubscribeAuth();
  }, [navigate]);

  const fetchData = () => {
    // Fetch Appointments
    const qAppointments = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubAppointments = onSnapshot(qAppointments, (snapshot) => {
      const appts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(appts);
    }, (error) => {
      console.error("Error fetching appointments:", error);
    });

    // Fetch Analytics
    const qAnalytics = query(collection(db, 'analytics'), orderBy('createdAt', 'desc'));
    const unsubAnalytics = onSnapshot(qAnalytics, (snapshot) => {
      const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAnalytics(events);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching analytics:", error);
      setLoading(false);
    });

    return () => {
      unsubAppointments();
      unsubAnalytics();
    };
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/login');
  };

  // Process Analytics Data
  const getDeviceData = () => {
    const counts = analytics.reduce((acc, curr) => {
      const device = curr.device || 'desktop';
      acc[device] = (acc[device] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] }));
  };

  const getCountryData = () => {
    const counts = analytics.reduce((acc, curr) => {
      const country = curr.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).map(key => ({ name: key, value: counts[key] })).sort((a, b) => b.value - a.value).slice(0, 5);
  };

  const getPageViewsData = () => {
    const counts = analytics.reduce((acc, curr) => {
      const path = curr.path || '/';
      acc[path] = (acc[path] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return Object.keys(counts).map(key => ({ name: key, views: counts[key] })).sort((a, b) => b.views - a.views).slice(0, 5);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold flex items-center">
            <LayoutDashboard className="mr-2" /> Admin
          </h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
          >
            <Activity className="mr-3 h-5 w-5" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'appointments' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
          >
            <Calendar className="mr-3 h-5 w-5" /> Appointments
          </button>
          <button 
            onClick={() => setActiveTab('analytics')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${activeTab === 'analytics' ? 'bg-indigo-800 text-white' : 'text-indigo-200 hover:bg-indigo-800'}`}
          >
            <Globe className="mr-3 h-5 w-5" /> Analytics
          </button>
        </nav>
        <div className="p-4 border-t border-indigo-800">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-indigo-200 hover:text-white hover:bg-indigo-800 rounded-lg transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 capitalize">{activeTab}</h2>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-gray-600">
            Welcome, Admin
          </div>
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                  <Activity className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Page Views</p>
                  <p className="text-3xl font-bold text-gray-900">{analytics.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Appointments</p>
                  <p className="text-3xl font-bold text-gray-900">{appointments.length}</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                  <Users className="h-8 w-8" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Unique Countries</p>
                  <p className="text-3xl font-bold text-gray-900">{getCountryData().length}</p>
                </div>
              </div>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-indigo-500" /> Top Countries
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getCountryData()}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip cursor={{ fill: '#f3f4f6' }} />
                      <Bar dataKey="value" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <Smartphone className="h-5 w-5 mr-2 text-indigo-500" /> Devices Used
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getDeviceData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {getDeviceData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Recent Appointments</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Contact</th>
                    <th className="p-4 font-medium">Date & Time</th>
                    <th className="p-4 font-medium">Message</th>
                    <th className="p-4 font-medium">Submitted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {appointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-500">No appointments found.</td>
                    </tr>
                  ) : (
                    appointments.map((appt) => (
                      <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 font-medium text-gray-900">{appt.fullName}</td>
                        <td className="p-4">
                          <div className="text-sm text-gray-900">{appt.email}</div>
                          <div className="text-sm text-gray-500">{appt.phone}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-sm text-gray-900">{appt.date}</div>
                          <div className="text-sm text-gray-500">{appt.time}</div>
                        </td>
                        <td className="p-4 text-sm text-gray-600 max-w-xs truncate">
                          {appt.message || '-'}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {appt.createdAt?.toDate ? appt.createdAt.toDate().toLocaleDateString() : 'Just now'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Top Pages Visited</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {getPageViewsData().map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-6 text-gray-400 font-medium">{index + 1}.</span>
                        <span className="text-gray-800 font-medium">{page.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-gray-900 font-bold mr-2">{page.views}</span>
                        <span className="text-gray-500 text-sm">views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-800">Recent Visitors Log</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm uppercase tracking-wider">
                      <th className="p-4 font-medium">Time</th>
                      <th className="p-4 font-medium">Path</th>
                      <th className="p-4 font-medium">Location</th>
                      <th className="p-4 font-medium">Device / OS</th>
                      <th className="p-4 font-medium">Browser</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {analytics.slice(0, 20).map((event) => (
                      <tr key={event.id} className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 text-sm text-gray-500">
                          {event.createdAt?.toDate ? event.createdAt.toDate().toLocaleString() : 'Just now'}
                        </td>
                        <td className="p-4 text-sm font-medium text-indigo-600">{event.path}</td>
                        <td className="p-4 text-sm text-gray-600">
                          {event.city !== 'Unknown' ? `${event.city}, ` : ''}{event.country}
                        </td>
                        <td className="p-4 text-sm text-gray-600 capitalize">
                          {event.device} / {event.os}
                        </td>
                        <td className="p-4 text-sm text-gray-600">{event.browser}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
