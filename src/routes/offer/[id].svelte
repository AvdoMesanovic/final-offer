<style lang="scss">
 @import '@material/typography/mdc-typography';
  @import '../../theme/variables.scss';
  button {
    font-size: 30px;
  }
  .spacing {
    margin-left: auto;
    margin-right: auto;
    width: 90%;
  }
  .norm-fw {
    font-weight: 500;
  }
  .text-left {
    text-align: left;
  }

  img {
    width: 100%;
  }
  .split {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .car-scroll {
    overflow-y: hidden;
    overflow-x: hidden;
    white-space: nowrap;
    height: 100px;
    margin-top: 15px;
  }

  .car-scroll-img-stage {
    content: '';
    display: table;
    clear: both;
  }

  .scroll-img {
    height: 100px;
    object-fit: cover;
  }

  .price-text {
    vertical-align: middle;
    font-size: 35px;
    word-spacing: 3px;
    font-weight: 500;
  }

  .span-dollar-sign {
    vertical-align: middle;
    display: inline;
  }
  .main-img-static {
    height: 350px;
    overflow: hidden;
  }
  .column {
    float: left;
    width: 20%;
  }
  .fade {
    -webkit-animation-name: fade;
    -webkit-animation-duration: 1.5s;
    animation-name: fade;
    animation-duration: 1.5s;
  }

  @-webkit-keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade {
    from {
      opacity: 0.4;
    }
    to {
      opacity: 1;
    }
  }

  .offer-table :global(td) {
    font-size: 13px !important;
    height: 46px;
  }

  .offer-table :global(tr), .offer-table :global(td) {
    cursor: default;
  }

  .offer-table :global(.mdc-data-table__row:not(.mdc-data-table__row--selected):hover) {
    background-color: transparent;
  }

  :global(.offer-info.mdc-data-table__row:not(.mdc-data-table__row--selected):hover) {
    cursor: default;
  }

  @media (max-width: 215px) {
    .main-img-static {
      height: 27vw;
    }
    .scroll-img {
      height: 20px;
    }
    .car-scroll {
      height: 21px;
    }
  }

  @media (min-width: 215px) {
    .main-img-static {
      height: 32vw;
    }
    .scroll-img {
      height: 34px;
    }
    .car-scroll {
      height: 35px;
    }
  }

  @media (min-width: 390px) {
    .main-img-static {
      height: 40vw;
    }
  }

  @media (min-width: 300px) {
    .scroll-img {
      height: 40px;
    }
  }

  @media (min-width: 300px) and (max-width: 800px) {
    .car-scroll {
      height: 60px;
    }
  }

  @media (min-width: 500px) {
    .scroll-img {
      height: 60px;
    }
  }

  @media (min-width: 800px) {
    .main-img-static {
      height: 210px;
    }
    .scroll-img {
      height: 75px;
    }
    .car-scroll {
      height: 100px;
    }
  }

  @media (max-width: 800px) {
    .flex-item {
      margin: 0;
      margin-bottom: 10px;
    }
  }

  @media (min-width: 992px) {
    .main-img-static {
      height: 290px;
    }
    .scroll-img {
      height: 100px;
    }
  }

  @media (min-width: 1200px) {
    .main-img-static {
      height: 350px;
    }
  }

  .car-image-container {
    width: 60%;
  }

  .slide-img-reduced-opacity {
    opacity: 0.6;
  }

  .main-offer-section {
    margin-bottom: 20px;
  }

  :global(.material-icons.right-arrow), :global(.material-icons.left-arrow) {
    background-color: map-get($black-transparents, 200);
    border-radius: 50%;
  }

  .full-table :global(table) {
    width: 100%;
  }

  .full-table :global(.history-table-head th) {
    background-color: map-get($primary-palette, 300);
  }

  .full-table :global(.history-table-primary-row td) {
    background-color: map-get($primary-palette, 500);
  }

  #dealer-print {
    display: none;
  }

  @media print {
    #dealer-print {
      display: flex;
    }

    .container, .flex-layout, a {
      display: none;
    }
  }
</style>

<a href="offer"
  ><IconButton class="material-icons west-point-arrow">west</IconButton></a
>
<div class="container main-offer-section">
  {#if deal}
    <div class="flex-layout">
      <div class="flex-item car-image-container">
        {#if deal.images}
          <div class="img-responsive main-img-static">
            {#each deal.images as image, i}
              <img
                class="img-responsive fade"
                src="{image}"
                onerror="this.src='image-not-found.png'"
                alt="{deal.brand} {deal.model}"
                style="{i == slideIndex ? '' : 'display: none'}"
              />
            {/each}
          </div>
          <div class="car-scroll">
            <div class="car-scroll-img-stage">
              {#each deal.images.slice(0, 5) as image, index}
                <div class="column">
                  <img
                    class="{index == slideIndex
                      ? 'scroll-img'
                      : 'scroll-img slide-img-reduced-opacity'}"
                    src="{image}"
                    onerror="this.src='image-not-found.png'"
                    alt="{deal.brand} {deal.model}"
                    on:click="{() => changeSlideIndex(index)}"
                  />
                </div>
              {/each}
            </div>
            <IconButton
              title="Left"
              class="material-icons left-arrow"
              on:click="{() => changeSlide('left')}"
            >
              arrow_left
            </IconButton>
            <IconButton
              title="Right"
              class="material-icons right-arrow"
              on:click="{() => changeSlide()}"
            >
              arrow_right
            </IconButton>
          </div>
        {/if}
      </div>
      <div class="flex-item offer-table">
        <DataTable table$aria-label="People list">
          <Body>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">VIN:</span></Cell>
              <Cell>{deal.vin}</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Make:</span></Cell>
              <Cell>{deal.brand}</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Model:</span></Cell>
              <Cell>{deal.model}</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Year:</span></Cell>
              <Cell>{deal.year}</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Color:</span></Cell>
              <Cell>{deal.color}</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Engine:</span></Cell>
              <Cell>Engine Type</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Transmission:</span></Cell>
              <Cell>Automatic</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Mileage:</span></Cell>
              <Cell>Miles</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Interior:</span></Cell>
              <Cell>Black, Leather</Cell>
            </Row>
            <Row class="offer-info">
              <Cell><span class="grey-thin-text">Drivetrain:</span></Cell>
              <Cell>4WD</Cell>
            </Row>
          </Body>
        </DataTable>
        <div class="text-center">
          <div class="span-dollar-sign">
            <span class="dollar-sign">$</span>
          </div>
          <span class="price-text">{deal.price}</span>
        </div>
      </div>
    </div>
  {/if}
  <div class="text-center">
    {#if userType != 'Dealer' && !userOffer}
      <div class="purple-btn">
        <Button title="Make an Offer" on:click="{() => openNewOffer(offer)}"
          >Make an Offer</Button
        >
      </div>
    {:else if userType != 'Dealer'}
      {#if userOffer.completion == 75}
        <h3>
          An offer of ${userOffer.price} has been made to you.
        </h3>
        <div class="decline-accept-buttons">
          <IconButton
            title="Decline"
            on:click="{() => toggleOffer(userOffer)}"
            class="material-icons decline"
          >
            close
          </IconButton>
          <IconButton
            title="Accept"
            on:click="{() => doubleCheckAccept(userOffer)}"
            class="material-icons accept"
          >
            done
          </IconButton>
        </div>
      {:else if userOffer.completion == 100}
        <h3>
          The price of ${userOffer.price} has been accepted between both parties!
        </h3>
      {:else}
        <h3>
          Your counteroffer of ${userOffer.price} is awaiting action from the dealer.
        </h3>
      {/if}
      <ProgressBar percent="{userOffer.completion}" />
    {:else if userOffer}
      {#if userOffer.completion == 75}
        <h3>
          Your counteroffer of ${userOffer.price} is awaiting action from the buyer.
        </h3>
      {:else if userOffer.completion == 100}
        <h3>
          The price of ${userOffer.price} has been accepted between both parties!
        </h3>
      {:else}
        <h3>
          A counteroffer of ${userOffer.price} has been made to you.
        </h3>
        <div class="decline-accept-buttons">
          <IconButton
            title="Decline"
            on:click="{() => toggleOffer(userOffer)}"
            class="material-icons decline"
          >
            close
          </IconButton>
          <IconButton
            title="Accept"
            on:click="{() => doubleCheckAccept(userOffer)}"
            class="material-icons accept"
          >
            done
          </IconButton>
        </div>
      {/if}
      <ProgressBar percent="{userOffer.completion}" />
    {:else}
      <p>You cannot make offers as a dealer.</p>
    {/if}
  </div>
  {#if userType == 'Dealer'}
    <div class="text-center">
      <Button on:click={() => window.print()}>
        <Icon class="material-icons">print</Icon>Print QR Code
      </Button>
    </div>
    <div class="no-display" id="dealer-print">
      <div class="centered-component">
        <QrCode value="https://final-offer.web.app/offer/{userOffer.vin}" />
      </div>
      <p class="text-center">{userOffer.vin}</p>
    </div>
    {#if userOffer.history}
    <div class="offer-table full-table">
      <DataTable table$aria-label="History">
        <Head>
          <Row class="offer-info history-table-head">
            <Cell>Person</Cell>
            <Cell>Offer</Cell>
            <Cell>Description</Cell>
            <Cell>Date/Time</Cell>
          </Row>
        </Head>
        <Body>
          {#each userOffer.history as hist, index}
            <Row class="{index % 2 == 0
              ? 'offer-info history-table-primary-row'
              : 'offer-info'}">
              <Cell>{hist.person}</Cell>
              <Cell>${hist.price}</Cell>
              <Cell>{hist.desc}</Cell>
              <Cell>{hist.date} at {hist.time}</Cell>
            </Row>
          {/each}
        </Body>
      </DataTable>
      </div>
    {/if}
  {/if}
</div>
{#if userType == 'Dealer'}
  <div id="dealer-print">
    <div class="qr-cont-indiv">
      <div class="flex-item qr-indiv">
        <h3 class="print-text-margin">{userOffer.vin}</h3>
        <p class="print-text-margin">{userOffer.year} {userOffer.color} {userOffer.brand} {userOffer.model}</p>
        <p class="print-text-margin"><span class="grey-thin-text">Engine:</span> Inline</p>
        <p class="print-text-margin"><span class="grey-thin-text">Transmission:</span> Automatic</p>
        <p class="print-text-margin"><span class="grey-thin-text">Mileage:</span> Miles</p>
        <p class="print-text-margin"><span class="grey-thin-text">Interior:</span> Black, Leather</p>
        <p class="print-text-margin"><span class="grey-thin-text">Drivetrain:</span> 4WD</p>
      </div>
      <div class="flex-item qr-indiv">
        <div class="qr-print-indiv">
          <QrCode value="https://final-offer.web.app/offer/{userOffer.vin}" />
        </div>
      </div>
    </div>
  </div>
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
<CounterOfferDialog
  bind:this="{newOfferDialog}"
  car="{counterOfferCar}"
  on:submit="{createOffer}"
/>

<script context="module">
  let id;
  var promise;
  let offer;
  export async function preload(page, session) {
    id = page.params.id;
    promise = (async () => {
      const res = await this.fetch(`offer/${id}.json`);
      offer = await res.json();
      return offer;
    })();
  }
</script>

<script>
  let deal = offer;
  let originalImages;
  import DataTable, { Head, Body, Row, Cell } from '@smui/data-table';
  import IconButton from '@smui/icon-button';
  import ProgressBar from '../../components/ProgressBar.svelte';
  import CounterOfferDialog from '../../components/CounterOfferDialog.svelte';
  import AcceptDialog from '../../components/AcceptCheckDialog.svelte';
  import Button, { Icon } from '@smui/button';
  import { goto } from '@sapper/app';
  import { db, user } from '../../stores.js';
  import QrCode from 'svelte-qrcode';

  let counterOfferDialog;
  let counterOfferCar;
  let usr;
  let newOfferDialog;
  let userType;
  let userOffer;

  if (user) {
    const unsubscribe = user.subscribe((value) => {
      usr = value;
    });
  }

  let acceptDialog;
  let acceptDialogCar;

  function doubleCheckAccept(car) {
    acceptDialogCar = car;
    acceptDialog.open();
  }

  let slideIndex = 0;
  $: slideEnd =
    deal && deal.images
      ? slideIndex + 5 <= deal.images.length
        ? slideIndex + 5
        : slideIndex + 5 - deal.images.length
      : slideIndex + 5;

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
    val.images = originalImages;
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

  function openNewOffer(car) {
    if (userType == 'Buyer') {
      counterOfferCar = car;
      newOfferDialog.open();
    } else {
      goto('profile');
    }
  }

  async function createOffer(event) {
    let val = event.detail;
    val.images = originalImages;
    let data = await db.getUserData(usr.uid);
    val.completion = 50;
    val.buyer = usr.uid;
    let date = new Date();
    let fullDate = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
    let time = `${date.getHours()}:${date.getMinutes()}`
    val.history = [
      {
        person: "Buyer",
        price: val.price,
        desc: "Initial Offer",
        date: fullDate,
        time
      }
    ]
    if (!data.offers || data.offers.length == 0) {
      data.offers = [];
    }
    let newVal = {
      type: 'Buyer',
      offers: [...data.offers, val],
    };
    let dealer = await db.getUserData(val.dealer);
    if (!dealer.offers || dealer.offers.length == 0) {
      dealer.offers = [];
    }
    let newDealer = {
      type: 'Dealer',
      offers: [...dealer.offers, val],
    };
    await db.setUserData(usr.uid, newVal);
    await db.setUserData(val.dealer, newDealer);
    await getUserData(usr);
  }

  async function getUserData(person) {
    if (person && db) {
      let data = await db.getUserData(person.uid);
      if (data) {
        if (data.type) userType = data.type;
        if (data.offers) {
          let offers = data.offers;
          offers.forEach((car) => {
            if (car.vin == offer.vin) {
              userOffer = car;
            }
          });
        }
      }
    }
  }

  if (process.browser && firebase && typeof firebase.auth == 'function') {
    firebase.auth().onAuthStateChanged(async function (person) {
      if (person) {
        await getUserData(person);
      }
    });
  }

  async function getOffer() {
    await promise;
    deal = offer;
    if (deal && deal.images) {
      originalImages = JSON.parse(JSON.stringify(deal.images));
    }
  }

  function changeSlide(direction = 'right') {
    if (direction === 'right') {
      slideIndex += 1;
      if (slideIndex == deal.images.length) {
        slideIndex = 0;
      }
    } else {
      slideIndex -= 1;
      if (slideIndex == -1) {
        slideIndex = deal.images.length - 1;
      }
    }
  }

  function changeSlideIndex(index) {
    if (index >= deal.images.length) {
      slideIndex = index - deal.images.length;
    } else {
      slideIndex = index;
    }
  }

  getOffer();
</script>
