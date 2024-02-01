import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyCZBTPM0aSBhQ05vRyPceq80GvNVwDLY0g",
  authDomain: "todo-app-4f43b.firebaseapp.com",
  projectId: "todo-app-4f43b",
  storageBucket: "todo-app-4f43b.appspot.com",
  messagingSenderId: "618080431420",
  appId: "1:618080431420:web:031ddc31159a5923808239",
  measurementId: "G-K6WS9KQJHL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)