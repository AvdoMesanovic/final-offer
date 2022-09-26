<style lang="scss">
    @import '@material/elevation/mdc-elevation';
    @import '../../../theme/variables.scss';
    slot {
        margin-top: 5px;
    }
</style>

<div class="container">
    {#if indiv !== "" && indiv !== "intro"}
        <h1 class="heading mb-0">Make an Offer</h1>
        <CustomTabBar {tabs} bind:active={$active$} elevation={5} smaller={false} bind:tabInfo={$tabInfo$} {initialUrl} on:routeChange={() => onTabChange()} />
        {#if $active$ === "Title and Licensing"}
            <CustomTabBar tabs={$tabInfo$["Title and Licensing"].tabs} bind:active={$tabInfo$["Title and Licensing"].active} elevation={3} bind:tabInfo={$tabInfo$["Title and Licensing"].info} {initialUrl} on:routeChange={() => onTabChange()} />
        {:else if $active$ === "Delivery and Pickup"}
            <CustomTabBar tabs={$tabInfo$["Delivery and Pickup"].tabs} bind:active={$tabInfo$["Delivery and Pickup"].active} elevation={3} bind:tabInfo={$tabInfo$["Delivery and Pickup"].info} {initialUrl} on:routeChange={() => onTabChange()} />
        {:else if $active$ === "Financing"}
            <CustomTabBar tabs={$tabInfo$["Financing"].tabs} bind:active={$tabInfo$["Financing"].active} elevation={3} bind:tabInfo={$tabInfo$["Financing"].info} {initialUrl} on:routeChange={() => onTabChange()} />
        {:else if $active$ === "Trade-in"}
            <CustomTabBar tabs={$tabInfo$["Trade-in"].tabs} bind:active={$tabInfo$["Trade-in"].active} elevation={3} bind:tabInfo={$tabInfo$["Trade-in"].info} {initialUrl} on:routeChange={() => onTabChange()} />
        {/if}
    {:else}
        <h1 class="heading">Make an Offer</h1>
    {/if}
    <div class="flex-layout">
        <div class="flex-item fixed-width-column">
            {#if car}
                <CarCard {car} actions={false} />
            {/if}
        </div>
        <div class="flex-item">
            <div class="mdc-elevation--z8">
                <Card>
                    <Content>
                        <slot></slot>
                    </Content>
                </Card>
            </div>
        </div>
    </div>
</div>
  
<script context="module" lang="ts">
    import type Car from '../../../models/Car';
    let id;
    let car: Car;
    export async function preload(page) {
        id = page.params.id;
        const res = await this.fetch(`listings/${id}.json`);
        car = await res.json();
    }
</script>

<script lang="ts">
    import { stores } from '@sapper/app';
    import { setContext } from 'svelte';
	const { page } = stores();
    import CarCard from "../../../components/CarCard.svelte";
    import CustomTabBar from "../../../components/CustomTabBar.svelte";
    import Card, { Content } from '@smui/card';
    import { writable } from 'svelte/store';
    import { db, offerManager, user } from '../../../stores';
    import type Offer from '../../../models/Offer';
    import type UserData from '../../../models/UserData';

    let usr;
    if (user) {
        const unsubscribe = user.subscribe((value) => {
            usr = value;
        });
    }
    
    let active: string = "Title and Licensing";
    let tabs: string[] = ["Title and Licensing", "Delivery and Pickup", "Financing", "Trade-in", "Review and Submit"];
    let url: string;
    let indiv: string;
    let initialUrl: string;
    let loading = true;
    let id = $page.path.split("/")[2];
    let userOffer: Offer;
    setContext("offerId", id)
    $: url = $page.path;
    $: indiv = url.split("/")[3] ? (url.split("/")[4] ? url.split("/")[3] + "/" + url.split("/")[4] : url.split("/")[3]) : "";
    $: initialUrl = url ? url.split("/")[0] + "/" + url.split("/")[1] + "/" + url.split("/")[2] + "/" : null;
    let tabInfo = {
        "Title and Licensing": {
            disabled: false,
            tabs: ["Buyer Details"],
            active: "Buyer Details",
            route: "tl/bd",
            info: {
                "Buyer Details": {
                    disabled: false,
                    route: "tl/bd"
                }
            }
        },
        "Delivery and Pickup": {
            disabled: true,
            tabs: ["Available Options", "Delivery Details", "Pickup Details"],
            active: "Available Options",
            route: "delivery/ao",
            info: {
                "Available Options": {
                    disabled: false,
                    route: "delivery/ao"
                },
                "Delivery Details": {
                    disabled: true,
                    route: "delivery/dd"
                },
                "Pickup Details": {
                    disabled: true,
                    route: "delivery/pd"
                }
            }
        },
        "Financing": {
            disabled: true,
            tabs: ["Available Options", "Financing Details"],
            active: "Available Options",
            route: "f/ao",
            info: {
                "Available Options": {
                    disabled: false,
                    route: "f/ao"
                },
                "Financing Details": {
                    disabled: false,
                    route: "f/fd"
                }
            }
        },
        "Trade-in": {
            disabled: true,
            tabs: ["Available Options", "Trade-in Details"],
            active: "Available Options",
            route: "ti/ao",
            info: {
                "Available Options": {
                    disabled: false,
                    route: "ti/ao"
                },
                "Trade-in Details": {
                    disabled: false,
                    route: "ti/td"
                }
            }
        },
        "Review and Submit": {
            disabled: true,
            route: "review",
            active: ""
        },
    };

    const active$ = writable(active);
    $: $active$ = active;
    setContext("offersActiveTab", active$);

    const tabInfo$ = writable(tabInfo);
    $: $tabInfo$ = tabInfo;
    setContext("offersTabInfo", tabInfo$);

    setContext("deliverySelected", writable(""));

    const userOffer$ = writable(userOffer);
    $: $userOffer$ = userOffer;
    setContext("userOffer", userOffer$);

    $: {
        if (usr && loading) {
            if ($tabInfo$[$active$].route !== indiv) {
                Object.keys($tabInfo$).forEach((tab) => {
                    if ($tabInfo$[tab].info) {
                        Object.keys($tabInfo$[tab].info).forEach((smallTab) => {
                            if ($tabInfo$[tab].info[smallTab].route === indiv) {
                                $active$ = tab;
                                $tabInfo$[tab].active = smallTab;
                                return
                            }
                        })
                    }
                    else if ($tabInfo$[tab].route === indiv) {
                        $active$ = tab;
                        return
                    }
                })
            }
            (async () => {
                let userData: UserData = await db.getUserData(usr.uid);
                userData.offers.forEach(offer => {
                    if (offer.car.vin === id) {
                        userOffer = offer;
                    }
                })
                Object.keys(userOffer.initialInfo).forEach((key) => {
                    $tabInfo$[key].disabled = userOffer.initialInfo[key].disabled
                    Object.keys(userOffer.initialInfo[key].mini).forEach((m) => {
                        tabInfo[key].info[m].disabled = userOffer.initialInfo[key].mini[m].disabled
                    })
                })
            })()
            loading = false;
        }
    }

    async function onTabChange() {
        await offerManager.changeOffer($userOffer$)
    }
</script>