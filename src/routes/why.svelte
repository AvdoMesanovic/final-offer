<style lang="scss">
  @import '../theme/variables.scss';
  .call-to-action {
    background-color: map-get($primary-palette, 500);
    padding: 15px;
    text-align: center;
  }
  .call-to-action {
    background-color: aliceblue;
    padding: 15px;
    text-align: center;
  }
  img {
    width: 175px;
    float: left;
  }
</style>

<svelte:head>
  <title>Why</title>
</svelte:head>

<div class="container">
  <h1 class="heading">Why Final Offer?</h1>
  <div class="flex-layout">
    <div class="flex-item">
      <b>
        Cast a vision, communicate the value to both consumer and dealer.
        Articulate the win/win in the transaction. Communicate the value of
        secure transactions using Ethereum for smart contracts. Other features
        that are in development (Algorithm, regional values, how to guides).
      </b>
      <p>
        What if I told you that we are innovating the buying and selling process
        for the Car sales industry! No one likes taking a day off work to trapse
        into a dealership, find a car, test drive, keep an eye on the kids and
        after that wait a further 2 hours for paperwork to be finished!
      </p>

      <p>
        Car sales have been that process for far too long. Why can&rsquo;t it be
        simple, truth is it can.
      </p>

      <p>
        You sign up your profile, select the car you are wanting to buy. We
        educate consumers into a REALISTIC offer to be sent to the dealer. Your
        offer is received and the next conversation is &lsquo;when would you
        like to pick up the car&rsquo;
      </p>

      <p>
        It's a win win for both parties. Dealers receive closed leads that have
        been worked and educated. Not only that, you don&rsquo;t have to go
        through 1000&rsquo;s of leads a month and use valuable time out of a
        salesperson's schedule. If you are not happy with the offer simply press
        no!
      </p>

      <p>
        Consumers are able to make a realistic offer and not feel like their
        time is being wasted to be able to by a car. We educate with a patented
        algorithm based on region/demographic and real time data.
      </p>

      <p>
        Everything is secure and safe and the customer after acceptance remains
        the dealers customer. We just bridge the gap to pace more opportunity
        with you.
      </p>

      <p>Higher profit, less expense and more sales!</p>

      <p>Low stress, no time wasted and higher customer satisfaction.</p>
    </div>
    <div class="flex-item">
      <img src="{porsche}" alt="JEEP" class="img-responsive" />
      <img src="{jeep}" alt="Ford" class="img-responsive" />
      <img src="{honda}" alt="GMC" class="img-responsive" />
      <img src="{toyota}" alt="Honda" class="img-responsive" />
      <img src="{vw}" alt="Hyundai" class="img-responsive" />
      <img src="{ferrari}" alt="JEEP" class="img-responsive" />
    </div>
  </div>
</div>
<div class="call-to-action">
  <h3>Buy Your Next Car Faster</h3>
  <p>Prep your paperwork online, ahead of time.</p>
  {#if user}
    <Button variant="raised" href="offer">See How It Works</Button>
  {:else}
    <Button variant="raised" href="profile">See How It Works</Button>
  {/if}
</div>

<script>
  import Button from '@smui/button';

  import jeep from '../../static/logos/jeep.png';
  import honda from '../../static/logos/honda.png';
  import ferrari from '../../static/logos/ferrari.png';
  import toyota from '../../static/logos/toyota.png';
  import vw from '../../static/logos/volkswagen.png';
  import porsche from '../../static/logos/porsche.png';
  import 'firebase/auth';
  let user = null;
  async function logOut() {
    await firebase.auth().signOut();
    goto('profile');
  }
  if (process.browser && firebase && typeof firebase.auth == 'function')
    firebase.auth().onAuthStateChanged(function (person) {
      user = person;
    });
</script>
