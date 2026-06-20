// Monthly summary with category breakdown

import { CATEGORY_COLORS, type ExpenseCategory } from "@/lib/expense-types";

interface MonthlySummaryProps {
  categoryPercentages: { category: string; amount: number; percentage: number }[];
  monthlyTotal: number;
  selectedMonth: string;
  onMonthChange: (month: string) => void;
}

export function MonthlySummary({
  categoryPercentages,
  monthlyTotal,
  selectedMonth,
  onMonthChange,
}: MonthlySummaryProps) {

  // 🔹 Load logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // 🔹 Load expenses for that user
  const expenses =
    JSON.parse(localStorage.getItem(`expenses_${user.username}`) || "[]");

  // Generate month options (last 12 months)
  const monthOptions: { value: string; label: string }[] = [];
  const now = new Date();

  for (let i = 0; i < 12; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    monthOptions.push({ value, label });
  }

  return (
    <div className="stat-card animate-fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Monthly Breakdown
        </h3>

        <select
          value={selectedMonth}
          onChange={(e) => onMonthChange(e.target.value)}
          className="text-xs bg-secondary/50 border border-border rounded-md px-2 py-1.5 text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        >
          {monthOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {categoryPercentages.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-6">
          No expenses this month
        </p>
      ) : (
        <div className="space-y-3">
          {categoryPercentages
            .sort((a, b) => b.amount - a.amount)
            .map((item) => (
              <div key={item.category} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-foreground">
                    {item.category}
                  </span>

                  <span className="text-muted-foreground mono-number text-xs">
                    ₹{item.amount.toLocaleString()} · {item.percentage}%
                  </span>
                </div>

                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${item.percentage}%`,
                      backgroundColor:
                        CATEGORY_COLORS[item.category as ExpenseCategory],
                    }}
                  />
                </div>
              </div>
            ))}

          <div className="pt-2 border-t border-border flex justify-between text-sm font-semibold">
            <span>Total</span>
            <span className="mono-number">
              ₹{monthlyTotal.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}