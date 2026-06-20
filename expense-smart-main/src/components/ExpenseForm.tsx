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

    const expense = {
      date,
      category: category as ExpenseCategory,
      amount: numAmount,
      description: description.trim(),
    };

    onAdd(expense);

    // Reset form
    setAmount("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded-lg bg-white space-y-4 max-w-xl"
    >
      <h3 className="text-lg font-semibold">Add Expense</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date */}
        <div className="space-y-1">
          <Label>Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        {/* Category (NO OVERLAP) */}
        <div className="space-y-1">
          <Label>Category</Label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value as ExpenseCategory)
            }
            className="w-full border rounded-md p-2"
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Amount */}
        <div className="space-y-1">
          <Label>Amount (₹)</Label>
          <Input
            type="number"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <Label>Description</Label>
          <Input
            type="text"
            placeholder="e.g. Lunch"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" className="flex items-center gap-2">
        <Plus className="h-4 w-4" />
        Add Expense
      </Button>
    </form>
  );
}