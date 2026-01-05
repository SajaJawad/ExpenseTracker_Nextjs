"use client";

import { useState } from "react";
import { useExpenses } from "@/components/providers/ExpenseProvider";
import { ExpenseSummary } from "@/components/features/ExpenseSummary";
import { ExpenseList } from "@/components/features/ExpenseList";
import { ExpenseForm } from "@/components/features/ExpenseForm";
import { ExpenseCharts } from "@/components/features/ExpenseCharts";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Expense } from "@/lib/types";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function DashboardPage() {
  const { expenses, addExpense, deleteExpense, editExpense } = useExpenses();
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const handleAddClick = () => {
    setEditingExpense(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (expense: Expense) => {
    setEditingExpense(expense);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data: Omit<Expense, "id">) => {
    if (editingExpense) {
      editExpense(editingExpense.id, data);
    } else {
      addExpense(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 space-y-8 max-w-5xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          {t.dashboard.title}
        </h1>
        <Button onClick={handleAddClick} size="lg" className="shadow-md">
          + {t.common.addTransaction}
        </Button>
      </div>

      <ExpenseSummary />
      <ExpenseCharts />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          {t.dashboard.lastTransactions}
        </h2>
        <ExpenseList
          expenses={sortedExpenses}
          onDelete={deleteExpense}
          onEdit={handleEditClick}
        />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExpense ? t.common.editExpense : t.common.addExpense}
      >
        <ExpenseForm
          initialData={editingExpense}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}
