<script setup lang="ts">
import { computed } from 'vue';
import { Exercise } from "../../../types/types";
import { workoutStore } from '../../../store/workoutStore';
import { findExerciseIndex } from '../../../utils/findByIndex';
import FormSelect from '../form/FormSelect.vue';

    interface Props {
            name: Exercise;
            options: string[];
        }

    const props = defineProps<Props>()

    const repetitions = computed(() => {
        return new Array(Number(workoutStore.series)).fill(0)
    })

    const exerciseIndex = findExerciseIndex(workoutStore.exercises, props.name);

    function handleChange() {
        workoutStore.exercises[exerciseIndex].repetitions = repetitions.value;
    }

</script>


<template>
    <article class="exercise">
        <FormSelect :name="props.name" :options="options" />
        <div>
            <label class="label">Repetitions: </label>
            <input v-for="(_num, index) in repetitions" v-model="repetitions[index]" @input="handleChange" name="reps" type="number" min="0" max="30" class="input"/>
        </div>
    </article>
</template>


<style scoped>
    .exercise {
        display: flex;
        flex-direction: column;
        margin-bottom: 0.5rem;
    }

    .label {
        color: #E3F5AB;
        font-weight: 100;
    }
    .input {
        margin-left: 0.5rem;
        border-radius: 2px;
        border: 1px solid #1b1b1b;
        background-color: #ecfeff;
    }

    .input:focus{
        outline: 1px solid #E3F5AB;
    }
</style>