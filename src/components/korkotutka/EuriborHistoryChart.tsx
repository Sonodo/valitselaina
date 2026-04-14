'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface EuriborPoint {
  period: string;
  rate: number;
}

interface Props {
  data: EuriborPoint[];
}

interface TooltipPayload {
  value: number;
  payload: EuriborPoint;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0];
  return (
    <div className="rounded-lg bg-white border border-gray-200 shadow-md px-3 py-2">
      <p className="text-xs text-gray-500">{point.payload.period}</p>
      <p className="text-sm font-semibold text-[#1a365d]">
        {point.value.toFixed(2).replace('.', ',')} %
      </p>
    </div>
  );
}

export default function EuriborHistoryChart({ data }: Props) {
  const rates = data.map((d) => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const padding = Math.max(0.2, (maxRate - minRate) * 0.15);
  const yMin = Math.max(0, Math.floor((minRate - padding) * 10) / 10);
  const yMax = Math.ceil((maxRate + padding) * 10) / 10;

  return (
    <div className="w-full" style={{ height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 16, right: 24, left: 0, bottom: 8 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
          <XAxis
            dataKey="period"
            tick={{ fontSize: 12, fill: '#718096' }}
            tickLine={false}
            axisLine={{ stroke: '#cbd5e0' }}
          />
          <YAxis
            domain={[yMin, yMax]}
            tickFormatter={(v: number) =>
              `${v.toFixed(2).replace('.', ',')} %`
            }
            tick={{ fontSize: 12, fill: '#718096' }}
            tickLine={false}
            axisLine={false}
            width={64}
          />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: '#1a365d', strokeWidth: 1, strokeDasharray: '3 3' }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#1a365d"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#1a365d', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#1a365d', stroke: '#fff', strokeWidth: 2 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
