import { useState, useMemo } from 'react'
import { sahamList } from '../.../data/sahamList'

export function useScreener() {
  const [filter, setFilter] = useState({
    perMax: 20,
    pbvMax: 3,
    roeMin: 10,
    dividenMin: 2,
    sektor: 'semua',
  })

  const sektorList = useMemo(() => {
    const set = new Set(sahamList.map((s) => s.sektor))
    return ['semua', ...Array.from(set)]
  }, [])

  const hasil = useMemo(() => {
    return sahamList
      .filter((s) => s.per <= filter.perMax)
      .filter((s) => s.pbv <= filter.pbvMax)
      .filter((s) => s.roe >= filter.roeMin)
      .filter((s) => s.dividen >= filter.dividenMin)
      .filter((s) => filter.sektor === 'semua' || s.sektor === filter.sektor)
      .sort((a, b) => b.roe - a.roe)
  }, [filter])

  const reset = () => {
    setFilter({
      perMax: 20,
      pbvMax: 3,
      roeMin: 10,
      dividenMin: 2,
      sektor: 'semua',
    })
  }

  return { filter, setFilter, hasil, sektorList, reset }
}