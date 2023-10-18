<script>

</script>

<template>
    <div class="message">
        <img src="../imgs/ok.svg" />
        <p>{{ this.$store.state.message }}</p>
    </div>
</template>

<style lang="scss">
.message {
    background-color: var(--bg-white);
    border-radius: 4px;
    box-shadow: 0px 0px 16px 0px rgba(176, 197, 222, 0.50);
    width: auto;
    padding: 16px 12px 16px 8px;
    display: inline-flex;
    gap: 4px;
    align-items: center;
}

@media screen and (max-width: 770px) {
    .message {
        font-size: 12px;
    }
}

@media screen and (max-width: 578px) {
    .message {
        background-color: var(--text);
        border-radius: 40px;
        padding: 12px 16px;
        box-shadow: 0px 0px 20px 0px rgba(176, 197, 222, 0.50);
        color: var(--bg-white);
        padding: 12px 16px;
    }
}
</style>