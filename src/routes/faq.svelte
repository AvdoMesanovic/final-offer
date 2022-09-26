<script>
    import Question from "../components/Question.svelte";
    const questionsAndAnswers = [
        {
            question:
                "How does it work as a dealer?",
            answer: `<ol>
                        <li>You submit a dealer contract with us.</li>
                        <li>We give you a profile to log in to.</li>
                        <li>You log on to Final Offer (QR\/link\/web\/app).</li>
                        <li>You upload the file with all of your inventory information.</li>
                        <li>Sit back and wait for any offers to come in.</li>
                        <li>If needed, submit a counteroffer to an offer of your choice.</li>
                        <li>Once you and the customer agree on a price, you have just sold a car!</li>
                    </ol>
                `,
        },
        {
            question:
                "How does it work as a consumer?",
                answer: `<ol>
                        <li>You find the car you want to buy.</li>
                        <li>You log on to Final Offer (QR\/link\/web\/app), or set up a profile if you don't have an account with us.</li>
                        <li>Scan your license and insurance</li>
                        <li>You submit your offer to the dealer.</li>
                        <li>Sit back and wait</li>
                        <li>If your offer was accepted, you arrange delivery at your convenience documents signed through smart documents online</li>
                        <li>Your car arrives!</li>
                    </ol>
                `,
        },
        {
            question:
                "Is there a policy in place to protect the privacy of a dealer?",
            answer: `Yes. Final Offer puts the upmost care into insuring the safety, and privacy of our dealers.`,
        },
        {
            question:
                "Is there a policy in place to protect the privacy of a consumer?",
            answer: `Yes. Final Offer puts the upmost care into insuring the safety, and privacy of the buyers.`,
        },
        {
            question:
                "Why choose Final Offer over other car sites?",
            answer: `<p>What we do compared to other sites:</p>
                    <ol>
                        <li>Cast a vision, communicate the value to both consumer and dealer.</li>
                        <li>Articulate the win/win in the transaction.</li>
                        <li>Communicate the value of secure transactions using Ethereum for smart contracts.</li>
                        <li>Other features that are in development (Algorithm, regional values, how to guides).</li>
                    </ol>
                `,
        },

        {
            question:
                "What do I do if nobody is selling the car I am looking for?",
            answer: `Because Final Offer is not directly selling cars, we have no control on what cars are being sold. Instead, you are given direct contact with the dealer, along with info provided by us about the car.`,
        },
        {
            question:
                "I'm having issues logging in. What do I do?",
            answer: `If you have not made an account already, you will need to make an account. However, if you are a dealer, there will be extra steps in the registration process. If you alredy have an account, and cannot log in for some reason, you can contact our technical support.`,
        },
        {
            question:
                "Why is it called Final Offer?",
            answer:
                `With the old way of car buying, you would go to diffrent dealerships, possibly making several offers on car(s). With us, we guarantee that the offer you agree to on our site will be the FINAL OFFER, no questions asked.`,
        },
        {
            question:
                "What is our response to COVID-19?",
            answer: `This pandemic has taken a big hit on car dealerships. Because we are almost entirely online, there is no physical contact in the process, meaning that both the consumer and the dealer are safe and secure.`,
        },
        {
            question:
                "Do you provide CarFax reports?",
            answer: `If it is available, all information, including CarFax reports, will be given to you when looking for a car. This is to ensure that, when you are looking for a car, you are as informed as you can be, so it will be your Final Offer.`,
        },
    ];

    let i = 0;
</script>

<svelte:head>
  <title>FAQ</title>
</svelte:head>

<div class="container">
    <h1 class="heading">Frequently Asked Questions</h1>
    <div class="flex-layout">
        {#each questionsAndAnswers as faq}
            <div class="faq-flex-item">
                <Question questionsAndAnswers={faq} />
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .faq-flex-item {
        -webkit-flex: auto;
        -moz-flex: auto;
        flex: auto;
        margin: 10px 20px 10px 0px;
        align-items: top;
    }

    @media only screen and (min-width: 0) {
        .faq-flex-item {
            width: 50%;
        }
    }

    @media only screen and (min-width: 1000px) {
        .faq-flex-item {
            width: 40%;
        }
    }

    // .faq-flex-item :global(.mdc-card) {
    //     height: 100%;
    // }

    .faq-flex-item :global(.mdc-card li) {
        padding-bottom: 5px;
    }
</style>
