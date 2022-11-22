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


//Collection reference
const colRef = collection(db, 'transporters')

//Queries 
// const t = query(colRef, where("truck","==", "Isuzu"),orderBy('truck','asc'))
const querySnapshot = await getDocs(collection(db, "transporters"));

querySnapshot.forEach((doc) => {

  console.log("Transporter Information:",doc.id, " => ", doc.data());
});

//real-time collection data
onSnapshot(colRef, (snapshot) => {
  let people = []
  snapshot.docs.forEach((doc) => {
    people.push({ ...doc.data(), id: doc.id })
  })
  console.log("TransporterInfo:", people)
})

//Adding transporters to firestore 
const addPerson = document.querySelector('.add')
addPerson.addEventListener('submit', (e) => {
  e.preventDefault();

  addDoc(colRef, {
    name: addPerson.name.value,
    age: addPerson.age.value,
    mobile: addPerson.mobile.value,
    vehicle: addPerson.vehicle.value
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
const querySuppSnapshot = await getDocs(collection(db, "suppInfo"));

querySuppSnapshot.forEach((doc) => {

  console.log("Supplier Information:",doc.id, " => ", doc.data());
});

//Collection reference
const colSupRef = collection(db, 'suppInfo')

//real-time collection data
onSnapshot(colSupRef, (snapshot) => {
  let supplier = []
  snapshot.docs.forEach((doc) => {
    supplier.push({ ...doc.data(), id: doc.id })
  })
  console.log("SuppInfo:", supplier)
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
    businessAddress: addSupplier.BusinessAddress.value
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