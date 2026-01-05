"use client";

import { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useExpenses } from "@/components/providers/ExpenseProvider";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { CATEGORY_COLORS, Category } from "@/lib/types";

// Map Tailwind colors to Hex for Recharts
const CHART_COLORS: Record<Category, string> = {
  Food: "#f97316", // orange-500
  Transport: "#3b82f6", // blue-500
  Bills: "#ef4444", // red-500
  Entertainment: "#a855f7", // purple-500
  Salary: "#22c55e", // green-500
  Freelance: "#10b981", // emerald-500
  Investment: "#14b8a6", // teal-500
  Other: "#6b7280", // gray-500
};

export function ExpenseCharts() {
  const { expenses, currency } = useExpenses();
  const { t, locale } = useLanguage();

  const dataByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    expenses.forEach((exp) => {
      counts[exp.category] = (counts[exp.category] || 0) + exp.amount;
    });

    return Object.entries(counts)
      .map(([cat, value]) => ({
        name: t.categories[cat as Category],
        value,
        key: cat,
      }))
      .filter((item) => item.value > 0);
  }, [expenses, t]);

  const dataByMonth = useMemo(() => {
    const counts: Record<string, number> = {};
    expenses.forEach((exp) => {
      const date = new Date(exp.date);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}`;
      counts[key] = (counts[key] || 0) + exp.amount;
    });

    return Object.entries(counts)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6) // Last 6 months
      .map(([key, value]) => ({
        name: key,
        amount: value,
      }));
  }, [expenses]);

  if (expenses.length === 0) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            {t.dashboard.totalExpenses} ({t.common.category})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataByCategory}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={CHART_COLORS[entry.key as Category]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            {t.dashboard.monthlyTrend}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dataByMonth}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) =>
                    `${currency === "ILS" ? "₪" : "$"}${value}`
                  }
                />
                <Tooltip cursor={{ fill: "transparent" }} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
