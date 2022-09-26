<style lang="scss">
  @import '../theme/variables.scss';

  .hero-img {
    padding-top: 50px;
    min-height: 430px;
    background: url(hero-img/main-img.png) center top/cover no-repeat;
  }
  
  .circle-icon {
    background: map-get($secondary-palette, 100);
    color: #24282c;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    line-height: 70px;
    vertical-align: middle;
    padding: 20px;
  }
  .hero-logo {
    width: 320px;
    margin: 0 auto;
    display: block;
  }
  .mdc-typography--headline2 {
    margin-top: 0;
    margin-bottom: 0;
  }
  @media only screen and (min-width: 790px) {
    p {
      height: 125px;
    }
  }
</style>

<section class="hero-img">
  <div class="container">
    <h1 class="text-center mdc-typography--headline2">Buy your next car with</h1>
    <img alt="Final Offer Logo" class="hero-logo" src="logo/final-offer-logo.png">
  <div class="flex-layout">
    <div class="flex-item">
      <Card padded>
        <span class="text-center">
          <i class="fa fa-laptop fa-4x circle-icon"/>
        </span>
        <h3 class="text-center">Why?</h3>
        <p>
          Final Offer is the best way to by cars, using innovative technology we
          can help predict trends and find out which car is for you! Final offer
          is all about you and finding what is the right fit for you!
        </p>
 
      </Card>
    </div>
    <div class="flex-item">
      <Card padded>
        <span class="text-center">
          <i class="fa fa-qrcode fa-4x circle-icon"/>
        </span>
        <h3 class="text-center">How?</h3>
        <p>
          Dealers and consumers alike all use Final Offer, the dealers can put a
          car on the market for consumers to go out and by it through the vin
          number or model, this app allows for easy communication between the
          dealer and the consumer. Make an offer on your dream car today!
        </p>
        
      </Card>
    </div>
    <div class="flex-item">
      <Card padded>
        <span class="text-center">
          <i class="fa fa-user fa-4x circle-icon"/>
        </span>
        <h3 class="text-center">Steps?</h3>
        <p>
          First, you want to make an account with the Log In button, second link
          up your payment methods and make search for the car of your dream, if
          you find it you can put an offer with the Make an Offer button. Then
          the dealer can counter offer.
        </p>
      </Card>
    </div>
  </div>
  </div>
</section>

<script>
  import Card from '@smui/card';
</script>
