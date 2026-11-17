import { useState } from 'react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import { useOrderFlow } from '../../hooks/useOrderFlow';

export default function OrderFlow() {
  const [kode, setKode] = useState('BRIS');
  const [sesi, setSesi] = useState('09:00-09:10');
  const { data, loading, getOrderFlow } = useOrderFlow();

  const handleCek = () => getOrderFlow(kode, sesi);

  const getPersenBeli = () => {
    if (!data) return 0;
    const total = data.totalBeli + data.totalJual;
    return ((data.totalBeli / total) * 100).toFixed(1);
  };

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
          📊 Analisis Order Flow
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Lihat tekanan beli/jual di sesi pembukaan & pra-penutupan.
        </p>
      </div>

      <Card>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            value={kode}
            onChange={(e) => setKode(e.target.value.toUpperCase())}
            placeholder="Kode Saham (misal: BRIS)"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
          />
          <select
            value={sesi}
            onChange={(e) => setSesi(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-white"
          >
            <option value="09:00-09:10">Pembukaan (09:00 - 09:10)</option>
            <option value="15:50-16:10">Pra-Penutupan (15:50 - 16:10)</option>
          </select>
          <Button onClick={handleCek}>🔍 Cek Data</Button>
        </div>

        {loading && <p className="text-center text-slate-400 py-4">Memuat data...</p>}

        {data && !loading && (
          <div className="space-y-4 mt-6">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl">
              <h3 className="font-bold text-slate-800 dark:text-white mb-2">
                Ringkasan {kode} ({sesi})
              </h3>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-600 font-semibold">Beli: {data.totalBeli.toLocaleString()} lembar</span>
                <span className="text-red-600 font-semibold">Jual: {data.totalJual.toLocaleString()} lembar</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-4 overflow-hidden flex">
                <div className="bg-green-500 h-4" style={{ width: `${getPersenBeli()}%` }}></div>
                <div className="bg-red-500 h-4" style={{ width: `${100 - getPersenBeli()}%` }}></div>
              </div>
              <p className="text-xs text-center mt-1 text-slate-600 dark:text-slate-300">
                Dominasi: {getPersenBeli() > 50 ? '🟢 Pembeli' : '🔴 Penjual'} ({getPersenBeli()}% vs {100 - getPersenBeli()}%)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-bold text-green-600 mb-2">Antrean Beli (Bid)</h4>
                {data.bid.map((b, i) => (
                  <div key={i} className="flex justify-between text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded mb-1">
                    <span>Rp {b.harga}</span>
                    <span>{b.lot} lot</span>
                  </div>
                ))}
              </div>
              <div>
                <h4 className="text-sm font-bold text-red-600 mb-2">Antrean Jual (Offer)</h4>
                {data.offer.map((o, i) => (
                  <div key={i} className="flex justify-between text-xs p-2 bg-slate-50 dark:bg-slate-700 rounded mb-1">
                    <span>Rp {o.harga}</span>
                    <span>{o.lot} lot</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}