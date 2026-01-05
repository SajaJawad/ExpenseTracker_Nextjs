"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Expense, Currency } from "@/lib/types";
import { supabase } from "@/lib/supabase";
import { User } from "@supabase/supabase-js";
import { useAuth } from "@/components/providers/AuthProvider";

interface ExpenseContextType {
  expenses: Expense[];
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  addExpense: (expense: Omit<Expense, "id">) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
  editExpense: (
    id: string,
    updatedExpense: Omit<Expense, "id">
  ) => Promise<void>;
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  user: User | null;
  loading: boolean;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export function ExpenseProvider({ children }: { children: React.ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currency, setCurrencyState] = useState<Currency>("ILS");
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  // Initialize Data when user changes
  useEffect(() => {
    if (user) {
      fetchExpenses();
    } else if (!authLoading) {
      setExpenses([]);
      setLoading(false);
    }
  }, [user, authLoading]);

  // Load Currency pref once
  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency && (savedCurrency === "ILS" || savedCurrency === "USD")) {
      setCurrencyState(savedCurrency as Currency);
    }
  }, []);

  // Save Currency pref
  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .order("date", { ascending: false });

      if (error) throw error;

      // Ensure data matches Expense type (dates are strings in JSON/API usually)
      setExpenses(data as Expense[]);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
  };

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
  };

  const addExpense = async (expense: Omit<Expense, "id">) => {
    if (!user) return; // Guard for no user

    // Optimistic Update (Optional) - or just wait
    // Let's wait for DB to ensure ID is correct
    try {
      const { data, error } = await supabase
        .from("expenses")
        .insert([
          {
            ...expense,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      if (data) {
        setExpenses((prev) => [data as Expense, ...prev]);
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      const { error } = await supabase.from("expenses").delete().eq("id", id);

      if (error) throw error;
      setExpenses((prev) => prev.filter((e) => e.id !== id));
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const editExpense = async (
    id: string,
    updatedExpense: Omit<Expense, "id">
  ) => {
    try {
      const { error } = await supabase
        .from("expenses")
        .update(updatedExpense)
        .eq("id", id);

      if (error) throw error;
      setExpenses((prev) =>
        prev.map((e) => (e.id === id ? { ...updatedExpense, id } : e))
      );
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const totalExpenses = expenses
    .filter((e) => e.type === "expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = expenses
    .filter((e) => e.type === "income")
    .reduce((sum, item) => sum + item.amount, 0);

  const balance = totalIncome - totalExpenses;

  return (
    <ExpenseContext.Provider
      value={{
        expenses,
        currency,
        setCurrency,
        addExpense,
        deleteExpense,
        editExpense,
        totalExpenses,
        totalIncome,
        balance,
        user,
        loading,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpenseContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpenseProvider");
  }
  return context;
}
