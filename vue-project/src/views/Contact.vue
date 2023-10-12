<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        ...mapActions([
            'addContactAsync',
            'closeContact'
        ]),
        async addContact() {
            await this.addContactAsync({
                name: this.name,
                email: this.email,
                phone: this.phone,
                group: this.group,
                date: new Date()
            })
        },
        back() {
            this.$router.push('/');
            this.closeContact();
        }
    }
}
</script>

<template>
    <div class="contact_title">
        <div class="contact_title__name">Name</div>
        <div @click="back" class="btn-close">
            <img src="../imgs/close.svg" />
        </div>
    </div>

    <div class="contact_container">
        <div class="container_title">
            Контакт
        </div>

        <div class="container_row">
            <p class="container_label">Имя</p>
            <input v-model="this.$store.state.contact.name" class="container_input" type="text" name="name" placeholder="Например «Андрей»...">
        </div>
        <div class="container_row">
            <p class="container_label">Телефон</p>
            <input v-model="this.$store.state.contact.phone" class="container_input" type="phone" name="phone" placeholder="Например «Андрей»..." />
        </div>
        <div class="container_row">
            <p class="container_label">E-mail</p>
            <input v-model="this.$store.state.contact.email" class="container_input" type="email" placeholder="Например «pochta@domain.ru»...">
        </div>
        <div class="container_row">
            <p class="container_label">Категория</p>
            <div>
                <select v-model="this.$store.state.contact.group" class="container_input" placeholder="Например «Андрей»..." >
                    <option>Не выбрано</option>
                    <option>Родственники</option>
                    <option>Коллеги</option>
                </select>
            </div>
        </div>

        <div v-if="this.$store.state.contact.date" class="container_row">
            <p class="container_label">Создан</p>
            <p>{{this.$store.state.contact.date}}</p>
        </div>

        <div class="container_row">
            <div></div>
            <div class="container_buttons">
                <button @click="addContact" class="btn-save">
                    <img v-if="!this.$store.state.contactSaving" src="../imgs/save.svg" />
                    <img v-if="this.$store.state.contactSaving" src="../imgs/loader.svg"/>
                    СОХРАНИТЬ
                </button>
                <button class="btn-remove">
                    <img src="../imgs/bascet.svg" />
                    Удалить контакт
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.contact_title {
    background-color: var(--bg-black);
    color: var(--title-text);
    font-weight: 700;
    font-size: 20px;
    height: 3rem;
    display: flex;
    justify-content: end;
    align-items: center;

}

.contact_title__name {
    width: 100%;
    display: flex;
    justify-content: center;
}

.btn-close {
    cursor: pointer;
    align-items: center;
    display: flex;
    padding-right: 2rem;
    caret-color: transparent;
}

.contact_container {
    margin-top: 24px;
    background-color: var(--bg-white);
    margin-left: auto;
    margin-right: auto;
    max-width: 704px;
    padding: 3rem 4rem 4rem 4rem;
    box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);
}

.container_title {
    font-size: 32px;
    font-weight: 700;
    height: 39px;
    display: flex;
    align-items: center;
    margin-bottom: 24px;
}

.container_row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
    margin-bottom: 1rem;
}

.container_label {
    justify-content: center;
    font-weight: 700;
}

.container_input {
    width: 100%;
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #DDD;
    background-color: var(--bg-white);
    outline: none;
    caret-color: var(--blue);

    &:hover,
    &:active {
        border: 1px solid var(--blue);
    }
}

::placeholder {
    color: #A9A9A9;
}

.container_buttons {
    display: flex;
    gap: 24px;
}

.btn-save {
    display: flex;
    padding: 12px 16px;
    justify-content: center;
    align-items: center;
    border: none;
    gap: 4px;
    border-radius: 4px;
    background-color: var(--bg-yellow);
    font-weight: 700;
    text-transform: uppercase;
    color: var(--text);
    width: 136px;
    cursor: pointer;

    &:hover {
        background-color: var(--click-yellow);
    }

    &:active {
        background-color: var(--active-yellow);
    }
}

.btn-remove {
    background-color: var(--bg-white);
    border: none;
    padding: 0;
    cursor: pointer;
    caret-color: transparent;
    color: var(--blue);
}
</style>