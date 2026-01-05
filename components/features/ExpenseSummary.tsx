import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useExpenses } from "@/components/providers/ExpenseProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { formatCurrency, cn } from "@/lib/utils";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export function ExpenseSummary() {
  const { totalExpenses, totalIncome, balance, currency } = useExpenses();
  const { t, locale } = useLanguage();

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {/* Balance Card - Spans full width on tablet */}
      <Card className="border-primary/20 bg-primary/5 dark:bg-primary/10 sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t.dashboard.balance}
          </CardTitle>
          <Wallet className="h-4 w-4 text-primary" />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "text-2xl font-bold",
              balance >= 0 ? "text-primary" : "text-red-500"
            )}
          >
            {formatCurrency(balance, locale, currency)}
          </div>
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="border-green-200 bg-green-50 dark:bg-green-900/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t.dashboard.totalIncome}
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(totalIncome, locale, currency)}
          </div>
        </CardContent>
      </Card>

      {/* Expense Card */}
      <Card className="border-red-200 bg-red-50 dark:bg-red-900/10">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            {t.dashboard.totalExpenses}
          </CardTitle>
          <TrendingDown className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {formatCurrency(totalExpenses, locale, currency)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
