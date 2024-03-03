// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKeY2sePXvLpI6JEXkcr6_mxanIPP0t9w",
  authDomain: "restaurant-69097.firebaseapp.com",
  projectId: "restaurant-69097",
  storageBucket: "restaurant-69097.appspot.com",
  messagingSenderId: "1031425164365",
  appId: "1:1031425164365:web:1d58b37e1f220a57570804"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;