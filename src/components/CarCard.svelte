<style lang="scss">
    @import '@material/typography/mdc-typography';
    @import '@material/elevation/mdc-elevation';
    @import '../theme/variables.scss';
    img {
        object-fit: cover;
        width: 100%;
        height: 175px;
    }
    p, h3 {
        margin: 0;
        margin-top: 5px;
    }
    .mdc-typography--caption {
        font-size: 13px;
    }
</style>

<div class="mdc-elevation--z8">
    <Card>
        <Content>
            <h3 class="mdc-typography--headline6">
                {car.vin}
            </h3>
            <p class="mdc-typography--caption">
                {car.year} {car.brand} {car.model}
            </p>
        </Content>
        <img src="{car.images[0]}" alt="Car" />
        {#if actions}
            <Actions align="start">
                <MakeOfferButton {car} />
                <Button color="secondary" on:click={() => goto("listings/" + car.vin)} variant="outlined">
                    Details
                </Button>
            </Actions>
        {/if}
    </Card>
</div>

<script lang="ts">
    import firebase from 'firebase/app';
    import Card, { Content, Actions } from '@smui/card';
    import Button from '@smui/button';
    import { goto } from '@sapper/app';
    import type Car from '../models/Car';
    import type UserData from '../models/UserData';
    import MakeOfferButton from "./MakeOfferButton.svelte"
    import { listingLink, user, db } from "../stores.js";
    export let car: Car;
    export let actions: boolean = true;

    let usr;
    let userOffer;
    let userType;

    if (user) {
        const unsubscribe = user.subscribe((value) => {
            usr = value;
        });
    }

    function getURL() {
        $listingLink = "/listings/" + car.vin;
        goto("/listings/" + car.vin);
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
            if (data) {
                if (data.type) userType = data.type;
                if (data.offers) {
                    let offers = data.offers;
                    offers.forEach((c) => {
                        if (c.vin === car.vin) {
                            userOffer = c;
                        }
                    });
                }
            }
        }
    }
</script>
