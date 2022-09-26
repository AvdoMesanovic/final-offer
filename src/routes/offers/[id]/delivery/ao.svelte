<p>Would you prefer to have the car delivered or to schedule a pick-up?</p>

<FormField>
    <Radio
      bind:group={$selected}
      value="Delivery"
    />
    <span slot="label">
      Delivery
    </span>
</FormField><br />
<FormField>
    <Radio
      bind:group={$selected}
      value="Pickup"
    />
    <span slot="label">
      Pickup
    </span>
</FormField>
<div class="text-right">
    <Button variant="raised" disabled={!$selected} on:click={() => changeRoute()}>Next</Button>
</div>

<script lang="ts">
    import Radio from '@smui/radio';
    import FormField from '@smui/form-field';
    import Button from '@smui/button';
    import { getContext, setContext } from 'svelte';
    import { goto } from '@sapper/app';
    import type { Writable } from 'svelte/store';
    import type Offer from '../../../../models/Offer';
    import { offerManager } from '../../../../stores';
    
    const id = getContext<string>('offerId');
    const tabInfo = getContext<Writable<Object>>('offersTabInfo');
    const selected = getContext<Writable<string>>('deliverySelected')
    const userOffer = getContext<Writable<Offer>>('userOffer');
    
    $: if ($selected === "Delivery" || ($userOffer && $userOffer.initialInfo["Delivery and Pickup"] && $userOffer.initialInfo["Delivery and Pickup"].option === "Delivery" && $selected === "")) {
        $tabInfo["Delivery and Pickup"].info["Pickup Details"].disabled = true;
        $tabInfo["Delivery and Pickup"].info["Delivery Details"].disabled = false;
        $tabInfo["Review and Submit"].disabled = false;
        $selected = "Delivery";
        if ($userOffer && $userOffer.initialInfo["Delivery and Pickup"]) {
          $userOffer.initialInfo["Delivery and Pickup"].disabled = false;
          $userOffer.initialInfo["Delivery and Pickup"].option = "Delivery";
          $userOffer.initialInfo["Review and Submit"].disabled = false;
        }
    } else if ($selected === "Pickup" || ($userOffer && $userOffer.initialInfo["Delivery and Pickup"] && $userOffer.initialInfo["Delivery and Pickup"].option === "Pickup" && $selected === "")) {
        $tabInfo["Delivery and Pickup"].info["Pickup Details"].disabled = false;
        $tabInfo["Delivery and Pickup"].info["Delivery Details"].disabled = true;
        $tabInfo["Review and Submit"].disabled = false;
        $selected = "Pickup";
        if ($userOffer && $userOffer.initialInfo["Delivery and Pickup"]) {
          $userOffer.initialInfo["Delivery and Pickup"].disabled = false;
          $userOffer.initialInfo["Delivery and Pickup"].option = "Pickup";
          $userOffer.initialInfo["Review and Submit"].disabled = false;
        }
    }
    async function changeRoute() {
        let route = $selected === "Delivery" ? "dd" : "pd";
        $tabInfo["Delivery and Pickup"].active = $selected + " Details";
        $tabInfo["Delivery and Pickup"].route = "delivery/" + route;
        $userOffer.initialInfo["Delivery and Pickup"].option = $selected;
        await offerManager.changeOffer($userOffer)
        goto(`offers/${id}/delivery/${route}`)
    }
</script>