import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyCt1wlWGNtBooYoeg4ep4THMM_eI1aLWuU",
  authDomain: "boosting-site.firebaseapp.com",
  databaseURL: "https://boosting-site.firebaseio.com",
  projectId: "boosting-site",
  storageBucket: "boosting-site.appspot.com",
  messagingSenderId: "621110760852",
  appId: "1:621110760852:web:5c8047c407e8b7fd3b2b81",
  measurementId: "G-07S2JR2WT6"
};

class Firebase {

  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
    this.functions = app.functions();
    this.storage = app.storage();
  };

  getBadgeImage = (tier, division) => {
    const imageRoute = `badges/${tier}/${division}.png`;
    const storaRef = this.storage.ref();
    const badgeImageRef = storaRef.child(imageRoute);
    return badgeImageRef.getDownloadURL();
  };

};

export default new Firebase();