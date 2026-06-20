import React from "react";
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

export function ExpenseList({
  expenses,
  onDelete,
}: ExpenseListProps) {
  const totalAmount = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  if (!expenses || expenses.length === 0) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground p-8 text-center">
        <p className="text-muted-foreground">
          No expenses yet. Add your first expense above!
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground overflow-hidden shadow-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b">
        <h3 className="text-lg font-semibold">
          Recent Expenses
        </h3>

        <p className="text-xs text-muted-foreground mt-1">
          {expenses.length} transaction
          {expenses.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Date
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase">
                Category
              </th>

              <th className="px-5 py-3 text-right text-xs font-medium text-muted-foreground uppercase">
                Amount
              </th>

              <th className="px-5 py-3 text-left text-xs font-medium text-muted-foreground uppercase hidden sm:table-cell">
                Description
              </th>

              <th className="w-12"></th>
            </tr>
          </thead>

          <tbody>
            {expenses.map((expense) => (
              <tr
                key={expense.id}
                className="border-b hover:bg-muted/20 transition-colors"
              >
                <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">
                  {new Date(expense.date).toLocaleDateString(
                    "en-IN",
                    {
                      day: "2-digit",
                      month: "short",
                    }
                  )}
                </td>

                <td className="px-5 py-3">
                  <span
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[expense.category]}20`,
                      color:
                        CATEGORY_COLORS[expense.category],
                    }}
                  >
                    {CATEGORY_ICON_MAP[
                      expense.category
                    ] || CATEGORY_ICON_MAP["Other"]}

                    {expense.category}
                  </span>
                </td>

                <td className="px-5 py-3 text-right font-semibold whitespace-nowrap">
                  ₹{expense.amount.toLocaleString()}
                </td>

                <td className="px-5 py-3 text-muted-foreground hidden sm:table-cell max-w-[250px] truncate">
                  {expense.description}
                </td>

                <td className="px-3 py-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-red-500"
                    onClick={() =>
                      expense.id &&
                      onDelete(String(expense.id))
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>

          {/* Total Row */}
          <tfoot>
            <tr className="border-t bg-muted/40">
              <td
                colSpan={2}
                className="px-5 py-3 font-semibold"
              >
                Total
              </td>

              <td className="px-5 py-3 text-right font-bold text-primary">
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