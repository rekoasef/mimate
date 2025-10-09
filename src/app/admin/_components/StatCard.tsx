// src/app/admin/_components/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-brand-surface p-6 rounded-lg shadow flex items-center gap-4">
      <div className="bg-brand-primary/20 text-brand-primary p-3 rounded-full">
        {icon}
      </div>
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-brand-secondary">{value}</p>
      </div>
    </div>
  );
}