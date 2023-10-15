<script>
import { mapActions } from 'vuex'
import Message from './Message.vue'


export default {
    props: ['contactName'],
    components: {
        Message
    },
    data() {
        console.log(this.contactName)
        const contact = this.$store.state.contacts.find(c => c.name === this.contactName);
        return {
            id: contact ? contact.id : '',
            name: contact ? contact.name : '',
            email: contact ? contact.email : '',
            phone: contact ? contact.phone : '',
            group: contact ? contact.group : '',
            date: contact ? contact.date : null,
            nameError: null,
            emailError: null
        }
    },
    methods: {
        ...mapActions([
            'addContactAsync',
            'updateContactAsync'
        ]),
        async addContact(e) {
            const inputsAreValid = this.validateInputs();
            console.log(inputsAreValid)
            if (!inputsAreValid) {
                return;
            }

            if (this.contactName) {
                await this.updateContactAsync({
                    id: this.id,
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    group: this.group,
                    date: this.date
                });
            } else {
                await this.addContactAsync({
                    name: this.name,
                    email: this.email,
                    phone: this.phone,
                    group: this.group,
                    date: this.getFormattedDate()
                })
            }
        },
        back() {
            this.$router.push('/');
        },
        getFormattedDate() {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            return `${day}.${month}.${year}`
        },
        validateInputs() {
            this.validateName()
            this.validateEmail()

            if (this.nameError || this.emailError) {
                return false;
            } else {
                return true;
            }
        },
        validateName() {
            const value = this.name
            if (value.length <= 3) {
                this.nameError = 'Слишком короткое имя'
            } else if (value.length === 0) {
                this.nameError = 'Поле не можеть быть пустым'
            } else {
                this.nameError = null;
            }

        },
        validateEmail() {
            const value = this.email;
            console.log('email')
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.emailError = null
            } else if (value.length === 0) {
                this.emailError = 'Поле не можеть быть пустым'
            }else {
                this.emailError = "Некорректный e-mail"
            }
        },
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
            <div class="container_input">
                <input v-model="name" class="input" type="text" placeholder="Например «Андрей»...">
                <img :class="{ active: nameError === null }" src="../imgs/invalid-icon.svg" />
                <span v-if="nameError">{{ nameError }}</span>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">Телефон</p>
            <div class="container_input">
                <input v-model="phone" placeholder="+7 (___) ___ __ __" class="input"  v-maska data-maska="+7(###)-###-##-##"/>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">E-mail</p>
            <div class="container_input">
                <input v-model="email" class="input" placeholder="Например «pochta@domain.ru»...">
                <img :class="{ active: emailError === null }" src="../imgs/invalid-icon.svg" />
                <span v-if="emailError">{{ emailError }}</span>
            </div>
        </div>
        <div class="container_row">

            <p class="container_label">Категория</p>
            <div>
                <div class="container_input">
                    <select v-model="group" class="input">
                        <option>ВСЕ</option>
                        <option>Родственники</option>
                        <option>Коллеги</option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="date" class="container_row">
            <p class="container_label">Создан</p>
            <p>{{ this.date }}</p>
        </div>

        <div class="container_row">
            <div></div>
            <div class="container_buttons">
                <button @click="addContact" class="btn-save">
                    <img v-if="!this.$store.state.contactSaving" src="../imgs/save.svg" />
                    <img v-if="this.$store.state.contactSaving" src="../imgs/loader.svg" />
                    СОХРАНИТЬ
                </button>
                <button class="btn-remove">
                    <img src="../imgs/bascet.svg" />
                    Удалить контакт
                </button>
            </div>
        </div>
    </div>
    <div class="message_container">
        <Message />
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
    position: relative;
}

.container_input img {
    position: absolute;
    right: .5rem;
    top: 25%;
    margin-left: 40px;
}

.container_input span {
    position: absolute;
    right: 0;
    top: 100%;
    color: var(--red);
    font-size: 10px;
}

.input {
    width: 100%;
    padding: .5rem 1.5rem .5rem .5rem;
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

.active{
    display: none;
}

.btn-remove {
    background-color: var(--bg-white);
    border: none;
    padding: 0;
    cursor: pointer;
    caret-color: transparent;
    color: var(--blue);
}

.message_container {
    position: absolute;
    bottom: 3rem;
    left: 2rem;
}
</style>