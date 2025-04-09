import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useCustomer } from "../context/CustomerContext";
import { useMemo } from "react";

const COLORS = [
  "#4f46e5",
  "#10b981",
  "#facc15",
  "#ef4444",
  "#6366f1",
  "#ec4899",
];

export default function RevenueCharts() {
  const { customers, turnover } = useCustomer();

  // Dữ liệu biểu đồ tròn theo trạng thái
  const pieData = useMemo(() => {
    const revenueByStatus = {};

    customers.forEach((cust) => {
      const status = cust.status || "Không xác định";
      const value = parseFloat(cust.orderValue) || 0;

      revenueByStatus[status] = (revenueByStatus[status] || 0) + value;
    });

    return Object.entries(revenueByStatus).map(([status, total]) => ({
      name: status,
      value: total,
    }));
  }, [customers]);

  // Dữ liệu biểu đồ cột theo năm
  const barData = useMemo(() => {
    const revenueByYear = {};

    customers.forEach((cust) => {
      const date = new Date(cust.orderDate);
      if (isNaN(date)) return;
      const year = date.getFullYear();
      const value = parseFloat(cust.orderValue) || 0;

      revenueByYear[year] = (revenueByYear[year] || 0) + value;
    });

    return Object.entries(revenueByYear).map(([year, total]) => ({
      year,
      revenue: total,
    }));
  }, [customers]);

  return (
    <div className="w-full grid md:grid-cols-1 gap-6">
      {/* Biểu đồ tròn */}
      <div className="h-[420px] bg-white rounded-xl shadow p-4 m-6">
        <h2 className="text-xl font-bold mb-2">
          Doanh thu theo trạng thái - ${turnover.toLocaleString()}
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) =>
                `${name} (${(percent * 100).toFixed(1)}%)`
              }
            >
              {pieData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${parseFloat(value).toLocaleString()}₫`} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Biểu đồ cột theo năm */}
      <div className="h-[420px] bg-white rounded-xl shadow p-4 m-6 mt-2">
        <h2 className="text-xl font-bold mb-2">Doanh thu theo năm</h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip formatter={(value) => `${parseFloat(value).toLocaleString()}₫`} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            <Bar dataKey="revenue" fill="#4f46e5" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
