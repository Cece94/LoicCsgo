import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAXTAsMEiLvZ9PrtALi5R3uVlNXrWoMruk",
  authDomain: "loic-csgo.firebaseapp.com",
  databaseURL: "https://loic-csgo.firebaseio.com",
  projectId: "loic-csgo",
};

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
