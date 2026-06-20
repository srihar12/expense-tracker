// Expense list table with delete and sorting + TOTAL (FIXED)

import {
  Trash2,
  UtensilsCrossed,
  Plane,
  ShoppingBag,
  Receipt,
  Gamepad2,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Expense } from "@/lib/expense-types";
import { CATEGORY_COLORS } from "@/lib/expense-types";
import React from "react";

const CATEGORY_ICON_MAP: Record<string, React.ReactNode> = {
  Food: <UtensilsCrossed className="h-3.5 w-3.5" />,
  Travel: <Plane className="h-3.5 w-3.5" />,
  Shopping: <ShoppingBag className="h-3.5 w-3.5" />,
  Bills: <Receipt className="h-3.5 w-3.5" />,
  Entertainment: <Gamepad2 className="h-3.5 w-3.5" />,
  Other: <MoreHorizontal className="h-3.5 w-3.5" />,
};

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  // ✅ Calculate total
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  if (!expenses || expenses.length === 0) {
    return (
      <div className="stat-card text-center py-12 text-muted-foreground animate-fade-in">
        <p className="text-sm">
          No expenses yet. Add your first expense above!
        </p>
      </div>
    );
  }

  return (
    <div className="stat-card p-0 overflow-hidden animate-fade-in">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Expenses
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          {expenses.length} transaction
          {expenses.length !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-secondary/30">
              <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Date
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Category
              </th>
              <th className="text-right px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Amount
              </th>
              <th className="text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hidden sm:table-cell">
                Description
              </th>
              <th className="px-5 py-2.5 w-10"></th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
              >
                <td className="px-5 py-3 text-muted-foreground mono-number text-xs whitespace-nowrap">
                  {new Date(expense.date).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                  })}
                </td>

                <td className="px-5 py-3">
                  <span
                    className="category-badge flex items-center gap-1"
                    style={{
                      backgroundColor: `${
                        CATEGORY_COLORS[expense.category]
                      }15`,
                      color: CATEGORY_COLORS[expense.category],
                    }}
                  >
                    {CATEGORY_ICON_MAP[expense.category] ||
                      CATEGORY_ICON_MAP["Other"]}
                    {expense.category}
                  </span>
                </td>

                <td className="px-5 py-3 text-right font-semibold mono-number whitespace-nowrap">
                  ₹{expense.amount.toLocaleString()}
                </td>

                <td className="px-5 py-3 text-muted-foreground truncate max-w-[200px] hidden sm:table-cell">
                  {expense.description}
                </td>

                <td className="px-3 py-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      if (expense.id !== undefined && expense.id !== null) {
                        onDelete(String(expense.id)); // ✅ FIX HERE
                      }
                    }}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* ✅ TOTAL ROW */}
          <tfoot>
            <tr className="bg-secondary/40 border-t border-border">
              <td colSpan={2} className="px-5 py-3 font-semibold text-foreground">
                Total
              </td>

              <td className="px-5 py-3 text-right font-bold text-primary mono-number">
                ₹{totalAmount.toLocaleString()}
              </td>

              <td colSpan={2}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}