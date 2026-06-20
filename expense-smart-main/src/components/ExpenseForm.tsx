import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ExpenseCategory =
  | "Food"
  | "Travel"
  | "Shopping"
  | "Bills"
  | "Entertainment"
  | "Other";

const CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Travel",
  "Shopping",
  "Bills",
  "Entertainment",
  "Other",
];

interface ExpenseFormProps {
  onAdd: (expense: {
    date: string;
    category: ExpenseCategory;
    amount: number;
    description: string;
  }) => void;
}

export function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );

  const [category, setCategory] = useState<ExpenseCategory | "">("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !category || !amount || !description.trim()) {
      alert("Please fill all fields");
      return;
    }

    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    onAdd({
      date,
      category: category as ExpenseCategory,
      amount: numAmount,
      description: description.trim(),
    });

    setAmount("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        p-6
        rounded-xl
        border
        bg-card
        text-card-foreground
        shadow-sm
        space-y-4
        max-w-xl
      "
    >
      <h3 className="text-xl font-semibold">
        Add Expense
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Date */}
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>

          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="
              bg-background
              text-foreground
              border-input
              dark:bg-card
              dark:text-white
            "
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>

          <select
            id="category"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as ExpenseCategory)
            }
            className="
              w-full
              h-10
              rounded-md
              border
              border-input
              bg-background
              text-foreground
              px-3
              py-2
              focus:outline-none
              focus:ring-2
              focus:ring-ring
              dark:bg-card
              dark:text-white
            "
          >
            <option value="">Select category</option>

            {CATEGORIES.map((cat) => (
              <option
                key={cat}
                value={cat}
                className="
                  bg-white
                  text-black
                  dark:bg-slate-900
                  dark:text-white
                "
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-2">
          <Label htmlFor="amount">Amount (₹)</Label>

          <Input
            id="amount"
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="
              bg-background
              text-foreground
              dark:bg-card
              dark:text-white
              placeholder:text-muted-foreground
            "
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>

          <Input
            id="description"
            type="text"
            placeholder="e.g. Lunch"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="
              bg-background
              text-foreground
              dark:bg-card
              dark:text-white
              placeholder:text-muted-foreground
            "
          />
        </div>
      </div>

      <Button
        type="submit"
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        Add Expense
      </Button>
    </form>
  );
}