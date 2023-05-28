// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// export default firebase;