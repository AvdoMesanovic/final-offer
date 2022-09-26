<style lang="scss">
    @import '../theme/variables.scss';
    .wizard-content {
        margin-top: 5px;
    }
</style>

<Dialog
  bind:this="{dialog}"
  bind:open="{dialogOpen}"
  fullscreen
  scrimClickAction=""
  escapeKeyAction=""
  aria-labelledby="title"
  aria-describedby="content"
  surface$style="width: auto; max-width: calc(100vw - 32px);"
>
    <Header>
        <Title id="title">Create an Offer</Title>
    </Header>
    <Content id="content">
        <CustomTabBar {tabs} bind:active elevation={5} smaller={false} />
        <div class="wizard-content">
            {#if active === "Title and Licensing"}
                <CustomTabBar tabs={subTabs[0]} bind:active={subActives[0]} elevation={3} />
                {#if userData}
                    <p>Here is the information we have on file for you. Please verify that it is correct. If not, please change it.</p>
                    <p><strong>Name: </strong>{userData.name}</p>
                    <p><strong>Email: </strong>{userData.email}</p>
                    <p><strong>Address: </strong>{userData.streetAddress}, {userData.city}, {userData.state} {userData.zip}</p>
                {/if}
            {:else if active === "Delivery and Pickup"}
                <CustomTabBar tabs={subTabs[1]} bind:active={subActives[1]} elevation={3} />
                {#if subActives[1] === "Available Options"}
                    <p>Available Options</p>
                {:else if subActives[1] === "Delivery Details"}
                    <p>Delivery Details</p>
                {:else}
                    <p>Pickup Details</p>
                {/if}
            {:else if active === "Financing"}
                <CustomTabBar tabs={subTabs[2]} bind:active={subActives[2]} elevation={3} />
                {#if subActives[2] === "Available Options"}
                    <p>Available Options</p>
                {:else}
                    <p>Financing Details</p>
                {/if}
            {:else if active === "Trade-in"}
                <CustomTabBar tabs={subTabs[3]} bind:active={subActives[3]} elevation={3} />
                {#if subActives[2] === "Available Options"}
                    <p>Available Options</p>
                {:else}
                    <p>Trade-in Details</p>
                {/if}
            {:else}
                <p>Do you like the price? Submit the Offer!</p>
                <p>${car.price}</p>
            {/if}
        </div>
    </Content>
    <Actions>
        <Button on:click="{() => emit('cancel')}">Cancel</Button>
        <Button on:click="{() => emit('submit')}" disabled={active !== "Review and Submit"}>Make Offer</Button>
    </Actions>
</Dialog>
  
<script lang="ts">
    import Button from '@smui/button';
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import CustomTabBar from "./CustomTabBar.svelte";
    import { createEventDispatcher } from 'svelte';
    import type UserData from '../models/UserData';
    import type Car from '../models/Car';
    const dispatch = createEventDispatcher();
    export let userData: UserData;
    export let car: Car;

    let dialog;
    let dialogOpen;

    let active: string = "Title and Licensing";
    let tabs: string[] = ["Title and Licensing", "Delivery and Pickup", "Financing", "Trade-in", "Review and Submit"];

    let subActives: string[] = ["Buyer Details", "Available Options", "Available Options", "Available Options"]
    let subTabs: string[][] = [
        ["Buyer Details"],
        ["Available Options", "Delivery Details", "Pickup Details"],
        ["Available Options", "Financing Details"],
        ["Available Options", "Trade-in Details"]
    ];

    export function open() {
        dialogOpen = true;
        clearInfo()
    }

    $: {
        switch (active) {
            case "Title and Licensing":
                subActives[0] = "Buyer Details";
                break;
            case "Delivery and Pickup":
                subActives[1] = "Available Options";
                break;
            case "Financing":
                subActives[2] = "Available Options";
                break;
            case "Trade-in":
                subActives[3] = "Available Options";
                break;
        }
    }

    function emit(reason) {
        dispatch(reason, car);
    }

    function clearInfo() {
        active = "Title and Licensing";
    }
</script>