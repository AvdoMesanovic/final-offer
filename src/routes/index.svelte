<MainPage segment="{segment}" />

<script>
  import MainPage from '../components/MainPage.svelte';
  export let segment;
  import { db, user } from '../stores.js';
  import { goto } from '@sapper/app';
  let usr;
  let userType;
  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }
  async function getData() {
    let data = await db.getUserData(usr.uid);
    if (data) {
      if (data.type) userType = data.type;
    }
  }

  async function checkType() {
    await getData();
    // if (userType == 'Dealer') {
    //   goto('listings');
    // }
  }
  if (process.browser && firebase && typeof firebase.auth == 'function') {
    if (usr) {
      checkType();
    }
    firebase.auth().onAuthStateChanged(async function (person) {
      if (person) {
        await checkType();
      }
    });
  }
</script>
