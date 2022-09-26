<style lang="scss">
  @import '../theme/variables.scss';

  .flexy {
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .fo-logo {
    margin-left: 10px;
    width: 140px;
    cursor: pointer;
  }

  a:link:active {
      color: $red;
  }

  .round-img {
    height: 40px;
    color: $black;
  }

  .email-profile-button :global(button) {
    padding: 0px;
    margin-left: 10px;
    padding-left: 10px;
    white-space: nowrap;
  }

  :global(.nav-row .nav-section) {
    padding: 0px;
  }

  :global(.email-profile-button i) {
    margin: 0 10px;
  }

  :global(.email-profile-button .mdc-menu) {
    width: 150px;
    text-align: center;
  }

  :global(.no-display.mdc-tab) {
    display: none;
  }

  .top-app-bar-container :global(.email-profile-button img) {
    cursor: pointer;
  }

  .nav-tabs {
    margin-left: 5px;
  }

  .nav-tabs :global(.mdc-tab) {
    padding: 0;
    margin-left: 10px;
  }

  @media print {
    .flexy {
      display: none;
    }
  }

  @media (max-width: 599px) {
    .nav-tabs {
      display: none;
    }
  }

</style>

<div class="flexy">
  <div class="top-app-bar-container">
    <TopAppBar variant="static" >
      <Row class="nav-row">
        <Section class="nav-section">
          <a
            aria-current="{segment === undefined ? 'page' : undefined}"
            href="./"
          >
            <img
              class="fo-logo"
              src="logo/final-offer-logo.png"
              alt="Final Offer logo"
            />
          </a>
          <div class="nav-tabs">
            <TabBar {tabs} let:tab bind:active>
              {#if tab.roles.includes(userType) && tab.checkCriteria()}
                <Tab {tab} minWidth aria-current="{segment === tab.ref ? 'page' : undefined}" href={tab.ref}>
                  <TabLabel>{tab.display}</TabLabel>
                </Tab>
              {:else}
                <Tab {tab} class="no-display"></Tab>
              {/if}
            </TabBar>
          </div>
        <span class="nav-spacer"></span>
        </Section>
          <Section align="end" toolbar>
            {#if usr}
              <Group>
                <div use:GroupItem class="email-profile-button">
                  <img src={usr.photoURL ? usr.photoURL : 'profile-img-placeholder.png'} class="round-img" alt="Profile" on:click="{() => profileMenu.setOpen(true)}" />
                  <Menu bind:this="{profileMenu}" anchorCorner="BOTTOM_LEFT" class="nav-menu">
                    <List>
                      <Item on:SMUI:action="{() => goto('signin')}">
                        <Text
                          >{userType == 'Dealer' ? 'Dealer' : 'My'} Profile</Text
                        >
                      </Item>
                      <Separator />
                      <Item on:SMUI:action="{() => logOut()}">
                        <Text>Log Out</Text>
                      </Item>
                    </List>
                  </Menu>
                </div>
              </Group>
            {:else}
              <Button aria-current="{segment === 'signin' ? 'page' : undefined}"
                  href="signin">
                <Label>Sign in</Label>
              </Button>
              <Button aria-current="{segment === 'signup' ? 'page' : undefined}"
                  href="signup">
                <Label>Sign up</Label>
              </Button>
            {/if}
          </Section>
      </Row>
    </TopAppBar>
    <div></div>
  </div>
</div>

<script>
  export let segment;
  import { db, user } from '../stores.js';
  import Button, { Group, GroupItem, Label, Icon } from '@smui/button/styled';

  import TopAppBar, { Row, Section } from '@smui/top-app-bar';
  import Menu from '@smui/menu';
  import List, {
    Item,
    Separator,
    Text,
  } from '@smui/list/styled';
  import Tab, { Label as TabLabel } from '@smui/tab';
  import TabBar from '@smui/tab-bar';
  import { goto } from '@sapper/app';

  let tabs = [
    {
      display: "Home",
      roles: [null, "Buyer", "Dealer", "Admin"],
      checkCriteria: () => { return false },
      ref: undefined
    },
    {
      display: "Listings",
      roles: [null, "Buyer", "Dealer", "Admin"],
      checkCriteria: () => { return true },
      ref: "listings"
    },
    {
      display: "Offers",
      roles: ["Buyer", "Dealer"],
      checkCriteria: () => { return userOffers && userOffers.length !== 0 },
      ref: "offers"
    },
    {
      display: "Inventory",
      roles: ["Dealer"],
      checkCriteria: () => { return userInventory && userInventory.length !== 0 },
      ref: "inventory"
    },
    {
      display: "Admin",
      roles: ["Admin"],
      checkCriteria: () => { return true },
      ref: "admin"
    },
    {
      display: "Profile",
      roles: ["Buyer", "Dealer", "Admin"],
      checkCriteria: () => { return false },
      ref: "profile"
    },
    {
      display: "Sign in",
      roles: [null],
      checkCriteria: () => { return false },
      ref: "signin"
    },
    {
      display: "Sign up",
      roles: [null],
      checkCriteria: () => { return false },
      ref: "signup"
    },
  ]
  let active = tabs[0];
  $: {
    let found = false;
    for (let i = 0; i < tabs.length; i++) {
      if (segment === tabs[i].ref) {
        active = tabs[i]
        found = true
      }
    }
    if (!found) active = null
  }
  let usr;
  let userType = null;
  let userOffers;
  let userInventory;
  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }
  async function getData() {
    let data = await db.getUserData(usr.uid);
    if (data) {
      if (data.type) userType = data.type;
      if (data.offers) userOffers = data.offers;
      if (data.inventory) userInventory = data.inventory;
    }
  }

  let profileMenu;

  async function logOut() {
    await user.logOut();
    userType = null;
    goto('');
  }
  if (process.browser && firebase && typeof firebase.auth == 'function') {
    if (usr) {
      getData();
    }
    firebase.auth().onAuthStateChanged(async function (person) {
      if (person) {
        await getData();
      }
    });
  }
</script>
