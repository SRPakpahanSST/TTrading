// Impor semua file JSON dari folder ini menggunakan Vite's glob import
const modules = import.meta.glob('./*.json', { eager: true });

// Gabungkan semua array 'ayat' dari setiap file JSON menjadi satu array besar
export const semuaAyat = Object.values(modules).flatMap(
  (modul) => modul.ayat || []
);

export const totalAyat = semuaAyat.length;