<script>
import { mapActions } from 'vuex'

export default {
    methods: {
        createContact() {
            this.$router.push('/contact');
        },
        editContact(contact) {
            this.$router.push(`/contact/${contact.name}`)
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
            <div>все</div>
            <button class="btn-add" @click="createContact">
                +
                <p class="text">Добавить контакт</p>
            </button>
        </div>
    </div>

    <div class="contacts_table">
        <div class="contacts_title grid">
            <div>КОНТАКТ</div>
            <div>ТЕЛЕФОН</div>
            <div>E-MAIL</div>
            <div class="col-data">СОЗДАН</div>
        </div>
        <div class="contacts_row grid" v-for="contact in this.$store.state.contacts" @click="editContact(contact)">
            <div>
                <div class="contact_name">
                    <div class="contact_letter">{{ contact.name?.charAt(0)?.toUpperCase() ?? "-" }}</div>
                    <p>{{ contact.name }}</p>
                </div>
            </div>
            <div class="contact_phone">{{ contact.phone }}</div>
            <div class="contact_email">{{ contact.email }}</div>
            <div class="col-date">{{ contact.date }}</div>
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
    margin-left: 1rem;
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
    font-size: 20px;
    text-transform: uppercase;

    &:hover {
        cursor: pointer;
    }
}

.btn-add p {
    font-weight: 700;
    font-size: 12px;
}

.contacts_table {

    margin-left: auto;
    margin-right: auto;
    max-width: 990px;
}

.grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1.5fr 1fr;
    align-items: center;
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


@media screen and (max-width: 770px) {
    .title {
        height: 40px
    }
}
</style>