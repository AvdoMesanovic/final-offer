<style lang="scss">
  @import '../theme/variables.scss';
  img {
    height: 300px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  .full-table :global(.offers-table-head th) {
    background-color: map-get($primary-palette, 300);
  }

  .full-table :global(.offers-table-primary-row td) {
    background-color: map-get($primary-palette, 500);
  }

</style>

{#if offers && offers.length != 0}
  <div class="flex-table full-table">
    <DataTable table$aria-label="ObjectTable" style="width: 100%">
      <Head>
        <Row class="offers-table-head">
          <Cell>VIN</Cell>
          <Cell>Completion</Cell>
        </Row>
      </Head>
      <Body>
        {#each offers as car, index}
          <Row class="{index % 2 == 0 ? 'offers-table-primary-row' : ''}" on:click="{() => goto('offer/' + car.vin)}" >
            <Cell>{car.vin}</Cell>
            <Cell>
              <ProgressBar percent="{car.completion}" />
            </Cell>
          </Row>
        {/each}
      </Body>
    </DataTable>
  </div>
{:else}
  <p class="text-center">We are an awesome company because of these awards!</p>
  <img src="fake-kelley-blue-book.png" alt="Kelley Blue Book" />
{/if}

<script>
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import ProgressBar from './ProgressBar.svelte';
  import { db, user } from '../stores.js';
  import { goto } from '@sapper/app';
  import QrCode from 'svelte-qrcode';
  let usr;
  let offers;
  let userType;
  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }
  async function getOffers() {
    if (usr) {
      let data = await db.getUserData(usr.uid);
      if (data) {
        offers = data.offers;
        userType = data.type;
      } else {
        offers = [];
        userType = null;
      }
    } else {
      offers = [];
      userType = null;
    }
  }

  if (process.browser && firebase && typeof firebase.auth == 'function') {
    firebase.auth().onAuthStateChanged(async function (person) {
      getOffers();
    });
  }
</script>
