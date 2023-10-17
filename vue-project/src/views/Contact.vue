<script>
import { mapActions } from 'vuex'
import ValidationService from '../services/validation-service';

const validation = new ValidationService();

export default {
    props: ['contactName'],
    data() {
        const contact = this.$store.state.contacts.find(c => c.name === this.contactName);

        return {
            id: contact ? contact.id : null,
            name: contact ? contact.name : '',
            email: contact ? contact.email : '',
            phone: contact ? contact.phone : '',
            group: contact ? contact.group : null,
            date: contact ? contact.date : null,
            nameError: null,
            emailError: null,
            phoneError: null,
            groupError: null,

            valueDropdown: contact ? contact.group : 'Не выбрано',
            isInitialValueDropdown: !contact,
            list: ["Родственники", "Коллеги"],
            visible: false
        }
    },
    methods: {
        ...mapActions([
            'addContactAsync',
            'updateContactAsync',
            'removeContactAsync'
        ]),
        async addContact() {
            const inputsAreValid = this.validateInputs();
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
        removeContact() {
            this.removeContactAsync(this.id);
            this.back();
        },
        back() {
            this.$router.push('/');
        },
        getFormattedDate() {
            const date = new Date();
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear().toString().slice(-2);;
            return `${day}.${month}.${year}`
        },
        validateInputs() {
            this.nameError = validation.validateName(this.name)
            this.emailError = validation.validateEmail(this.email)
            this.phoneError = validation.validatePhone(this.phone)
            this.groupError = validation.validateGroup(this.group)

            if (this.nameError || this.emailError || this.phoneError || this.groupError) {
                return false;
            } else {
                return true;
            }
        },


        toggleDropdown() {
            this.visible = !this.visible;
        },
        selectItem(option) {
            this.group = option;
            this.valueDropdown = option;
            this.isInitialValueDropdown = false;
        }
    }
}
</script>

<template>
    <div class="contact_title">
        <div class="contact_title__name" v-if="!id">
            <img src="../imgs/add-icon.svg" />
            <p> Добавить контакт</p>
        </div>
        <div class="contact_title__name" v-if="id">
            <div class="title__letter">{{ this.name?.charAt(0)?.toUpperCase() }}</div>
            <p>{{ this.name }}</p>
        </div>
        <div @click="back" class="btn-close">
            <img src="../imgs/close.svg" />
        </div>
    </div>

    <div class="contact_container">
        <div class="container_title" v-if="id">
            Контакт
        </div>
        <div class="container_title" v-if="!id">
            Новый контакт
        </div>
        <div class="container_row">
            <p class="container_label">Имя</p>
            <div class="container_input">
                <input v-model="name" :class="{ errorinput: nameError !== null }" class="input" type="text"
                    placeholder="Например «Андрей»...">

                <img v-if="nameError" src="../imgs/invalid-icon.svg" />
                <span class="error-text" v-if="nameError">{{ nameError }}</span>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">Телефон</p>
            <div class="container_input">
                <input v-model="phone" :class="{ errorinput: phoneError !== null }" placeholder="+7 (___) ___ __ __"
                    class="input" v-maska data-maska="+7(###)-###-##-##" />
                <img v-if="phoneError" src="../imgs/invalid-icon.svg" />
                <span class="error-text" v-if="phoneError">{{ phoneError }}</span>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">E-mail</p>
            <div class="container_input">
                <input v-model="email" :class="{ errorinput: emailError !== null }" class="input"
                    placeholder="Например «pochta@domain.ru»...">
                <img v-if="emailError" :class="{ active: emailError === null }" src="../imgs/invalid-icon.svg" />
                <span class="error-text" v-if="emailError">{{ emailError }}</span>
            </div>
        </div>
        <div class="container_row">
            <p class="container_label">Категория</p>
            <div class="container_input">
                <div class="input selectGroup" :class="{ errorinput: groupError !== null }" @click="toggleDropdown()"
                    :data-value="valueDropdown" :data-list="list">
                    <span class="error-text" v-if="groupError">{{ groupError }}</span>
                    <div class="selector" :class="{ errorselector: groupError !== null }">
                        <div class="label" :class="{ 'gray-text': isInitialValueDropdown }">
                            {{ valueDropdown }}
                        </div>
                        <div class="arrow" :class="{ expanded: visible }"></div>
                        <div :class="{ hidden: !visible, visible }">
                            <ul>
                                <li :class="{ current: item === valueDropdown }" v-for=" item  in  list "
                                    @click="selectItem(item)">{{ item }}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="id" class="container_row">
            <p class="container_label">Создан</p>
            <p class="date_label">{{ this.date }}</p>
        </div>
        <div class="container_row__buttons">
            <div class="space"></div>
            <div class="container_buttons">
                <button @click="addContact" class="btn-save">
                    <img v-if="!this.$store.state.contactSaving" src="../imgs/save.svg" />
                    <img v-if="this.$store.state.contactSaving" src="../imgs/loader.svg" />
                    СОХРАНИТЬ
                </button>
                <button @click="removeContact" v-if="id" class="btn-remove">
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
    height: 3rem;
    display: flex;
    justify-content: end;
    align-items: center;
}

.contact_title__name {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
        font-weight: 700;
        font-size: 20px;
    }

    img {
        padding-right: 8px;
    }
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

.title__letter {
    text-transform: uppercase;
    background-color: var(--bg-yellow);
    border-radius: 50%;
    padding: 3px;
    width: 26px;
    height: 26px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    text-align: center;
    color: var(--text);
    align-items: center;
    margin-right: 8px;
}


.container_row {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
    margin-bottom: 17px;
}
.container_row__buttons {
    display: grid;
    grid-template-columns: 1fr 3fr;
    gap: 2rem;
    margin-top: 0;
    padding-top: 1rem;
}

.container_label {
    justify-content: center;
    font-weight: 700;
    margin-top: 10px;
}

.date_label{
    margin-top: 10px;
}

.container_input {
    position: relative;
}

.container_input img {
    position: absolute;
    right: .5rem;
    top: 25%;
    margin-left: 40px;
    z-index: 100;
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
    padding: 8px 1.5rem 8px 8px;
    border-radius: 4px;
    border: 1px solid #DDD;
    background-color: var(--bg-white);
    outline: none;
    caret-color: var(--blue);
    font-family: 'Proxima Nova', sans-serif;

    &:hover,
    &:active {
        border: 1px solid var(--blue);
    }
}

::placeholder {
    color: #A9A9A9;
}

.selectGroup {
    position: relative;
    cursor: pointer;

    .selector {
        .expanded {
            transform: rotateZ(180deg) translateY(2px);
        }

        .label {
            line-height: normal;
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
    }

    .hidden {
        visibility: hidden;
    }

    .visible {
        visibility: visible;
    }
}

.arrow {
    position: absolute;
    right: 12px;
    top: 40%;
    width: 0;
    z-index: 10;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid rgba(169, 169, 169, 1);
    transform: rotateZ(0deg) translateY(0px);
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(.59, 1.39, .37, 1.01);
}

.container_buttons {
    display: flex;
    gap: 24px;
}

.space {
    display: block
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

.gray-text {
    color: #A9A9A9;
}

.active {
    display: none;
}

.errorinput {
    border: 1px solid var(--red);

    &::placeholder {
        color: var(--red);
    }
}

.errorselector {
    .arrow {
        border-top: 5px solid var(--red);
    }

    .label {
        color: var(--red);
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

.message_container {
    position: absolute;
    bottom: 3rem;
    left: 2rem;
}

@media (max-width: 770px) {
    .container_title {
        font-size: 24px;
    }

    .container_label,
    .input,
    .container_row p,
    .selectGroup li,
    .selector .label,
    .btn-save,
    .btn-remove {
        font-size: 12px;
    }

    .btn-save {
        width: 124px;
        padding: 10px 8px;
    }

    .contact_title__name p {
        font-size: 14px;
    }

    .title__letter {
        width: 20px;
        height: 20px;
        font-size: 10px;
    }
}

@media (max-width: 578px) {
    .message_container {
        bottom: auto;
        left: 40%;
        top: 70px;
    }

    .contact_container {
        padding: 2rem 3rem 3rem 3rem;
        margin-left: 12px;
        margin-right: 12px;
    }
}


@media screen and (max-width: 378px) {
    .message_container {
        bottom: auto;
        left: 20%;
        top: 70px;
    }

    .contact_container {
        padding: 32px 20px 48px 20px;
    }

    .space {
        display: none;
    }

.container_row__buttons {
        display: grid;
        grid-template-columns: 1fr;
        margin-bottom: 1rem;
        justify-items: center;
    }
    
}
</style>