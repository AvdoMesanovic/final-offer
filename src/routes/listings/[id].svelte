<style lang="scss">
    @import '@material/typography/mdc-typography';
    @import '../../theme/variables.scss';
    .flex-layout {
        align-items: center;
    }

    .m-bottom-25 {
        margin-bottom: 25px;
    }

    p {
        margin: 0;
    }

    @media (max-width: 800px) {
        .flex-item {
            margin: 0;
            margin-bottom: 10px;
        }
    }

    section {
        padding: 0;
    }
    
    .decline-accept-buttons {
        display: flex;
        justify-content: space-evenly;
    }
</style>

<section>
    <a href="listings">
        <IconButton class="material-icons west-point-arrow">west</IconButton>
    </a>   
    <div class="container">
        {#if deal}
            <h1 class="heading">Details - {deal.vin} - {deal.brand} {deal.model}</h1>
            <div class="flex-layout">     
                <div class="flex-item">
                    {#if deal.images}
                        <div class="img-responsive">
                            <img
                            class="img-responsive"
                            src="{deal.images[0]}"
                            alt="{deal.brand} {deal.model}"
                            />
                        </div>
                    {/if}
                </div>
                <div class="flex-item">
                    <Card>
                        <Content>
                            <div class="mdc-typography--headline4">
                                {deal.year} {deal.brand} {deal.model}
                            </div>
                            <div class="mdc-typography--caption grey-thin text m-bottom-25">
                                ${deal.price}
                            </div>
                            <div class="m-bottom-25">
                                {#if dealerData}
                                    <p class="mdc-typography--body1">Dealer:</p>
                                    <p class="mdc-typography--headline5">{dealerData.dealerName}</p>
                                    <p class="mdc-typography--headline5">{dealerData.streetAddress}</p>
                                    <p class="mdc-typography--headline5">{dealerData.city}, {dealerData.state}, {dealerData.zip}</p>
                                {/if}
                            </div>
                            <div class="m-bottom-25">
                                <p class="mdc-typography--body1">VIN:</p>
                                <p class="mdc-typography--headline5">{deal.vin}</p>
                            </div>
                        {#if userType != 'Dealer' && !userOffer}
                            <div>
                                <MakeOfferButton car={deal} />
                            </div>
                        {:else if userType != 'Dealer' && userOffer.completion == 0}
                            <h3>
                                The dealer has closed your offer for this car.
                            </h3>
                            {#if userOffer.rejectionReason}
                                <p>{userOffer.rejectionReason}</p>
                            {/if}
                        {:else if userType != 'Dealer'}
                            {#if userOffer.completion == 75}
                                <h3>
                                An offer of ${userOffer.price} has been made to you.
                                </h3>
                                <div class="decline-accept-buttons">
                                    <Button title="accept" on:click={() => doubleCheckAccept(userOffer)}>
                                        <Icon class="material-icons accept">done</Icon>
                                        <Label class="accept">Accept</Label>
                                    </Button>
                                    <Button title="counter offer" on:click={() => toggleOffer(userOffer)}>
                                        <Icon class="material-icons">assignment_return</Icon>
                                        <Label>Counter Offer</Label>
                                    </Button>
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
                                <h3 class="mdc-typography--headline6 text-center">
                                    Your counteroffer of ${userOffer.price} is awaiting action from the buyer.
                                </h3>
                            {:else if userOffer.completion == 100}
                                <h3 class="mdc-typography--headline6 text-center">
                                    The price of ${userOffer.price} has been accepted between both parties!
                                </h3>
                            {:else if userOffer.completion == 0}
                            <h3 class="mdc-typography--headline6 text-center">
                                You have rejected the offer.  Your rejection will be sent to the buyer shortly.
                            </h3>
                            {:else}
                                <h3 class="mdc-typography--headline6 text-center">
                                    A counteroffer of ${userOffer.price} has been made to you.
                                </h3>
                                <div class="decline-accept-buttons">
                                    <Button title="Accept" on:click={() => doubleCheckAccept(userOffer)}>
                                        <Icon class="material-icons accept">done</Icon>
                                        <Label class="accept">Accept</Label>
                                    </Button>
                                    <Button title="Counter Offer" on:click={() => toggleOffer(userOffer)}>
                                        <Icon class="material-icons">assignment_return</Icon>
                                        <Label>Counter Offer</Label>
                                    </Button>
                                    <Button title="Reject" on:click={() => rejectOffer(userOffer)}>
                                        <Icon class="material-icons decline">do_disturb</Icon>
                                        <Label class="decline">Reject</Label>
                                    </Button>
                                </div>
                            {/if}
                            <ProgressBar percent="{userOffer.completion}" />
                        {:else}
                            <p>You cannot make offers as a dealer.</p>
                        {/if}
                        </Content>
                    </Card>
                </div>
            </div>
        {/if}
    </div>
</section>

<AcceptDialog
    bind:this="{acceptDialog}"
    on:submit="{() => toggleOffer(acceptDialogCar, true)}"
/>

<CounterOfferDialog
    bind:this="{counterOfferDialog}"
    car="{counterOfferCar}"
    on:submit="{changeOffer}"
/>

<RejectDialog
    bind:this="{rejectDialog}"
    bind:comment
    car="{rejectedOffer}"
    on:submit="{cancelOffer}"
/>

<script context="module">
    let id;
    var promise;
    let offer;
    export async function preload(page, session) {
      id = page.params.id;
      promise = (async () => {
        const res = await this.fetch(`listings/${id}.json`);
        offer = await res.json();
        return offer;
      })();
    }
</script>

<script lang="ts">
    export let segment;
    let deal = offer;
    let originalImages;
    import Card, { Content } from '@smui/card';
    import IconButton from '@smui/icon-button';
    import ProgressBar from '../../components/ProgressBar.svelte';
    import CounterOfferDialog from '../../components/CounterOfferDialog.svelte';
    import AcceptDialog from '../../components/AcceptCheckDialog.svelte';
    import RejectDialog from '../../components/DealerRejectDialog.svelte';
    import Button, { Label, Icon } from '@smui/button';
    import { goto } from '@sapper/app';
    import { db, user } from '../../stores.js';
    import MakeOfferButton from "../../components/MakeOfferButton.svelte";
    import type UserData from '../../models/UserData';
    import type Car from '../../models/Car';
    import firebase from 'firebase/app';

    let counterOfferDialog;
    let counterOfferCar;
    let usr;
    let rejectDialog;
    let rejectedOffer;
    let userType;
    let userOffer;
    let userData: UserData;
    let dealerData: UserData;

    let comment = '';

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

    function rejectOffer(car) {
        rejectedOffer = car;
        rejectDialog.open();
    }

    async function cancelOffer(event) {
        let val = event.detail;
        val.completion = 0;
        if (comment != '') {
            val.rejectionReason = comment;
        }
        let buyer: UserData = await db.getUserData(val.buyer);
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
        let dealer: UserData = await db.getUserData(val.dealer);
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

    function toggleOffer(car, accept = false) {
        if (accept) {
            let event = { detail: car };
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
        let buyer: UserData = await db.getUserData(val.buyer);
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
        let dealer: UserData = await db.getUserData(val.dealer);
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
            let data: UserData = await db.getUserData(person.uid);
            if (data) {
                userData = data;
                if (data.type) userType = data.type;
                if (data.offers) {
                    let offers = data.offers;
                    offers.forEach(async (car) => {
                        if (car.vin == offer.vin) {
                            userOffer = car;
                            dealerData = await db.getUserData(userOffer.dealer)
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

    getOffer();
</script>