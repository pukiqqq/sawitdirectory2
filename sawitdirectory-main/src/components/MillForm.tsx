import { useState, useEffect } from 'react';
import { Mill } from '../lib/supabase';

interface MillFormProps {
  mill?: Mill | null;
  onSubmit: (data: Omit<Mill, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => void;
  onCancel: () => void;
  loading?: boolean;
}

export function MillForm({ mill, onSubmit, onCancel, loading }: MillFormProps) {
  const [formData, setFormData] = useState({
    nama_pabrik: '',
    nama_perusahaan: '',
    provinsi: '',
    kabupaten_kota: '',
    kapasitas_olah: 0,
    tahun_operasi: new Date().getFullYear(),
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    if (mill) {
      setFormData({
        nama_pabrik: mill.nama_pabrik,
        nama_perusahaan: mill.nama_perusahaan,
        provinsi: mill.provinsi,
        kabupaten_kota: mill.kabupaten_kota,
        kapasitas_olah: mill.kapasitas_olah,
        tahun_operasi: mill.tahun_operasi,
        latitude: mill.latitude,
        longitude: mill.longitude,
      });
    }
  }, [mill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Pabrik *
          </label>
          <input
            type="text"
            value={formData.nama_pabrik}
            onChange={(e) => setFormData({ ...formData, nama_pabrik: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nama Perusahaan *
          </label>
          <input
            type="text"
            value={formData.nama_perusahaan}
            onChange={(e) => setFormData({ ...formData, nama_perusahaan: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Provinsi *
          </label>
          <input
            type="text"
            value={formData.provinsi}
            onChange={(e) => setFormData({ ...formData, provinsi: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kabupaten/Kota *
          </label>
          <input
            type="text"
            value={formData.kabupaten_kota}
            onChange={(e) => setFormData({ ...formData, kabupaten_kota: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kapasitas Olah (ton/jam) *
          </label>
          <input
            type="number"
            step="0.01"
            value={formData.kapasitas_olah}
            onChange={(e) => setFormData({ ...formData, kapasitas_olah: parseFloat(e.target.value) })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tahun Operasi *
          </label>
          <input
            type="number"
            value={formData.tahun_operasi}
            onChange={(e) => setFormData({ ...formData, tahun_operasi: parseInt(e.target.value) })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude *
          </label>
          <input
            type="number"
            step="0.000001"
            value={formData.latitude}
            onChange={(e) => setFormData({ ...formData, latitude: parseFloat(e.target.value) })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude *
          </label>
          <input
            type="number"
            step="0.000001"
            value={formData.longitude}
            onChange={(e) => setFormData({ ...formData, longitude: parseFloat(e.target.value) })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-end pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Menyimpan...' : mill ? 'Update' : 'Tambah Pabrik'}
        </button>
      </div>
    </form>
  );
}
