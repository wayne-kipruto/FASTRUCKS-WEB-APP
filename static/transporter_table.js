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


//Filling the table 
var driver = 0;
var tbody = document.getElementById("tbody3");
function AddItemToTable(name, age, mobile, vehicle, ) {
  let tr = document.createElement("tr");
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  
  

  td1.innerHTML = ++driver;
  td2.innerHTML = name;
  td3.innerHTML = age;
  td4.innerHTML = mobile;
  td5.innerHTML = vehicle;
  

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
 

  tbody.appendChild(tr);
}

function AddAllItemToTable(dr) {
  tbody.innerHTML="";

  driver = 0;


  dr.forEach(element => {
    AddItemToTable(
      element.name, 
      element.age, 
      element.mobile, 
      element.vehicle, 
      )
  })
}

//--------------GET ALL DATA-------------------------//
async function GetAllDataOnce(){
  const querySnapshot =await getDocs(collection(db, "transporters"));
  var transporter =[];

  querySnapshot.forEach(doc=>{
    transporter.push(doc.data());
  });
  AddAllItemToTable(transporter);
}

 window.onload = GetAllDataOnce;
