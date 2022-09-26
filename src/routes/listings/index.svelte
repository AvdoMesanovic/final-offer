<style lang="scss">
    .car-item {
        min-width: 50%;
        margin: 10px;
    }
    .fixed-width-column :global(.mdc-select__menu) {
        top: 0;
        bottom: auto !important;
        max-height: 235px;
    }
    .fixed-width-column :global(.mdc-select) {
        width: 100%;
    }
    .fixed-width-column .filter-card {
        position: sticky;
        top: 75px;
    }
    @media (min-width: 992px) {
        .car-item {
            min-width: 40%;
        }
    }
</style>
<div>
    {#each cars as car}
        <a class="no-display" rel="prefetch" href="listings/{car.vin}"> </a>
    {/each}
</div>
<div class="container">
    <h1 class="heading">Listings</h1>
    <div class="flex-layout">
        <div class="flex-item fixed-width-column">
            <div class="filter-card">
                <Card>
                    <Content>
                        Filter Listings
                        {#each filters as filter}
                            {#if filter.property === "year"}
                                <Select bind:value={filter.value} label={filter.display}>
                                    <Option value="" />
                                    {#each years as year}
                                    <Option value={year}>{year}</Option>
                                    {/each}
                                </Select>
                            {:else}
                                <Textfield bind:value={filter.value} label={filter.display} />
                            {/if}
                        {/each}
                    </Content>
                </Card>
            </div>
        </div>
        <div class="flex-item">
            <div class="flex-layout">
                {#each filtered as car}
                    <div class="flex-item car-item">
                        <CarCard {car} />
                    </div>
                {/each}
                <div class="flex-item car-item"></div>
            </div>
        </div>
    </div>
</div>

<script lang="ts">
    import CarCard from "../../components/CarCard.svelte"
    import Card, { Content } from '@smui/card';
    import Textfield from '@smui/textfield';
    import Select, { Option } from '@smui/select';
    import cars from '../../../static/_cars';
    let filters = [
        { property: "vin", value: "", display: "VIN", type: "string" },
        { property: "dealer", value: "", display: "Dealer", type: "string" },
        { property: "brand", value: "", display: "Make", type: "string" },
        { property: "model", value: "", display: "Model", type: "string" },
        { property: "year", value: "", display: "Year", type: "number" },
        { property: "color", value: "", display: "Color", type: "string" }
    ]
    let numYears = new Date().getFullYear() - 1898
    let years = [...Array(numYears).keys()].map(i => (i + 1900).toString()).reverse();
    $: filtered = cars.filter((car) => {
        return filters.every((filter) => {
            if (filter.type === "number") return car[filter.property].toString().includes(filter.value)
            return car[filter.property].toLowerCase().includes(filter.value.toLowerCase())
        })
      });
</script>