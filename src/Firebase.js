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
    this.db.enablePersistence()
  };

  // AUTH MOD

  doAuthListener = (fn) => this.auth.onAuthStateChanged(fn);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSendPasswordResetEmail = (email) =>
    this.auth.sendPasswordResetEmail(email);

  doRegisterUserInformation = (userObj) => {

    const userID = userObj.userID;
    const userData = userObj;

    this.db.collection('users').doc(userID).set({
      nickName: userData.nickName,
      email: userData.email
    }).then(() => console.log("USER CREATED")).catch(err => console.log(err));

    // Setting up the Display Name

    this.auth.currentUser.updateProfile({
      displayName: `${userData.nickName}`
    });

  };

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

  doRegisterOrder = (paymentInfo, order_description) => {

    const order_id = uuidv4();
    const creation_timestamp = Date.now();

    this.db.collection('orders').doc(order_id).set({
      user_id: this.auth.currentUser.uid,
      created_at: creation_timestamp,
      completed: false,
      pause: false,
      order_description: order_description
    }).catch((err) => console.log(err));

    this.db.collection('payments').doc(uuidv4()).set({
      paymentInfo: paymentInfo,
      order_id: order_id,
      user_id: this.auth.currentUser.uid
    }).catch((err) => console.log(err));

    this.db.collection('chat_sessions').doc(order_id).set({
      participants: [this.auth.currentUser.uid],
      participants_history: []
    }).catch((err) => console.log(err));

    this.db.collection('chat_sessions').doc(order_id).collection('messages').doc(uuidv4()).set({
      content: 'Welcome! As soon as a booster take your order, you will be able to contact him using this chat',
      date: creation_timestamp,
      sender: { id: '0000', displayName: 'Admin' }
    }).catch((err) => console.log(err));

    this.db.collection('timelines').doc(order_id).set({
      events: [
        { date: creation_timestamp, text: 'Your order has been placed' }
      ]
    });

  };

  getOrder = () => {
    return this.db.collection('orders')
      .where("user_id", "==", this.auth.currentUser.uid)
      .get()
  };

  getMessages = (order_id, fn) => {
    return this.db.collection('chat_sessions')
      .doc(order_id)
      .collection('messages')
      .orderBy('date', 'asc')
      .onSnapshot(fn);
  };

  doSendChatMessage = (order_id, newMessage) => {
    this.db.collection('chat_sessions')
      .doc(order_id)
      .collection('messages')
      .doc(uuidv4())
      .set({
        sender: newMessage.sender,
        date: newMessage.date,
        content: newMessage.content
      });
  };

  doSetCredentials = (username, password, order_id) => {
    this.db.collection('orders').doc(order_id).update({
      credentials: {
        // summoner: summoner,
        username: username,
        password: password,
        // encryptedAccountId: accountId,
        saved: true
      }
    });
  };

  getCrendentials = (order_id) => {
    return this.db.collection('orders').doc(order_id).get();
  };

  doSetPreferences = (order_id, roles, champions) => {
    this.db.collection('orders').doc(order_id).update({
      preferences: {
        roles: roles,
        champions: champions,
        saved: true
      }
    });
  };

  getPreferences = (order_id, fn) => {
    return this.db.collection('orders').doc(order_id).get();
  };

  //

  getShit = (order_id, fn) => {
    return this.db.collection('orders').doc(order_id).onSnapshot(fn);
  };

  handlePauseShit = (order_id, boolean) => {
    this.db.collection('orders').doc(order_id).update({
      pause: boolean
    });
  };

  getTimeline = (order_id, fn) => {
    return this.db.collection('timelines')
      .doc(order_id)
      .onSnapshot(fn)
  };

  setEvent = (order_id, event) => {
    return this.db.collection('timelines')
      .doc(order_id)
      .update({
        events: app.firestore.FieldValue.arrayUnion(event)
      })
  };

  //

};

export default new Firebase();