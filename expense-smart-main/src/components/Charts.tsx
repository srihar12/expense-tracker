// Charts component using Recharts (pie + bar)

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CATEGORY_COLORS, type ExpenseCategory } from "@/lib/expense-types";

interface ChartsProps {
  categoryTotals: Record<string, number>;
  monthlyChartData: { month: string; total: number }[];
}

export function Charts({ categoryTotals, monthlyChartData }: ChartsProps) {
  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value,
    color: CATEGORY_COLORS[name as ExpenseCategory],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-fade-in">
      {/* Pie Chart */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Category Split</h3>
        {pieData.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-10">Add expenses to see chart</p>
        ) : (
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`₹${value.toLocaleString()}`, ""]}
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--card))",
                  fontSize: "12px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}
        {/* Legend */}
        {pieData.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {pieData.map((entry) => (
              <div key={entry.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }} />
                {entry.name}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bar Chart */}
      <div className="stat-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Monthly Trend</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyChartData} barSize={32}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
              tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            />
            <Tooltip
              formatter={(value: number) => [`₹${value.toLocaleString()}`, "Spent"]}
              contentStyle={{
                borderRadius: "8px",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--card))",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="total" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
