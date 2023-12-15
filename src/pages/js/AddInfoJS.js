
import {IMaskDirective} from "vue-imask";

export default {
    data() {
        return {
            phone: '',
            surname: '',
            firstName: '',
            errors: {}
        }
    },
    methods: {
        clearError(errorID) {
            delete this.errors[errorID];
        },
        async addInfo() {
            try {
                const username = localStorage.getItem('username');
                if (!username || !this.validatePhone() || !this.validateSurname() || !this.validateFirstName()) {
                    return;
                }
                const responseAddInfo = await fetch('http://localhost:3000/addInfo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        phone: this.phone,
                        surname: this.surname,
                        firstName: this.firstName,
                    }),
                });

                if (responseAddInfo.ok) {
                    console.log("Information added successfully!");
                } else {
                    console.error('Error:', responseAddInfo.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        validateSurname() {
            if (!this.surname.trim()) {
                this.errors.surname = '(!) Заповніть поле Прізвище';
                return false;
            } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(this.surname)) {
                this.errors.surname = '(!) Поле Прізвище не повинно містити цифри';
                return false;
            } else {
                return true;
            }
        },
        validateFirstName() {
            if (!this.firstName.trim()) {
                this.errors.firstName = '(!) Заповніть поле Ім\'я';
                return false;
            } else if (!/^[a-zA-Zа-яА-ЯёЁіІїЇєЄ\s\-']+$/i.test(this.firstName)) {
                this.errors.firstName = '(!) Поле Ім\'я не повинно містити цифри';
                return false;
            } else {
                return true;
            }
        },
        validatePhone() {
            if (this.phone.length >= 18) {
                return true;
            } else {
                this.errors.phone = '(!) Введіть всі цифри в номер';
                return false;
            }
        },
    },
    directives: {
        imask: IMaskDirective
    }
}