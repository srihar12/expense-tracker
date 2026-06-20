import { TrendingUp, AlertTriangle, IndianRupee, ArrowUpRight } from "lucide-react";
import type { ExpenseCategory } from "@/lib/expense-types";
import { CATEGORY_COLORS } from "@/lib/expense-types";

interface InsightsPanelProps {
  monthlyTotal?: number;
  totalSpending?: number;
  highestCategory?: [string, number] | null;
  overspendingAlerts?: { category: ExpenseCategory; spent: number; limit: number }[];
  transactionCount?: number;
}

export function InsightsPanel({
  monthlyTotal = 0,
  totalSpending = 0,
  highestCategory = null,
  overspendingAlerts = [],
  transactionCount = 0,
}: InsightsPanelProps) {

  return (
    <div className="space-y-4 animate-fade-in">

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">

        {/* Monthly */}
        <div className="stat-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <IndianRupee className="h-4 w-4" />
            <span className="text-xs font-medium">This Month</span>
          </div>
          <p className="text-2xl font-bold mono-number text-foreground">
            ₹{monthlyTotal.toLocaleString()}
          </p>
        </div>

        {/* Total */}
        <div className="stat-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <TrendingUp className="h-4 w-4" />
            <span className="text-xs font-medium">All Time</span>
          </div>
          <p className="text-2xl font-bold mono-number text-foreground">
            ₹{totalSpending.toLocaleString()}
          </p>
        </div>

        {/* Transactions */}
        <div className="stat-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <ArrowUpRight className="h-4 w-4" />
            <span className="text-xs font-medium">Transactions</span>
          </div>
          <p className="text-2xl font-bold mono-number text-foreground">
            {transactionCount}
          </p>
        </div>

        {/* Top Category */}
        <div className="stat-card">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <span className="text-xs font-medium">Top Category</span>
          </div>

          {highestCategory ? (
            <div>
              <p
                className="text-lg font-bold"
                style={{
                  color: CATEGORY_COLORS[
                    highestCategory[0] as ExpenseCategory
                  ],
                }}
              >
                {highestCategory[0]}
              </p>
              <p className="text-xs text-muted-foreground mono-number">
                ₹{highestCategory[1].toLocaleString()}
              </p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No data</p>
          )}
        </div>

      </div>

      {/* Alerts */}
      {(overspendingAlerts || []).length > 0 && (
        <div className="space-y-2">
          {(overspendingAlerts || []).map((alert) => (
            <div
              key={alert.category}
              className="insight-alert-warning flex items-center gap-2"
            >
              <AlertTriangle className="h-4 w-4 text-warning shrink-0" />
              <span>
                <strong>{alert.category}</strong> exceeded budget: ₹
                {alert.spent.toLocaleString()} / ₹
                {alert.limit.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}