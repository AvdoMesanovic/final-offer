<style lang="scss">
    @import '../theme/variables.scss';
    @import '@material/elevation/mdc-elevation';
    .primary-tab-button :global(.mdc-tab--active .mdc-tab__text-label), .primary-tab-button :global(button) {
        color: map-get($primary-palette, 100);
    }
    .primary-tab-button :global(.mdc-tab__text-label) {
        color: map-get($primary-palette, 300);
    }
    .primary-tab-button :global(button:disabled .mdc-tab__text-label) {
        color: map-get($grey-palette, 200);
    }
    .small-tab :global(.mdc-tab) {
        height: 38px;
        font-size: 13px;
    }
</style>

<div class="mdc-elevation--z{elevation}">
    <TabBar {tabs} let:tab bind:active>
        <div class="primary-tab-button {smaller ? "small-tab" : ""}">
            <Tab {tab} disabled={tabInfo[tab] && tabInfo[tab].disabled ? true : false} on:click={() => changeRoute(tabInfo[tab])}>
                <Label>{tab}</Label>
            </Tab>
        </div>
    </TabBar>
</div>
  
<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import { goto } from '@sapper/app';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    export let tabs: string[];
    export let active: string;
    export let smaller: boolean = true;
    export let elevation: number = 0;
    export let tabInfo: {} = {};
    export let initialUrl: string = null;

    function changeRoute(tab) {
        if (tab && tab.route) {
            if (initialUrl !== null) {
                goto(initialUrl + tab.route);
            }
            else {
                goto(tab.route)
            }
            dispatch("routeChange")
        }
    }
</script>