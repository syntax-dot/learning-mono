<template>
  <div v-if="themeData"
       :class="$style.root">
    <div :class="$style.theme">
      <h1>{{ '>> ' + themeData.title }} </h1>
      <ProgressBar :ammount="shuffledQuestions.length"
                   :current="index"/>
    </div>
    <hr width="100%" color="#19e57c">

    <div v-if="!editMode">
      <div :class="$style.title">
        <h1 :key="currentQuestion.id">
          <BaseText :text="currentQuestion.title"/>
        </h1>
        <hr width="100%" color="#19e57c">
        ({{ index + 1 }} OF {{ shuffledQuestions.length }})
      </div>

      <div :key="currentQuestion.id">
        <AnswerRow v-for="answer in currentQuestion.answers"
                   :key="answer.id"
                   :answer="answer"
                   @click="handleAnswerClick(answer)"/>
      </div>

      <BaseButton :buttonSize="ButtonSize.L"
                  text=">>>"
                  :class="$style.next"
                  @click="moveToNext"/>
    </div>

    <div v-else>
      <QuestionEditForm v-for="question in shuffledQuestions"
                        :key="question.id"
                        :question="question"
                        @changed="fetchTheme"/>

      <CreateQuestion :themeId="parseInt(themeId)"
                      @created="fetchTheme"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch, watchEffect } from 'vue'
import { shuffle } from 'lodash'
import { useRouter } from 'vue-router'
import { api } from '../api'
import { themeData } from '../store/themeData'
import { AnswerDto } from '@learning-mono/shared'
import { BaseButton, ButtonSize } from '../components/BaseButton'
import { AnswerRow } from '../components/AnswerRow'
import { QuestionEditForm } from '../components/QuestionEditForm'
import { editMode } from '../store/editmode'
import { ProgressBar } from '../components/ProgressBar'
import { CreateQuestion } from '../components/CreateQuestion'
import BaseText from '../components/BaseText/BaseText.vue'

interface Props {
  themeId: string
}

const props = defineProps<Props>()

const router = useRouter()

const index = ref(0)

function moveToNext() {
  if (shuffledQuestions.value.length - 1 > index.value)
    ++index.value
}

function handleAnswerClick(answer: AnswerDto) {
  answer.isSelected = true
  moveToNext()
}

const currentQuestion = computed(() => shuffledQuestions.value[index.value])

const shuffledQuestions = computed(() => {
  if (editMode.value)
    return (themeData.value?.questions ?? [])

  return shuffle(themeData.value?.questions ?? [])
})

watchEffect(fetchTheme)

async function fetchTheme() {
  themeData.value = await api.theme.getById(props.themeId)
}

watch(
  () => index.value + 1 === shuffledQuestions.value.length,
  value => value && router.push({
    name: 'statistic',
  }),
)
</script>

<style module>
.root {
  display: grid;
  text-align: left;
  padding: 16px;
  align-items: start;
  justify-items: start;
  user-select: none;
}

.theme {
  display: flex;
  margin: 20px;
}

.next {
  background: transparent;
  color: #19e57c;
  border: 0;
  padding: 16px;
  margin-left: 40px;
  margin-top: 40px;
  font-size: 18px;
  opacity: 0.4;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  user-select: none;

}
.next:hover {
  opacity: 1;
  background: #19e57c;
  color: #000;
}

.title {
  padding: 40px 40px;
}
</style>