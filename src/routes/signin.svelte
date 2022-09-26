<style lang="scss">
  @import '../theme/variables.scss';

  .flex-item {
    margin: 5px auto;
    padding: 15px;
    text-align: center;
  }

  .flex-item.login {
    margin-right: 5px;
  }

  .flex-item:first-child {
    margin-right: 20px;
  }

  .login-inputs {
    margin-top: 80px;
  }

  .login-password {
    margin-bottom: 11px;
  }

  .mdc-text-field.smui-text-field--standard.mdc-ripple-upgraded {
    width: 400px;
  }

  @media only screen and (max-width: 799px) {
    .login-inputs {
      margin-top: 0;
    }
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

</style>

<svelte:head>
	<title>Sign In</title>
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
    <section>
      <div class="container">
        <div class="flex-layout">
          <h1 class="heading">Sign in</h1>
          <div class="flex-item login">
            <Card padded class="blue-background">
              <div class="login-inputs">
                <h3>Sign in</h3>
                <Textfield
                  variant="outlined"
                  width="400px"
                  type="email"
                  bind:value="{email}"
                  label="Email"
                  input$aria-controls="helper-text-standard-a"
                  input$aria-describedby="helper-text-standard-a"
                />
                <div class="login-password">
                  <Textfield
                    variant="outlined"
                    type="password"
                    bind:value="{password}"
                    label="Password"
                    input$aria-controls="helper-text-standard-a"
                    input$aria-describedby="helper-text-standard-a"
                    on:keyup="{loginOnEnter}"
                  />
                </div>
                <div>
                  <Button touch variant="raised" on:click="{() => logIn()}">
                    <Label>Log in</Label>
                  </Button>
                </div>
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
  <div class="spinner-overlay">
    <div class="spinner-center text-center">
      <CircularProgress indeterminate />
      <p>{loadingMessage}</p>
    </div>
  </div>
{/if}

<script>
  import Textfield from '@smui/textfield';
  import Button, { Label } from '@smui/button';
  import Card from '@smui/card';
  import { goto } from '@sapper/app';
  import 'firebase/auth';
  import { user, listingLink } from '../stores.js';
  import CircularProgress from '@smui/circular-progress';
  import Banner from '@smui/banner';

  let email = '';
  let password = '';
  let errMessage = '';
  let loading = true;
  let loadingMessage = '';
  let bannerOpen = false;

  async function logIn() {
    errMessage = '';
    loading = true;
    await user.logIn(email, password).catch(function (error) {
      errMessage =
        'An error has occured. Most likely, you have entered in the wrong credentials. Please try again.';
    });
    if (errMessage != '') {
      loading = false;
      bannerOpen = true;
      setTimeout(function(){bannerOpen = false}, 5000);
    } else if ($listingLink != "") {
      goto($listingLink);
    } else {
      goto("profile");
    }
  }

  if (process.browser && firebase && typeof firebase.auth == 'function') {
    firebase.auth().onAuthStateChanged(async function (person) {
      loading = true;
      if (person) {
        goto("profile");
      }
      loading = false;
    });
  }

  function loginOnEnter(event) {
    if (event.keyCode === 13) {
      logIn();
    }
  }
</script>
