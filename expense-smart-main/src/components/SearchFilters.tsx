// Search and filter component for expenses

import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CATEGORIES, type ExpenseCategory } from "@/lib/expense-types";

interface SearchFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: ExpenseCategory | "All";
  setCategoryFilter: (category: ExpenseCategory | "All") => void;
  dateRange: { start: string; end: string };
  setDateRange: (range: { start: string; end: string }) => void;
  amountRange: { min: number; max: number };
  setAmountRange: (range: { min: number; max: number }) => void;
  clearFilters: () => void;
}

export function SearchFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  dateRange,
  setDateRange,
  amountRange,
  setAmountRange,
  clearFilters,
}: SearchFiltersProps) {
  const hasActiveFilters = 
    searchQuery !== "" || 
    categoryFilter !== "All" || 
    dateRange.start !== "" || 
    dateRange.end !== "" || 
    amountRange.min > 0 || 
    amountRange.max !== Infinity;

  return (
    <div className="flex flex-col sm:flex-row gap-3 animate-fade-in">
      {/* Search input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-9"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Filter popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 h-9">
            <Filter className="h-3.5 w-3.5" />
            Filters
            {hasActiveFilters && (
              <span className="ml-1 h-4 w-4 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                !
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="end">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value as ExpenseCategory | "All")}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="All">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Date Range</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="h-9 text-sm"
                  placeholder="From"
                />
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="h-9 text-sm"
                  placeholder="To"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Amount Range (₹)</label>
              <div className="grid grid-cols-2 gap-2">
                <Input
                  type="number"
                  value={amountRange.min || ""}
                  onChange={(e) => setAmountRange({ ...amountRange, min: Number(e.target.value) || 0 })}
                  className="h-9 text-sm"
                  placeholder="Min"
                  min={0}
                />
                <Input
                  type="number"
                  value={amountRange.max === Infinity ? "" : amountRange.max}
                  onChange={(e) => setAmountRange({ ...amountRange, max: Number(e.target.value) || Infinity })}
                  className="h-9 text-sm"
                  placeholder="Max"
                  min={0}
                />
              </div>
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="w-full gap-2 text-muted-foreground"
              >
                <X className="h-3.5 w-3.5" />
                Clear all filters
              </Button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
