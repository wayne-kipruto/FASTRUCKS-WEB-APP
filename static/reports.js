import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import { getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,  getDocs, } 
  from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCJGoT1w71h0pcK0jcX5o6NQg2OxQYKKmg",
  authDomain: "fastrucks1-230a1.firebaseapp.com",
  projectId: "fastrucks1-230a1",
  storageBucket: "fastrucks1-230a1.appspot.com",
  messagingSenderId: "446742646174",
  appId: "1:446742646174:web:61126b129234dfba581a8f",
  measurementId: "G-1RYSL3HVHX"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore();


//-----------------Displaying data on table(Suppliers)-------------------------------------
var person = 0;
var tbody = document.getElementById("tbody2");
function AddItemToTable(name, age, mobile, role, uid ) {
  let tr = document.createElement("tr");
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  let td6 = document.createElement('td');


  td1.innerHTML = ++person;
  td2.innerHTML = name;
  td3.innerHTML = age;
  td4.innerHTML = mobile;
  td5.innerHTML = role;
  td6.innerHTML = uid;


  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);


  tbody.appendChild(tr);
}

function AddAllItemToTable(pers) {
  tbody.innerHTML="";

  person = 0;


  pers.forEach(element => {
    AddItemToTable(
      element.name, 
      element.age, 
      element.mobile, 
      element.role,
      element.uid 
     )
  })
}

//--------------GET ALL DATA-------------------------//
async function GetAllDataOnce(){
  const querySnapshot =await getDocs(collection(db, "users"));
  var allusers =[];

  querySnapshot.forEach(doc=>{
    allusers.push(doc.data());
  });
  AddAllItemToTable(allusers);
}

 window.onload = GetAllDataOnce;


