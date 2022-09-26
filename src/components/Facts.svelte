<style lang="scss">
  @import '../theme/variables.scss';

  body {
    font-family: roboto;
  }

  .s-wrap {
    width: 250px;
    /* height: 250px; Optional */
    overflow: hidden; /* Hide scrollbars */
    margin: auto;
  }

  h3 {
    text-transform: uppercase;
  }

  .person-name {
    color: map-get($green-palette, 800);
    font-weight: bold;
  }

  /* MIDDLE WRAPPER */
  .s-move {
    display: flex;
    position: relative;
    top: 0;
    right: 0;
  }

  /* SLIDES */
  .slide {
    box-sizing: border-box;
    padding: 10px;
    /* Force all slides to layout horizontally */
    width: 100%;
    flex-shrink: 0;
  }

  /* SLIDE ANIMATION MAGIC */
  @keyframes slideh {
    0% {
      right: 0;
    }
    15% {
      right: 0;
    }
    20% {
      right: 100%;
    }
    35% {
      right: 100%;
    }
    40% {
      right: 200%;
    }
    55% {
      right: 200%;
    }
    60% {
      right: 300%;
    }
    75% {
      right: 300%;
    }
    80% {
      right: 400%;
    }
    95% {
      right: 400%;
    }
    100% {
      right: 0;
    }
  }
  .s-move {
    animation: slideh linear 25s infinite;
  }
  .s-move:hover {
    animation-play-state: paused;
  }
</style>

<div class="s-wrap">
  <div class="s-move">
    <div class="slide">
      <h3>Great Service</h3>
      <p>Great service! They were able to answer all my questions.</p>
      <span class="person-name">-Sam Blitz</span>
    </div>
    <div class="slide">
      <h3>Awesome App</h3>
      <p>
        The app was incredibly easy to use, I was able to buy my dream car with
        no hickups
      </p>
      <span class="person-name">-Rachel Cooper</span>
    </div>
    <div class="slide">
      <h3>Best Deal</h3>
      <p>
        When looking around for cars I never felt like I was getting the best
        deal until I came to Final Offer, I got the best deal on my favorite
        car, I could not be any happier!
      </p>
      <span class="person-name">-John Doe</span>
    </div>
    <div class="slide">
      <h3>Dont overpay for your car!</h3>
      <p>
        Before Final Offer I thought that I will always have to overpay for my
        car, until I came to Final offer, I no longer have to overpay for my
        car, no longer do I have to pay some large dealership that rips me off
      </p>
      <span class="person-name">-Mitch Ball</span>
    </div>
    <div class="slide">
      <h3>Great Customer Service</h3>
      <p>
        Compared to in person dealerships Final Offer felt less like a fight to
        get good service, instead they cared for I what wanted and I could not
        be any happier
      </p>
      <span class="person-name">-David Smith</span>
    </div>
  </div>
</div>

<script>
</script>
