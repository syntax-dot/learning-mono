<template>
  <div v-if="answer" :class="$style.root">
    <CustomCheckbox
      :group="props.answer.questionId.toString()" :is-checked="answer.isCorrect"
      @click="emit('correct:toggle')"
    />
    <!-- <section>
      <input type="radio"
             :class="$style.radio"
             :checked="answer.isCorrect"
             :name="answer.questionId.toString()"
             @input="emit('correct:toggle')">
    </section> -->

    <BaseInput v-model="currentForm.title" placeholder="Answer title" />

    <BaseSaveRemoveButtons
      :is-save-show="!isEqual(currentForm, initialForm)" @save="saveAnswer"
      @remove="removeAnswer(currentForm.id)"
    />
  </div>
</template>

<script lang="ts" setup>
import type { UpdateAnswerInput } from '@learning-mono/shared'
import { isEqual } from 'lodash'
import { ref, toRef, watch } from 'vue'
import { api } from '../../api'
import { BaseInput } from '../BaseInput'
import { BaseSaveRemoveButtons } from '../BaseSaveRemoveButtons'
import { CustomCheckbox } from '../CustomCheckbox'
import type { AnswersEditFormEmits, AnswersEditFormProps } from './AnswersEditFormProps'

const props = defineProps<AnswersEditFormProps>()

const emit = defineEmits<AnswersEditFormEmits>()

const initialForm = ref(createForm())
const currentForm = ref(createForm())

function createForm(): UpdateAnswerInput {
  return {
    title: props.answer.title,
    id: props.answer.id,
    questionId: props.answer.questionId,
  }
}

async function saveAnswer() {
  await api.answer.update(currentForm.value)

  emit('changed')
}

async function removeAnswer(id: number) {
  await api.answer.remove(id)

  emit('changed')
}

watch(
  toRef(props, 'answer'),
  () => {
    initialForm.value = createForm()
    currentForm.value = createForm()
  },
  { deep: true },
)
</script>

<style module>
.root {
  display: grid;
  align-items: center;
  grid-template-columns: max-content 1fr max-content;
  grid-auto-flow: column;
}

.radio {
  cursor: pointer;
  margin-left: 10px;
  accent-color: #25bc50;
  outline: 2px solid rgba(37, 188, 80, 0.3);
  appearance: none;
  border: 8px solid transparent;
  border-radius: 50%;
}

.radio:focus-visible {
  outline-offset: 0;
}

.radio:hover {
  scale: 1.2;
  outline: 2px solid rgba(37, 188, 80, 1);
}

.radio:checked {
  outline-color: rgba(37, 188, 80, 0.5);
  background-color: rgba(37, 188, 80, 1);

  animation: outline-checked;
  animation-duration: 0.1s;
  animation-iteration-count: 4;
  animation-direction: alternate;
  animation-timing-function: linear;
}

@keyframes outline-checked {
  0% {
    outline-offset: 0;
  }

  100% {
    outline-offset: -0.2rem;
  }
}
</style>
