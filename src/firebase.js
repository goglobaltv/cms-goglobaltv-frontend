import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {

    apiKey: "AIzaSyBEu9I7AGzom0TvFNxpm76e5P4ICevV0K4",
    authDomain: "goglobaltv-cm.firebaseapp.com",
    projectId: "goglobaltv-cm",
    storageBucket: "goglobaltv-cm.appspot.com",
    messagingSenderId: "691964879459",
    appId: "1:691964879459:web:6f788eaa9db75aef4f8e56",
    measurementId: "G-LCXGB0MJ89"

  };

export const app = initializeApp(firebaseConfig)
export const storage = getStorage()
