<style lang="scss">
  @import '../theme/variables.scss';

  footer {
    background-color: $primary;
    color: map-get($primary-palette, 600);
  }
  section {
    padding: 0;
  }
  .bottom-half {
    background-color: $secondary;
    color: $black;
  }
  a {
    color: map-get($primary-palette, 600);
    text-decoration: none;
    text-transform: uppercase;
  }
  a:hover {
    color: map-get($secondary-palette, 400);
  }
  h3 {
    padding-bottom: 5px;
    color: map-get($secondary-palette, 200);
  }
  .fo-logo {
    width: 140px;
  }
  .fa {
    font-size: 30px;
    width: 40px;
    text-decoration: none;
  }
  ul {
    list-style: none;
    padding: 0 !important;
  }
  li {
    padding-bottom: 15px;
  }

  @media only screen and (max-width: 799px) {
    .top-links {
      margin-bottom: 0;
    }
  }

  @media print {
    footer {
      display: none;
    }
  }
</style>

<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
/>

<!-- svelte-ignore a11y-invalid-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<div class="footer-div">
  <footer>
    <section>
      <div class="container">
        <div class="flex-layout">
          <div class="flex-item top-links">
            <h3>Navigation</h3>
            <ul class="top-links">
              <li><a href="/">Home</a></li>
              <li><a href="listings">Listings</a></li>
              <li><a href="signin">Sign in</a></li>
            </ul>
          </div>
          <div class="flex-item">
            <h3>Information</h3>
            <p>Saint Louis, MO 63125</p>
            <p>(314) 123-4567</p>
            <p>finalofferteam@gmail.com</p>
          </div>
          <div class="flex-item">
            <h3>Follow Us</h3>
            <a href="https://www.facebook.com/" class="fa fa-facebook" target="_blank"></a>
            <a href="https://www.linkedin.com/" class="fa fa-linkedin" target="_blank"></a>
            <a href="https://www.instagram.com/" class="fa fa-instagram" target="_blank"></a>
            <a href="https://twitter.com/" class="fa fa-twitter" target="_blank"></a>
          </div>
          <div class="flex-item">
            <p>
              Creating future-proof digital experiences is what we do. Tell us
              about your needs, we’d love to collaborate with you.
            </p>
            <a
              aria-current="{segment === undefined ? 'page' : undefined}"
              href="./"
            >
              <img
                class="fo-logo"
                src="logo/final-offer-logo.png"
                alt="Final Offer logo"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  </footer>
  <footer class="bottom-half">
    <section>
      <div class="container">
        <div class="flex-layout">
          <div class="flex-item">
            <small><u>Terms and Conditions</u></small>
          </div>
          <div class="flex-item">
            <small><u>Privacy Policy</u></small>
          </div>
          <div class="flex-item"></div>
          <div class="flex-item"></div>
          <div class="flex-item">
            <small>© Copyright 2021 Final Offer App.</small>
          </div>
        </div>
      </div>
    </section>
  </footer>
</div>

<script lang="ts">
  export let segment;
</script>
