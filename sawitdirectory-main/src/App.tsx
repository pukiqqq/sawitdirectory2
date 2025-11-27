import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { PublicDirectory } from './pages/PublicDirectory';
import { MillDetail } from './pages/MillDetail';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { Mill } from './lib/supabase';

type View = 'directory' | 'detail' | 'login' | 'admin';

function App() {
  const { user, loading } = useAuth();
  const [currentView, setCurrentView] = useState<View>('directory');
  const [selectedMill, setSelectedMill] = useState<Mill | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
          <p className="mt-4 text-gray-600 text-lg">Memuat aplikasi...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <AdminDashboard />;
  }

  if (currentView === 'login') {
    return <AdminLogin onBack={() => setCurrentView('directory')} />;
  }

  if (currentView === 'detail' && selectedMill) {
    return (
      <MillDetail
        mill={selectedMill}
        onBack={() => {
          setCurrentView('directory');
          setSelectedMill(null);
        }}
      />
    );
  }

  return (
    <PublicDirectory
      onMillClick={(mill) => {
        setSelectedMill(mill);
        setCurrentView('detail');
      }}
      onLoginClick={() => setCurrentView('login')}
    />
  );
}

export default App;
