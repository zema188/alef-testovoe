<template>
    <div class="form__childrens-list">
        <children-form
            v-for="children in props.childrensInfo"
            :key="children.id"
            :childrenInfo="children"
            @childrenInfoUpdate="childrenInfo => $emit('childrensInfoUpdate', childrenInfo)"
            @deleteChildren="(id) => $emit('deleteChildren', id)"
        />
    </div>
</template>

<script setup>
import ChildrenForm from "@/components/ChildrenForm.vue";

const props = defineProps({
    childrensInfo: {
        type: Array,
        required: true,
    }
})

</script>

<style lang="scss">
.form {

    &__childrens {
        padding-top: 20px;
        margin-bottom: 30px;
    }

    &__childrens-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }

    &__childrens-add {
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--colors-primary, #01A7FD);
        text-align: center;
        font-family: Montserrat;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; /* 171.429% */
        border-radius: 100px;
        border: 2px solid var(--colors-primary, #01A7FD);
        padding: 10px 15px;
    }
}
footer {
    padding: 20px 15px;
    background: var(--colors-gray-m, #FAFAFA);
    text-align: center;
    box-shadow: 0px 1px 0px 0px rgba(17, 17, 17, 0.10);
    margin-top: 20px;
}
</style>