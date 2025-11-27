import { useEffect, useState } from 'react';
import { Factory, Plus, Edit, Trash2, LogOut, X } from 'lucide-react';
import { db, Mill } from '../lib/firebase';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';
import { MillForm } from '../components/MillForm';

export function AdminDashboard() {
  const { user, signOut } = useAuth();
  const [mills, setMills] = useState<Mill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMill, setEditingMill] = useState<Mill | null>(null);
  const [submitting, setSubmitting] = useState(false);

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

  const handleCreate = async (data: Omit<Mill, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    setSubmitting(true);
    try {
      await addDoc(collection(db, 'mills'), {
        ...data,
        createdBy: user?.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      setShowForm(false);
      alert('Pabrik berhasil ditambahkan');
    } catch (error) {
      console.error('Error creating mill:', error);
      alert('Gagal menambahkan pabrik');
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (data: Omit<Mill, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>) => {
    if (!editingMill) return;

    setSubmitting(true);
    try {
      const millRef = doc(db, 'mills', editingMill.id);
      await updateDoc(millRef, {
        ...data,
        updatedAt: new Date().toISOString(),
      });

      setEditingMill(null);
      setShowForm(false);
      alert('Pabrik berhasil diperbarui');
    } catch (error) {
      console.error('Error updating mill:', error);
      alert('Gagal memperbarui pabrik');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus pabrik "${name}"?`)) return;

    try {
      await deleteDoc(doc(db, 'mills', id));
      alert('Pabrik berhasil dihapus');
    } catch (error) {
      console.error('Error deleting mill:', error);
      alert('Gagal menghapus pabrik');
    }
  };

  const handleEdit = (mill: Mill) => {
    setEditingMill(mill);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingMill(null);
  };

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
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600 mt-1">Kelola data pabrik kelapa sawit</p>
              </div>
            </div>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Daftar Pabrik ({mills.length})</h2>
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Tambah Pabrik</span>
            </button>
          </div>

          {showForm && (
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingMill ? 'Edit Pabrik' : 'Tambah Pabrik Baru'}
                </h3>
                <button
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <MillForm
                mill={editingMill}
                onSubmit={editingMill ? handleUpdate : handleCreate}
                onCancel={handleCancel}
                loading={submitting}
              />
            </div>
          )}

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
                <p className="mt-4 text-gray-600">Memuat data...</p>
              </div>
            ) : mills.length === 0 ? (
              <div className="text-center py-12">
                <Factory className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Belum ada data pabrik</p>
                <p className="text-gray-400 text-sm mt-2">Klik tombol "Tambah Pabrik" untuk memulai</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nama Pabrik
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Perusahaan
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Lokasi
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kapasitas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tahun
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Aksi
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {mills.map((mill) => (
                      <tr key={mill.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{mill.nama_pabrik}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{mill.nama_perusahaan}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {mill.kabupaten_kota}, {mill.provinsi}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{mill.kapasitas_olah} ton/jam</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">{mill.tahun_operasi}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(mill)}
                            className="text-green-600 hover:text-green-900 mr-4"
                          >
                            <Edit className="w-5 h-5 inline" />
                          </button>
                          <button
                            onClick={() => handleDelete(mill.id, mill.nama_pabrik)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
