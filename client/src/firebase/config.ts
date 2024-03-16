// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZbY1oatmQ_5KOCdkUWu_0attSdzdf-AY",
  authDomain: "web-booking-9d0e1.firebaseapp.com",
  projectId: "web-booking-9d0e1",
  storageBucket: "web-booking-9d0e1.appspot.com",
  messagingSenderId: "293543563524",
  appId: "1:293543563524:web:794bea6ed1af1d0d8a8051",
  measurementId: "G-EY4V9YQ822"
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const analytics = getAnalytics(app)
