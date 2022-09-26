<Dialog
  bind:this="{dialog}"
  bind:open="{dialogOpen}"
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="title">Confirm Offer</Title>
  <Content id="content">Are you sure you want to accept the offer?</Content>
  <Actions>
    <span class="purple-btn"
      ><Button on:click="{() => emit('cancel')}">Cancel</Button></span
    >
    <span class="purple-btn"
      ><Button on:click="{() => emit('submit')}">Yes</Button></span
    >
  </Actions>
</Dialog>

<script>
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button from '@smui/button';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();

  let dialog;
  let dialogOpen;

  export function open() {
    dialogOpen = true;
  }

  function emit(reason) {
    dispatch(reason);
  }
</script>
