export type Category = 'Food' | 'Transport' | 'Bills' | 'Entertainment' | 'Salary' | 'Freelance' | 'Investment' | 'Other';
export type Currency = 'ILS' | 'USD';
export type TransactionType = 'income' | 'expense';

export interface Expense {
  id: string;
  user_id?: string; // Optional because we might not have it when creating locally before save
  type: TransactionType;
  amount: number;
  category: Category;
  date: string;
  note?: string;
  currency?: Currency; // Make optional for backward compatibility or default val
  created_at?: string;
}

export const CATEGORIES: Category[] = ['Food', 'Transport', 'Bills', 'Entertainment', 'Salary', 'Freelance', 'Investment', 'Other'];
export const EXPENSE_CATEGORIES: Category[] = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];
export const INCOME_CATEGORIES: Category[] = ['Salary', 'Freelance', 'Investment', 'Other'];

export const CURRENCIES: Currency[] = ['ILS', 'USD'];

export const CATEGORY_COLORS: Record<Category, string> = {
  Food: 'bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400',
  Transport: 'bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400',
  Bills: 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400',
  Entertainment: 'bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400',
  Salary: 'bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400',
  Freelance: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-400',
  Investment: 'bg-teal-100 text-teal-700 dark:bg-teal-900/20 dark:text-teal-400',
  Other: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
};
