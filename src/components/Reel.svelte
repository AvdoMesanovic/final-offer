<style>
  .container {
    height: 80px;
    width: 500px;
  }
  .image-reel {
    overflow: hidden;
    white-space: nowrap;
    width: 500px;
  }
</style>

<div class="container" id="container">
  <div class="flex-container">
    <div class="image-reel" id="img_reel"></div>
  </div>
</div>

<script>
  import { onMount } from 'svelte';
  import { onDestroy } from 'svelte';

  import acura from '../../static/logos/acura.png';
  import audi from '../../static/logos/audi.png';
  import bmw from '../../static/logos/bmw.png';
  import dodge from '../../static/logos/dodge.png';
  import ferrari from '../../static/logos/ferrari.png';
  import hyundai from '../../static/logos/hyundai.png';
  import honda from '../../static/logos/honda.png';
  import jeep from '../../static/logos/jeep.png';
  import porsche from '../../static/logos/porsche.png';
  import saturn from '../../static/logos/saturn.jpg';
  import toyota from '../../static/logos/toyota.png';
  import ford from '../../static/logos/ford.png';
  import mitsi from '../../static/logos/mitsi.png';
  import vw from '../../static/logos/volkswagen.png';

  let images = [
    ferrari,
    honda,
    jeep,
    porsche,
    saturn,
    toyota,
    acura,
    bmw,
    dodge,
    ford,
    audi,
    mitsi,
    hyundai,
    vw,
  ];
  let imgIndex = 0;
  let time = 10;
  let isLoaded = true;
  let loop = setInterval(() => {
    if (imgIndex < images.length) {
      var img_reel = document.getElementById('img_reel');
      var img = document.createElement('img');
      img.src = images[imgIndex];
      img.style.height = '80px';
      img.style.width = '80px';
      img_reel.appendChild(img);
      imgIndex++;
    } else {
      if (isLoaded) {
        document.getElementById('img_reel').scrollLeft += 1;
        if (document.getElementById('img_reel').scrollLeft % 80 == 0) {
          document.getElementById('img_reel').scrollLeft += -80;
          document
            .getElementById('img_reel')
            .appendChild(document.getElementById('img_reel').firstChild);
        }
      }
    }
  }, time);
  onMount(() => {
    loop;
  });
  onDestroy(() => {
    clearInterval(loop);
  });
</script>
