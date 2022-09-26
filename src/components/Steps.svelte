<style lang="scss">
  @import '../theme/variables.scss';

  .slide-text {
    transform: translate(3%, -218%);
    color: map-get($secondary-palette, 500);
    background-color: map-get($grey-palette, 900);
    padding: 15px 15px;
    font-size: 40px;
    position: relative;
    left: 30px;
    bottom: 300px;
  }

  .text-div {
  }
  .steps {
    background-color: map-get($grey-palette, 500);
    height: 60vh;
    overflow: hidden;
  }
  img {
    width: 100%;
  }

  /* .hero-image {
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        position: relative;
    }

    .hero-image.ferrari {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url("../../static/main-slider/ferrari.jpg");
    }

    .hero-image.jeep {
        background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.1)), url("../../static/main-slider/jeep.jpg");
    } */
</style>

<div class="steps">
  {#if slideNum == 0}
    <img transition:slide alt="Steps" src="{slideSteps}" />
    <span class="slide-text">We are the best in the industry...</span>
  {/if}
  {#if slideNum == 1}
    <img transition:slide alt="Why" src="{slideWhy}" />
    <span class="slide-text">Risk free!</span>
  {/if}
  {#if slideNum == 2}
    <img transition:slide alt="Who We Are" src="{slideWWA}" />
    <span class="slide-text">Working with 100s of dealerships...</span>
  {/if}
</div>

<!-- <div class="steps">
    {#if slideNum == 0}
        <div class="hero-image ferrari">
            <img transition:slide alt="Steps" src={slideSteps} />
            <span class="text-test">We are the best in the industry...</span>
        </div>
    {/if}
    {#if slideNum == 1}
        <div class="hero-image jeep">
            <img transition:slide alt="Why" src={slideWhy} />
            <div class="hero-text">
                <span class="text-test">Risk free!</span>
            </div>
        </div>
    {/if}
    {#if slideNum == 2}
        <div class="hero-image tesla">
            <img transition:slide alt="Who We Are" src={slideWWA} />
            <div class="hero-text">
                <span class="text-test">Risk free!</span>
            </div>
        </div>
    {/if}
</div> -->
<script>
  import { slide } from 'svelte/transition';
  import slideSteps from '../../static/main-slider/ferrari.jpg';
  import slideWhy from '../../static/main-slider/jeep.jpg';
  import slideWWA from '../../static/main-slider/tesla.jpg';
  let slideNum = 0;
  function nextSlide() {
    if (slideNum >= 2) {
      slideNum = 0;
    } else {
      slideNum++;
    }
  }
  setInterval(nextSlide, 4500);
</script>
