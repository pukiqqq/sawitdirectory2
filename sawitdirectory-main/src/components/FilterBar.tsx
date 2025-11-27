import { Filter } from 'lucide-react';

interface FilterBarProps {
  provinsi: string;
  kabupatenKota: string;
  tahunOperasi: string;
  onProvinsiChange: (value: string) => void;
  onKabupatenKotaChange: (value: string) => void;
  onTahunOperasiChange: (value: string) => void;
  provinsiOptions: string[];
  kabupatenKotaOptions: string[];
  tahunOperasiOptions: number[];
}

export function FilterBar({
  provinsi,
  kabupatenKota,
  tahunOperasi,
  onProvinsiChange,
  onKabupatenKotaChange,
  onTahunOperasiChange,
  provinsiOptions,
  kabupatenKotaOptions,
  tahunOperasiOptions,
}: FilterBarProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-100">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="font-semibold text-gray-900">Filter</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provinsi
          </label>
          <select
            value={provinsi}
            onChange={(e) => onProvinsiChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="">Semua Provinsi</option>
            {provinsiOptions.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kabupaten/Kota
          </label>
          <select
            value={kabupatenKota}
            onChange={(e) => onKabupatenKotaChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="">Semua Kabupaten/Kota</option>
            {kabupatenKotaOptions.map((k) => (
              <option key={k} value={k}>
                {k}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tahun Operasi
          </label>
          <select
            value={tahunOperasi}
            onChange={(e) => onTahunOperasiChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          >
            <option value="">Semua Tahun</option>
            {tahunOperasiOptions.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
