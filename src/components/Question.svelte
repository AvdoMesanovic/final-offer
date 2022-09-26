<style>
  .icon {
    float: right;
  }

  .answer {
    margin-left: 15px;
  }

  .question-card :global(.smui-card__content) {
        font-weight: 700;
  }
</style>

<script>
  import Card, { Content } from '@smui/card';
  import IconButton, { Icon } from '@smui/icon-button';
  import { slide } from 'svelte/transition';

  let pressed = false;

  let icon = 'add';

  function showHideAnswer() {
    pressed = !pressed;
    if (pressed == true) {
      icon = 'remove';
    } else if (pressed == false) {
      icon = 'add';
    }
  }

  export let questionsAndAnswers;
</script>

<div class="question-card">
    <Card padded>
        <Content>
            {questionsAndAnswers.question}
            <div class="icon">
                <IconButton
                    color="secondary"
                    class="material-icons"
                    on:click={() => showHideAnswer()}>
                    {icon}
                </IconButton>
            </div>
        </Content>
        {#if pressed == true}
            <div class="answer" transition:slide>
                {@html questionsAndAnswers.answer}
            </div>
        {/if}
    </Card>
</div>
