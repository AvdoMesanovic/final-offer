<style lang="scss">
  // @import '@material/elevation/mdc-elevation';
  // @import '@material/typography/mdc-typography';
  @import '../../theme/variables.scss';

  p,
  button {
    margin-top: 10px;
  }

  a {
    text-decoration: none;
  }

  .m-10 {
    margin: 10px;
  }

  .pl-5 {
    padding-left: 5px;
  }
  
  .flex-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
  }

  .flex-item {
    padding: 5px;
    margin: 5px;
    height: auto;
    margin-top: 10px;
    order: 1;
  }

  .prominent {
    flex-grow: 2;
  }

  .width-100 {
    width: 100%;
    margin: 10px;
  }

  a {
    text-decoration: none;
  }

  .heading {
    padding-right: 0;
  }

  .flex-layout {
    width: 100%;
  }

  input[type='file'] {
    display: none;
  }

  .custom-file-upload {
    display: inline-block;
    padding: 12px;
    cursor: pointer;
    text-transform: uppercase;
    font-weight: 500;
  }

  .custom-file-upload:hover {
    background-color: map-get($primary-palette, A500);
    border-radius: 3px;
    padding: 12px;
  }

  .data-table {
    margin: 10px;
  }

  .card-data {
    text-align: left;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    padding-bottom: 5px;
    font-size: 20px;
  }

  .vin {
    margin-right: 28px;
  }

  .brand {
    margin-right: 4px;
  }

  .year {
    margin-right: 17px;
  }

  .text-center.price-box {
    padding: 10px 8px;
    box-shadow: 0 1px 2px 2px map-get($grey-palette, A100);
    border-radius: 4px;
    transition-duration: 0.5s;
  }

  .text-center.price-box:hover {
    box-shadow: 0 1px 8px 3px map-get($grey-palette, 900);
  }

  h1 {
    margin: 0;
  }

  h3 {
    margin: 0;
    margin-bottom: 17px;
  }

  .grey-thin-text.text-center {
    margin-bottom: 10px;
    padding: 0;
  }

  .card-data {
    text-align: left;
  }

  .year-cell {
    text-align: right;
  }

  .loading {
    z-index: 100;
    height: 400px;
  }

  .circle-progress {
    margin-top: 75px;
    display: flex;
    justify-content: center;
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

  .data-table :global(img) {
    width: 100%;
  }

  .centered-img {
    margin-left: auto;
    margin-right: auto;
  }

  .banner-text {
    display: flex;
    transition-duration: 0.5s;
  }

  .success-banner :global(div[role='banner']) {
    background-color: map-get($green-palette, 400);
    transition: height 1s;
  }

  :global(.print-button) {
    float: right;
  }

  .print-div {
    width: max-content;
    margin: 8px auto;
    display: none;
  }

  .qr-print-div {
    width: 30%;
    border: dashed 1px $grey;
    margin: 0;
  }

  @media only screen and (max-width: 395px) {
    li {
      font-size: 16px;
    }

    .vin {
      margin-right: 20px;
    }

    .year {
      margin-right: 12px;
    }

    :global(.print-button) {
      display: none;
    }

    .print-div {
      display: block;
    }

  }

  #dealer-print {
    display: none;
    flex-wrap: wrap;
  }

  @media print {
    .container, .m-10 {
      display: none;
    }

    #dealer-print {
      display: flex;
    }
  }
</style>

{#each cars as car}
  <a class="no-display" rel="prefetch" href="offer/{car.vin}"> </a>
{/each}

<div class="success-banner">
  <Banner
    bind:open="{bannerOpen}"
    centered
    mobileStacked
    content$style="max-width: max-content;"
  >
    <div slot="label" class="banner-text">
      <Label>Your inventory has been updated.</Label>
    </div>
    <div slot="actions"><Button>Thanks!</Button></div>
  </Banner>
</div>

{#if dataLoading == false}
  <div class="m-10">
    <Textfield bind:value="{filter}" label="Filter" />
    {#if userType == 'Dealer'}
      <div style="float: right" class="m-10">
        <Button on:click={() => inventoryDialog.open()}>Update Inventory</Button>
      </div>
    {/if}
  </div>

  <div class="container">
    <div class="flex-layout">
      <div class="flex-item">
        <h1 class="heading">Inventory
          <Button class="print-button" on:click={() => window.print()}>
            <Icon class="material-icons">print</Icon>Print QR Codes
          </Button>
        </h1>
        <div class="data-table">
          {#if dataArray}
            <DataTable style="width:100%">
              <Head>
                <Row>
                  <Cell>VIN</Cell>
                  <Cell>Car</Cell>
                  <Cell>Price</Cell>
                  <Cell>QR Code</Cell>
                </Row>
              </Head>
              <Body>
                {#each dataArray as dCar}
                  <Row on:click="{() => goto('offer/' + dCar.vin)}">
                    <Cell>{dCar.vin}</Cell>
                    <Cell>{dCar.year} {dCar.brand} {dCar.model}</Cell>
                    <Cell>${dCar.price}</Cell>
                    <Cell
                      ><QrCode
                        value="https://final-offer.web.app/offer/{dCar.vin}"
                      /></Cell
                    >
                  </Row>
                {/each}
              </Body>
            </DataTable>
            <div class="print-div">
              <Button on:click={() => window.print()}>
                <Icon class="material-icons">print</Icon>Print QR Codes
              </Button>
            </div>
          {:else}
            <p>Unable to load data</p>
          {/if}
        </div>
       
      </div>
      <div class="flex-item">
        <h1 class="heading">
          {userType === 'Dealer' ? 'Received' : 'Your'} Offers
        </h1>
        <div>
          {#if offers && offers.length != 0}
            {#each offers as car}
              <div class="width-100">
                <div class="mdc-elevation--z5">
                  <Card>
                    <Content>
                      <img
                        class="img-responsive centered-img"
                        alt="{car.brand}"
                        src="{car.images[0]}"
                      />
                      <div class="card-data">
                        <ul>
                          <li><span class="grey-thin-text vin">VIN: </span>{car.vin}</li>
                          <li><span class="grey-thin-text brand">Brand: </span>{car.brand}</li>
                          <li><span class="grey-thin-text">Model: </span>{car.model}</li>
                          <li><span class="grey-thin-text year">Year: </span>{car.year}</li>
                        </ul>
                      </div>
                      <div class="text-center price-box">
                        {#if userType != 'Dealer'}
                          {#if car.completion == 75}
                            <h3 class="text-center">
                              A counteroffer of ${car.price} has been made to you.
                            </h3>
                            <IconButton
                              title="Decline"
                              on:click="{() => toggleOffer(car)}"
                              class="material-icons decline"
                            >
                              close
                            </IconButton>
                            <IconButton
                              title="Accept"
                              on:click="{() => doubleCheckAccept(car)}"
                              class="material-icons accept"
                            >
                              done
                            </IconButton>
                          {:else if car.completion == 100}
                            <h3 class="grey-thin-text text-center">
                              The price of ${car.price} has been accepted between
                              both parties!
                            </h3>
                          {:else}
                            <h3 class="grey-thin-text text-center">
                              Your counteroffer of ${car.price} is awaiting action
                              from the dealer.
                            </h3>
                          {/if}
                        {:else if car.completion == 75}
                          <h3 class="grey-thin-text text-center">
                            Your counteroffer of ${car.price} is awaiting action
                            from the buyer.
                          </h3>
                        {:else if car.completion == 100}
                          <h3 class="grey-thin-text text-center">
                            The price of ${car.price} has been accepted between both
                            parties!
                          </h3>
                        {:else}
                          <h3 class="grey-thin-text text-center">
                            A counteroffer of ${car.price} has been made to you.
                          </h3>
                          <IconButton
                            title="Decline"
                            on:click="{() => toggleOffer(car)}"
                            class="material-icons decline"
                          >
                            close
                          </IconButton>
                          <IconButton
                            title="Accept"
                            on:click="{() => doubleCheckAccept(car)}"
                            class="material-icons accept"
                          >
                            done
                          </IconButton>
                        {/if}
                        <ProgressBar percent="{car.completion}" />
                      </div>
                    </Content>
                  </Card>
                </div>
              </div>
            {/each}
          {:else if userType == 'Dealer'}
            <p>
              You have not received any offers. Please wait for someone to make
              an offer.
            </p>
          {:else}
            <p>
              You do not have any offers. Look through the inventory if you
              would like to make an offer.
            </p>
          {/if}
        </div>
      </div>
    </div>
  </div>
{:else}
  <div class="spinner-overlay">
    <div class="spinner-center">
      <CircularProgress indeterminate />
    </div>
  </div>
{/if}
{#if dataLoading == false}
  {#if dataArray}
    {#if userType == "Dealer"}
    <div id="dealer-print">
      <div class="flex-layout">
        {#each dataArray as car, i}
            <div class="flex-item qr-print-div">
              <QrCode value="https://final-offer.web.app/offer/{car.vin}" />
              <h3 class="text-center print-text-margin">{car.vin}</h3>
              <p class="text-center print-text-margin">{car.year} {car.brand}</p>
            </div>
        {/each}
      </div>
    </div>
    {/if}
  {/if}
{/if}

<AcceptDialog
  bind:this="{acceptDialog}"
  on:submit="{() => toggleOffer(acceptDialogCar, true)}"
/>

<CounterOfferDialog
  bind:this="{counterOfferDialog}"
  car="{counterOfferCar}"
  on:submit="{changeOffer}"
/>

<UploadInventoryDialog
  bind:this="{inventoryDialog}"
  on:submit="{uploadFile}"
/>

<script context="module">
  export function preload() {
    return this.fetch(`offer.json`)
      .then((r) => r.json())
      .then((cars) => {
        return { cars };
      });
  }
</script>

<script>
  export let cars;
  import Card, { Content } from '@smui/card';
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import Button, { Icon } from '@smui/button';
  import Textfield from '@smui/textfield';
  import IconButton from '@smui/icon-button';
  import ProgressBar from '../../components/ProgressBar.svelte';
  import CounterOfferDialog from '../../components/CounterOfferDialog.svelte';
  import { goto } from '@sapper/app';
  import { db, user, storage } from '../../stores.js';
  import AcceptDialog from '../../components/AcceptCheckDialog.svelte';
  import CircularProgress from '@smui/circular-progress';
  import Banner, { Label } from '@smui/banner';
  import QrCode from 'svelte-qrcode';
  import UploadInventoryDialog from '../../components/UploadInventoryDialog.svelte';

  let carList = cars;
  // getAll();
  let filter = '';
  $: filtered = filter
    ? carList.filter((car) => {
        return car.vin.toLowerCase().includes(filter.toLowerCase());
      })
    : carList;

  let counterOfferDialog;
  let counterOfferCar;

  let usr;

  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }

  let userType;
  let offers;
  let dataArray;

  let acceptDialog;
  let acceptDialogCar;

  let dataLoading = true;
  let bannerOpen = false;

  let inventoryDialog;

  function doubleCheckAccept(car) {
    acceptDialogCar = car;
    acceptDialog.open();
  }

  function toggleOffer(car, accept = false) {
    if (accept) {
      let event = {};
      event.detail = car;
      changeOffer(event, true);
    } else {
      counterOfferCar = car;
      counterOfferDialog.open();
    }
  }

  async function changeOffer(event, accept = false) {
    let val = event.detail;
    if (accept) {
      val.completion = 100;
    } else if (userType == 'Dealer') {
      val.completion = 75;
    } else {
      val.completion = 50;
    }
    if (val.history) {
      let string = accept ? "Offer Accepted" : "Counter Offer";
      let date = new Date();
      let fullDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
      let time = `${date.getHours()}:${date.getMinutes()}`
      val.history = [...val.history, 
        {
          person: userType,
          price: val.price,
          desc: string,
          date: fullDate,
          time
        }
      ];
    }
    let buyer = await db.getUserData(val.buyer);
    let buyerIndex;
    let offers = buyer.offers;
    offers.forEach((offer, i) => {
      if (offer.vin == val.vin) {
        buyerIndex = i;
      }
    });
    let buyerFront = offers.slice(0, buyerIndex);
    let buyerBack = offers.slice(buyerIndex + 1);
    let newVal = {
      type: 'Buyer',
      offers: [...buyerFront, val, ...buyerBack],
    };
    let dealer = await db.getUserData(val.dealer);
    let dealerIndex;
    let deals = dealer.offers;
    deals.forEach((offer, i) => {
      if (offer.vin == val.vin) {
        dealerIndex = i;
      }
    });
    let dealerFront = offers.slice(0, dealerIndex);
    let dealerBack = offers.slice(dealerIndex + 1);
    let newDealer = {
      type: 'Dealer',
      offers: [...dealerFront, val, ...dealerBack],
    };
    await db.setUserData(val.buyer, newVal);
    await db.setUserData(val.dealer, newDealer);
    await getUserData(usr);
  }

  async function getUserData(person) {
    if (person && db) {
      let data = await db.getUserData(person.uid);
      if (data) {
        if (data.type) userType = data.type;
        if (data.offers) offers = data.offers;
      }
      if (userType == 'Dealer') {
        dataArray = await storage.getJson(usr.uid + '.json', 'Dealer Files');
      } else {
        dataArray = await storage.getJson(
          '5TaXz4IdVhb5649hHuJkuBvQzkR2.json',
          'Dealer Files'
        );
      }
    }
  }

  if (process.browser && firebase && typeof firebase.auth == 'function') {
    firebase.auth().onAuthStateChanged(async function (person) {
      if (person) {
        await getUserData(person);
      }
      dataLoading = false;
    });
  }

  async function uploadFile(event) {
    let cars = event.detail[0];
    let images = event.detail[1];
    let originalFile = event.detail[2];
    dataLoading = true;
    for (let i = 0; i < cars.length; i++) {
      cars[i].images = [];
      let vin = cars[i].vin;
      let vals = images[vin];
      for (let x = 0; x < vals.length; x++) {
        await storage.uploadFile(vals[x].raw, `${vin}-${x + 1}`, `Dealer Files/${usr.uid}`)
        cars[i].images.push(`${vin}-${x + 1}`)
      }
    }
    let file = new File([JSON.stringify(cars)], originalFile.name, {type: originalFile.type})
    if (file.type == 'application/json') {
      await storage.uploadFile(file, usr.uid + '.json', 'Dealer Files');
    } else if (
      file.type ==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      await storage.uploadFile(file, usr.uid + '.xlsx', 'Dealer Files');
    } else if (file.type == 'application/vnd.ms-excel') {
      await storage.uploadFile(file, usr.uid + '.csv', 'Dealer Files');
    } else {
      console.log('Error File Type Not accepted');
    }
    getUserData(usr);
    dataLoading = false;
    bannerOpen = true;
    setTimeout(function(){bannerOpen = false}, 5000);
  }
</script>
