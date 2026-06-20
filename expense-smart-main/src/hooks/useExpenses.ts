import { useState, useEffect, useCallback, useMemo } from "react";
import type { Expense, ExpenseCategory } from "@/lib/expense-types";
import { DEFAULT_BUDGET_LIMITS } from "@/lib/expense-types";
import {
  getExpenses,
  createExpense,
  deleteExpense as deleteExpenseAPI,
} from "@/api/expenseApi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

/* ---------------- USER ---------------- */
function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user") || "{}");
  } catch {
    return {};
  }
}

/* ---------------- TYPES ---------------- */
export interface BudgetStatus {
  category: ExpenseCategory;
  spent: number;
  limit: number;
  percentage: number;
  status: "green" | "yellow" | "red";
}

export interface MonthComparison {
  currentMonth: number;
  previousMonth: number;
  difference: number;
  percentageChange: number;
  trend: "increase" | "decrease" | "same";
}

/* ---------------- HOOK ---------------- */
export function useExpenses() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [budgets, setBudgets] = useState<Record<ExpenseCategory, number>>({
    ...DEFAULT_BUDGET_LIMITS,
  });

  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] =
    useState<ExpenseCategory | "All">("All");

  const [dateRange, setDateRange] = useState({ start: "", end: "" });

  const [amountRange, setAmountRange] = useState({
    min: 0,
    max: Infinity,
  });

  const user = getUser();

  /* ---------------- LOAD ---------------- */
  const loadExpenses = useCallback(async () => {
    if (!user?.email) return;

    try {
      const res = await getExpenses(user.email);
      setExpenses(res.data || []);
    } catch {
      setExpenses([]);
    }
  }, [user?.email]);

  useEffect(() => {
    loadExpenses();
  }, [loadExpenses]);

  /* ---------------- ADD ---------------- */
  const addExpense = useCallback(
    async (expense: Omit<Expense, "id">) => {
      if (!user?.email) return;

      const res = await createExpense({
        ...expense,
        email: user.email,
      });

      setExpenses((prev) => [res.data, ...prev]);
    },
    [user?.email]
  );

  /* ---------------- DELETE ---------------- */
  const deleteExpense = useCallback(async (id: number) => {
    await deleteExpenseAPI(id);
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }, []);

  /* ---------------- SORT ---------------- */
  const sortedExpenses = useMemo(() => {
    return [...expenses].sort(
      (a, b) =>
        new Date(b.date || "").getTime() -
        new Date(a.date || "").getTime()
    );
  }, [expenses]);

  /* ---------------- MONTHLY ---------------- */
  const monthlyExpenses = useMemo(() => {
    return sortedExpenses.filter((e) =>
      (e.date || "").startsWith(selectedMonth)
    );
  }, [sortedExpenses, selectedMonth]);

  const monthlyTotal = useMemo(
    () => monthlyExpenses.reduce((sum, e) => sum + (e.amount || 0), 0),
    [monthlyExpenses]
  );

  /* ---------------- FILTERS ---------------- */
  const filteredExpenses = useMemo(() => {
    return monthlyExpenses.filter((expense) => {
      if (
        searchQuery &&
        !(expense.description || "")
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
        return false;

      if (
        categoryFilter !== "All" &&
        expense.category !== categoryFilter
      )
        return false;

      if (dateRange.start && (expense.date || "") < dateRange.start)
        return false;

      if (dateRange.end && (expense.date || "") > dateRange.end)
        return false;

      if ((expense.amount || 0) < amountRange.min) return false;

      if (
        amountRange.max !== Infinity &&
        (expense.amount || 0) > amountRange.max
      )
        return false;

      return true;
    });
  }, [
    monthlyExpenses,
    searchQuery,
    categoryFilter,
    dateRange,
    amountRange,
  ]);

  /* ---------------- TOTALS ---------------- */
  const totalSpending = useMemo(
    () => expenses.reduce((sum, e) => sum + (e.amount || 0), 0),
    [expenses]
  );

  const categoryTotals = useMemo(() => {
    const totals: Record<string, number> = {};
    monthlyExpenses.forEach((e) => {
      if (!e.category) return;
      totals[e.category] = (totals[e.category] || 0) + (e.amount || 0);
    });
    return totals;
  }, [monthlyExpenses]);

  /* ---------------- EXTRA ---------------- */
  const categoryPercentages = useMemo(() => {
    if (monthlyTotal === 0) return [];
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
      percentage: Math.round((amount / monthlyTotal) * 100),
    }));
  }, [categoryTotals, monthlyTotal]);

  const highestCategory = useMemo(() => {
    const entries = Object.entries(categoryTotals);
    if (entries.length === 0) return null;
    return entries.reduce((max, curr) =>
      curr[1] > max[1] ? curr : max
    );
  }, [categoryTotals]);

  /* ---------------- NEW FEATURES (FIXED) ---------------- */

  const budgetStatuses = useMemo(() => {
    return Object.entries(budgets).map(([category, limit]) => {
      const spent = categoryTotals[category] || 0;
      const percentage = limit ? (spent / limit) * 100 : 0;

      let status: "green" | "yellow" | "red" = "green";
      if (percentage > 90) status = "red";
      else if (percentage > 70) status = "yellow";

      return {
        category: category as ExpenseCategory,
        spent,
        limit,
        percentage,
        status,
      };
    });
  }, [budgets, categoryTotals]);

  const monthComparison = useMemo(() => {
    const currentMonthTotal = monthlyTotal;

    const prevMonth = new Date(selectedMonth + "-01");
    prevMonth.setMonth(prevMonth.getMonth() - 1);

    const prevMonthStr = `${prevMonth.getFullYear()}-${String(
      prevMonth.getMonth() + 1
    ).padStart(2, "0")}`;

    const previousMonthTotal = expenses
      .filter((e) => (e.date || "").startsWith(prevMonthStr))
      .reduce((sum, e) => sum + (e.amount || 0), 0);

    const difference = currentMonthTotal - previousMonthTotal;
    const percentageChange =
      previousMonthTotal === 0
        ? 0
        : (difference / previousMonthTotal) * 100;

    return {
      currentMonth: currentMonthTotal,
      previousMonth: previousMonthTotal,
      difference,
      percentageChange,
      trend:
        difference > 0 ? "increase" : difference < 0 ? "decrease" : "same",
    };
  }, [expenses, monthlyTotal, selectedMonth]);

  const monthlyChartData = useMemo(() => {
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
    }));
  }, [categoryTotals]);

  const overspendingAlerts = useMemo(() => {
    return budgetStatuses.filter((b) => b.status === "red");
  }, [budgetStatuses]);

  /* ---------------- PDF ---------------- */
  const exportToPDF = useCallback(() => {
    const doc = new jsPDF();

    doc.text("Expense Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [["Date", "Category", "Amount", "Description"]],
      body: monthlyExpenses.map((e) => [
        e.date,
        e.category,
        `₹${e.amount}`,
        e.description,
      ]),
    });

    doc.save("expenses.pdf");
  }, [monthlyExpenses]);

  /* ---------------- RETURN ---------------- */
  return {
    expenses: sortedExpenses,
    monthlyExpenses,
    filteredExpenses,
    totalSpending,
    monthlyTotal,
    categoryTotals,
    highestCategory,
    categoryPercentages,
    selectedMonth,
    setSelectedMonth,
    budgets,
    budgetStatuses,
    monthComparison,
    monthlyChartData,
    overspendingAlerts,
    addExpense,
    deleteExpense,
    updateBudget: (c: ExpenseCategory, l: number) =>
      setBudgets((p) => ({ ...p, [c]: l })),
    exportToPDF,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    amountRange,
    setAmountRange,
    clearFilters: () => {},
  };
}