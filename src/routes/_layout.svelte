<div>
  <Nav {segment} />
  <main>
    <slot />
  </main>
</div>

<div id="footer">
  <Footer {segment} />
</div>

<script lang="ts">
  import Nav from '../components/Nav.svelte';
  import Footer from '../components/Footer.svelte';
  import firebase from "firebase/app";
  const firebaseConfig = {
        apiKey: 'AIzaSyB0z0rwqjKC4TYIk5dBt8DPcMajBiWUb3Q',
        authDomain: 'final-offer.firebaseapp.com',
        databaseURL: 'https://final-offer-default-rtdb.firebaseio.com',
        projectId: 'final-offer',
        storageBucket: 'final-offer.appspot.com',
        messagingSenderId: '273393139223',
        appId: '1:273393139223:web:6673f43526de03856ee652',
      };
  if (firebase.apps.length === 0) firebase.initializeApp(firebaseConfig);
  export let segment;
</script>
