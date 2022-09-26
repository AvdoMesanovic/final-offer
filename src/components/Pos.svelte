<style>
  .submit {
    margin-top: 10px;
  }
  div {
    text-align: center;
  }
</style>

<div>
  <Textfield
    type="text"
    withTrailingIcon="{valueClickable !== ''}"
    updateInvalid
    label="POS"
    bind:value="{valueClickable}"
    style="min-width: 250px;"
    input$autocomplete="text"
  />
  <div class="submit">
    <Button variant="raised">Submit</Button>
  </div>
</div>

<script>
  import Button from '@smui/button/styled';
  import Textfield, { Input, Textarea } from '@smui/textfield';
  let valueClickable = '';
</script>
