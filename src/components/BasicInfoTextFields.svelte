<style>
  .basic-info-wrapper {
    margin: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 10px;
  }
  .column {
    padding: 10px;
  }
  .column :global(.mdc-text-field) {
    width: 100%;
  }
  .state-zip-wrapper :global(.mdc-text-field) {
    width: 40%;
  }
  .state-zip-wrapper {
    display: flex;
    justify-content: space-between;
  }
  .required-wrapper {
    margin-bottom: 30px;
  }
</style>

<Form
  class="form"
  schema="{schema}"
  fields="{fields}"
  submitHandler="{formSubmit}"
  submitted="{submitted}"
>
  <div class="basic-info-wrapper">
    <div class="column">
      {#if !document.URL.includes('profile')}
        <div class="required-wrapper">
          <Textfield
            on:change="{formSubmit}"
            variant="outlined"
            bind:value="{fields.fName}"
            label="First Name *"
          />
          <Textfield
            on:change="{formSubmit}"
            variant="outlined"
            bind:value="{fields.lName}"
            label="Last Name *"
          />
        </div>
      {:else}
        <Textfield
          on:change="{formSubmit}"
          variant="outlined"
          bind:value="{fields.fName}"
          label="First Name *"
        />
        <Textfield
          on:change="{formSubmit}"
          variant="outlined"
          bind:value="{fields.lName}"
          label="Last Name *"
        />
      {/if}
      <Textfield
        on:change="{formSubmit}"
        variant="outlined"
        bind:value="{fields.phoneNumber}"
        label="Phone Number"
      />
      <Textfield
        on:change="{formSubmit}"
        variant="outlined"
        bind:value="{fields.dateOfBirth}"
        label="Date of Birth"
      />
      <Textfield
        on:change="{formSubmit}"
        variant="outlined"
        bind:value="{fields.sex}"
        label="Sex"
      />
    </div>
    <div class="column">
      {#if !document.URL.includes('profile')}
        <div class="required-wrapper">
          <Textfield
            on:change="{formSubmit}"
            variant="outlined"
            bind:value="{fields.email}"
            label="Email Address / Account Name *"
          />
          <Textfield
            on:change="{formSubmit}"
            variant="outlined"
            bind:value="{fields.password}"
            label="Password *"
          />
        </div>
      {:else}
        <Textfield
          on:change="{formSubmit}"
          variant="outlined"
          bind:value="{fields.email}"
          label="Email Address / Account Name *"
        />
      {/if}
      <Textfield
        on:change="{formSubmit}"
        variant="outlined"
        bind:value="{fields.address}"
        label="Street Address"
      />
      <Textfield
        on:change="{formSubmit}"
        variant="outlined"
        bind:value="{fields.addressTwo}"
        label="Address Line 2"
      />
      <Textfield
        on:change="{formSubmit}"
        variant="outlined"
        bind:value="{fields.city}"
        label="City"
      />
      <div class="state-zip-wrapper">
        <Textfield
          on:change="{formSubmit}"
          variant="outlined"
          bind:value="{fields.state}"
          label="State"
        />
        <Textfield
          on:change="{formSubmit}"
          variant="outlined"
          bind:value="{fields.zip}"
          label="Zip"
        />
      </div>
    </div>
  </div>
</Form>

<script>
  import * as yup from 'yup';
  import { Form, Message, isInvalid } from 'svelte-yup';
  let submitted = false;
  let isValid;
  let schema = yup.object().shape({
    fName: yup.string().required().max(30).label('Name'),
    lName: yup.string().required().max(30).label('Name'),
    email: yup.string().required().email().label('Email address'),
    password: yup
      .string()
      .required('No password provided.')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  });

  function formSubmit() {
    submitted = true;
    isValid = schema.isValidSync(fields);
    if (!document.URL.includes('profile')) {
      if (isValid) {
        document.getElementById('sign-up-button').disabled = false;
      } else {
        document.getElementById('sign-up-button').disabled = true;
      }
    }
  }
  $: invalid = (name) => {
    if (submitted) {
      return isInvalid(schema, name, fields);
    }
    return false;
  };
  import Button from '@smui/button';
  import Textfield from '@smui/textfield';
  // export let buttonState;
  export let fields;
</script>
