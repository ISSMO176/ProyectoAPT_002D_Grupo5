// Importar las funciones necesarias de los SDKs de Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuración de tu proyecto Firebase
export const firebaseConfig = {
  apiKey: "AIzaSyCukSWgCCcvAAOlfM_LcEc5v0UTZOWwiYM",
  authDomain: "salfa-capacitaciones.firebaseapp.com",
  projectId: "salfa-capacitaciones",
  storageBucket: "salfa-capacitaciones.appspot.com",
  messagingSenderId: "140131417117",
  appId: "1:140131417117:web:ee7af96f17ea1c6bd31af4",
};

// Inicializar Firebase
const appFirebase = initializeApp(firebaseConfig);

// Inicializar servicios de Firebase
export const auth = getAuth(appFirebase); // Firebase Authentication
export const db = getFirestore(appFirebase); // Firestore Database

export default appFirebase;
