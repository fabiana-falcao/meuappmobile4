import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// COLE AQUI as chaves do seu projeto (Console Firebase > Configurações > Seus apps)
const firebaseConfig = {
  apiKey: "AIzaSyBNkFqYrgRVhwifbFIaJ0U9F4zk1pROBFw",
  authDomain: "projetoapp4-59b09.firebaseapp.com",
  projectId: "projetoapp4-59b09",
  storageBucket: "projetoapp4-59b09.firebasestorage.app",
  messagingSenderId: "65559561363",
  appId: "1:65559561363:web:c8400a1621078d5d1e3966",
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
