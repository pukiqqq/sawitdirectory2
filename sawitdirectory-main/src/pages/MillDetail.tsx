import { ArrowLeft, Factory, MapPin, Calendar, Gauge } from 'lucide-react';
import { Mill } from '../lib/supabase';

interface MillDetailProps {
  mill: Mill;
  onBack: () => void;
}

export function MillDetail({ mill, onBack }: MillDetailProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali ke Daftar</span>
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-green-600 p-4 rounded-lg">
              <Factory className="w-10 h-10 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{mill.nama_pabrik}</h1>
              <p className="text-lg text-gray-600 mt-1">{mill.nama_perusahaan}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Informasi Detail</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Lokasi</h3>
                  <p className="text-gray-600">{mill.kabupaten_kota}</p>
                  <p className="text-gray-600">{mill.provinsi}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Tahun Operasi</h3>
                  <p className="text-gray-600">{mill.tahun_operasi}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Gauge className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Kapasitas Olah</h3>
                  <p className="text-gray-600">{mill.kapasitas_olah} ton/jam</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Koordinat GPS</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Latitude:</span>
                    <span className="font-mono text-gray-900">{mill.latitude}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Longitude:</span>
                    <span className="font-mono text-gray-900">{mill.longitude}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  Koordinat ini akan digunakan untuk integrasi peta di versi mendatang
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-4">Informasi Sistem</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">ID Pabrik:</span>
                    <span className="font-mono text-gray-900 text-xs">{mill.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Dibuat:</span>
                    <span className="text-gray-900">
                      {new Date(mill.created_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Diperbarui:</span>
                    <span className="text-gray-900">
                      {new Date(mill.updated_at).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
