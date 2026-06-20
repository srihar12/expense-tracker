// Types and constants for the expense tracker

export interface Expense {
  id: number;   // ✅ MUST BE NUMBER
  amount: number;
  category: string;
  description: string;
  date: string;
  email: string;
}
export type ExpenseCategory = 
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Other";

export const CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

// Default budget limits per category (in ₹)
export const DEFAULT_BUDGET_LIMITS: Record<ExpenseCategory, number> = {
  Food: 5000,
  Travel: 5000,
  Shopping: 5000,
  Bills: 5000,
  Entertainment: 5000,
  Other: 5000,
};

// Chart colors mapped to categories (HSL values matching design tokens)
export const CATEGORY_COLORS: Record<ExpenseCategory, string> = {
  Food: "hsl(168, 65%, 38%)",
  Travel: "hsl(220, 70%, 55%)",
  Shopping: "hsl(280, 60%, 55%)",
  Bills: "hsl(38, 92%, 50%)",
  Entertainment: "hsl(340, 65%, 55%)",
  Other: "hsl(200, 15%, 55%)",
};

export const CATEGORY_ICONS: Record<ExpenseCategory, string> = {
  Food: "UtensilsCrossed",
  Travel: "Plane",
  Shopping: "ShoppingBag",
  Bills: "Receipt",
  Entertainment: "Gamepad2",
  Other: "MoreHorizontal",
};
