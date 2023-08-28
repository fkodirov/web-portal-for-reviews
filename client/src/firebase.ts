import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdnviCaq5ybNgFwI9OzmXBFtidgxvDCsU",
  authDomain: "web-portal-fba06.firebaseapp.com",
  projectId: "web-portal-fba06",
  storageBucket: "web-portal-fba06.appspot.com",
  messagingSenderId: "552674876247",
  appId: "1:552674876247:web:030992353a67ef55b5bc12",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
