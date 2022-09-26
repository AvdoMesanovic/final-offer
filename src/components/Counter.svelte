<style lang="scss">
  @import '../theme/variables.scss';
.counter-container {
  text-align: center;
  border:5px solid map-get($secondary-palette, 100);
  width: 140px; 
  height: 140px;
  border-radius: 50%;
  display: flex;
  align-items: center; 
  justify-content: center;
  padding: 5px;
  margin: 5px auto;
  text-transform: uppercase;
}
.counter {
  font-size: 40px;
  color: map-get($grey-palette, 700);
  font-weight: 900;
}
</style>

<div class="counter-container">
  <div>
    <span class="counter">{$count + 328}</span> 
    <div>Deals Completed</div>
  </div>
</div>

<script>
  import { count } from '../stores.js';
</script>
