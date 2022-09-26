<style lang="scss">
    @import '../theme/variables.scss';
    // Gives color to the active tab
    .signup-tab-button :global(.mdc-tab--active .mdc-tab__text-label), .signup-tab-button :global(button) {
        color: map-get($primary-palette, 100);
    }
    // Gives color to any tab that is not disabled
    .signup-tab-button :global(.mdc-tab__text-label) {
        color: map-get($primary-palette, 300);
    }
    // Gives color to tabs when disabled
    .signup-tab-button :global(button:disabled .mdc-tab__text-label) {
        color: map-get($grey-palette, 200);
    }
    // Determines size of circular progress next to email
    .email-icon :global(.mdc-circular-progress) {
        height: 20px;
        width: 20px;
    }
    // Gives color to icon next to email
    .email-icon :global(.mdc-text-field__icon) {
        color: $red;
    }
</style>

<Dialog
  bind:this="{dialog}"
  bind:open="{dialogOpen}"
  fullscreen
  aria-labelledby="title"
  aria-describedby="content"
>
    <Header>
        <Title id="title">Sign Up</Title>
    </Header>
    <Content id="content">
        <TabBar {tabs} let:tab bind:active>
            <div class="signup-tab-button">
                <Tab {tab} disabled={checkDisabled(tab)}>
                    <Label>{tab}</Label>
                </Tab>
            </div>
        </TabBar>
        {#if active === "Account Setup"}
            <Textfield
                type="email"
                bind:value="{email}"
                label="Email"
                bind:dirty={form.email.dirty}
                bind:invalid={form.email.invalid}
                updateInvalid
                on:change={checkEmailValidity}
            >
                <div slot="helper">
                    <HelperText persistent>Use a valid email that has not been used for Final Offer</HelperText>
                </div>
                <div slot="trailingIcon" class="email-icon">
                    {#if emailLoading}
                        <CircularProgress indeterminate />
                    {/if}
                    {#if !emailValid && email !== ""}
                        <Icon class="material-icons disable-selection" role="button" title="This email is not valid">
                            close
                        </Icon>
                    {/if}
                </div>
            </Textfield>
            <Textfield
                type="{passwordInputType}"
                bind:value="{password}"
                label="Password"
                bind:dirty={form.password.dirty}
                bind:invalid={form.password.invalid}
                updateInvalid
                input$minlength="6"
            >
                <div slot="helper">
                    <HelperText persistent>Password must be at least 6 characters long</HelperText>
                </div>
                <div slot="trailingIcon">
                    <Icon class="material-icons disable-selection" role="button" on:click={() => passwordVisible = !passwordVisible}>
                        {passwordVisible ? "visibility_off" : "visibility"}
                    </Icon>
                </div>
            </Textfield>
        {:else if active === "Profile"}
            <Textfield
                type="text"
                bind:value="{name}"
                label="Full Name"
                bind:dirty={form.name.dirty}
                bind:invalid={form.name.invalid}
                updateInvalid
            >
                <div slot="helper">
                    <HelperText persistent>First and last name recommended</HelperText>
                </div>
            </Textfield>
        {:else}
            <p>Email: {email}</p>
            <p>Password: {password}</p>
            <p>Name: {name}</p>
        {/if}
    </Content>
    <Actions>
        <Button on:click="{() => emit('cancel')}">Cancel</Button>
        <Button on:click="{() => emit('submit')}" disabled={!reviewUsable}>Signup</Button>
    </Actions>
</Dialog>
  
<script lang="ts">
    import Tab, { Label } from '@smui/tab';
    import TabBar from '@smui/tab-bar';
    import Button from '@smui/button';
    import Textfield from '@smui/textfield';
    import Icon from '@smui/textfield/icon';
    import HelperText from '@smui/textfield/helper-text/index';
    import CircularProgress from '@smui/circular-progress';
    import Dialog, { Header, Title, Content, Actions } from '@smui/dialog';
    import { user } from '../stores.js';
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();

    let dialog;
    let dialogOpen;

    let email: string = "";
    let password: string = "";
    let name: string = "";
    let passwordVisible: boolean = false;
    $: passwordInputType = (passwordVisible ? "text" : "password")
    let emailLoading: boolean = false;
    let emailValid: boolean = false;

    let form = {
        email: {
            dirty: false,
            invalid: false
        },
        password: {
            dirty: false,
            invalid: false
        },
        name: {
            dirty: false,
            invalid: false
        },
    }

    let active: string = 'Account Setup';
    let tabs: string[] = ['Account Setup', 'Profile', 'Review'];

    $: profileUsable = (email && password && form.email.dirty && !form.email.invalid && form.password.dirty && !form.password.invalid && password.length >= 6 && !emailLoading && emailValid);
    $: reviewUsable = (profileUsable && name && form.name.dirty && !form.name.invalid)

    export function open() {
        dialogOpen = true;
        clearInfo()
    }

    $: checkDisabled = (tab) => {
        if (tab === "Account Setup" || (tab === "Profile" && profileUsable) || (tab === "Review" && reviewUsable)) {
            return false;
        }
        return true
    }

    function emit(reason) {
        dispatch(reason, [email, password, name]);
    }

    function clearInfo() {
        email = "";
        password = "";
        name = "";
        active = 'Account Setup';
        checkEmailValidity();
    }

    async function checkEmailValidity() {
        emailLoading = true;
        emailValid = true;
        let methods = await user.checkEmailValidity(email).catch(error => {
            emailValid = false;
        })
        if (methods && methods.length !== 0) {
            emailValid = false;
        }
        emailLoading = false;
    }
</script>