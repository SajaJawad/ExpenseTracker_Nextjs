import { Expense } from "@/lib/types";
import { ExpenseItem } from "./ExpenseItem";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export function ExpenseList({ expenses, onDelete, onEdit }: ExpenseListProps) {
  const { t } = useLanguage();

  if (expenses.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>{t.common.noExpenses}</p>
        <p className="text-sm">{t.common.addFirstExpense}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
