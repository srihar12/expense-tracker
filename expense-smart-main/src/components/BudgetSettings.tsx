import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CATEGORIES, CATEGORY_COLORS, type ExpenseCategory } from "@/lib/expense-types";
import type { BudgetStatus } from "@/hooks/useExpenses";
import { useState } from "react";

interface BudgetSettingsProps {
  budgets?: Record<ExpenseCategory, number>; // ✅ optional
  budgetStatuses?: BudgetStatus[]; // ✅ optional
  onUpdateBudget: (category: ExpenseCategory, limit: number) => void;
}

export function BudgetSettings({
  budgets = {} as Record<ExpenseCategory, number>, // ✅ default
  budgetStatuses = [], // ✅ default
  onUpdateBudget
}: BudgetSettingsProps) {

  const [open, setOpen] = useState(false);

  const getStatusColor = (status: "green" | "yellow" | "red") => {
    if (status === "yellow") return "bg-warning";
    if (status === "red") return "bg-destructive";
    return "bg-success";
  };

  const getStatusBg = (status: "green" | "yellow" | "red") => {
    if (status === "yellow") return "bg-warning/20";
    if (status === "red") return "bg-destructive/20";
    return "bg-success/20";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <Settings className="h-3.5 w-3.5" />
          Budget
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Category Budgets</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-4">

          {CATEGORIES.map((category) => {

            // ✅ SAFE FIND
            const status = budgetStatuses?.find((s) => s.category === category);

            const percentage = status?.percentage ?? 0;
            const statusType = status?.status ?? "green";
            const spent = status?.spent ?? 0;

            return (
              <div key={category} className="space-y-2">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[category] }}
                    />
                    <span className="text-sm font-medium text-foreground">
                      {category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">₹</span>

                    <Input
                      type="number"
                      value={budgets?.[category] ?? 0} // ✅ SAFE
                      onChange={(e) =>
                        onUpdateBudget(category, Math.max(0, Number(e.target.value)))
                      }
                      className="w-24 h-8 text-sm"
                      min={0}
                    />
                  </div>

                </div>

                <div className="space-y-1">

                  <div className={`h-2 rounded-full overflow-hidden ${getStatusBg(statusType)}`}>
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${getStatusColor(statusType)}`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>₹{spent.toLocaleString()} spent</span>
                    <span className={`font-medium ${
                      statusType === "red"
                        ? "text-destructive"
                        : statusType === "yellow"
                        ? "text-warning"
                        : "text-success"
                    }`}>
                      {percentage}%
                    </span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- INDICATORS ---------------- */

export function BudgetIndicators({
  budgetStatuses = [] // ✅ SAFE DEFAULT
}: {
  budgetStatuses?: BudgetStatus[];
}) {

  const getStatusColor = (status: "green" | "yellow" | "red") => {
    if (status === "yellow") return "bg-warning";
    if (status === "red") return "bg-destructive";
    return "bg-success";
  };

  const getStatusBg = (status: "green" | "yellow" | "red") => {
    if (status === "yellow") return "bg-warning/20";
    if (status === "red") return "bg-destructive/20";
    return "bg-success/20";
  };

  const activeStatuses = (budgetStatuses || []).filter((s) => s.spent > 0);

  if (activeStatuses.length === 0) return null;

  return (
    <div className="stat-card animate-fade-in">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Budget Status
      </h3>

      <div className="space-y-3">

        {activeStatuses
          .sort((a, b) => b.percentage - a.percentage)
          .map((status) => (

            <div key={status.category} className="space-y-1.5">

              <div className="flex items-center justify-between text-sm">

                <div className="flex items-center gap-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: CATEGORY_COLORS[status.category] }}
                  />
                  <span className="font-medium text-foreground">
                    {status.category}
                  </span>
                </div>

                <span className={`text-xs font-medium ${
                  status.status === "red"
                    ? "text-destructive"
                    : status.status === "yellow"
                    ? "text-warning"
                    : "text-success"
                }`}>
                  {status.percentage}% of budget
                </span>

              </div>

              <div className={`h-2 rounded-full overflow-hidden ${getStatusBg(status.status)}`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${getStatusColor(status.status)}`}
                  style={{ width: `${Math.min(status.percentage, 100)}%` }}
                />
              </div>

              <div className="flex justify-between text-xs text-muted-foreground mono-number">
                <span>₹{status.spent.toLocaleString()}</span>
                <span>₹{status.limit.toLocaleString()}</span>
              </div>

            </div>

          ))}

      </div>
    </div>
  );
}