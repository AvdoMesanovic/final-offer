<svelte:head>
  <title>About</title>
</svelte:head>

<div class="container">
  <div class="flex-layout">
    <h1 class="heading">What We Do</h1>
    <b>
      Simplify the way you buy: The price you want, when you want/ reinventing
      the car sale wheel, Touchless car buying: Buy when its right for you
    </b>
    <p>
      We put you in the position to make and offer that works for you. We have
      made it simple by educating you with non-biased real time data to put you
      in the better position to make a realistic offer. Did I mention, the only
      time the dealer can reach out to you is when they accept your offer to
      schedule delivery! Making offers is so simple you can buy a car from your
      couch, at dinner or even when you swing by the dealership after hours to
      check them out before you buy!
    </p>
    <b>
      Simplify your sales process/capture customers out of hours Expand your
      selling hours/Never miss an opportunity
    </b>
    <p>
      Consumers come through to you as a fully accepted and committed buyer. You
      look at the VIN Specific profile and from there you accept or decline.
      Customers can make offers from home, Work and even on the lot after hours.
      You know how many people visit your dealership after hours!
    </p>
  </div>
</div>

<div class="container">
  <div class="flex-layout">
    {#each users as userdetails}
      <div class="flex-item">
        <UserDetail user="{userdetails}" />
      </div>
    {/each}
  </div>
</div>

<script lang="ts">
  import UserDetail from '../components/UserDetail.svelte';
  const users = [
    {
      name: 'Oliver Kingston',
      image: 'team/oliver.jpg',
      role: 'Lead Developer',
      bio: 'Oliver is our lead developer at the company. He has been with us for 10+ years and has really helped the company out.',
    },
    {
      name: 'Danica Rosenburg',
      image: 'team/danica.jpg',
      role: 'Marketing Executive',
      bio: "Danica is our superstar marketing executive. She has been with us for 2 years, and it wouldn't be the same without her.",
    },
    {
      name: 'Abdul Solomon',
      image: 'team/abdul.jpg',
      role: 'Network Administrator',
      bio: "Abdul is the company's network administrator. He has just started this year and we are excited to see what he can do.",
    },
  ];
  export let segment;
</script>
