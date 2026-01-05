import { useState, useEffect } from "react";
import {
  Expense,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  Category,
  TransactionType,
} from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { cn } from "@/lib/utils";

interface ExpenseFormProps {
  onSubmit: (data: Omit<Expense, "id">) => void;
  initialData?: Expense | null;
  onCancel: () => void;
}

export function ExpenseForm({
  onSubmit,
  initialData,
  onCancel,
}: ExpenseFormProps) {
  const { t } = useLanguage();
  const [type, setType] = useState<TransactionType>("expense");
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<Category>("Food");
  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setType(initialData.type);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setDate(initialData.date);
      setNote(initialData.note || "");
    }
  }, [initialData]);

  // Reset category when type changes if current category is invalid for new type
  useEffect(() => {
    const categories =
      type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
    if (!categories.includes(category)) {
      setCategory(categories[0]);
    }
  }, [type]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !date) return;

    onSubmit({
      type,
      amount: parseFloat(amount),
      category,
      date,
      note,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Type Toggle */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg">
        <button
          type="button"
          onClick={() => setType("expense")}
          className={cn(
            "py-2 text-sm font-medium rounded-md transition-all",
            type === "expense"
              ? "bg-white dark:bg-card shadow text-red-600"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t.common.expense}
        </button>
        <button
          type="button"
          onClick={() => setType("income")}
          className={cn(
            "py-2 text-sm font-medium rounded-md transition-all",
            type === "income"
              ? "bg-white dark:bg-card shadow text-green-600"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {t.common.income}
        </button>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.common.amount}</label>
        <Input
          type="number"
          step="0.01"
          placeholder="0.00"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.common.category}</label>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        >
          {(type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES).map(
            (cat) => (
              <option key={cat} value={cat}>
                {t.categories[cat]}
              </option>
            )
          )}
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">{t.common.date}</label>
        <Input
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">
          {t.common.note}{" "}
          <span className="text-muted-foreground">{t.common.optional}</span>
        </label>
        <Input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <div className="flex gap-2 pt-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          {t.common.cancel}
        </Button>
        <Button type="submit">
          {initialData ? t.common.update : t.common.save}
        </Button>
      </div>
    </form>
  );
}
