import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, locale: string = 'ar', currency: string = 'ILS') {
  const targetLocale = locale === 'ar' ? 'ar-SA' : 'en-US';
  try {
    return new Intl.NumberFormat(targetLocale, {
      style: "currency",
      currency: currency,
    }).format(amount);
  } catch (error) {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
