<style lang="scss">
  @import '../theme/variables.scss';

  .flex-item {
    margin: 5px auto;
    padding: 15px;
    text-align: center;
  }

  .flex-item.sign-up {
    margin-left: 5px;
  }

  .flex-item:first-child {
    margin-right: 20px;
  }

  .profile-name {
    font-size: 25px;
    margin: 5px 0px;
    font-weight: 500;
  }

  .spacing {
    margin: 30px 0px;
  }

  .full-table :global(table) {
    width: 100%;
  }

  .profile-header {
    margin-top: 0;
    margin-bottom: 20px;
  }

  .mdc-text-field.smui-text-field--standard.mdc-ripple-upgraded {
    width: 400px;
  }

  .user-email {
    display: flex;
    margin-left: auto;
    margin-right: auto;
  }

  .profile-user-type {
    font-size: 20px;
    font-weight: 400;
    margin: 0;
  }

  .profile-img-wrapper {
    position: relative;
    border-radius: 50%;
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    cursor: pointer;
  }

  .profile-img-selector {
    position: absolute;
    background-color: map-get($primary-palette, A200);
    bottom: 0;
    outline: none;
    width: 100%;
    color: map-get($primary-palette, 600);
    box-sizing: border-box;
    margin: 0;
    display: none;
    opacity: 0.75;
  }

  .profile-img-wrapper:hover .profile-img-selector {
    display: block;
  }

  #profile-img-input {
    display: none;
  }

  .spinner-center {
    position: absolute;
    top: 50%;
    left: 50%;
    -moz-transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
  }

  .spinner-overlay {
    height: 100vh;
    width: 100%;
    z-index: 10;
    top: 0;
    left: 0;
    position: fixed;
  }

  .spinner-center :global(circle) {
    stroke: map-get($primary-palette, 100);
  }

  .spinner-center :global(.mdc-circular-progress) {
    height: 200px;
    width: 200px;
  }

  .banner-text {
    display: flex;
  }

  .error-banner :global(div[role='banner']) {
    background-color: map-get($red-palette, 300);
  }

  @media only screen and (min-width: 800px) and (max-width: 1200px) {
    .full-table :global(.offers-car-name) {
      display: none;
    }
  }

  @media only screen and (max-width: 800px) {
    .main-profile {
      max-width: 100%;
    }
  }

  .full-table :global(.offers-table-head th) {
    background-color: map-get($primary-palette, 300);
  }

  .full-table :global(.offers-table-primary-row td) {
    background-color: map-get($primary-palette, 500);
  }

  .email-not-verified {
    color: map-get($red-palette, 100);
    margin-top: 0px;
    margin-bottom: 10px;
  }

  .admin-table :global(tr),
  .admin-table :global(td) {
    cursor: default;
  }

  .admin-table
    :global(.mdc-data-table__row:not(.mdc-data-table__row--selected):hover) {
    background-color: transparent;
  }
  .label-text-coloring {
    color: $black;
  }
  .label-text-coloring-red {
    color: $red;
  }
  .label-text-coloring-green {
    color: map-get($green-palette, 900);
  }
  .allign-button-right {
    display: flex;
    justify-content: flex-end;
  }
</style>

<svelte:head>
  <title>Profile</title>
</svelte:head>

<div class="error-banner">
  <Banner
    bind:open="{bannerOpen}"
    centered
    mobileStacked
    content$style="max-width: max-content;"
  >
    <div slot="label" class="banner-text">
      <Label>{errMessage}</Label>
    </div>
    <div slot="actions"><Button>I'll try again</Button></div>
  </Banner>
</div>

{#if loading == false}
  {#if !loggedIn}
    <section>
      <div class="container">
        <div class="flex-layout">
          <h1 class="heading">Sign up</h1>
          <div class="flex-item sign-up">
            <Card padded class="yellow-background">
              <div class="sign-up-inputs">
                <h3>Sign up</h3>
                  <BasicInfoTextFields bind:fields/>
                <Button
                  disabled
                  id="sign-up-button"
                  touch
                  variant="raised"
                  on:click="{() => signUp()}"
                >
                  Sign up
                </Button>
              </div>
            </Card>
          </div>
        </div>
        <p class="text-center">
          For any trouble logging in or signing up, please contact us @
          finalofferteam@gmail.com and/or (314) 123-4567
        </p>
      </div>
    </section>
  {:else}
    <div class="container">
      <h1 class="heading">Profile</h1>
      <div class="flex-layout">
        <div class="flex-item main-profile text-center">
          <Card padded>
            <label for="profile-img-input">
              <div
                class="profile-img-wrapper"
                style="background: url({usr.photoURL
                  ? usr.photoURL
                  : 'profile-img-placeholder.png'}); background-size: 100% 100%;"
              >
                <p class="profile-img-selector">
                  <i class="material-icons">photo_camera</i>
                </p>
              </div>
            </label>
            <input
              type="file"
              id="profile-img-input"
              accept="image/*"
              on:change="{changeProfilePic}"
            />
            <h1 class="profile-name">
              {usr.displayName
                ? usr.displayName
                : fName
                ? fName + ' ' + lName
                : 'Anonymous User'}
            </h1>
            <div class="user-email">
              <p>{usr.email}</p>
            </div>
            {#if !usr.emailVerified}
              <p class="email-not-verified" tabindex="-1">
                Your email has not been verified
              </p>
            {/if}
            <p class="profile-user-type">{userType}</p>
          </Card>
        </div>
        <div class="flex-item">
          <Card padded>
            <div class="spacing">
              {#if userType != 'Admin'}
                <div>
                  <h2 class="text-center profile-header">
                    {userType === 'Dealer' ? 'Received' : 'My'} Offers
                  </h2>
                  {#if userOffers && userOffers.length != 0}
                    <div class="full-table">
                      <DataTable>
                        <Head>
                          <Row class="offers-table-head">
                            <Cell colspan="2">VIN</Cell>
                            <Cell colspan="2" class="offers-car-name">Car</Cell>
                            <Cell>Offer</Cell>
                          </Row>
                        </Head>
                        <Body>
                          {#each userOffers as car, index}
                            <Row
                              on:click="{() => goto('offer/' + car.vin)}"
                              class="{index % 2 == 0
                                ? 'offers-table-primary-row'
                                : ''}"
                            >
                              <Cell colspan="2">{car.vin}</Cell>
                              <Cell colspan="2" class="offers-car-name"
                                >{car.year} {car.brand} {car.model}</Cell
                              >
                              <Cell>${car.price}</Cell>
                            </Row>
                          {/each}
                        </Body>
                      </DataTable>
                    </div>
                  {:else}
                    You have not made any offers.
                  {/if}
                </div>
              {:else}
                <h2 class="text-center profile-header">Users</h2>
                <div class="full-table admin-table">
                  <div>
                    <Button variant="raised" on:click="{() => addUsr()}">
                      <Icon class="material-icons">add</Icon>
                      <Label>New</Label>
                    </Button>
                    <DataTable>
                      <Head>
                        <Row class="offers-table-head">
                          <Cell>User Name</Cell>
                          <Cell>Email</Cell>
                          <Cell />
                        </Row>
                      </Head>
                      <Body>
                        {#each userList as u, index}
                          {#if u.id != usr.uid}
                            <Row
                              class="{index % 2 == 0
                                ? 'offers-table-primary-row'
                                : ''}"
                            >
                              <Cell>{u.data().name}</Cell>
                              <Cell>
                                {u.data().email}
                                <div class="edit"></div>
                              </Cell>
                              <Cell>
                                <div class="allign-button-right">
                                  <Button
                                    color="secondary"
                                    variant="raised"
                                    on:click="{() =>
                                      showDialog(
                                        index,
                                        u.id,
                                        u.data().email,
                                        u.data().name,
                                        u.data().type
                                      )}"
                                  >
                                    <Icon class="material-icons">build</Icon>
                                    <Label
                                      ><div class="label-text-coloring">
                                        edit
                                      </div></Label
                                    >
                                  </Button>
                                </div>
                              </Cell>
                            </Row>
                          {/if}
                        {/each}
                      </Body>
                    </DataTable>
                  </div>
                </div>
              {/if}
            </div>
          </Card>
        </div>
      </div>
      <div class="text-center">
        <Button touch variant="raised" on:click="{() => logOut()}">
          <Label>Log Out</Label>
        </Button>
      </div>
    </div>
  {/if}
  <Button on:click="{() => signupDialog.open()}">Signup Dialog</Button>
{:else}
  <div class="spinner-overlay">
    <div class="spinner-center text-center">
      <CircularProgress indeterminate />
      <p>{loadingMessage}</p>
    </div>
  </div>
{/if}
<Dialog class="pa-4 text-center" bind:active>
  <div class="card-container">
    <Card>
      <Content>
        <h3>
          User : {usrId}
        </h3>
      </Content>
      <Content>
        <Textfield bind:value="{usrName}" label="Name" />
      </Content>
      <Content>
        <Textfield bind:value="{usrEmail}" label="Email" />
      </Content>
      <Content>
        <Textfield bind:value="{usrType}" label="Type" />
      </Content>
      <Content>
        <Button
          variant="outlined"
          color="primary"
          on:click="{() => updateUsr()}"
        >
          <Icon class="material-icons"
            ><div class="label-text-coloring-green">checkmark</div></Icon
          >
          <Label><div class="label-text-coloring-green">accept</div></Label>
        </Button>
        <Button
          variant="outlined"
          color="error"
          on:click="{() => deleteUser()}"
        >
          <Icon class="material-icons"
            ><div class="label-text-coloring-red">delete</div></Icon
          >
          <Label><div class="label-text-coloring-red">delete</div></Label>
        </Button>
      </Content>
    </Card>
  </div>
</Dialog>
<ProfileSignUp bind:this="{signupDialog}" on:submit="{signUpFromDialog}" />

<Snackbar bind:this="{errorInSignUp}">
  <Label>Email and Full Name are Required</Label>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<script>
  $: buttonValidity = (buttonState) => {
    if (buttonState) {
      document.getElementById('sign-up-button').disabled = false;
    } else {
      document.getElementById('sign-up-button').disabled = true;
    }
  }
  let fields = {
    fName: '',
    lName: '',
    dateOfBirth: '',
    sex: '',
    email: '',
    phoneNumber: '',
    address: '',
    addressTwo: '',
    city: '',
    state: '',
    zip: '',
    password: '',
  };
  let errorInSignUp = false;
  let usrType;
  let active;
  let usrId;
  let index;
  let usrEmail;
  let usrName;
  async function deleteUser() {
    let confiremed = confirm('You are about to delete a user! Are you sure?');
    if (confiremed) {
      let dataBase = firebase.firestore();
      await dataBase.collection('users').doc(usrId).delete();
      location.reload();
    }
  }

  function showDialog(index1, uid, email, name, type) {
    index = index1;
    usrId = uid;
    usrEmail = email;
    usrName = name;
    usrType = type;
    active = true;
  }

  async function updateUsr() {
    if (
      process.browser &&
      firebase &&
      typeof firebase.firestore == 'function'
    ) {
      let dataBase = firebase.firestore();
      let userDoc = await dataBase.collection('users').doc(usrId);
      await userDoc.update({ email: usrEmail, name: usrName, type: usrType });
      location.reload();
    }
  }

  async function addUsr() {
    if (
      process.browser &&
      firebase &&
      typeof firebase.firestore == 'function'
    ) {
      let dataBase = firebase.firestore();
      console.log(
        await dataBase.collection('users').add({
          name: 'put name here',
          email: 'put email here',
          type: 'put type here',
        })
      );
      location.reload();
    }
  }
  import BasicInfoTextFields from '../components/BasicInfoTextFields.svelte';
  import Snackbar from '@smui/snackbar';
  import IconButton from '@smui/icon-button';
  import { Dialog, MaterialApp } from 'svelte-materialify';
  import Card, { Content, Actions } from '@smui/card';
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import { goto } from '@sapper/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  import { db, user, storage, admin, listingLink } from '../stores.js';
  import CircularProgress from '@smui/circular-progress';
  import Banner from '@smui/banner';
  import ProfileSignUp from '../components/ProfileSignUp.svelte';
  import { Icon } from '@smui/button';

  let signupDialog;

  let emailSignUp = '';
  let passwordSignUp = '';
  let email = '';
  let password = '';
  let fName = '';
  let lName = '';
  let errMessage = '';
  let loading = true;
  let userBuy = 'Buyer';
  let usr = null;
  let userType = '';
  let userOffers = [];
  let loadingMessage = '';
  let bannerOpen = false;
  let userList = [];

  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }

  async function signUpFromDialog(event) {
    let e = event.detail[0];
    let p = event.detail[1];
    let name = event.detail[2];
    loading = true;
    await firebase
      .auth()
      .createUserWithEmailAndPassword(e, p)
      .then(async function (cred) {
        await cred.user.updateProfile({
          displayName: name,
        });
        displayName = name;
        await db.setUserData(cred.user.uid, {
          type: 'Buyer',
          email: cred.user.email,
          name,
        });
      })
      .catch(function (error) {
        if (error.code == 'auth/email-already-in-use') {
          errMessage = 'That email is already in use. Please try another one.';
        } else if (error.code == 'auth/weak-password') {
          errMessage =
            'That is a weak password. Please use something stronger.';
        }
      });
    loading = false;
  }

  async function signUp() {
    if (
      basicInfoData.email === '' ||
      basicInfoData.password === '' ||
      basicInfoData.fName === '' ||
      basicInfoData.lName === ''
    ) {
      errorInSignUp.open();
      return;
    }
    errMessage = '';
    loading = true;
    clearInterval(loop);
    await firebase
      .auth()
      .createUserWithEmailAndPassword(
        basicInfoData.email,
        basicInfoData.password
      )
      .then(function (cred) {
        db.setUserData(cred.user.uid, {
          type: userBuy,
          email: cred.user.email,
          fName: basicInfoData.fName,
          lName: basicInfoData.lName,
          dateOfBirth: basicInfoData.dateOfBirth,
          sex: basicInfoData.sex,
          email: basicInfoData.email,
          phoneNumber: basicInfoData.phoneNumber,
          streetAdress: basicInfoData.address,
          streetAdressTwo: basicInfoData.addressTwo,
          city: basicInfoData.city,
          state: basicInfoData.state,
          zip: basicInfoData.zip,
        });
      })
      .catch(function (error) {
        if (error.code == 'auth/email-already-in-use') {
          errMessage = 'That email is already in use. Please try another one.';
        } else if (error.code == 'auth/weak-password') {
          errMessage =
            'That is a weak password. Please use something stronger.';
        }
      });
    loading = false;
    if (errMessage != '') {
      bannerOpen = true;
      setTimeout(function () {
        bannerOpen = false;
      }, 5000);
    }
    goto('profile');
  }

  async function logOut() {
    errMessage = '';
    loading = true;
    await user.logOut();
    loading = false;
  }

  async function updateProfile(person) {
    let displayName = fName + ' ' + lName;
    await person.updateProfile({
      displayName,
    });
    await db.setUserData(person.uid, { name: displayName });
    return person;
  }

  async function getUserData(person) {
    let data = await db.getUserData(person.uid);
    if (data) {
      userType = data.type;
      userOffers = data.offers;
      if (userType == 'Admin') {
        userList = await admin.getUsers();
      }
    } else {
      userType = 'Not available for this user';
      userOffers = [];
    }
  }

  $: loggedIn = usr !== null;

  if (process.browser && firebase && typeof firebase.auth == 'function') {
    firebase.auth().onAuthStateChanged(async function (person) {
      loading = true;
      if (
        emailSignUp != '' &&
        passwordSignUp != '' &&
        fName != '' &&
        lName != '' &&
        usr.displayName == ''
      ) {
        person = await updateProfile(person);
      }
      if (person) {
        getUserData(person);
      }
      loading = false;
    });
  }

  async function changeProfilePic(event) {
    let file = event.target.files[0];
    loading = true;
    loadingMessage = 'Uploading profile image';
    if (file.type.includes('image')) {
      await storage.uploadFile(file, usr.uid, 'User Images');
      let url = await storage.getFileUrl(usr.uid, 'User Images');
      await usr.updateProfile({
        photoURL: url,
      });
      goto('profile');
    } else {
      console.log('File type not supported');
    }
    loading = false;
    loadingMessage = '';
  }
</script>
