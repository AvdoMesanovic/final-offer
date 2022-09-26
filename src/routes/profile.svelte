<style lang="scss">
  @import '../theme/variables.scss';

  .flex-item {
    padding: 15px;
    text-align: center;
  }

  .flex-item:first-child {
    margin-right: 20px;
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

  .align-right {
    text-align: right;
  }
  input {
    display: none;
  }
  .profile-button :global(.mdc-button) {
    text-align: center;
    margin: 0;
    padding: 10;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .profile-data-wrapper {
    height: 45vh;
  }
  @media only screen and (max-width: 990px) {
    .profile-data-wrapper {
      height: 70vh;
    }
  }
  @media only screen and (max-width: 741px) {
    .profile-data-wrapper {
      height: 45vh;
    }
  }
  @media only screen and (max-width: 611px) {
    .profile-data-wrapper {
      height: 70vh;
    }
  }
  #organiziations-fake-button-padding {
    padding-bottom: 46px;
  }

  @media only screen and (max-width: 450px) {
    :global(.profile-tabs) {
      width: 300px;
    }
  }
</style>

<svelte:head>
  <title>Profile</title>
</svelte:head>

{#if !loading && usr}
  <div class="container">
    <h1 class="heading">Profile</h1>
    <div class="flex-layout">
      <ImageUpload />
      <div class="flex-item">
        <Card class="profile-tabs">
          <div>
            <TabBar tabs="{tabs}" let:tab bind:active>
              <Tab tab="{tab}">
                <TabLabel>{tab}</TabLabel>
              </Tab>
            </TabBar>
          </div>
          {#if active === 'Basic Info'}
            <div class="profile-data-wrapper">
              <BasicInfoTextFields bind:fields />
            </div>
            <div class="align-right profile-button">
              <Button
                touch
                variant="raised"
                color="secondary"
                on:click="{() => updateData()}">Save</Button
              >
            </div>
          {:else if active === 'Organizations'}
            {#if userOrganizations}
              <div
                id="organiziations-fake-button-padding"
                class="profile-data-wrapper"
              >
                <List class="demo-list" twoLine avatarList singleSelection>
                  {#each userOrganizations as organization}
                    <Item>
                      <Graphic>
                        <Icon class="material-icons">favorite</Icon>
                      </Graphic>
                      <Text>
                        <div class="allign-text-left">
                          <PrimaryText>{organization}</PrimaryText>
                          <SecondaryText
                            >Member since {userDateJoined}</SecondaryText
                          >
                        </div>
                      </Text>
                    </Item>
                  {/each}
                </List>
              </div>
            {:else}
              <div class="profile-data-wrapper">
                <p>You are not involved in any organizations.</p>
              </div>
            {/if}
          {:else}
            <div class="profile-data-wrapper">
              <p>
                Final Offer stores your personal data to ... add legal text
                here.
              </p>
            </div>
            <div class="align-right profile-button">
              <Button
                touch
                variant="raised"
                on:click="{() => (deleteUserDialog = true)}"
              >
                <Label>Delete My Account</Label>
              </Button>
            </div>
          {/if}
        </Card>
        <div class="text-center">
          <Button touch variant="raised" on:click="{() => logOut()}">
            <Label>Log Out</Label>
          </Button>
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="spinner-overlay">
    <div class="spinner-center text-center">
      <CircularProgress indeterminate />
      <p>{loadingMessage}</p>
    </div>
  </div>
{/if}

<div>
  <Dialog bind:active="{isProfilePicture}">
    <Card>
      <Content>
        <Card variant="outlined">
          <Media class="card-media-square">
            {#if profilePic != null}
              <img id="previewImage" src="{profilePic}" alt="profile" />
            {:else}
              <div style="text-align: center; margin: 10px;">
                <p>Drag And Drop</p>
                <p>Image Here</p>
                <p>-OR-</p>
                <label class="custom-file-upload">
                  <input
                    id="input-file"
                    bind:value="{profilePic}"
                    on:change="{previewImage()}"
                    label="File"
                    type="file"
                  />
                  Find File
                </label>
              </div>
            {/if}
          </Media>
        </Card>
      </Content>
      <Actions>
        <Button on:click="{() => changeProfilePic}">
          <Label>Save</Label>
        </Button>
        <Button on:click="{() => (isProfilePicture = false)}">
          <Label>Cancel</Label>
        </Button>
      </Actions>
    </Card>
  </Dialog>
</div>

<Snackbar bind:this="{saved}">
  <Label>Saved Changes!</Label>
  <Actions>
    <IconButton class="material-icons" title="Dismiss">close</IconButton>
  </Actions>
</Snackbar>

<Dialog bind:active="{deleteUserDialog}">
  <Card padded>
    <Content
      >This will sign you out and delete your account. If you would like to use
      Final Offer in the futre you will need too create a new account and
      profile. Proceed?</Content
    >
    <div class="align-right">
      <Button on:click="{() => (deleteUserDialog = false)}">
        <Label>No</Label>
      </Button>
      <Button on:click="{() => deleteUser()}">
        <Label>Yes, Delete my account</Label>
      </Button>
    </div>
  </Card>
</Dialog>

<script>
  async function deleteUser() {
    let dataBase = firebase.firestore();
    await dataBase.collection('users').doc(id).delete();
    logOut();
  }

  function previewImage() {
    if (profilePic != null)
      profilePic = document.getElementById('input-file').value;
  }

  import List, {
    Item,
    Graphic,
    Text,
    PrimaryText,
    SecondaryText,
  } from '@smui/list';
  import Snackbar from '@smui/snackbar';
  import IconButton from '@smui/icon-button';
  import { Label } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import { Dialog, MaterialApp } from 'svelte-materialify';
  import Card, { Media, Content, Actions } from '@smui/card';
  import Icon from '@smui/button';
  import Button from '@smui/button';
  import CircularProgress from '@smui/circular-progress';
  import Tab, { Label as TabLabel } from '@smui/tab';
  import { goto } from '@sapper/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  import { db, user, storage, admin } from '../stores.js';
  import BasicInfoTextFields from '../components/BasicInfoTextFields.svelte';
  import ImageUpload from '../components/ImageUpload.svelte';
  let saved = false;
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
  let deleteUserDialog = false;
  let isProfilePicture = false;
  let userOrganizations = [];
  let userDateJoined;
  let errMessage = '';
  let loading = true;
  let usr = null;
  let userType = '';
  let userOffers = [];
  let loadingMessage = '';
  let userList = [];
  let active = 'Basic Info';
  let tabs = ['Basic Info', 'Organizations', 'Personal Data'];
  let id;
  let profilePic = null;

  function openProfilePictureDialog() {
    isProfilePicture = true;
  }

  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }

  async function updateData() {
    let dataBase = firebase.firestore();
    let userDoc = dataBase.collection('users').doc(id);
    userDoc.update({
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
      goto('profile');
    }
    loading = false;
    loadingMessage = '';
  }

  async function logOut() {
    errMessage = '';
    loading = true;
    await user.logOut();
    await goto('signin');
    loading = false;
  }

  async function getUserData(person) {
    let data = await db.getUserData(person.uid);
    id = person.uid;
    if (data) {
      userType = data.type;
      if (data.offers) {
        userOffers = data.offers;
      }
      userDateJoined = data.timeCreated;
      userOrganizations = data.organizations;
      Object.keys(basicInfoData).forEach((key) => {
        if (data[key])
          basicInfoData[key] = data[key];
      });
      fields = {
        fName: data.name,
        lName: data.name,
        dateOfBirth: data.dateOfBirth,
        sex: data.sex,
        email: data.email,
        phoneNumber: data.phoneNumber,
        address: data.streetAdress,
        addressTwo: data.streetAdressTwo,
        city: data.city,
        state: data.state,
        zip: data.zip,
        password: '*********',
      };
    }
    if (userType == 'Admin') {
      userList = await admin.getUsers();
    } else {
      userType = 'Not available for this user';
      userOffers = [];
    }
  }

  if (process.browser && firebase && typeof firebase.auth == 'function') {
    firebase.auth().onAuthStateChanged(async function (person) {
      loading = true;
      if (person) {
        getUserData(person);
      } else {
        goto('signin');
      }
      loading = false;
    });
  }
</script>
