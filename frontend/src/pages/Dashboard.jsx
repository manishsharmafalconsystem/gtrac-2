import React from "react";
import {
  FaUsers,
  FaDollarSign,
  FaCar,
  FaClipboardList,
  FaTruck,
  FaChartLine,
  FaGasPump,
  FaRoute,
  FaTools,
  FaHeartbeat,
  FaUserCheck,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* ------------------ DASHBOARD ------------------ */
const Dashboard = () => {
  /* ---------------- DATA ---------------- */
  const fleetUsageData = [
    { date: "Mon", usage: 60 },
    { date: "Tue", usage: 75 },
    { date: "Wed", usage: 50 },
    { date: "Thu", usage: 90 },
    { date: "Fri", usage: 80 },
    { date: "Sat", usage: 65 },
    { date: "Sun", usage: 70 },
  ];

  const revenueData = [
    { month: "Jan", revenue: 4000 },
    { month: "Feb", revenue: 6000 },
    { month: "Mar", revenue: 5000 },
    { month: "Apr", revenue: 7000 },
    { month: "May", revenue: 6500 },
  ];

  const vehicleStatusData = [
    { name: "Active", value: 25, color: "#22C55E" },
    { name: "Idle", value: 5, color: "#FBBF24" },
    { name: "Maintenance", value: 2, color: "#EF4444" },
  ];

  const alerts = [
    { msg: "Vehicle V003 overspeed detected", type: "Critical" },
    { msg: "Fuel low on V008", type: "Warning" },
    { msg: "Maintenance due for V012", type: "Info" },
  ];

  const maintenance = [
    { vehicle: "V001", task: "Engine Check", date: "10 Jan" },
    { vehicle: "V005", task: "Oil Change", date: "12 Jan" },
    { vehicle: "V008", task: "Tire Replacement", date: "15 Jan" },
  ];

  const drivers = [
    { name: "John Doe", rating: 4.8, trips: 50 },
    { name: "Jane Smith", rating: 4.5, trips: 45 },
    { name: "Mark Lee", rating: 4.2, trips: 40 },
  ];

  const routes = [
    { route: "Route A", efficiency: 90 },
    { route: "Route B", efficiency: 75 },
    { route: "Route C", efficiency: 60 },
  ];

  const fuelData = [
    { vehicle: "V001", fuel: 60 },
    { vehicle: "V002", fuel: 45 },
    { vehicle: "V003", fuel: 70 },
    { vehicle: "V004", fuel: 55 },
  ];

  const topVehicles = [
    { vehicle: "V001", trips: 120 },
    { vehicle: "V002", trips: 110 },
    { vehicle: "V003", trips: 95 },
  ];

  const events = [
    { event: "Fleet Audit", date: "2026-01-20" },
    { event: "Annual Maintenance", date: "2026-01-25" },
  ];

  const systemHealth = [
    { component: "API", status: "Operational", color: "green" },
    { component: "GPS", status: "Stable", color: "green" },
    { component: "Database", status: "Degraded", color: "yellow" },
  ];

  const kpis = [
    { label: "Total Vehicles", value: 32, icon: <FaCar />, color: "blue", progress: 80 },
    { label: "Total Trips", value: 580, icon: <FaClipboardList />, color: "green", progress: 75 },
    { label: "Total Drivers", value: 15, icon: <FaUsers />, color: "purple", progress: 60 },
    { label: "Revenue ($)", value: 50000, icon: <FaDollarSign />, color: "yellow", progress: 90 },
    { label: "Fuel Efficiency", value: "7.5 km/L", icon: <FaGasPump />, color: "orange", progress: 70 },
    { label: "Route Success", value: "92%", icon: <FaRoute />, color: "teal", progress: 92 },
  ];

  return (
    <div className="min-h-screen font-sans">
      {/* Header with Breadcrumb Right */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Fleet Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Fleet analytics & insights</p>
        </div>

        {/* Right-aligned Breadcrumb */}
        <nav className="text-gray-500 text-sm">
          <ol className="list-reset flex justify-end">
            <li>
              <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-gray-700 font-semibold">Dashboard</li>
          </ol>
        </nav>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-6">
        {kpis.map((k, i) => (
          <KpiCard key={i} {...k} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <ModernChartCard title="Fleet Usage (Weekly)" icon={<FaTruck />}>
          <ResponsiveContainer height={140}>
            <LineChart data={fleetUsageData}>
              <XAxis dataKey="date" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Line type="monotone" dataKey="usage" stroke="#0EA5E9" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </ModernChartCard>

        <ModernChartCard title="Revenue Trend (Monthly)" icon={<FaChartLine />}>
          <ResponsiveContainer height={140}>
            <BarChart data={revenueData}>
              <XAxis dataKey="month" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="revenue" fill="#22C55E" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ModernChartCard>

        <ModernChartCard title="Vehicle Status Overview" icon={<FaCar />}>
          <ResponsiveContainer height={140}>
            <PieChart>
              <Pie data={vehicleStatusData} dataKey="value" outerRadius={60} label>
                {vehicleStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </ModernChartCard>

        <ModernChartCard title="System Health" icon={<FaHeartbeat />}>
          {systemHealth.map((s, i) => (
            <div key={i} className="flex justify-between py-1 text-sm bg-gray-50 rounded px-2 mb-1">
              <span>{s.component}</span>
              <span
                className={`font-semibold ${
                  s.color === "green"
                    ? "text-green-600"
                    : s.color === "yellow"
                    ? "text-yellow-500"
                    : "text-red-600"
                }`}
              >
                {s.status}
              </span>
            </div>
          ))}
        </ModernChartCard>
      </div>

      {/* Alerts & Maintenance */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        <ModernListCard title="Critical Alerts" icon={<FaExclamationTriangle />} color="red">
          {alerts.map((a, i) => (
            <div key={i} className="flex justify-between py-2 text-sm bg-red-50 rounded px-2 mb-1">
              <span className="font-bold text-red-600">{a.type}</span>
              <span className="text-gray-700">{a.msg}</span>
            </div>
          ))}
        </ModernListCard>

        <ModernListCard title="Upcoming Maintenance" icon={<FaTools />} color="yellow">
          {maintenance.map((m, i) => (
            <div key={i} className="flex justify-between py-2 text-sm bg-yellow-50 rounded px-2 mb-1">
              <span className="text-gray-800 font-semibold">{m.vehicle}</span>
              <span className="text-gray-600">{m.task}</span>
              <span className="text-sky-600">{m.date}</span>
            </div>
          ))}
        </ModernListCard>

        <ModernListCard title="Fuel Consumption" icon={<FaGasPump />} color="green">
          <ResponsiveContainer height={120}>
            <BarChart data={fuelData}>
              <XAxis dataKey="vehicle" stroke="#94A3B8" />
              <YAxis stroke="#94A3B8" />
              <Tooltip />
              <Bar dataKey="fuel" fill="#FBBF24" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ModernListCard>

        <ModernListCard title="Top Drivers" icon={<FaUserCheck />} color="blue">
          {drivers.map((d, i) => (
            <div key={i} className="flex justify-between py-2 text-sm bg-blue-50 rounded px-2 mb-1">
              <span>{d.name}</span>
              <span>
                {d.rating} ⭐ / {d.trips} trips
              </span>
            </div>
          ))}
        </ModernListCard>
      </div>

      {/* Routes & Top Vehicles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <ModernListCard title="Route Efficiency" icon={<FaRoute />} color="purple">
          {routes.map((r, i) => (
            <div key={i} className="mb-2">
              <div className="flex justify-between text-sm mb-1">
                <span>{r.route}</span>
                <span>{r.efficiency}%</span>
              </div>
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: `${r.efficiency}%` }} />
              </div>
            </div>
          ))}
        </ModernListCard>

        <ModernListCard title="Top Vehicles" icon={<FaTruck />} color="green">
          {topVehicles.map((v, i) => (
            <div key={i} className="flex justify-between py-2 text-sm bg-green-50 rounded px-2 mb-1">
              <span>{v.vehicle}</span>
              <span>{v.trips} trips</span>
            </div>
          ))}
        </ModernListCard>

        <ModernListCard title="Upcoming Events" icon={<FaCalendarAlt />} color="sky">
          {events.map((e, i) => (
            <div key={i} className="flex justify-between py-2 text-sm bg-sky-50 rounded px-2 mb-1">
              <span>{e.event}</span>
              <span className="text-sky-600">{e.date}</span>
            </div>
          ))}
        </ModernListCard>
      </div>
    </div>
  );
};

/* ---------------- COMPONENTS ---------------- */
const KpiCard = ({ icon, label, value, color, progress }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-xl transition transform hover:-translate-y-1">
    <div className="flex items-center gap-2">
      <span className={`text-${color}-500 text-2xl`}>{icon}</span>
      <p className="text-gray-500 font-semibold text-sm">{label}</p>
    </div>
    <p className="text-xl font-bold">{value}</p>
    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
      <div className={`h-2 rounded-full bg-${color}-500`} style={{ width: `${progress}%` }} />
    </div>
  </div>
);

const ModernChartCard = ({ title, icon, children }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-xl transition transform hover:-translate-y-1">
    <div className="flex items-center gap-2 text-sm font-semibold mb-1">
      <span className="text-sky-600">{icon}</span>
      {title}
    </div>
    {children}
  </div>
);

const ModernListCard = ({ title, icon, children, color }) => (
  <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:shadow-xl transition transform hover:-translate-y-1">
    <div className="flex items-center gap-2 text-sm font-semibold mb-1">
      <span className={`text-${color}-500`}>{icon}</span>
      {title}
    </div>
    {children}
  </div>
);

export default Dashboard;
