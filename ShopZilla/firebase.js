// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFireStore,setDoc,doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwrsZ4vwbYNIfMYL1jkbXkR8fQbxaDHNs",
  authDomain: "shopzella-65c12.firebaseapp.com",
  projectId: "shopzella-65c12",
  storageBucket: "shopzella-65c12.appspot.com",
  messagingSenderId: "962858801908",
  appId: "1:962858801908:web:f566888df633529c4b1ca1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message,divId){
    var messageDiv = document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
}


const signUp = document.getElementById('sign-In');
signUp.addEventListener('click',(event) =>{

    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const text = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;

    const auth = getAuth();

    const db=getFireStore();
    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential) => {
        const user=userCredential.user;
        const userData={
            email:email,
            text: name,
            phone:phone,

        };
        showMessage('account created successfully','signUpMessage');
        const docref=doc(db,"users",user.uid);
        setDoc(docRef,userData)
        .then(() =>{
            window.location.href='index.html';
        })
        .catch((error)=>{
            console.error("error writing document",error);
        });
    })

    .catch((error) => {
        const errorCode = error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address already exists !!!' , 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
} );



const signIn = document.getElementById('login');
signIn.addEventListener('click',(event) =>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth,email, password)
    .then((userCredential) =>{
        showMessage('login is successful', 'signMessage');
        const user= userCredential.user;
        localStorage.setItem('loggedInUserId',user.uid);
        window.location.href='index.html';

    })
    .catch((error)=>{
        const errorCode= error.code;
        if(errorCode==='auth/invalid-credentiaal'){
            showMessage('incorrect email or password' , 'signInMessage');
        }
        else{
            showMessage('account does not exist','signInMessage');
        }
        
    })
})