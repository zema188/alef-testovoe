<template>
    <div class="form__children">
        <the-input
            :modelValue="childrenInfo.name"
            :type="'text'"
            @update:modelValue="(newValue) => children.name = newValue"
        >
            Имя
        </the-input>
        <the-input
            :modelValue="childrenInfo.age"
            :type="'number'"
            @update:modelValue="(newValue) => children.age = newValue"
        >
            Возраст
        </the-input>
        <button class="form__children-delete"
            @click="$emit('deleteChildren', props.childrenInfo.id)"
        >
            Удалить
        </button>
    </div>
</template>

<script setup>
import TheInput from "@/components/UI/TheInput.vue";
import { onMounted, ref, watch } from "vue";

const props = defineProps({
    childrenInfo: {
        Type: Object,
        required: true,
    }
})

const emit = defineEmits(['childrenInfoUpdate'])

const children = ref({})

watch(
    () => children,
    () => {
        emit('childrenInfoUpdate', children.value)
    },
    { deep: true }
)

onMounted(() => {
    children.value = {...props.childrenInfo}
})
</script>

<style lang="scss" scoped>
.form__children {
    display: flex;
    align-items: center;
    gap: 20px;
    &:not(:last-child) {
        margin-bottom: 10px;
    }
    & .input-w {
        flex: 1;
    }
}
.form__children-delete {
    color: var(--colors-primary, #01A7FD);
    font-family: Montserrat;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 171.429% */
}
</style>