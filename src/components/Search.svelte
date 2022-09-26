<style lang="scss">
  @import '../theme/variables.scss';

  .drop-down {
    position: relative;
    z-index: 1000;
    background-color: map-get($primary-palette, 100);
    margin-left: 25px;
    width: 100%;
    margin: 0 auto;
    margin-top: 5px;
    color: map-get($primary-palette, 600);
  }

  .clickable:hover {
    cursor: pointer;
  }
  .search-field :global(.mdc-text-field) {
    width: 300px;
    background-color: transparent;
  }
  *
    :global(.shaped-outlined
      .mdc-notched-outline
      .mdc-notched-outline__leading) {
    border-radius: 28px 0 0 28px;
    width: 28px;
  }
  *
    :global(.shaped-outlined
      .mdc-notched-outline
      .mdc-notched-outline__trailing) {
    border-radius: 0 28px 28px 0;
  }
  * :global(.shaped-outlined .mdc-notched-outline .mdc-notched-outline__notch) {
    max-width: calc(100% - 28px * 2);
  }

</style>

<div>
  <div class="margins search-field">
    <Textfield
      class="shaped-outlined"
      variant="outlined"
      type="text"
      withTrailingIcon="{valueClickable !== ''}"
      updateInvalid
      bind:value="{valueClickable}"
      label="Search for your new car..."
      input$autocomplete="text"
    />
    {#if valueClickable}
      <div class="drop-down" transition:slide>
        <Body>
          {#each filtered as car}
            <Row on:click="{() => goto('offer/' + car.vin)}">
              <Cell
                ><div class="clickable">
                  {car.year}
                  {car.brand}, {car.model}
                </div>
                <div class="uVin clickable">{car.vin}</div></Cell
              >
            </Row>
          {/each}
        </Body>
      </div>
    {/if}
  </div>
</div>

<script>
  import Textfield, { Input, Textarea } from '@smui/textfield';
  import { slide } from 'svelte/transition';
  let valueClickable = '';
  import { Body, Row, Cell } from '@smui/data-table';
  import { goto } from '@sapper/app';
  let allCars;
  getAll();
  async function getAll() {
    if (process.browser) {
      let res = await fetch(`offer.json`);
      let body = await res.json();
      allCars = body;
      return res;
    }
  }

  $: filtered = valueClickable
    ? allCars.filter((car) => {
        return car.brand.toLowerCase().includes(valueClickable.toLowerCase());
      })
    : allCars;
</script>
