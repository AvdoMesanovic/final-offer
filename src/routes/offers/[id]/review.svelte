<style lang="scss">
    .review-heading {
        font-weight: 500;
    }
</style>

<p>Reviewing everything is awesome!</p>
{#if userOffer && $userOffer}
    <ul>
        <li><span class="review-heading">Address:</span> {$userOffer.initialInfo["Title and Licensing"].title.address}</li>
        <li><span class="review-heading">Delivery or Pickup:</span> {$userOffer.initialInfo["Delivery and Pickup"].option}</li>
    </ul>
{/if}
<div class="text-right">
    <Button variant="raised" on:click={() => submitOffer()}>Submit</Button>
</div>

<script lang="ts">
    import Button from '@smui/button';
    import { getContext } from 'svelte';
    import { goto } from '@sapper/app';
    import type { Writable } from 'svelte/store';
    import type Offer from '../../../models/Offer';
    import { offerManager } from '../../../stores';

    const userOffer = getContext<Writable<Offer>>('userOffer');

    async function submitOffer() {
        await offerManager.submitOffer($userOffer)
        goto("offers")
    }
</script>