import { useEffect, useState } from 'react';
import { Factory, LogIn } from 'lucide-react';
import { db, Mill } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { MillCard } from '../components/MillCard';
import { SearchBar } from '../components/SearchBar';
import { FilterBar } from '../components/FilterBar';

interface PublicDirectoryProps {
  onMillClick: (mill: Mill) => void;
  onLoginClick: () => void;
}

export function PublicDirectory({ onMillClick, onLoginClick }: PublicDirectoryProps) {
  const [mills, setMills] = useState<Mill[]>([]);
  const [filteredMills, setFilteredMills] = useState<Mill[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [provinsiFilter, setProvinsiFilter] = useState('');
  const [kabupatenKotaFilter, setKabupatenKotaFilter] = useState('');
  const [tahunOperasiFilter, setTahunOperasiFilter] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'mills'), orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const millsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Mill[];
      setMills(millsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching mills:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    filterMills();
  }, [mills, searchQuery, provinsiFilter, kabupatenKotaFilter, tahunOperasiFilter]);

  const filterMills = () => {
    let filtered = [...mills];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (mill) =>
          mill.nama_pabrik.toLowerCase().includes(query) ||
          mill.nama_perusahaan.toLowerCase().includes(query)
      );
    }

    if (provinsiFilter) {
      filtered = filtered.filter((mill) => mill.provinsi === provinsiFilter);
    }

    if (kabupatenKotaFilter) {
      filtered = filtered.filter((mill) => mill.kabupaten_kota === kabupatenKotaFilter);
    }

    if (tahunOperasiFilter) {
      filtered = filtered.filter((mill) => mill.tahun_operasi === parseInt(tahunOperasiFilter));
    }

    setFilteredMills(filtered);
  };

  const provinsiOptions = Array.from(new Set(mills.map((m) => m.provinsi))).sort();
  const kabupatenKotaOptions = Array.from(new Set(mills.map((m) => m.kabupaten_kota))).sort();
  const tahunOperasiOptions = Array.from(new Set(mills.map((m) => m.tahun_operasi))).sort(
    (a, b) => b - a
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-green-600 p-3 rounded-lg">
                <Factory className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Direktori Pabrik Kelapa Sawit</h1>
                <p className="text-sm text-gray-600 mt-1">
                  Database lengkap pabrik pengolahan kelapa sawit Indonesia
                </p>
              </div>
            </div>
            <button
              onClick={onLoginClick}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <LogIn className="w-5 h-5" />
              <span>Admin Login</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />

          <FilterBar
            provinsi={provinsiFilter}
            kabupatenKota={kabupatenKotaFilter}
            tahunOperasi={tahunOperasiFilter}
            onProvinsiChange={setProvinsiFilter}
            onKabupatenKotaChange={setKabupatenKotaFilter}
            onTahunOperasiChange={setTahunOperasiFilter}
            provinsiOptions={provinsiOptions}
            kabupatenKotaOptions={kabupatenKotaOptions}
            tahunOperasiOptions={tahunOperasiOptions}
          />

          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Daftar Pabrik ({filteredMills.length})
              </h2>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            ) : filteredMills.length === 0 ? (
              <div className="text-center py-12">
                <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">
                  {mills.length === 0 ? 'Belum ada data pabrik' : 'Tidak ada hasil yang sesuai'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMills.map((mill) => (
                  <MillCard key={mill.id} mill={mill} onClick={() => onMillClick(mill)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
