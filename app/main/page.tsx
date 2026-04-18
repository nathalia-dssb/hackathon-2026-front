"use client"

import { Button } from "@/components/ui/button"
import { Reorder } from "@solar-icons/react/ssr"
import { GlassCard } from "../../components/dashboard/glass-card"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { month: "Enero", gastos: 186, deducciones: 80 },
  { month: "Febrero", gastos: 305, deducciones: 200 },
  { month: "Marzo", gastos: 237, deducciones: 120 },
  { month: "Abril", gastos: 73, deducciones: 190 },
  { month: "Mayo", gastos: 209, deducciones: 130 },
  { month: "Junio", gastos: 214, deducciones: 140 },
]

const chartConfig = {
  gastos: {
    label: "Gastos",
    color: "#60a5fa", // blue-400
  },
  deducciones: {
    label: "Deducciones",
    color: "#2563eb", // blue-600
  },
} satisfies ChartConfig

const Page = () => {
  const user_name = "Alexis"
  return (
    <div className="flex flex-col gap-6">
      <header className="flex flex-row items-center justify-between px-4 py-6 text-2xl font-medium">
        <p>
          ¡Hola,{" "}
          <span className="text-blue-400 mix-blend-lighten">{user_name}</span>!
        </p>

        <Button className="h-10 w-10 rounded-full bg-blue-400/20">
          <Reorder size={64} color="#fffff" />
        </Button>
      </header>

      <section className="px-4">
        <div className="rounded-md bg-background p-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-blue-500/20 p-2 text-blue-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <rect width="18" height="18" x="3" y="4" rx="2" />
                <path d="M3 10h18" />
                <path d="M10 14h4" />
                <path d="M10 18h4" />
              </svg>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-bold text-blue-100">Información Fiscal</h3>
              <p className="text-sm text-blue-200/60">
                Periodo actual:{" "}
                <span className="text-blue-300">
                  Ejercicio {new Date().getFullYear()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4">
        <GlassCard>
          <p className="text-sm text-blue-200/60">Ingreso mensual</p>
          <h2 className="mt-1 text-4xl font-bold">$4,250.00</h2>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-blue-400">Gastos</span>
              <span className="font-medium">$1,226</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-blue-400">Deducciones</span>
              <span className="font-medium">$860</span>
            </div>
          </div>
        </GlassCard>
      </section>

      <section className="p-4">
        <GlassCard className="flex flex-col gap-4">
          <div>
            <h3 className="text-xl font-bold">Resumen Financiero</h3>
            <p className="text-sm text-blue-200/60">
              Estimación mensual de gastos y deducciones
            </p>
          </div>

          <ChartContainer config={chartConfig} className="min-h-50 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid
                vertical={false}
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.05)"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 12 }}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="gastos" fill="#7C90DB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="deducciones" fill="#0175D9" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </GlassCard>
      </section>

      <section className="px-4">
        <div className="mt-2 min-w-full rounded-lg bg-blue-400/10 p-3">
          <p className="text-xs font-medium tracking-wider text-blue-300 uppercase">
            Próxima Declaración
          </p>
          <p className="mt-1 text-sm text-white">
            Tu próxima declaración anual es en{" "}
            <span className="font-bold">
              Abril {new Date().getFullYear() + 1}
            </span>
          </p>
          <p className="mt-1 text-2xl font-black text-blue-400">
            {Math.ceil(
              (new Date(new Date().getFullYear() + 1, 3, 30).getTime() -
                new Date().getTime()) /
                86400000
            )}
            <span className="ml-1 text-sm font-normal text-blue-400/60">
              días restantes
            </span>
          </p>
        </div>
      </section>
    </div>
  )
}

export default Page
