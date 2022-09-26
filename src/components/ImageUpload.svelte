<style lang="scss">
  @import '../theme/variables.scss';
  .profile-img-wrapper {
    position: relative;
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
    cursor: pointer;
  }
  input {
    display: none;
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
    padding: 5px;
  }

  .profile-img-wrapper:hover .profile-img-selector {
    display: block;
  }
</style>

<div class="flex-item fixed-width-column">
  <label for="profile-img-input">
    <div
      class="profile-img-wrapper"
      style="background: url({usr.photoURL
        ? usr.photoURL
        : 'profile-img-placeholder.png'}); background-size: 100% 100%;"
    >
      <p class="profile-img-selector">Change Image</p>
    </div>
  </label>
  <input
    type="file"
    id="profile-img-input"
    accept="image/*"
    on:change="{changeProfilePic}"
  />
  <p class="align-left">Account Created: {userDateJoined}</p>
  {#if userOrganizations}
    <p class="align-left">
      <small>organizations:</small>
    </p>
  {/if}
  <List class="demo-list" twoLine avatarList singleSelection>
    {#if userOrganizations}
      {#each userOrganizations as organization}
        <Item>
          <Graphic>
            <Icon class="material-icons">favorite</Icon>
          </Graphic>
          <Text>
            <div class="align-left">
              <PrimaryText>{organization}</PrimaryText>
              <SecondaryText>Member since {userDateJoined}</SecondaryText>
            </div>
          </Text>
        </Item>
      {/each}
    {/if}
  </List>
</div>

<script>
  import List, {
    Item,
    Graphic,
    Text,
    PrimaryText,
    SecondaryText,
  } from '@smui/list';
  import Icon from '@smui/button';
  import { goto } from '@sapper/app';
  import 'firebase/auth';
  import 'firebase/firestore';
  import { db, user, storage, admin } from '../stores.js';
  let userOrganizations = [];
  let userDateJoined;
  let loading = true;
  let usr = null;
  let userType = '';
  let userOffers = [];
  let loadingMessage = '';
  let userList = [];
  let id;
  let profilePic = null;
  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
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

  async function getUserData(person) {
    let data = await db.getUserData(person.uid);
    id = person.uid;
    if (data) {
      userType = data.type;
      userOffers = data.offers;
      userDateJoined = data.timeCreated;
      userOrganizations = data.organizations;
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
