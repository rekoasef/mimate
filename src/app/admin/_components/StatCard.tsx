// src/app/admin/_components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color?: 'green' | 'brown' | 'blue';
}

const colorMap = {
  green: 'bg-brand-primary/10 text-brand-primary',
  brown: 'bg-brand-accent/10 text-brand-accent',
  blue:  'bg-blue-50 text-blue-600',
};

export default function StatCard({ title, value, icon, color = 'green' }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex items-center gap-5">
      <div className={`p-3.5 rounded-xl ${colorMap[color]}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{title}</p>
        <p className="text-3xl font-bold text-brand-secondary mt-0.5">{value}</p>
      </div>
    </div>
  );
}
