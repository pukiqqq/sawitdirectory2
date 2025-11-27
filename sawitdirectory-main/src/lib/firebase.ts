import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

if (!firebaseConfig.projectId || !firebaseConfig.apiKey) {
  throw new Error('Missing Firebase environment variables');
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export interface Mill {
  id: string;
  nama_pabrik: string;
  nama_perusahaan: string;
  provinsi: string;
  kabupaten_kota: string;
  kapasitas_olah: number;
  tahun_operasi: number;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  createdBy?: string;
}
