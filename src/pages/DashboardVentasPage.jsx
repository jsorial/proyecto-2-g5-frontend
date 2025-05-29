import React from 'react';
import Card from '../components/Card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

const months = [...Array(12).keys()].map(i=>({ month:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][i], prev:800 + i*20, curr:900 + i*25 }));

export default function DashboardVentasPage() {
  return (
    <div className="space-y-6">
      <Card title="Ventas Anuales Comparadas">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={months}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="prev" name="2023" stroke="#8884d8" />
            <Line dataKey="curr" name="2024" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}