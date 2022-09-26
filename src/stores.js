import { writable } from 'svelte/store';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

function createCount() {
  const { subscribe, update } = writable(0);

  return {
    subscribe, 
    increment: () => update((n) => n + 1),
  };
}

function createLink() {
  const link = writable("");

  return link;
}

function createDatabase() {
  if (process.browser && firebase && typeof firebase.firestore == 'function') {
    let db = firebase.firestore();
    const { subscribe } = writable(db);

    return {
      subscribe,
      database: db,
      getUserData: async function (uid) {
        let data = this.database.collection('users').doc(uid);
        let user;
        if (data) {
          await data.get().then((doc) => {
            user = doc.data();
          });
        } else {
          user = null;
        }
        return user;
      },
      setUserData: async function (uid, data, merge = true) {
        this.database.collection('users').doc(uid).set(data, { merge });
      },
    };
  }
}

function createUser() {
  if (process.browser && firebase && typeof firebase.auth == 'function') {
    let user = firebase.auth().currentUser;
    const { subscribe, update } = writable(user);
    return {
      subscribe,
      logOut: async function () {
        await firebase.auth().signOut();
      },
      logIn: async function (email, password) {
        await firebase
          .auth()
          .signInWithEmailAndPassword(email, password)
          .catch(function (error) {
            throw error;
          });
      },
      update,
      checkEmailValidity: async function (email) {
        return await firebase
          .auth()
          .fetchSignInMethodsForEmail(email)
          .catch(function (error) {
            throw error
          })
      }
    };
  }
}

function createStorage() {
  if (process.browser && firebase && typeof firebase.storage == 'function') {
    let store = firebase.storage();
    const { subscribe } = writable(store);

    return {
      subscribe,
      storage: store,
      ref: store.ref(),
      uploadFile: async function (file, fileName, folder = null) {
        let fileRef;
        if (folder != null) {
          fileRef = await this.ref.child(`${folder}/${fileName}`);
        } else {
          fileRef = await this.ref.child(fileName);
        }
        await fileRef.put(file);
      },
      getJson: async function (fileName, folder = null) {
        return await this.ref
          .child(`${folder}/${fileName}`)
          .getDownloadURL()
          .then(async (url) => {
            let json = [
              {
                vin: 'ERROR',
                brand: 'ERROR',
                model: 'ERROR',
                year: 'ERROR',
                price: 'ERROR',
                color: 'ERROR',
                img: 'ERROR',
                completion: 'ERROR',
              },
            ];
            let response = await fetch(url);
            json = await response.json();
            return json;
          })
          .catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found':
                throw 'File not found';
              case 'storage/unauthorized':
                throw 'Not permitted';
              case 'storage/canceled':
                throw 'Cancelled';
              case 'storage/unknown':
                throw 'Unknown';
            }
          });
      },
      getFileUrl: async function (fileName, folder = null) {
        return await this.ref
          .child(`${folder}/${fileName}`)
          .getDownloadURL()
          .catch((error) => {
            switch (error.code) {
              case 'storage/object-not-found':
                throw 'File not found';
              case 'storage/unauthorized':
                throw 'Not permitted';
              case 'storage/canceled':
                throw 'Cancelled';
              case 'storage/unknown':
                throw 'Unknown';
            }
          });
      },
    };
  }
}

function createAdmin() {
  if (process.browser && firebase && typeof firebase.firestore == 'function') {
    let db = firebase.firestore();
    const { subscribe } = writable(db);

    return {
      subscribe,
      database: db,
      getUsers: async function () {
        let data = await this.database.collection('users').get();
        return data.docs;
      },
    }
  }
}

function createOffers() {
  if (process.browser && firebase && typeof firebase.firestore == 'function') {
    const { subscribe } = writable(db);

    return {
      subscribe,
      database: db,
      createOffer: async function (car, usr) {
          let val = { car };
          val.dealer = car.dealer
          let data = await db.getUserData(usr.uid);
          val.buyer = usr.uid;
          val.status = "Not Sent";
          val.initialInfo = {
            "Title and Licensing": {
              disabled: false,
              title: {
                  name: "",
                  address: "",
                  addressTwo: "",
                  phone: "",
                  city: "",
                  state: "",
                  zip: "",
                  email: "",
              },
              mini: {
                "Buyer Details": {
                  disabled: false
                }
              }
            },
            "Delivery and Pickup": {
                disabled: true,
                option: "",
                mini: {
                  "Available Options": {
                    disabled: false,
                  },
                  "Delivery Details": {
                    disabled: true,
                  },
                  "Pickup Details": {
                    disabled: true,
                  }
                }
            },
            "Financing": {
                disabled: false,
                mini: {
                  "Available Options": {
                    disabled: false,
                  },
                  "Financing Details": {
                    disabled: false,
                  }
                }
            },
            "Trade-in": {
                disabled: false,
                mini: {
                  "Available Options": {
                    disabled: false,
                  },
                  "Trade-in Details": {
                    disabled: false,
                  }
                }
            },
            "Review and Submit": {
                disabled: true,
                mini: {}
            },
          }
          if (!data.offers || data.offers.length == 0) {
            data.offers = [];
          }
          let newVal = {
            offers: [...data.offers, val],
          };
          await db.setUserData(usr.uid, newVal);
      },
      changeOffer: async function (offer) {
        let val = offer;
        let buyer = await db.getUserData(val.buyer);
        let buyerIndex;
        let offers = buyer.offers;
        offers.forEach((offer, i) => {
          if (offer.car.vin == val.car.vin) {
            buyerIndex = i;
          }
        });
        let buyerFront = offers.slice(0, buyerIndex);
        let buyerBack = offers.slice(buyerIndex + 1);
        let newVal = {
          offers: [...buyerFront, val, ...buyerBack],
        };
        await db.setUserData(val.buyer, newVal);
      },
      submitOffer: async function (offer) {
        if (offer.status === "Not Sent") {
          offer.status = "Pending counter offer";
          await this.changeOffer(offer);
          await this.createDealerOffer(offer);
        }
      },
      createDealerOffer: async function (offer) {
        let data = await db.getUserData(offer.dealer);
        if (!data.offers || data.offers.length == 0) {
          data.offers = [];
        }
        let newVal = {
          offers: [...data.offers, offer],
        };
        await db.setUserData(offer.dealer, newVal);
      }
    }
  }
}

export const count = createCount();
export const db = createDatabase();
export const user = createUser();
export const storage = createStorage();
export const admin = createAdmin();
export const listingLink = createLink();
export const offerManager = createOffers();

if (process.browser && firebase && typeof firebase.auth == 'function') {
  firebase.auth().onAuthStateChanged(async function (person) {
    user.update(() => person);
  });
}
