import React from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import Card from './Card';
import Filters from './Filters';

const initialData = {
  kpi: { totalAcciones: 396, pctAccionesExitosas:0.4137, diasEsperados:5.2, diasReales:6.1 },
  funnel: [
    { name:'Visita', value:178845 },{ name:'Prospecto', value:56256 },{ name:'Oportunidad', value:6560 },{ name:'Cliente', value:1256 }
  ],
  bar: [
    { operador:'Claro', total:200, exitosas:160 },{ operador:'Movistar', total:150, exitosas:110 },{ operador:'Entel', total:100, exitosas:70 }
  ],
  months: [...Array(12).keys()].map(i=>({ month:['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'][i], prev:800+i*20, curr:900+i*25 })),
  scatter:[{retraso:-1,pctExito:0.9},{retraso:0,pctExito:0.8},{retraso:1,pctExito:0.75},{retraso:2,pctExito:0.7}],
  pie:[{name:'Claro In',value:300},{name:'Otros',value:200}]
};

export default function DashboardClaro() {
  const [filters,setFilters] = React.useState({from:'',to:'',operator:'',onlyClaro:false});
  const [data,setData] = React.useState(initialData);

  const applyFilters = () => {
    let bar = initialData.bar;
    if(filters.operator) bar = bar.filter(d=>d.operador===filters.operator);
    if(filters.onlyClaro) bar = bar.filter(d=>d.operador==='Claro');
    // filter months
    let months = initialData.months;
    if(filters.from) months = months.filter(m=>initialData.months.indexOf(m)>=parseInt(filters.from.split('-')[1])-1);
    if(filters.to) months = months.filter(m=>initialData.months.indexOf(m)<=parseInt(filters.to.split('-')[1])-1);
    // recalc KPI
    const ta = bar.reduce((s,d)=>s+d.total,0);
    const te = bar.reduce((s,d)=>s+d.exitosas,0);
    setData({
      ...initialData,
      bar,
      months,
      kpi:{...initialData.kpi,totalAcciones:ta,pctAccionesExitosas:ta?te/ta:0}
    });
  };

  return (
    <div className="space-y-6">
      <Filters filters={filters} onChange={(k,v)=>setFilters(f=>({...f,[k]:v}))} onApply={applyFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card highlight title="Total acciones"><p className="text-4xl">{data.kpi.totalAcciones}</p></Card>
        <Card title="% Éxito acciones"><p className="text-4xl text-green-600">{(data.kpi.pctAccionesExitosas*100).toFixed(1)}%</p></Card>
        <Card title="Días esperados"><p className="text-4xl text-blue-600">{data.kpi.diasEsperados}</p></Card>
        <Card title="Días reales"><p className="text-4xl text-yellow-600">{data.kpi.diasReales}</p></Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card title="Embudo de Conversión"><ResponsiveContainer width="100%" height={250}><BarChart layout="vertical" data={data.funnel}><CartesianGrid strokeDasharray="3 3"/><XAxis type="number"/><YAxis dataKey="name" type="category"/><Tooltip/><Bar dataKey="value" fill="#E60012"/></BarChart></ResponsiveContainer></Card>
        <Card title="Acciones vs Operador"><ResponsiveContainer width="100%" height={250}><BarChart data={data.bar}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="operador"/><YAxis/><Tooltip/><Bar dataKey="total" fill="#333"/><Bar dataKey="exitosas" fill="#28A745"/></BarChart></ResponsiveContainer></Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Ventas Mensuales (Año Anterior vs Actual)"><ResponsiveContainer width="100%" height={200}><LineChart data={data.months}><CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis/><Tooltip/><Line dataKey="prev" name="2023" stroke="#8884d8"/><Line dataKey="curr" name="2024" stroke="#82ca9d"/></LineChart></ResponsiveContainer></Card>
        <Card title="Retraso vs % Éxito"><ResponsiveContainer width="100%" height={200}><ScatterChart><CartesianGrid/><XAxis dataKey="retraso"/><YAxis dataKey="pctExito"/><Tooltip formatter={v=>(v*100).toFixed(1)+"%"}/><Scatter data={data.scatter} fill="#E60012"/></ScatterChart></ResponsiveContainer></Card>
        <Card title="% Solicitudes CLARO vs Otros"><ResponsiveContainer width="100%" height={200}><PieChart><Pie data={data.pie} dataKey="value" nameKey="name" outerRadius={80} label>{data.pie.map((e,i)=><Cell key={i} fill={["#E60012","#28A745"][i]}/> )}</Pie><Tooltip/></PieChart></ResponsiveContainer></Card>
      </div>
    </div>
  );
}
