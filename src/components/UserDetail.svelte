<style>
  .user-profile {
    text-align: center;
    padding: 10px;
  }

  /* .dropdown {
        display: block;
        margin: 5px;
    } */

  .showBio {
    margin: 0 auto;
    display: none;
  }

  .img-circle {
    border-radius: 50%;
    width: 150px;
  }
</style>

<Card>
  <div class="user-profile">
    <img class="img-circle center-block" src="{user.image}" alt="placeholder" />

    <h3>{user.name}</h3>
    <h4>{user.role}</h4>
    <Button class="center-block" on:click="{() => (showBio = !showBio)}">
      {showBio ? 'Hide' : 'Show'}
      Bio
    </Button>
    <p class:showBio="{!showBio}" on:click="{() => (showBio = !showBio)}">
      {user.bio}
    </p>
  </div>
</Card>

<script>
  import Card from '@smui/card';
  import Button from '@smui/button';
  export let user;
  let showBio = false;
</script>
