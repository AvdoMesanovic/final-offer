<Dialog
  bind:this="{dialog}"
  bind:open="{dialogOpen}"
  aria-labelledby="title"
  aria-describedby="content"
>
  <Title id="title">Login</Title>
  <Content id="content">You must sign in or create an account to continue</Content>
  <Actions>
    <Button on:click="{() => goto('signin')}">Sign In</Button>
    <Button on:click="{() => goto('signup')}">Sign Up</Button>
  </Actions>
</Dialog>

<script>
  import Dialog, { Title, Content, Actions } from '@smui/dialog';
  import Button from '@smui/button';
  import { createEventDispatcher } from 'svelte';
  import { goto } from '@sapper/app';
  const dispatch = createEventDispatcher();

  let dialog;
  let dialogOpen;

  export function open() {
    dialogOpen = true;
  };
</script>
