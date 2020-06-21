import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";
import { v4 as uuidv4 } from 'uuid';

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

  // AUTH MOD

  doAuthListener = (fn) => this.auth.onAuthStateChanged(fn);

  // STORAGE MOD

  getBadgeImage = (queueType, tier, division) => {

    if (queueType === "Division" || queueType === "Wins") {

      const imageRoute = `badges/${tier}/${division}.png`;
      const storaRef = this.storage.ref();
      const badgeImageRef = storaRef.child(imageRoute);
      return badgeImageRef.getDownloadURL();

    } else if (queueType === "Ranked Games") {

      const imageRoute = `badges/${tier}/3.png`;
      const storaRef = this.storage.ref();
      const badgeImageRef = storaRef.child(imageRoute);
      return badgeImageRef.getDownloadURL();

    } else if (queueType === "Normal Games") {

      const imageRoute = `badges/Normal_Games.png`;
      const storaRef = this.storage.ref();
      const badgeImageRef = storaRef.child(imageRoute);
      return badgeImageRef.getDownloadURL();

    } else if (queueType === "Placement") {

      const imageRoute = `badges/Placement.png`;
      const storaRef = this.storage.ref();
      const badgeImageRef = storaRef.child(imageRoute);
      return badgeImageRef.getDownloadURL();

    } else if (queueType === "Clash") {

      const imageRoute = `badges/Clash.png`;
      const storaRef = this.storage.ref();
      const badgeImageRef = storaRef.child(imageRoute);
      return badgeImageRef.getDownloadURL();

    };

  };

  // DB MOD

  doRegisterOrder = () => {

    const username = this.auth.currentUser.displayName;
    const user_id = this.auth.currentUser.uid;
    const order_id = uuidv4();
    const created_at = new Date();

  };

};

export default new Firebase();