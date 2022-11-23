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
var job = 0;
var tbody = document.getElementById("tbody2");
function AddItemToTable(goodsSelected, deliveredFrom,deliveredTo,dateSelected,vehicleSelected ) {
  let tr = document.createElement("tr");
  let td1 = document.createElement('td');
  let td2 = document.createElement('td');
  let td3 = document.createElement('td');
  let td4 = document.createElement('td');
  let td5 = document.createElement('td');
  let td6 = document.createElement('td');
  
  

  td1.innerHTML = ++job;
  td2.innerHTML = goodsSelected;
  td3.innerHTML = deliveredFrom;
  td4.innerHTML = deliveredTo;
  td5.innerHTML = dateSelected;
  td6.innerHTML = vehicleSelected
  

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
 

  tbody.appendChild(tr);
}

function AddAllItemToTable(jb) {
  tbody.innerHTML="";

  job = 0;


  jb.forEach(element => {
    AddItemToTable(
      element.goodsSelected, 
      element.deliveredFrom, 
      element.deliveredTo, 
      element.dateSelected, 
      element.vehicleSelected,
      )
  })
}

//--------------GET ALL DATA-------------------------//
async function GetAllDataOnce(){
  const querySnapshot =await getDocs(collection(db, "jobDetails"));
  var jobs =[];

  querySnapshot.forEach(doc=>{
    jobs.push(doc.data());
  });
  AddAllItemToTable(jobs);
}

 window.onload = GetAllDataOnce;

