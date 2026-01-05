export type Locale = 'ar' | 'en';
export type Direction = 'rtl' | 'ltr';

interface Dictionary {
  common: {
    appName: string;
    addTransaction: string;
    addExpense: string;
    editExpense: string;
    delete: string;
    edit: string;
    cancel: string;
    save: string;
    update: string;
    date: string;
    amount: string;
    category: string;
    type: string;
    income: string;
    expense: string;
    note: string;
    optional: string;
    close: string;
    noExpenses: string;
    addFirstExpense: string;
    login: string;
    logout: string;
    signUp: string;
  };
  dashboard: {
    title: string;
    balance: string;
    totalIncome: string;
    totalExpenses: string;
    transactionCount: string;
    lastTransactions: string;
    vsLastMonth: string;
    monthlyTrend: string;
  };
  categories: {
    Food: string;
    Transport: string;
    Bills: string;
    Entertainment: string;
    Salary: string;
    Freelance: string;
    Investment: string;
    Other: string;
  };
}

export const dictionaries: Record<Locale, Dictionary> = {
  ar: {
    common: {
      appName: 'مصاريفي',
      addTransaction: 'إضافة عملية',
      addExpense: 'إضافة مصروف',
      editExpense: 'تعديل',
      delete: 'حذف',
      edit: 'تعديل',
      cancel: 'إلغاء',
      save: 'حفظ',
      update: 'تحديث',
      date: 'التاريخ',
      amount: 'المبلغ',
      category: 'التصنيف',
      type: 'النوع',
      income: 'دَخل (وارد)',
      expense: 'مصروف (صادر)',
      note: 'ملاحظة',
      optional: '(اختياري)',
      close: 'يغلق',
      noExpenses: 'لا توجد عمليات مسجلة حتى الآن.',
      addFirstExpense: 'أضف عمليتك الأولى!',
      login: 'تسجيل دخول',
      logout: 'خروج',
      signUp: 'إنشاء حساب جديد',
    },
    dashboard: {
      title: 'لوحة التحكم',
      balance: 'الرصيد الحالي',
      totalIncome: 'إجمالي الدخل',
      totalExpenses: 'إجمالي المصاريف',
      transactionCount: 'المعاملات',
      lastTransactions: 'آخر العمليات',
      vsLastMonth: '+0% من الشهر الماضي',
      monthlyTrend: 'تحليل المصاريف الشهري',
    },
    categories: {
      Food: 'طعام',
      Transport: 'مواصلات',
      Bills: 'فواتير',
      Entertainment: 'ترفيه',
      Salary: 'راتب',
      Freelance: 'عمل حر',
      Investment: 'استثمار',
      Other: 'أخرى',
    },
  },
  en: {
    common: {
      appName: 'My Expenses',
      addTransaction: 'Add Transaction',
      addExpense: 'Add Expense',
      editExpense: 'Edit Transaction',
      delete: 'Delete',
      edit: 'Edit',
      cancel: 'Cancel',
      save: 'Save',
      update: 'Update',
      date: 'Date',
      amount: 'Amount',
      category: 'Category',
      type: 'Type',
      income: 'Income',
      expense: 'Expense',
      note: 'Note',
      optional: '(Optional)',
      close: 'Close',
      noExpenses: 'No transactions recorded yet.',
      addFirstExpense: 'Add your first transaction!',
      login: 'Login',
      logout: 'Logout',
      signUp: 'Sign Up',
    },
    dashboard: {
      title: 'Dashboard',
      balance: 'Current Balance',
      totalIncome: 'Total Income',
      totalExpenses: 'Total Expenses',
      transactionCount: 'Transactions',
      lastTransactions: 'Recent Transactions',
      vsLastMonth: '+0% vs last month',
      monthlyTrend: 'Monthly Expense Trend',
    },
    categories: {
      Food: 'Food',
      Transport: 'Transport',
      Bills: 'Bills',
      Entertainment: 'Entertainment',
      Salary: 'Salary',
      Freelance: 'Freelance',
      Investment: 'Investment',
      Other: 'Other',
    },
  },
};
