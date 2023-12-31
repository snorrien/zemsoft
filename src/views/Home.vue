<script>
import { mapActions } from 'vuex'

export default {
    data() {
        const initialContacts = this.$store.state.contacts.sort(c => c.date)
        return {
            valueDropdown: 'ВСЕ',
            list: ["ВСЕ", "Родственники", "Коллеги"],
            visible: false,
            contacts: [...initialContacts],
            initialContacts: [...initialContacts],
        }
    },
    methods: {
        createContact() {
            this.$router.push('/contact');
        },
        editContact(contact) {
            this.$router.push(`/contact/${contact.name}`)
        },
        toggleDropdown() {
            this.visible = !this.visible;
        },
        selectItem(option) {
            this.valueDropdown = option;
            if (option === 'ВСЕ') {
                this.contacts = this.initialContacts;
            } else {
                this.contacts = this.initialContacts.filter(c => c.group === option);
            }
        }
    },
}
</script>

<template>
    <div class="title">
        <img class="logo" src="../imgs/logo.png" alt="logo" />
        Книга контактов
    </div>

    <div class="navigate">
        <div class="navigate_container">

            <div class="filter" @click="toggleDropdown()">
                <div class="input selectFilter" :data-value="valueDropdown" :data-list="list">
                    <div class="selector">
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

            <button class="btn-add" @click="createContact">
                +
                <p class="text">Добавить <span>контакт</span></p>
            </button>
        </div>
    </div>

    <div class="contacts_table">
        <div class="contacts_title grid">
            <div>КОНТАКТ</div>
            <div class="sm_grid sm_grid__titles">
                <div>ТЕЛЕФОН</div>
                <p class="split">&nbsp/&nbsp</p>
                <div>E-MAIL</div>
            </div>
            <div class="col-date">СОЗДАН</div>
        </div>
        <div class="cont">
            <div class="contacts_row grid" v-for="contact in this.contacts" @click="editContact(contact)">
                <div>
                    <div class="contact_name">
                        <div class="contact_letter">{{ contact.name?.charAt(0)?.toUpperCase() ?? "-" }}</div>
                        <p>{{ contact.name }}</p>
                    </div>
                </div>
                <div class="sm_grid">
                    <div class="contact_phone">{{ contact.phone }}</div>
                    <div class="contact_email">{{ contact.email }}</div>
                </div>
                <div class="col-date">{{ contact.date }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.title {
    background-color: var(--bg-black);
    color: var(--title-text);
    text-transform: uppercase;
    font-weight: 700;
    font-size: 18px;
    padding: 10px;
    height: 48px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.logo {
    margin-left: 3rem;
    margin-right: 1rem;
    caret-color: transparent;
}

.navigate {
    background-color: var(--bg-grey);
    border: var(--bg-grey-board);
}

.navigate_container {
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    margin-right: auto;
    max-width: 990px;
    height: 56px;
    align-items: center;
    flex-shrink: 0;
}

.btn-add {
    display: flex;
    padding: 8px 16px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 28px;
    border: 1px solid var(--blue);
    background-color: var(--bg-grey);
    color: var(--blue);
    font-size: 12px;
    text-transform: uppercase;

    &:hover {
        cursor: pointer;
    }
}

.btn-add p, .btn-add span {
    font-weight: 700;
    font-size: 12px;
    display: inline;
}

.filter {
    width: 235px;
}

.selectFilter {
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

        .label {
            font-weight: 700;

            &:hover {
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

.contacts_table {
    margin-left: auto;
    margin-right: auto;
    max-width: 990px;
    margin-top: 1rem;
}

.grid {
    display: grid;
    grid-template-columns: 2.2fr 2.5fr 1fr;
    align-items: center;
}

.sm_grid {
    display: grid;
    grid-template-columns: 200px 208px;
    align-items: center;
}

.split{
    display: none;
}

.contacts_row {
    height: 3rem;
}

.cont .contacts_row:not(:first-child) {
    border-top: 1px solid #EAF2FD;
}

.contacts_title {
    color: var(--grey-text);
    font-size: 10px;
}

.contact_letter {
    text-transform: uppercase;
    background-color: var(--bg-yellow);
    border-radius: 50%;
    padding: 3px;
    width: 26px;
    font-size: 12px;
    font-weight: 700;
    display: flex;
    justify-content: center;
    text-align: center;
}

.contact_name {
    display: flex;
    text-align: center;
    gap: 8px;
}

.contact_phone,
.contact_email {
    font-size: 12px;
}

.col-date {
    text-align: end;
}

@media (max-width: 996px) {

    .navigate_container,
    .contacts_table {
        margin-left: 2rem;
        margin-right: 2rem;
    }
}

@media screen and (max-width: 770px) {
    .title {
        height: 40px
    }

    .contact_name, .col-date {
        font-size: 12px;
    }
}

@media screen and (max-width: 578px) {

    .navigate_container,
    .contacts_table {
        margin-left: 12px;
        margin-right: 12px;
    }

    .sm_grid {
        display: grid;
        grid-template-columns: 1fr;
    }

    .sm_grid__titles {
        display: flex;
    }

    .split{
        display: block;
    }
}


@media screen and (max-width: 378px) {
    .title {
        height: 40px
    }
    .col-date {
        font-size: 10px;
    }
    .btn-add span{
        display: none;
    }
    .filter {
        width: 219px;
    }
    .contact_letter{
        display: none;
    }
}
</style>