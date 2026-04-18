"use client"

import { useMemo, useState } from "react"
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { motion } from "motion/react"
import { 
  TrendingUp, 
  Calendar, 
  ReceiptText, 
  Sparkles,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { GlassCard } from "@/components/dashboard/glass-card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

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
    amount: 2100.00,
    type: "income"
  },
  {
    date: "11 Jul",
    description: "Compra supermercado",
    amount: 215.40,
    type: "expense"
  },
  {
    date: "16 Jul",
    description: "Transferencia recibida",
    amount: 540.00,
    type: "income"
  },
  {
    date: "21 Jul",
    description: "Pago servicios",
    amount: 120.80,
    type: "expense"
  },
]

export default function ReportesPage() {
  const [month, setMonth] = useState(monthOptions[0])

  const chartData = useMemo(() => monthlyData[month], [month])

  return (
    <div className="flex flex-col gap-6 pb-20">
      <header className="flex flex-col gap-1 px-4 py-6">
        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <TrendingUp className="text-blue-400" />
          Reporte Mensual
        </h1>
        <p className="text-sm text-blue-200/60">
          Visualiza el rendimiento de tus finanzas y deducciones.
        </p>
      </header>

      {/* Mes Selector */}
      <section className="px-4">
        <GlassCard className="flex items-center justify-between gap-4 p-4 border-blue-400/20 bg-blue-400/5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-blue-500/20 p-2 text-blue-400">
              <Calendar size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400/60">Seleccionar Periodo</p>
              <p className="text-lg font-bold text-white">{month}</p>
            </div>
          </div>
          
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-[140px] rounded-xl border-white/10 bg-white/5 text-sm text-white focus:ring-1 focus:ring-blue-500">
              <SelectValue placeholder="Mes" />
            </SelectTrigger>
            <SelectContent className="border-white/10 bg-[#0A0A1F] text-white">
              {monthOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </GlassCard>
      </section>

      {/* Chart Section */}
      <section className="px-4">
        <GlassCard className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">Flujo de Efectivo</h3>
              <p className="text-xs text-blue-200/60">Gastos vs Deducciones por día</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#7C90DB]" />
                <span className="text-[10px] text-blue-200/60">Gastos</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-[#0175D9]" />
                <span className="text-[10px] text-blue-200/60">Deducciones</span>
              </div>
            </div>
          </div>

          <ChartContainer
            config={{
              gastos: { label: "Gastos", color: "#7C90DB" },
              deducciones: { label: "Deducciones", color: "#0175D9" },
            }}
            className="h-[250px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                  dx={-10}
                />
                <Tooltip 
                  content={<ChartTooltipContent indicator="dot" />} 
                  cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="gastos" 
                  stroke="#7C90DB" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#7C90DB", strokeWidth: 0 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="deducciones" 
                  stroke="#0175D9" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#0175D9", strokeWidth: 0 }} 
                  activeDot={{ r: 6, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </GlassCard>
      </section>

      {/* Transactions Section */}
      <section className="px-4">
        <div className="mb-4 flex items-center justify-between px-2">
          <h2 className="flex items-center gap-2 text-base font-bold text-white">
            <ReceiptText size={18} className="text-blue-400" />
            Movimientos Recientes
          </h2>
          <Button variant="link" className="h-auto p-0 text-xs text-blue-400">Ver todo</Button>
        </div>
        
        <div className="space-y-3">
          {transactions.map((transaction, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="flex items-center justify-between p-4 border-white/5 bg-white/5 transition-all hover:bg-white/10">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-2xl",
                    transaction.type === "income" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                  )}>
                    {transaction.type === "income" ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{transaction.description}</p>
                    <p className="text-[10px] text-blue-200/40 uppercase tracking-widest">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    "text-sm font-bold",
                    transaction.type === "income" ? "text-emerald-500" : "text-rose-500"
                  )}>
                    {transaction.type === "income" ? "+" : "-"}${transaction.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                  </p>
                  <p className="text-[10px] text-blue-200/40 uppercase">Deducible</p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recommendations Section */}
      <section className="px-4">
        <GlassCard className="border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-blue-400">
                <Sparkles size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Sugerencias VanTax</h3>
                <p className="text-xs text-blue-200/60">Optimización AI personalizada</p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed text-blue-100/80">
              Hemos detectado que puedes recuperar hasta <span className="font-bold text-white">$2,450 MXN</span> adicionales optimizando tus facturas de servicios este mes.
            </p>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="h-12 w-full rounded-2xl bg-[#0175D9] font-bold text-white shadow-lg shadow-blue-500/40 hover:bg-blue-600">
                  Explorar Recomendaciones
                </Button>
              </DialogTrigger>
              <DialogContent className="border-white/10 bg-[#0A0A1F] text-white">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-xl font-bold">
                    <Sparkles className="text-blue-400" />
                    Recomendaciones AI
                  </DialogTitle>
                  <DialogDescription className="text-blue-200/60">
                    Consejos personalizados para mejorar tu flujo de caja y maximizar devoluciones.
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4 space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {[
                    "Revisa tus gastos fijos y considera renegociar servicios recurrentes para liberar liquidez.",
                    "Asegúrate de solicitar CFDI de todos tus gastos médicos y dentales; son 100% deducibles.",
                    "Tus aportaciones voluntarias a la AFORE pueden reducir significativamente tu base gravable.",
                    "Mantén un colchón de ahorro te ayuda a enfrentar imprevistos sin comprometer tu flujo operacional.",
                    "Registra tus facturas de colegiaturas antes del cierre de mes para asegurar su validación.",
                    "Los intereses reales de tu crédito hipotecario son deducibles en tu declaración anual."
                  ].map((tip, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-3 rounded-2xl border border-white/5 bg-white/5 p-4"
                    >
                      <div className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                      <p className="text-sm leading-relaxed text-blue-100/80">{tip}</p>
                    </motion.div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}

