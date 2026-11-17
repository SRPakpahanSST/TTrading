import { useState, useCallback } from 'react';
import { dummyOrderFlow } from '../data/orderFlowDummy';

export function useOrderFlow() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getOrderFlow = useCallback((kodeSaham, sesi) => {
    setLoading(true);
    // Simulasi loading (nanti ganti dengan fetch API)
    setTimeout(() => {
      const flow = dummyOrderFlow[kodeSaham]?.[sesi];
      setData(flow || null);
      setLoading(false);
    }, 500);
  }, []);

  return { data, loading, getOrderFlow };
}