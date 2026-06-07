"use client";

import React, { useState } from "react";
import { Search, Filter, ChevronDown, CheckCircle, Clock, Truck } from "lucide-react";

const mockOrders = [
  { id: "ORD-001", customer: "John Doe", total: 125000, method: "BankDeposit", status: "Pending Verification", date: "2024-05-10" },
  { id: "ORD-002", customer: "Jane Smith", total: 45000, method: "COD", status: "Pending", date: "2024-05-11" },
  { id: "ORD-003", customer: "Alice Brown", total: 210000, method: "BankDeposit", status: "Paid", date: "2024-05-12" },
];

export default function AdminOrdersPage() {
  const [filterStatus, setFilterStatus] = useState("All");

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-medium text-brand-charcoal mb-1">Advanced Order Pipeline</h1>
          <p className="text-sm text-brand-slate">Manage and track all global orders.</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow-sm border border-brand-slate/10 flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-slate/50" />
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            className="w-full pl-9 pr-4 py-2 text-sm border border-brand-slate/20 rounded focus:outline-none focus:border-brand-gold"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-brand-slate" />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="text-sm border border-brand-slate/20 rounded py-2 px-3 focus:outline-none focus:border-brand-gold bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Dispatched">Dispatched</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded shadow-sm border border-brand-slate/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-cream border-b border-brand-slate/10 text-sm font-medium text-brand-charcoal">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Method</th>
              <th className="p-4">Total (LKR)</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b border-brand-slate/5 hover:bg-brand-cream/30 transition-colors">
                <td className="p-4 text-sm font-medium text-brand-charcoal">{order.id}</td>
                <td className="p-4 text-sm text-brand-slate">{order.date}</td>
                <td className="p-4 text-sm text-brand-charcoal">{order.customer}</td>
                <td className="p-4 text-sm">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${order.method === 'BankDeposit' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'}`}>
                    {order.method === 'BankDeposit' ? 'Bank Transfer' : 'COD'}
                  </span>
                </td>
                <td className="p-4 text-sm font-medium">{order.total.toLocaleString()}</td>
                <td className="p-4 text-sm">
                  <span className={`flex items-center gap-1.5 ${
                    order.status.includes('Pending') ? 'text-amber-600' :
                    order.status === 'Paid' ? 'text-green-600' : 'text-blue-600'
                  }`}>
                    {order.status.includes('Pending') ? <Clock className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
                    {order.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-brand-gold text-sm font-medium hover:underline">View Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
