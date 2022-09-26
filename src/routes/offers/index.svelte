<style lang="scss">
  .expanded {
    padding: 16px;
  }

  .offer-card :global(.smui-card__content) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
</style>

<svelte:head>
  <title>Offers</title>
</svelte:head>

<div class="container">
  <h1 class="heading">Offers</h1>
  {#if offers}
    {#each offers as offer, i}
      <div class="offer-card">
        <Card>
          <Content>
              <div>
                <strong>{offer.car.vin}</strong>
              </div>
              <div>
                {offer.status}
              </div>
              <div class="icon">
                  <IconButton
                      color="secondary"
                      class="material-icons"
                      on:click={() => showHideOffer(i)}>
                      {icon}
                  </IconButton>
              </div>
          </Content>
          {#if expanded[i] === true}
              <div transition:slide class="expanded text-right">
                  <Button on:click={() => resumeOffer(offer)} variant="raised">Resume Offer</Button>
              </div>
          {/if}
        </Card>
      </div>
    {/each}
  {:else}
      You do not have any offers.
  {/if}

</div>

<script lang="ts">
  import Card, { Content } from '@smui/card';
  import IconButton, { Icon } from '@smui/icon-button';
  import { slide } from 'svelte/transition';
  import { user, db } from "../../stores.js";
  import Button from '@smui/button';
  import { goto } from '@sapper/app';
  import type UserData from '../../models/UserData.js';
  import type Offer from '../../models/Offer.js';

  let usr;
  if (user) {
        const unsubscribe = user.subscribe((value) => {
            usr = value;
        });
  }

  let userData: UserData = {};
  let offers: Offer[] = [];
  let expanded: boolean[] = [];
  let icon = 'add';
  let loading = true;

  function showHideOffer(index) {
    expanded[index] = !expanded[index]
    if (expanded[index] === true) {
      icon = 'remove';
    } else {
      icon = 'add';
    }
  }

  function resumeOffer(offer: Offer) {
    goto(`offers/${offer.car.vin}/intro`)
  }

  $: {
    if (usr && loading) {
      (async () => {
        userData = await db.getUserData(usr.uid);
        offers = userData.offers;
        expanded = [];
        offers.forEach(offer => {
          expanded.push(false)
        })
        loading = false;
      })()
    }
  }
</script>