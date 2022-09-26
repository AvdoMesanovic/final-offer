<Dialog
    bind:this="{dialog}"
    bind:open="{dialogOpen}"
    aria-labelledby="title"
    aria-describedby="content"
  >
    <Title id="title">Are you sure?</Title>
    <Content id="content">
      <p>If you would like to state any reason for rejection, please do so below.  This is purely optional.</p>
      <Textfield
        textarea
        class="mdc-text-field"
        bind:value='{comment}'
        label="Reason for Rejection"
        input$rows="3"
      />
    </Content>
    <Actions>
      <Button on:click="{() => emit('cancel')}">Cancel</Button>
      <Button on:click="{() => emit('submit')}">Reject</Button>
    </Actions>
</Dialog>
  
<script lang="ts">
    import Dialog, { Title, Content, Actions } from '@smui/dialog';
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
    let dialog;
    let dialogOpen = false;

    export let comment;

    export let car = {
        vin: '',
        brand: 'Toyota',
        model: '',
        year: 2000,
        price: 0,
        color: '',
        img: '',
        completion: 0,
    };

    export function open() {
        dialogOpen = true;
    }

    function emit(reason) {
        dispatch(reason, car);
    }
</script>
  