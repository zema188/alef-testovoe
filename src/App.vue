<template>
    <div class="wrapper">
        <header class="header-w">
            <div class="header">
                <router-link to="/">
                    <img src="@/assets/icons/logo.svg" alt="ALEF">
                </router-link>
                <nav>
                    <router-link to="/">Форма</router-link>
                    <router-link to="/preview">Превью</router-link>
                </nav>
            </div>
        </header>
        <router-view/>
        <footer>
            all rights reserved
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.wrapper {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column
}
.header-w {
    border-bottom: 1px solid #969696;
    padding: 20px 15px;
    margin-bottom: 30px;
}
.header {
    display: flex;
    align-items: center;
    gap: 20px;
    max-width: 1400px;
}
nav {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>
