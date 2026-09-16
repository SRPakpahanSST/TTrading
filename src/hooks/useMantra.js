import { useMemo } from 'react'
import { getMantraHariIni } from '../data/mantraList'

export function useMantra() {
  return useMemo(() => getMantraHariIni(), [])
}