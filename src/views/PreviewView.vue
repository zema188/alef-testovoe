<template>
    <div class="container">
        <p class="subtitle">Персональные данные</p>
        <b v-if="userInfo.userName && userInfo.userAge">
            {{ userInfo.userName }},
            {{ formatAge(userInfo.userAge) }}
        </b>
        <b v-else>
            Информация не заполнена
        </b>
        <p class="subtitle">Дети</p>
        <div class="children"
            v-for="children of childrens"
            :key="children.id"
        >
            <b>
                {{ children.name }},
                {{ formatAge(children.age) }}
            </b>
        </div>
        <b v-if="!childrens">
            Информация не заполнена
        </b>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";

const store = useStore()

const childrens = ref([])
const userInfo = ref([])

const formatAge = (age)=> {
    if (age % 10 === 1 && age % 100 !== 11) {
        return `${age} год`;
    } else if ([2, 3, 4].includes(age % 10) && ![12, 13, 14].includes(age % 100)) {
        return `${age} года`;
    } else {
        return `${age} лет`;
    }
}

onMounted(() => {
    childrens.value.length = 0;
        store.getters.childrens.forEach(child => {
            childrens.value.push({ ...child });
    });
    userInfo.value ={...store.getters.userInfo}
})
</script>

<style lang="scss" scoped>
.children {
    color: #000;
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px; /* 150% */
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: flex-start;
    gap: 10px;
    border-radius: 5px;
    background: var(--colors-gray-l, #F1F1F1);
    width: fit-content;
    margin-bottom: 10px;
}
</style>