import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import type { MonthComparison } from "@/hooks/useExpenses";

interface SpendingComparisonProps {
  comparison?: MonthComparison; // ✅ optional
  selectedMonth?: string; // ✅ optional
}

export function SpendingComparison({
  comparison,
  selectedMonth
}: SpendingComparisonProps) {

  // ✅ SAFE DEFAULTS
  const currentMonth = comparison?.currentMonth ?? 0;
  const previousMonth = comparison?.previousMonth ?? 0;
  const difference = comparison?.difference ?? 0;
  const percentageChange = comparison?.percentageChange ?? 0;
  const trend = comparison?.trend ?? "same";

  // ✅ SAFE MONTH PARSE
  let currentMonthName = "";
  let prevMonthName = "";

  if (selectedMonth) {
    const [year, month] = selectedMonth.split("-").map(Number);

    const currentDate = new Date(year, month - 1);
    currentMonthName = currentDate.toLocaleDateString("en-US", { month: "short" });

    const prevDate = new Date(year, month - 2, 1);
    prevMonthName = prevDate.toLocaleDateString("en-US", { month: "short" });
  }

  const getTrendIcon = () => {
    if (trend === "increase") return <TrendingUp className="h-4 w-4 text-destructive" />;
    if (trend === "decrease") return <TrendingDown className="h-4 w-4 text-success" />;
    return <Minus className="h-4 w-4 text-muted-foreground" />;
  };

  const getTrendColor = () => {
    if (trend === "increase") return "text-destructive";
    if (trend === "decrease") return "text-success";
    return "text-muted-foreground";
  };

  const getInsightMessage = () => {
    if (trend === "same") return "Spending is the same as last month";
    if (trend === "increase")
      return `Spending increased by ${Math.abs(percentageChange)}% compared to ${prevMonthName}`;
    return `Spending decreased by ${Math.abs(percentageChange)}% compared to ${prevMonthName}`;
  };

  // ✅ OPTIONAL: prevent rendering if no data yet
  if (!comparison || !selectedMonth) {
    return null;
  }

  return (
    <div className="stat-card animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Month Comparison
      </h3>

      <div className="grid grid-cols-2 gap-4 mb-4">

        <div className="text-center p-3 rounded-lg bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">{currentMonthName}</p>
          <p className="text-lg font-bold mono-number text-foreground">
            ₹{currentMonth.toLocaleString()}
          </p>
        </div>

        <div className="text-center p-3 rounded-lg bg-secondary/30">
          <p className="text-xs text-muted-foreground mb-1">{prevMonthName}</p>
          <p className="text-lg font-bold mono-number text-foreground">
            ₹{previousMonth.toLocaleString()}
          </p>
        </div>

      </div>

      <div
        className={`flex items-center gap-2 p-3 rounded-lg ${
          trend === "increase"
            ? "bg-destructive/10"
            : trend === "decrease"
            ? "bg-success/10"
            : "bg-secondary/30"
        }`}
      >
        {getTrendIcon()}

        <div className="flex-1">
          <p className={`text-sm font-medium ${getTrendColor()}`}>
            {trend === "same" ? (
              "No change"
            ) : (
              <>
                {trend === "increase" ? "+" : "-"}₹
                {Math.abs(difference).toLocaleString()}
                <span className="ml-1">
                  ({trend === "increase" ? "+" : "-"}
                  {Math.abs(percentageChange)}%)
                </span>
              </>
            )}
          </p>

          <p className="text-xs text-muted-foreground">
            {getInsightMessage()}
          </p>
        </div>

      </div>
    </div>
  );
}