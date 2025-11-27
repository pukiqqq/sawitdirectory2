import { Factory } from 'lucide-react';
import { Mill } from '../lib/supabase';

interface MillCardProps {
  mill: Mill;
  onClick: () => void;
}

export function MillCard({ mill, onClick }: MillCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer p-6 border border-gray-100 hover:border-green-400"
    >
      <div className="flex items-start gap-4">
        <div className="bg-green-100 p-3 rounded-lg">
          <Factory className="w-6 h-6 text-green-600" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {mill.nama_pabrik}
          </h3>
          <p className="text-sm text-gray-600 mb-3">{mill.nama_perusahaan}</p>

          <div className="space-y-1 text-sm">
            <div className="flex items-center gap-2 text-gray-500">
              <span className="font-medium">Lokasi:</span>
              <span>{mill.kabupaten_kota}, {mill.provinsi}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="font-medium">Kapasitas:</span>
              <span>{mill.kapasitas_olah} ton/jam</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <span className="font-medium">Operasi:</span>
              <span>{mill.tahun_operasi}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
