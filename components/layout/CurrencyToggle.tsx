"use client";

import { Button } from "@/components/ui/Button";
import { useExpenses } from "@/components/providers/ExpenseProvider";

export function CurrencyToggle() {
  const { currency, setCurrency } = useExpenses();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setCurrency(currency === "ILS" ? "USD" : "ILS")}
      className="font-bold min-w-[3ch]"
    >
      {currency}
    </Button>
  );
}
