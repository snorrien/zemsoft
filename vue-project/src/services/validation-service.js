export default class ValidationService {
    emptyErrorMessage = 'Поле не можеть быть пустым'

    validateName(value) {
        if (value.length === 0) {
            return this.emptyErrorMessage
        } else if (value.length < 3) {
            return 'Слишком короткое имя'
        } else {
            return null
        }
    }

    validatePhone(value) {
        if (value.length === 0) {
            return this.emptyErrorMessage
        } else if (value.length < 17) {
            return 'Некорректный номер'
        } else {
            return null;
        }
    }

    validateEmail(value) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
            return null
        } else if (value.length === 0) {
            return this.emptyErrorMessage
        } else {
            return 'Некорректный e-mail'
        }
    }

    validateGroup(value) {
        if (value) {
            return null
        } else {
            return this.emptyErrorMessage
        }
    }
}