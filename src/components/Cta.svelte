<style lang="scss">
  @import '../theme/variables.scss';
  .call-to-action {
    background-color: map-get($primary-palette, 600);
    border-radius: 5px;
    margin-top: 15px;
    padding: 12px;
    padding-top: 0;
    max-width: 920px;
    width: calc(100% - 24px);
  }
  .fixed-width-column {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>

<div class="container call-to-action">
  <div class="flex-layout">
    <div class="flex-item">
      <h1>Sign up for CTA</h1>
      <hp>
        Simplify the way you buy: The price you want, when you want/ reinventing
        the car sale wheel, Touchless car buying: Buy when its right for you
      </hp>
    </div>
    <div class="flex-item fixed-width-column">
      <Button href="/profile" variant="raised">Go for it!</Button>
    </div>
  </div>
</div>

<script>
  import Button from '@smui/button/styled';
</script>
