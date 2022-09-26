<style lang="scss">
    @import '@material/typography/mdc-typography';
    @import '@material/elevation/mdc-elevation';
    @import '../../../../theme/variables.scss';
    p {
        line-height: 1.5;
    }
    @media (max-width: 992px) {
        .grid.half-split {
            grid-template-columns: 1fr;
        }
        .temp-info-header-group {
            display: none;
        }
    }
    @media (min-width: 992px) {
        .user-data-group p {
            display: none;
        }
        .temp-info-header-group {
            display: grid;
        }
        .grid.half-split {
            grid-template-columns: 1fr 1fr;
        }
    }
</style>

<div class="grid half-split temp-info-header-group">
    <div>
        <p>Title Information - Please complete the following as it should appear on the vehicle's title.</p>
    </div>
    <div>
        <p>Contact Information</p>
    </div>
</div>
<div class="grid half-split user-data-group">
    {#if $userOffer}
    <div>
        <p>Title Information - Please complete the following as it should appear on the vehicle's title.</p>
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.name}
            label="Full Name"
        />
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.address}
            label="Street Address"
        />
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.addressTwo}
            label="Address Line 2"
        />
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.city}
            label="City"
        />
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.state}
            label="State"
            input$minlength="2"
            input$maxlength="2"
        />
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.zip}
            label="Zip"
            input$minlength="5"
            input$maxlength="5"
        />
    </div>
    <div>
        <p>Contact Information</p>
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.email}
            label="Email Address / Account Name"
        />
        <Textfield
            variant="outlined"
            bind:value={$userOffer.initialInfo["Title and Licensing"].title.phone}
            label="Phone Number"
        />
    </div>
    {/if}
</div>
<div class="text-right">
    <Button variant="raised" disabled={!validForm} on:click={() => changeRoute()}>Next</Button>
</div>

<script lang="ts">
    import Textfield from '@smui/textfield';
    import Button from '@smui/button';
    import type UserData from '../../../../models/UserData';
    import { db, offerManager, user } from '../../../../stores.js';
    import { getContext } from 'svelte';
    import { goto } from '@sapper/app';
    import type { Writable } from 'svelte/store';
    import type Offer from '../../../../models/Offer';
    const id = getContext<string>('offerId');
    const active = getContext<Writable<string>>('offersActiveTab')
    const tabInfo = getContext<Writable<Object>>('offersTabInfo')
    const userOffer = getContext<Writable<Offer>>('userOffer');
    let userData: UserData = {
        name: "",
        streetAddress: "",
        streetAddressTwo: "",
        city: "",
        state: "",
        zip: "",
        email: "",
        phoneNumber: ""
    };
    let usr;
    if (user) {
        const unsubscribe = user.subscribe((value) => {
            usr = value;
        });
    }
    let validForm = false;
    $: {
        if ($userOffer && $userOffer.initialInfo["Title and Licensing"].title.name === "" && $userOffer.initialInfo["Title and Licensing"].title.email === "") {
            (async () => {
                userData = await db.getUserData(usr.uid);
                $userOffer.initialInfo["Title and Licensing"].title = {
                    name: userData.name,
                    address: userData.streetAddress,
                    addressTwo: userData.streetAddressTwo,
                    phone: userData.phoneNumber,
                    city: userData.city,
                    state: userData.state,
                    zip: userData.zip,
                    email: userData.email,
                }
            })()
        }
    }
    $: if ($userOffer) {
        validForm = true;
        Object.keys($userOffer.initialInfo["Title and Licensing"].title).forEach((key) => {
            if ($userOffer.initialInfo["Title and Licensing"].title[key] === "") {
                validForm = false;
            }
        });
    }
    $: if (validForm) {
        $tabInfo["Delivery and Pickup"].disabled = false;
    } else {
        $tabInfo["Delivery and Pickup"].disabled = true;
    }

    async function changeRoute() {
        $active = "Delivery and Pickup";
        await offerManager.changeOffer($userOffer)
        goto(`offers/${id}/delivery/ao`)
    }
</script>