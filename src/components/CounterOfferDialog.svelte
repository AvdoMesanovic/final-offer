<style>
  .m-10 {
    margin: 10px;
  }
</style>

<Dialog
  bind:this="{dialog}"
  bind:open="{dialogOpen}"
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="title">Submit a New Offer</Title>
  <Content id="content">
    <h1 class="text-center">Please submit your counter offer</h1>
    <span class="m-10"
      ><Textfield
        type="number"
        input$step="1000"
        input$min="0"
        bind:value="{car.price}"
        label="Offer"
      /></span>
  </Content>
  <Actions>
    <Button on:click="{() => emit('cancel')}">Cancel</Button>
    <Button on:click="{() => emit('submit')}">Submit</Button>
  </Actions>
</Dialog>

<script>
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button from '@smui/button';
  import Textfield from '@smui/textfield';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
  let dialog;
  let dialogOpen = false;

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
