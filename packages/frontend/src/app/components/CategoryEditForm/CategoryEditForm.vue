<template>
  <div v-if="editMode"
       :class="$style.category_edit">
    <BaseInput v-model="currentForm.title"
               placeholder="Category title"/>

    <BaseInput v-model="currentForm.image"
               placeholder="Link to image"/>

    <BaseSaveRemoveButtons :isSaveShow="!isEqual(currentForm, initialForm)"
                           @save="saveCategory"
                           @remove="removeCategory(currentForm.id)"/>
  </div>
</template>

<script lang="ts" setup>
import { CategoryEditFormEmits, CategoryEditFormProps } from './CategoryEditForm.props'
import { ref } from 'vue'
import { api } from '../../api'
import { user } from '../../store/user'
import { editMode } from '../../store/editmode'
import { UpdateCategoryInput } from '@learning-mono/shared'
import { BaseInput } from '../BaseInput'
import BaseSaveRemoveButtons from '../BaseSaveRemoveButtons/BaseSaveRemoveButtons.vue'
import { isEqual } from 'lodash'

const props = defineProps<CategoryEditFormProps>()
const emit = defineEmits<CategoryEditFormEmits>()

const currentForm = ref(createForm())
const initialForm = ref(createForm())

function createForm(): UpdateCategoryInput {
  return {
    title: props.category.title,
    image: props.category.image,
    id: props.category.id,
  }
}

async function saveCategory() {
  await api.category.update(currentForm.value)
  initialForm.value = createForm()
  currentForm.value = createForm()

  emit('changed')
}

async function removeCategory(id: number) {
  await api.category.remove(id)

  emit('removed')
}

if (!initialForm.value.title && !initialForm.value.image && user.value?.isAdmin)
  editMode.value = true
</script>

<style module>
.category_edit {
  display: grid;
  /*grid-template-rows: 1fr 1fr;*/
  grid-template-columns: 1fr 1fr;
}
</style>