import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function LineChart({ data, dataKey = 'value', xKey = 'name' }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLine data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
        <XAxis dataKey={xKey} tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: 'none',
            borderRadius: '12px',
            color: '#fff',
          }}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#f59e0b"
          strokeWidth={3}
          dot={{ fill: '#f59e0b', r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLine>
    </ResponsiveContainer>
  )
}