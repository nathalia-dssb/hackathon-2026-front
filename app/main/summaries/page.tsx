"use client"

import { useMemo, useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts"

import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const monthOptions = ["Julio", "Agosto", "Septiembre", "Octubre"]

const monthlyData: Record<string, Array<{ day: string; gastos: number; deducciones: number }>> = {
  Julio: [
    { day: "01", gastos: 520, deducciones: 96 },
    { day: "08", gastos: 680, deducciones: 120 },
    { day: "15", gastos: 610, deducciones: 102 },
    { day: "22", gastos: 740, deducciones: 130 },
    { day: "29", gastos: 810, deducciones: 150 },
  ],
  Agosto: [
    { day: "01", gastos: 580, deducciones: 110 },
    { day: "08", gastos: 720, deducciones: 126 },
    { day: "15", gastos: 690, deducciones: 108 },
    { day: "22", gastos: 760, deducciones: 145 },
    { day: "29", gastos: 830, deducciones: 155 },
  ],
  Septiembre: [
    { day: "01", gastos: 600, deducciones: 115 },
    { day: "08", gastos: 700, deducciones: 128 },
    { day: "15", gastos: 660, deducciones: 110 },
    { day: "22", gastos: 780, deducciones: 142 },
    { day: "29", gastos: 860, deducciones: 160 },
  ],
  Octubre: [
    { day: "01", gastos: 620, deducciones: 118 },
    { day: "08", gastos: 710, deducciones: 130 },
    { day: "15", gastos: 690, deducciones: 120 },
    { day: "22", gastos: 800, deducciones: 148 },
    { day: "29", gastos: 880, deducciones: 165 },
  ],
}

const transactions = [
  {
    date: "02 Jul",
    description: "Pago nómina",
    amount: "+$2,100.00",
  },
  {
    date: "11 Jul",
    description: "Compra supermercado",
    amount: "-$215.40",
  },
  {
    date: "16 Jul",
    description: "Transferencia recibida",
    amount: "+$540.00",
  },
  {
    date: "21 Jul",
    description: "Pago servicios",
    amount: "-$120.80",
  },
]

export default function ReportesPage() {
  const [month, setMonth] = useState(monthOptions[0])

  const chartData = useMemo(() => monthlyData[month], [month])

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900">
      <div className="mx-auto w-full max-w-md rounded-[32px] border border-slate-300/60 bg-white p-6 shadow-xl shadow-slate-200/50">
        <header className="mb-6 text-center">
          <h1 className="mt-3 text-3xl font-semibold">Reporte mensual</h1>
        </header>

        <section className="mb-6 rounded-[28px] border border-slate-200/80 bg-slate-950/95 p-4 text-white shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Mes</p>
              <p className="text-lg font-semibold">{month}</p>
            </div>
            <label className="block w-2/5">
              <span className="sr-only">Elegir mes</span>
              <select
                value={month}
                onChange={(event) => setMonth(event.target.value)}
                className="w-full rounded-full border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white outline-none transition focus:border-blue-400"
              >
                {monthOptions.map((option) => (
                  <option key={option} value={option} className="bg-slate-900 text-white">
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-5 max-h-64 overflow-y-auto rounded-3xl bg-slate-900/95 p-3">
            <ChartContainer
              config={{
                gastos: { label: "Gastos", color: "#7C90DB" },
                deducciones: { label: "Deducciones", color: "#0175D9" },
              }}
              className="h-full"
            >
              <LineChart data={chartData} margin={{ top: 25, right: 40, left: 10, bottom: 25 }}>
                <CartesianGrid stroke="rgba(148,163,184,0.16)" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(241,245,249,0.8)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(241,245,249,0.8)", fontSize: 12 }}
                />
                <Tooltip shared={false} cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                <Line type="monotone" dataKey="gastos" stroke="#7C90DB" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 5 }} />
                <Line type="monotone" dataKey="deducciones" stroke="#0175D9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ChartContainer>
          </div>
        </section>

        <section className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-semibold">Deductables</h2>
            <span className="text-sm text-slate-500">Estado de cuenta</span>
          </div>
          <div className="space-y-2 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-sm">
            {transactions.map((transaction) => (
              <div key={transaction.date} className="grid grid-cols-[80px_1fr_auto] gap-3 rounded-2xl border-b border-slate-200/80 pb-3 last:border-b-0 last:pb-0">
                <div className="text-xs text-slate-500">{transaction.date}</div>
                <div className="text-sm font-medium text-slate-900">{transaction.description}</div>
                <div className={`text-sm font-semibold ${transaction.amount.startsWith("-") ? "text-rose-600" : "text-emerald-600"}`}>
                  {transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full rounded-full px-6 text-white">
                Recomendaciones
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Recomendaciones AI</DialogTitle>
                <DialogDescription>Consejos personalizados para mejorar tu flujo de caja.</DialogDescription>
              </DialogHeader>
              <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4 pb-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <p key={index} className="mb-4 leading-relaxed text-sm text-slate-700">
                    Revisa tus gastos fijos y considera renegociar servicios recurrentes para liberar liquidez. Mantener un colchón de ahorro te ayuda a enfrentar imprevistos sin comprometer tu flujo operacional.
                  </p>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </section>
      </div>
    </main>
  )
}
