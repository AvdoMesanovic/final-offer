<p>In order to submit an offer we will need to collect some details in order to help the dealer consider your offer. Final Offer has condensed this effort to the simplest possible flow based on your needs.</p>
<p>Other intro/explanatory text/legal can go here.</p>

<FormField>
    <Checkbox color="secondary" bind:checked touch />
    <span slot="label">I have read and agreed to the terms and conditions.</span>
</FormField>

<div class="text-right">
    <Button variant="raised" disabled={!checked} on:click={() => goto(`offers/${id}/tl/bd`)}>Let's Go</Button>
</div>
   
<script>
    import Checkbox from '@smui/checkbox';
    import FormField from '@smui/form-field';
    import Button from '@smui/button';
    import { goto } from '@sapper/app';
    import { stores } from '@sapper/app';
    const { page } = stores();
  
    let checked = false;
    let id = $page.path.split("/")[2]
</script>