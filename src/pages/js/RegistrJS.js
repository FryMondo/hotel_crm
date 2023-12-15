export default {
    data() {
        return {
            email: '',
            username: '',
            password: '',
            errors: {},
        };
    },
    methods: {
        async registerUser() {
            if (!this.validateEmail() || !this.validateUsername() || !this.validatePassword()) {
                return;
            }
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: this.email,
                        username: this.username,
                        password: this.password,
                    }),
                });

                if (response.ok) {
                    localStorage.setItem('username', this.username);
                    this.$router.push('/');
                } else {

                }
            } catch (error) {
                console.error('Error:', error);
            }
        },
        clearError(errorID) {
            delete this.errors[errorID];
        },
        validateEmail() {
            if (!this.email.trim()) {
                this.errors.email = '(!) Заповніть поле Email';
                return false;
            } else if (!this.RegExpEmail(this.email)) {
                this.errors.email = '(!) Невірний формат Email';
                return false;
            } else {
                return true;
            }
        },
        RegExpEmail(email) {
            const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(email);
        },
        validatePassword() {
            if (!this.password.trim()) {
                this.errors.password = '(!) Заповніть поле Пароль';
                return false;
            } else if (this.password.trim().length < 8) {
                this.errors.password = '(!) Пароль повинен містити мінімум 8 символів';
                return false;
            } else if (/\s/.test(this.password)) {
                this.errors.password = '(!) Пароль не повинен містити пробіли';
                return false;
            } else if (!/[a-zа-яёіїє]/.test(this.password)) {
                this.errors.password = '(!) Пароль повинен містити 1 маленьку літеру';
                return false;
            } else if (!/[A-ZА-ЯЁІЇЄ]/.test(this.password)) {
                this.errors.password = '(!) Пароль повинен містити 1 велику літеру';
                return false;
            } else {
                return true;
            }
        },
        validateUsername() {
            if (!this.username.trim()) {
                this.errors.username = '(!) Заповніть поле Username';
                return false;
            } else if (this.username.trim().length < 3) {
                this.errors.username = '(!) Username повинен мати хоча б 3 символи';
                return false;
            } else {
                return true;
            }
        },
    },
};