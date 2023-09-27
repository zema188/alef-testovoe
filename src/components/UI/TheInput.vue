<template>
    <div class="input-w">
        <span>
            <slot></slot>
        </span>
        <input 
            :placeholder="props.placeHolder"
            :value="props.modelValue"
            :type="props.type"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>

<script setup>
 const props = defineProps({
    modelValue: {
        type: String,
        default: ""
    },
    placeHolder: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        default: "text"
    }
 })
</script>

<style lang="scss">
.input-w {
    position: relative;
    border-radius: 4px;
    border: 1px solid var(--colors-gray-l, #F1F1F1);
    background: var(--colors-white, #FFF);
    & span {
        position: absolute;
        left: 10px;
        top: 5px;
        color: var(--colors-gray, rgba(17, 17, 17, 0.48));
        font-family: Montserrat;
        font-size: 13px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    & input {
        color: var(--colors-black, #111);
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 171.429% */
        width: 100%;
        border-radius: 4px;
        background: transparent;
        padding: 16px 10px;
    }
}
</style>