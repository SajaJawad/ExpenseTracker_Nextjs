import { Expense, CATEGORY_COLORS } from "@/lib/types";
import { formatCurrency, cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useExpenses } from "@/components/providers/ExpenseProvider";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface ExpenseItemProps {
  expense: Expense;
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
}

export function ExpenseItem({ expense, onDelete, onEdit }: ExpenseItemProps) {
  const { t, locale } = useLanguage();
  const { currency } = useExpenses();

  const displayCategory = t.categories[expense.category] || expense.category;
  const isIncome = expense.type === "income";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow gap-4">
      <div className="flex items-center gap-4 w-full sm:w-auto">
        <div
          className={cn("p-2 rounded-full", CATEGORY_COLORS[expense.category])}
        >
          {isIncome ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{displayCategory}</span>
            <span className="text-xs text-muted-foreground px-2 py-0.5 rounded-full bg-muted">
              {isIncome ? t.common.income : t.common.expense}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">
            {new Date(expense.date).toLocaleDateString(
              locale === "ar" ? "ar-SA" : "en-US"
            )}
            {expense.note && ` • ${expense.note}`}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto pl-12 sm:pl-0">
        <span
          className={cn(
            "font-bold text-lg",
            isIncome ? "text-green-600" : "text-red-600"
          )}
        >
          {isIncome ? "+" : "-"}
          {formatCurrency(expense.amount, locale, currency)}
        </span>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => onEdit(expense)}>
            <span className="sr-only">{t.common.edit}</span>
            ✏️
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-red-500 hover:text-red-700"
            onClick={() => onDelete(expense.id)}
          >
            <span className="sr-only">{t.common.delete}</span>
            🗑️
          </Button>
        </div>
      </div>
    </div>
  );
}
