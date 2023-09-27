<template>
    <div class="container">
        <p class="subtitle">Персональные данные</p>
        <the-input
            :modelValue="userInfo.userName"
            :type="'text'"
            @update:modelValue="(newValue) => userInfo.userName = newValue"
            style="margin-bottom: 10px;"
        >
            Имя
        </the-input>
        <the-input
            :modelValue="userInfo.userAge"
            :type="'number'"
            @update:modelValue="(newValue) => userInfo.userAge = newValue"
            style="margin-bottom: 10px;"
        >
            Возраст
        </the-input>
        <children-form-list
            :childrensInfo="childrensInfo"
            @childrensInfoUpdate="(childrenInfo) => updateInfoChildren(childrenInfo)"
            @deleteChildren="(id) => deleteChild(id)"
        />
        <div class="form__childrens-header"
            style="margin-top: 10px;"
        >
            <p class="subtitle">
                Дети (макс. 5)
            </p>
            <button class="form__childrens-add"
                v-show="childrensInfo.length < 5"
                @click="addChildren()"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.13332 10.8556C4.50125 10.8555 3.98887 11.3679 3.98887 12C3.98887 12.6321 4.50126 13.1445 5.13332 13.1445L10.8554 13.1445L10.8554 18.8668C10.8554 19.4989 11.3678 20.0113 11.9999 20.0113C12.632 20.0113 13.1444 19.4989 13.1444 18.8668L13.1443 13.1445L18.8667 13.1445C19.4988 13.1445 20.0112 12.6321 20.0112 12C20.0112 11.3679 19.4988 10.8556 18.8667 10.8556L13.1443 10.8556L13.1443 5.13338C13.1443 4.50132 12.632 3.98893 11.9999 3.98893C11.3678 3.98893 10.8554 4.50131 10.8554 5.13338L10.8554 10.8556L5.13332 10.8556Z" fill="#01A7FD"/>
                </svg>
                Добавить ребенка
            </button>
        </div>
        <button class="form__save"
            @click="saveForm()"
            :disabled="saveBtnIsDisabled"
        >
            Сохранить
        </button>
    </div>
</template>

<script setup>
import TheInput from "@/components/UI/TheInput";
import ChildrenFormList from "@/components/ChildrenFormList";

import { onMounted, ref, watch } from "vue";
import { useStore } from "vuex";

const store = useStore()

const userInfo = ref({})
const childrensInfo = ref([])
let counterForID = ref(0)
let saveBtnIsDisabled = ref(true)

const updateInfoChildren = (childrenInfo) => {
    const currentChildren = childrensInfo.value.find(children => children.id === childrenInfo.id)
    
    if (currentChildren) {
        for (const key in childrenInfo) {
            if (key !== 'id') {
                currentChildren[key] = childrenInfo[key]
            }
        }
    }
}

const addChildren = () => {
    childrensInfo.value.push({
        id: counterForID.value,
        name: '',
        age: ''
    })
    counterForID.value++
}

const saveForm = () => {
    store.commit('updateForm', {
        userInfo: userInfo.value,
        childrensInfo: childrensInfo.value,
    });
    saveBtnIsDisabled.value = true
}

const deleteChild = (id) => {
    childrensInfo.value = childrensInfo.value.filter(children => children.id !== id);
}

const toggleDisabledSaveBtn = () => {
    console.log(compareObjects(childrensInfo.value, store.getters.childrens))
    if(compareObjects(childrensInfo.value, store.getters.childrens) && userInfo.value.userName === store.getters.userInfo.userName && userInfo.value.userAge === store.getters.userInfo.userAge) {
        console.log('test')
        saveBtnIsDisabled.value = true
        return true
    }
    if (userInfo.value.userName && userInfo.value.userAge) {
        for (const children of childrensInfo.value) {
            if (!(children.name && children.age)) {
                saveBtnIsDisabled.value = true
                return true
            }
        }
        saveBtnIsDisabled.value = false
        return false
    }
    saveBtnIsDisabled.value = true

}

function compareObjects(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false
    }

    for (let i = 0; i < arr1.length; i++) {
        const obj1 = arr1[i]
        const obj2 = arr2[i]

        for (const key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false
            }
        }
    }

    return true
}


watch(
    () => [userInfo, childrensInfo],
    () => {
        toggleDisabledSaveBtn()
    },
    { deep: true }
)

onMounted(() => {
    userInfo.value = {...store.getters.userInfo}
    childrensInfo.value.length = 0;
        store.getters.childrens.forEach(child => {
            childrensInfo.value.push({ ...child });
    });
    counterForID.value = childrensInfo.value.length
    saveBtnIsDisabled.value = true
})

</script>

<style lang="scss">
.subtitle {
    color: var(--colors-black, #111);
    font-family: Montserrat;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 24px; /* 150% */
}
.form__save {
    border-radius: 100px;
    background: var(--colors-primary, #01A7FD);
    padding: 14px 27px;
    color: #fff;
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
}
</style>