import { FileText, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseForm } from "@/components/ExpenseForm";
import { ExpenseList } from "@/components/ExpenseList";
import { InsightsPanel } from "@/components/InsightsPanel";
import { MonthlySummary } from "@/components/MonthlySummary";
import { Charts } from "@/components/Charts";
import { BudgetSettings, BudgetIndicators } from "@/components/BudgetSettings";
import { SpendingComparison } from "@/components/SpendingComparison";
import { SearchFilters } from "@/components/SearchFilters";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  const {
    filteredExpenses,
    monthlyExpenses,
    monthlyTotal,
    totalSpending,
    categoryTotals,
    highestCategory,
    categoryPercentages,
    selectedMonth,
    setSelectedMonth,
    budgets,
    addExpense,
    deleteExpense,
    updateBudget,
    exportToPDF,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    dateRange,
    setDateRange,
    amountRange,
    setAmountRange,
    clearFilters,
  } = useExpenses();

  return (
    <div className="min-h-screen bg-background">

      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-primary flex items-center justify-center">
              <Wallet className="h-5 w-5 text-primary-foreground" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-foreground">
                Expense Tracker
              </h1>
              <p className="text-xs text-muted-foreground">
                Smart Insights
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <BudgetSettings
              budgets={budgets}
              budgetStatuses={[]}
              onUpdateBudget={updateBudget}
            />

            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs"
              onClick={exportToPDF}
            >
              <FileText className="h-3.5 w-3.5" />
              Export PDF
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Insights */}
        <InsightsPanel
          monthlyTotal={monthlyTotal}
          totalSpending={totalSpending}
          highestCategory={highestCategory}
          overspendingAlerts={[]}
          transactionCount={monthlyExpenses.length}
        />

        {/* Form + Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <ExpenseForm
              onAdd={(data: any) =>
                addExpense({
                  ...data,
                  id: Date.now(),
                })
              }
            />
          </div>

          <MonthlySummary
            categoryPercentages={categoryPercentages}
            monthlyTotal={monthlyTotal}
            selectedMonth={selectedMonth}
            onMonthChange={setSelectedMonth}
          />
        </div>

        {/* Budget + Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <BudgetIndicators budgetStatuses={[]} />

          {/* ✅ FINAL FIX HERE */}
          <SpendingComparison
            comparison={[] as any} 
            selectedMonth={selectedMonth}
          />

        </div>

        {/* Charts */}
        <Charts
          categoryTotals={categoryTotals}
          monthlyChartData={[]}
        />

        {/* Filters */}
        <SearchFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          dateRange={dateRange}
          setDateRange={setDateRange}
          amountRange={amountRange}
          setAmountRange={setAmountRange}
          clearFilters={clearFilters}
        />

        {/* Expense List */}
        <ExpenseList
          expenses={filteredExpenses}
          onDelete={(id: any) => deleteExpense(Number(id))}
        />

      </main>
    </div>
  );
};

export default Index;