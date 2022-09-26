<style lang="scss">
  @import '../../theme/variables.scss';

  .container {
    display: flex;
  }

  .title {
    font-weight: 125;
    text-decoration: none;
    font-size: 18px;
    color: $primary;
    margin: 10px 0;
  }

  a {
    text-decoration: none;
    color: $black;
  }

  img {
    width: 335px;
    padding-top: 5px;
    padding-right: 55px;
    height: 185px;
  }

  .flex-item {
    height: fit-content;
  }

  .flex-layout {
    width: 100%;
  }

  .module {
    width: 100%;
    overflow: hidden;
  }

  .module2 {
    width: 36%;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .last-line1 {
    height: 15.4em;
    text-overflow: -o-ellipsis-lastline;
  }

  .last-line2 {
    height: 187px; /* exactly nine lines */
    text-overflow: -o-ellipsis-lastline;
  }

  .row-right {
    padding: 6px;
    background-color: none;
    width: 98%;
    height: 34%;
    transition-duration: 0.3s;
  }

  .row-right:hover {
    box-shadow: 0 0 7px 4px map-get($primary-palette, 500);
    background-color: map-get($primary-palette, 500);
    cursor: pointer;
  }

  .title-block {
    margin: 6px 0;
  }

  .img-responsive2 {
    padding-right: 5px;
    padding-bottom: 5px;
    float: left;
    margin-right: 10px;
  }

  .img-responsive3 {
    width: 100%;
    height: auto;
    padding-right: 5px;
    padding-bottom: 5px;
    float: left;
    margin-right: 10px;
  }

  .center {
    margin-left: 40%;
    line-height: 2;
  }

  .border {
    padding-bottom: 10px;
  }

  @media only screen and (max-width: 1170px) {
    .module2 {
      width: 335px;
      height: 53px;
    }
  }

  @media only screen and (max-width: 748px) {
    .module2 {
      width: 36%;
      height: 187px;
    }
  }

  @media only screen and (max-width: 608px) {
    .module2 {
      width: 335px;
      height: 53px;
    }
  }
</style>

<body>
  <section>
    <div class="container">
      <div class="flex-container">
        <div class="allign">
          <div class="flex-layout">
            <h1 class="heading">New Posts</h1>
            <div class="flex-item">
              <div class="title-block">
                <a rel="prefetch" href="blog/{posts[1].slug}">
                  <span class="title">{posts[1].title}</span>
                </a>
              </div>
              <img
                class="img-responsive3"
                src="blog_cars/Ferrari1.jpg"
                alt="Ferrari"
              />
              <div class="module last-line1">
                <p class="border">
                  Here at final we strive to make your experience as flawless as
                  possible with simple and easy to use UI, and groundbreaking
                  website design. To use Final offer all you have to do is first
                  you need to ding the car that you want. With all the different
                  brands and models Final Offer makes it easy to find the car
                  that you want, second you will either need to log into your
                  Final Offer account, or make a free account with just a few
                  easy steps. Next you set up a profile where we will take all
                  the info needed to buy a car so we can make it easy for you to
                  buy a car with none of the hassle. Then you will be asked to
                  pay a 49$ submittal fee, either through card venmo or paypal.
                  Along with this you will scan your license and insurance then
                  all you have to do is sit back and wait. If you made an offer
                  on a car and it was accepted then you will arrange delivery at
                  your convenience. Documents will be signed online through
                  Final Offer’s smart documents. After that you own your new
                  car. That will be delivered to you as fast as we can.
                </p>
              </div>
              <div class="center">
                <Button on:click a rel="prefetch" href="blog/{posts[1].slug}"
                  >Read More</Button
                >
              </div>
            </div>
            <!-- Where three recent blog posts stack up to the right -->
            <div class="flex-item ">
              <a rel="prefetch" href="blog/{posts[2].slug}">
                <div class="flex-item row-right" href="blog/{posts[2].slug}">
                  <div class="title-block">
                    <a rel="prefetch" href="blog/{posts[2].slug}">
                      <span class="title">{posts[2].title}</span>
                    </a>
                  </div>
                  <div>
                    <img
                      class="img-responsive2"
                      src="blog_cars/gas1.jpg"
                      alt="Genesis"
                    />
                  </div>
                  <div class="module2 last-line2">
                    <p class="border">
                      Entire relationships are dictated by first impressions, so
                      making a powerful impact immediately is a necessary key to
                      branding success. The first thing a customer interacts
                      with is a name, so it has to convey the right message; it
                      has to wow the audience. Think of it as a first handshake;
                      it says a lot about the person and makes a powerful
                      impression.
                    </p>
                  </div>
                  <!-- <div class="center">
                    <Button on:click a rel="prefetch" href="blog/{posts[2].slug}"
                      >Read More</Button>
                  </div> -->
                </div>
              </a>
              <a rel="prefetch" href="blog/{posts[3].slug}">
                <div class="flex-item row-right">
                  <div class="title-block">
                    <a rel="prefetch" href="blog/{posts[3].slug}">
                      <span class="title">{posts[3].title}</span>
                    </a>
                  </div>
                  <div>
                    <img
                      class="img-responsive2"
                      src="blog_cars/CyberTruck1.jpg"
                      alt="Genesis"
                    />
                  </div>
                  <div class="module2 last-line2">
                    <p class="border">
                      We want our app to provide a good experience for our users
                      looking for a car. After all their searching, we want this
                      to be their FinalOffer. Entire relationships are dictated
                      by first impressions, so making a powerful impact
                      immediately is a necessary key to branding success. The
                      first thing a customer interacts with is a name, so it has
                      to convey the right message; it has to wow the audience.
                      Think of it as a first handshake; it says a lot about the
                      person and makes a powerful impression.
                    </p>
                  </div>
                  <!-- <div class="center">
                    <Button on:click a rel="prefetch" href="blog/{posts[3].slug}"
                      >Read More</Button
                    >
                  </div> -->
                </div>
              </a>
              <a rel="prefetch" href="blog/{posts[4].slug}">
                <div class="flex-item row-right">
                  <div class="title-block">
                    <a rel="prefetch" href="blog/{posts[4].slug}">
                      <span class="title">{posts[4].title}</span>
                    </a>
                  </div>
                  <div>
                    <img
                      class="img-responsive2"
                      src="blog_cars/pickingCar.jpg"
                      alt="Genesis"
                    />
                  </div>
                  <div class="flex-item"></div>
                  <div class="module2 last-line2">
                    <p class="border">
                      The COVID-19 pandemic has changed car shopping in a number
                      of ways. You're more likely to have the option to handle
                      the purchase remotely. This means you can test-drive a
                      vehicle, apply for a loan, and sign the contract, all from
                      the comfort of your home. Ask for this option when
                      speaking with the dealership. You might find that the
                      discounts aren't as plentiful as before due to lower
                      inventory. Many auto factories around the world are not
                      yet up to full capacity. Finally, the dealership may have
                      fewer people on staff due to health restrictions or a
                      workforce cutback to keep costs down. Your salesperson
                      might handle roles that two or three people once
                      performed. Be patient with your salesperson and keep this
                      in mind when planning your day. Buying a new car is a big
                      step, but it doesn't have to be a daunting one. Here's how
                      to research, locate, price and negotiate to buy your new
                      car. Mobile technology makes these steps easier than ever.
                      It is now entirely possible for a buyer to shop for a
                      vehicle while in line at the supermarket or waiting to
                      pick up the kids.
                    </p>
                  </div>
                  <!--  <div class="center">
                    <Button on:click a rel="prefetch" href="blog/{posts[4].slug}">Read More</Button>
                  </div>
                </div> -->
                </div></a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</body>

<script context="module">
  export function preload() {
    return this.fetch(`blog.json`)
      .then((r) => r.json())
      .then((posts) => {
        return { posts };
      });
  }
  import Button from '@smui/button';
</script>

<script>
  export let posts;
  // import {db} from "../../stores.js";
  // function getPost(){
  // 	let pId = "J9iaayituCTBeYag4oJmA9Jblb42"
  // 	let data = db.getData("posts", pID);
  // }

  //get every post in an array like _posts.js

  //goes into stores js
  // getData: async function(collection, id){
  // 	let data = this.database.collection(collection).doc(id);
  //             let res;
  //             if (data) {
  //                 await data.get().then(doc => {
  //                     res = doc.data()
  //                 });
  //             }
  //             else {
  //                 res = null;
  //             }
  //             return res;
  //         }
</script>
