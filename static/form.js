import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

import {
  getFirestore, collection, onSnapshot,
  addDoc, deleteDoc, doc, getDoc, getDocs, setDoc,
  query, where, orderBy
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js"



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
var files = [];
var reader = new FileReader();

var namebox = document.getElementById('namebox');
var extlab = document.getElementById('extlab');//file extension
var myimg = document.getElementById('myimg');
var proglab = document.getElementById('upprogress');
var selbtn = document.getElementById('selbtn');
var upbtn = document.getElementById('upbtn');
var downbtn = document.getElementById('downbtn');


var input = document.createElement('input');
input.type = 'file';

input.onchange = e => {
  files = e.target.files;

  var extension = GetFileExtension(files[0]);
  var name = GetFileName(files[0]);

  namebox.value = name;
  extlab.innerHTML = extension;

  reader.readAsDataURL(files[0]);

}

reader.onload = function () {
  myimg.src = reader.result;
}

//Selection Image
selbtn.onclick = function () {
  input.click();
}
function GetFileExtension(file) {
  var temp = file.name.split('.');
  var ext = temp.slice((temp.length - 1), (temp.length));
  return '.' + ext[0];
}
function GetFileName(file) {
  var temp = file.name.split('.');
  var fname = temp.slice(0, -1).join('.');
  return fname;
}

//Upload Image 

async function UploadImage() {
  var ImgToUpload = files[0];
  var ImgName = namebox.value + extlab.innerHTML;
  const metadata = {
    contentType: ImgToUpload.type
  }

  const storage = getStorage();
  const storageRef = sRef(storage, "Images/" + ImgName);

  const UploadTask = uploadBytesResumable(storageRef, ImgToUpload, metadata);

  UploadTask.on('state-changed', (snapshot) => {
    var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    proglab.innerHTML = "Upload " + progress + "%";
  },
    (error) => {
      alert('error:image not uploaded!');
    },
    () => {
      getDownloadURL(UploadTask.snapshot.ref).then((downloadURL) => {
        saveURLToFirestore(downloadURL);
      });
    }
  );
}

async function saveURLToFirestore(url) {
  var name = namebox.value;
  var ext = extlab.innerHTML;

  var ref = doc(db, 'ImageLinks/' + name);

  await setDoc(ref, {
    ImageName: (name + ext),
    ImageURL: url
  })
}

async function GetImageFromFirestore() {
  var name = namebox.value;
  var ref = doc(db, "ImageLinks/" + name);
  const docSnap = await getDoc(ref);

  if (docSnap.exists()) {
    myimg.src = docSnap.data().ImageURL;
  }
}

upbtn.onclick = UploadImage;
downbtn.onclick = GetImageFromFirestore;




// listing all data from transporters database 
// const querySnapshot = await getDocs(collection(db, "transporters"));
// querySnapshot.forEach((doc) => {

//   console.log("Transporter Info :",doc.id, " => ", doc.data());
// });



