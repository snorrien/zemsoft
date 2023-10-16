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
            emailError: null,
            phoneError: null,

            valueDropdown: 'ВСЕ',
            list: ["ВСЕ", "Родственники", "Коллеги"],
            visible: false,
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
            this.validatePhone()

            if (this.nameError || this.emailError || this.phoneError) {
                return false;
            } else {
                return true;
            }
        },
        validateName() {
            const value = this.name
            if (value.length < 3) {
                this.nameError = 'Слишком короткое имя'
            } else if (value.length === 0) {
                this.nameError = 'Поле не можеть быть пустым'
            } else {
                this.nameError = null;
            }
        },
        validatePhone() {
            const value = this.phone;
            if (value.length < 17) {
                this.phoneError = 'Некорректный номер'
            } else if (value.length === 0) {
                this.phoneError = 'Поле не можеть быть пустым'
            } else {
                this.phoneError = null;
            }
        },
        validateEmail() {
            const value = this.email;
            console.log('email')
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                this.emailError = null
            } else if (value.length === 0) {
                this.emailError = 'Поле не можеть быть пустым'
            } else {
                this.emailError = 'Некорректный e-mail'
            }
        },
        toggleDropdown() {
            this.visible = !this.visible;
        },
        selectItem(option) {
            this.valueDropdown = option;

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
            <div class="container_input">
                <input v-model="name" class="input" type="text" placeholder="Например «Андрей»...">
                <img :class="{ active: nameError === null }" src="../imgs/invalid-icon.svg" />
                <span class="error-text" v-if="nameError">{{ nameError }}</span>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">Телефон</p>
            <div class="container_input">
                <input v-model="phone" placeholder="+7 (___) ___ __ __" class="input" v-maska
                    data-maska="+7(###)-###-##-##" />
                <img :class="{ active: phoneError === null }" src="../imgs/invalid-icon.svg" />
                <span class="error-text" v-if="phoneError">{{ phoneError }}</span>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">E-mail</p>
            <div class="container_input">
                <input v-model="email" class="input" placeholder="Например «pochta@domain.ru»...">
                <img :class="{ active: emailError === null }" src="../imgs/invalid-icon.svg" />
                <span class="error-text" v-if="emailError">{{ emailError }}</span>
            </div>
        </div>
        <div class="container_row">

            <p class="container_label">Категория</p>
            <div class="container_input">
                <div class="input aselect" :data-value="valueDropdown" :data-list="list">
                    <div class="selector" @click="toggleDropdown()">
                        <div class="label">
                            {{ valueDropdown }}
                        </div>
                        <div class="arrow" :class="{ expanded: visible }"></div>
                        <div :class="{ hidden: !visible, visible }">
                            <ul>
                                <li :class="{ current: item === valueDropdown }" v-for="item in list"
                                    @click="selectItem(item)">{{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
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

.error-text {
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

.aselect {
    position: relative;
    cursor: pointer;

    .selector {
        z-index: 1;

        .arrow {
            position: absolute;
            right: 12px;
            top: 40%;
            width: 0;
            height: 0;
            border-left: 5px solid transparent;
            border-right: 5px solid transparent;
            border-top: 5px solid rgba(169, 169, 169, 1);
            transform: rotateZ(0deg) translateY(0px);
            transition-duration: 0.3s;
            transition-timing-function: cubic-bezier(.59, 1.39, .37, 1.01);
        }

        .expanded {
            transform: rotateZ(180deg) translateY(2px);
        }

        .label {
            line-height: normal;
        }

        .label  {
            font-weight: 700;
            &:hover{
                font-weight: 400;
            }
        }
    }

    ul {
        width: 100%;
        list-style-type: none;
        padding: 0;
        margin: 0;
        background-color: var(--bg-white);
        position: absolute;
        left: -2px;
        top: 42px;
        z-index: 1;
        border-radius: 4px;
        box-shadow: 0px 0px 6px 0px rgba(148, 181, 225, 0.35);
    }

    li {
        padding: 10px 8px 10px 16px;

        &:hover {
            background: var(--bg-l-blue);
            font-weight: 400;
        }
    }

    .current {
        background-image: url("../imgs/choose-yes.svg");
        background-repeat: no-repeat;
        background-position: calc(100% - 8px) center;
        font-weight: 700;
    }

    .hidden {
        visibility: hidden;
    }

    .visible {
        visibility: visible;
    }
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

.active {
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