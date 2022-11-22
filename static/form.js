import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, 
  signInWithEmailAndPassword,  
  createUserWithEmailAndPassword, 
  signOut } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

  import {getFirestore, collection, getDocs,
   addDoc, deleteDoc, doc   } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

   

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
 const db= getFirestore();

// listing all data from transporters database 
 const querySnapshot = await getDocs(collection(db, "transporters"));
 querySnapshot.forEach((doc) => {
   
   console.log(doc.id, " => ", doc.data());
 });
//

 const colRef = collection(db,'transporters')

 getDocs(colRef).then((snapshot)=>{
  let people = []
  snapshot.docs.forEach((doc)=>{
    people.push({...doc.data(), id:doc.id})
  })
  console.log(people)
 }).catch(err =>{
  console.log(err.message)
 })

//Adding people to firestore 
const addPerson = document.querySelector('.add')
addPerson.addEventListener('submit',(e)=>{
  e.preventDefault();

  addDoc(colRef, {
    name: addPerson.name.value,
    age:addPerson.age.value,
    mobile:addPerson.mobile.value,
    truck:addPerson.truck.value
  })
  .then(()=>{
    addPerson.reset();

  })
  
});

//Removing people from firestore 
const deletePerson = document.querySelector('.delete')
deletePerson.addEventListener('submit', (e)=>{
  e.preventDefault()

  const documentRef = doc(db,'transporters',deletePerson.uid.value)

  deleteDoc(documentRef).then(()=>{
    deletePerson.reset()
  })

  
})





// async function add_item() {
//   var name = document.getElementById('formGroupName').value;
//   var age = document.getElementById('formGroupAge').value;
//   var mobile = document.getElementById('formGroupMobile').value;
//   var truck = document.getElementById('formGroupTruck').value;

//   const newPost = await addDoc(collection(db,"transporters"), {
  
//       name: name,
//       age: age,
//       mobile: mobile,
//       truck: truck
//   });
// }



document.getElementById("log-btn").addEventListener('click', function(){
 document.getElementById("register-div").style.display="none";
 document.getElementById("login-div").style.display="inline";

});

  document.getElementById("login-btn").addEventListener('click', function(){
   const loginEmail= document.getElementById("login-email").value;
   const loginPassword =document.getElementById("login-password").value;

   signInWithEmailAndPassword(auth, loginEmail, loginPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("login-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});

document.getElementById("reg-btn").addEventListener('click', function(){
  document.getElementById("register-div").style.display="inline";
  document.getElementById("login-div").style.display="none";
});

// 



  document.getElementById("register-btn").addEventListener('click', function(){

   const registerEmail= document.getElementById("register-email").value;
   const registerPassword =document.getElementById("register-password").value;

   createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
  .then((userCredential) => {
    const user = userCredential.user;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result").innerHTML="Welcome <br>"+registerEmail+" was Registered Successfully";
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    document.getElementById("result-box").style.display="inline";
     document.getElementById("register-div").style.display="none";
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;

  });
});

document.getElementById("dashboard-btn").addEventListener('click', function(){
  window.open('../src/admin_page.html')
});

document.getElementById("log-out-btn").addEventListener('click', function(){
  signOut(auth).then(() => {
     document.getElementById("result-box").style.display="none";
       document.getElementById("login-div").style.display="inline";
  }).catch((error) => {
     document.getElementById("result").innerHTML="Sorry ! <br>"+errorMessage;
  });

});

//Filling the table 
var usr = 0;
var tbody= document.getElementById('tbody1')
function AddItemtoTable(name,age,mobile,vehicle){

  let trow = document.createElement("tr");
  let td1= document.createElement("td");
  let td2= document.createElement("td");
  let td3= document.createElement("td");
  let td4= document.createElement("td");
  let td5= document.createElement("td");
  
  

  td1.innerHTML= ++usr;
  td2.innerHTML= name;
  td3.innerHTML= age;
  td4.innerHTML= mobile;
  td5.innerHTML= vehicle;

  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  

  tbody.appendChild(tr);
}

function AddAllItemsToTable(TheTransporter){
  usr = 0;
  tbody.innerHTML="";
  TheTransporter.forEach(element => {
    AddItemtoTable(element.name,element.age,element.mobile,element.vehicle)
  });
}

async function GetAllDataOnce(){
  const querySnapshot = await getDocs(collection(db,"transporters"));

  var transporter =[];
  
  querySnapshot.forEach(doc=>{
    transporter.push(doc.data());
    
  });

  AddAllItemsToTable(transporter);

}
// window.onload = GetAllDataOnce;
