<style lang="scss">
  @import '../theme/variables.scss';

  #buffer {
    width: 100%;
    height: 10px;
    background: map-get($grey-palette, 300);
  }

  #bar {
    margin-left: 0;
    margin-right: auto;
    height: 10px;
  }
</style>

<div id="buffer">
  <div id="bar" style="background: {bColor(percent)}; width: {percent}%;"></div>
</div>

<script lang="ts">
  export let percent;
  function bColor(xpercent: number) {
    let hexaColor;
    if (xpercent == 25) {
      hexaColor = "#ff283a"
    } else if (xpercent == 50) {
      hexaColor = "#ffed28"
    } else if (xpercent == 75) {
      hexaColor = "#abf048";
    } else if (xpercent == 100) {
      hexaColor = "#26f47c";
    } else if (xpercent > 75) {
      hexaColor = "#85f157";
    } else if (xpercent > 50) {
      hexaColor = "#d9ee37";
    } else if (xpercent > 25) {
      hexaColor = "#ff9430";
    }
    return hexaColor;
  }
</script>
