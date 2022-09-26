<Button color="primary" on:click={() => !userOffer && userType !== "Dealer" && userType !== "Admin" ? openNewOffer(car) : getURL()} variant="outlined">
    Make an Offer
</Button>

<SignInDialog
    bind:this={signInDialog}
/>

<script lang="ts">
    import firebase from 'firebase/app';
    import Button from '@smui/button';
    import { goto } from '@sapper/app';
    import type Car from '../models/Car';
    import type UserData from '../models/UserData';
    import SignInDialog from "./SignInUpDialog.svelte";
    import { listingLink, user, db, offerManager } from "../stores.js";
    export let car: Car;

    let usr;
    let userOffer;
    let userType: string;
    let signInDialog: SignInDialog;
    let userData: UserData;

    if (user) {
        const unsubscribe = user.subscribe((value) => {
            usr = value;
        });
    }

    function openNewOffer(car) {
        if (userType === 'Buyer') {
            offerManager.createOffer(car, usr);
            goto(`offers/${car.vin}/intro`)
        } else {
            $listingLink = `offers/${car.vin}/intro`;
            signInDialog.open();
        }
    }

    function getURL() {
        $listingLink = `offers/${car.vin}/intro`;
        goto("offers");
    }

    if (process.browser && firebase && typeof firebase.auth == 'function') {
        firebase.auth().onAuthStateChanged(async function (person) {
        if (person) {
            await getUserData(person);
        }
        });
    }

    async function getUserData(person) {
        if (person && db) {
            let data: UserData = await db.getUserData(person.uid);
            userData = data;
            if (data) {
                if (data.type) userType = data.type;
                if (data.offers) {
                    let offers = data.offers;
                    offers.forEach((c) => {
                        if (c.car.vin === car.vin) {
                            userOffer = c;
                        }
                    });
                }
            }
        }
    }

    async function createOffer(event) {
        let val = event.detail;
        let data: UserData = await db.getUserData(usr.uid);
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
        let dealer: UserData = await db.getUserData(val.dealer);
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
        await goto("listings")
        setTimeout(() => goto("listings/" + car.vin), 500)
    } 
</script>