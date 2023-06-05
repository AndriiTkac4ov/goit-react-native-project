import { initializeApp } from "firebase/app";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  getReactNativePersistence,
  initializeAuth,
} from 'firebase/auth/react-native';
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDdAO7OG7dphkGVTZkd2EEhUD5nHgrEMUo",
  authDomain: "goit-react-native-firebase-pro.firebaseapp.com",
  projectId: "goit-react-native-firebase-pro",
  storageBucket: "goit-react-native-firebase-pro.appspot.com",
  messagingSenderId: "1093768075767",
  appId: "1:1093768075767:web:e0c421f62757a97358f6f2",
  measurementId: "G-GRF8QC8NCH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
