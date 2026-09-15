import { Radar, RadarChart as RechartsRadar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

export default function RadarChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsRadar data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="pilar" tick={{ fontSize: 12 }} />
        <PolarRadiusAxis angle={90} domain={[0, 10]} tick={{ fontSize: 10 }} />
        <Radar
          name="Skor"
          dataKey="skor"
          stroke="#f59e0b"
          fill="#f59e0b"
          fillOpacity={0.6}
        />
      </RechartsRadar>
    </ResponsiveContainer>
  )
}