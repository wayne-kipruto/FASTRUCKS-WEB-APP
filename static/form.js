import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc,getDoc,setDoc,
  query,where,orderBy
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import {getStorage,ref as sRef,uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"



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

//Storage 
var files =[];
var reader = new FileReader();

var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');//file extension
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('upprogress');
var selbtn = document.getElementById('selbtn');
var upbtn = document.getElementById('upbtn');
var downbtn = document.getElementById('downbtn');


var input = document.createElement('input');
input.type='file';

input.onchange = e =>{
  files = e.target.files;

  var extension = GetFileExtension(files[0]);
  var name = GetFileName(files[0]);

  namebox.value=name;
  extlab.innerHTML=extension;

  reader.readAsDataURL(files[0]);

}

reader.onload = function(){
  myimg.src =reader.result;
}

//Selection Image
selbtn.onclick = function(){
  input.click();
}
function GetFileExtension(file){
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length-1),(temp.length));
  return '.' + ext[0]; 
}
function GetFileName(file){
  var temp =file.name.split('.');
  var fname = temp.slice(0,-1).join('.');
  return fname;
}

//Upload Image 

async function UploadImage(){
  var ImgToUpload = files[0];
  var ImgName =namebox.value + extlab.innerHTML;
  const metadata = {
    contentType: ImgToUpload.type
  }

  const storage =getStorage();
  const storageRef = sRef(storage,"Images/"+ImgName);

  const UploadTask=uploadBytesResumable(storageRef,ImgToUpload,metadata);

  UploadTask.on('state-changed',(snapshot)=>{
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    proglab.innerHTML = "Upload "+ progress + "%";
  },
  (error)=>{
    alert('error:image not uploaded!');
  },
  ()=>{
    getDownloadURL(UploadTask.snapshot.ref).then((downloadURL)=>{
      saveURLToFirestore(downloadURL);
    });
  }
  );
}

async function saveURLToFirestore(url){
  var name = namebox.value;
  var ext =extlab.innerHTML;

  var ref = doc(db,'ImageLinks/'+ name);

  await setDoc(ref,{
    ImageName: (name+ext),
    ImageURL: url
  })
}

async function GetImageFromFirestore(){
  var name = namebox.value;
  var ref = doc(db, "ImageLinks/"+name);
  const docSnap = await getDoc(ref);

  if(docSnap.exists()){
    myimg.src=docSnap.data().ImageURL;
  }
}

upbtn.onclick = UploadImage;
downbtn.onclick= GetImageFromFirestore;


//------------------------------------------------------
//Displaying data on tables 




// listing all data from transporters database 
// const querySnapshot = await getDocs(collection(db, "transporters"));
// querySnapshot.forEach((doc) => {

//   console.log("Transporter Info :",doc.id, " => ", doc.data());
// });

//Collection reference
const colRef = collection(db, 'transporters')

//Queries 
// const t = query(colRef, where("truck","==", "Isuzu"),orderBy('truck','asc'))

//real-time collection data
onSnapshot(colRef,(snapshot)=>{
  let people = []
  snapshot.docs.forEach((doc) => {
  people.push({ ...doc.data(), id: doc.id })
  })
  console.log("TransporterInfo:",people)
})

//Adding transporters to firestore 
const addPerson = document.querySelector('.add')
addPerson.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    name: addPerson.name.value,
    age: addPerson.age.value,
    mobile: addPerson.mobile.value,
    truck: addPerson.truck.value
  })
    .then(() => {
      addPerson.reset();

    })

});

//Removing transporters from firestore 
const deletePerson = document.querySelector('.delete')
deletePerson.addEventListener('submit', (e) => {
  e.preventDefault()

  const documentRef = doc(db, 'transporters', deletePerson.uid.value)

  deleteDoc(documentRef).then(() => {
    deletePerson.reset()
  })

})

///////////////////////////////Suppliers////////////////////////////////////

// listing all data from Suppliers database 
// const querySuppSnapshot = await getDocs(collection(db, "suppInfo"));

// querySuppSnapshot.forEach((doc) => {

//   console.log("Supplier Information:",doc.id, " => ", doc.data());
// });

//Collection reference
const colSupRef = collection(db, 'suppInfo')

//real-time collection data
onSnapshot(colSupRef,(snapshot)=>{
  let supplier = []
  snapshot.docs.forEach((doc) => {
  supplier.push({ ...doc.data(), id: doc.id })
  })
  console.log("SuppInfo:",supplier)
})

//Adding suppliers to firestore 
const addSupplier = document.querySelector('.add')
addSupplier.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colSupRef, {
    name: addSupplier.supplierName.value,
    age: addSupplier.supplierAge.value,
    mobile: addSupplier.supplierMobile.value,
    businessName: addSupplier.BusinessName.value,
    businessDescription: addSupplier.BusinessDescription.value,
    businessAddress:addSupplier.BusinessAddress.value
  })
    .then(() => {
      addSupplier.reset();

    })

});

//Removing suppliers from firestore 
const deleteSupplier = document.querySelector('.delete')
deleteSupplier.addEventListener('submit', (e) => {
  e.preventDefault()

  const suppRef = doc(db, 'suppInfo', deleteSupplier.uid.value)

  deleteDoc(suppRef).then(() => {
    deleteSupplier.reset()
  })

})

document.getElementById("log-btn").addEventListener('click', function () {
  document.getElementById("register-div").style.display = "none";
  document.getElementById("login-div").style.display = "inline";

});

document.getElementById("login-btn").addEventListener('click', function () {
  const loginEmail = document.getElementById("login-email").value;
  const loginPassword = document.getElementById("login-password").value;

  signInWithEmailAndPassword(auth, loginEmail, loginPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("login-div").style.display = "none";

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("login-div").style.display = "none";
      document.getElementById("result").innerHTML = "Sorry ! <br>" + errorMessage;

    });
});

document.getElementById("reg-btn").addEventListener('click', function () {
  document.getElementById("register-div").style.display = "inline";
  document.getElementById("login-div").style.display = "none";
});

// 



document.getElementById("register-btn").addEventListener('click', function () {

  const registerEmail = document.getElementById("register-email").value;
  const registerPassword = document.getElementById("register-password").value;

  createUserWithEmailAndPassword(auth, registerEmail, registerPassword)
    .then((userCredential) => {
      const user = userCredential.user;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("register-div").style.display = "none";
      document.getElementById("result").innerHTML = "Welcome <br>" + registerEmail + " was Registered Successfully";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      document.getElementById("result-box").style.display = "inline";
      document.getElementById("register-div").style.display = "none";
      document.getElementById("result").innerHTML = "Sorry ! <br>" + errorMessage;

    });
});

document.getElementById("dashboard-btn").addEventListener('click', function () {
  window.open('../src/admin_page.html')
});

document.getElementById("log-out-btn").addEventListener('click', function () {
  signOut(auth).then(() => {
    document.getElementById("result-box").style.display = "none";
    document.getElementById("login-div").style.display = "inline";
  }).catch((error) => {
    document.getElementById("result").innerHTML = "Sorry ! <br>" + errorMessage;
  });

});

