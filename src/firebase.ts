// firebase.ts  
import { initializeApp } from 'firebase/app';  
import { getAuth } from 'firebase/auth';  

const firebaseConfig = {  
  apiKey: "AIzaSyBx2Vh4c8LiKZzh9YUOYzKyQ2DUmKCMTU0",
  authDomain: "auto-call-agent-d60bd.firebaseapp.com",
  projectId: "auto-call-agent-d60bd",
  storageBucket: "auto-call-agent-d60bd.appspot.com",
  messagingSenderId: "950379453776",
  appId: "1:950379453776:web:8a171717392e4b5bd02055",
  measurementId: "G-SRZM4QP03H"
};  

const app = initializeApp(firebaseConfig);  
const auth = getAuth(app);

export {auth}