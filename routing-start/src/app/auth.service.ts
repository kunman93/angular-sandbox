export class AuthService {
    isLoggedIn = false;

    isAuthenticated() {
        return new Promise(
            (resolve, reject) => {
                setTimeout(() => {
                    resolve(this.isLoggedIn),
                    800
                });
            }
        );
    }

    login() {
        this.isLoggedIn = true;
    }

    logout () {
        this.isLoggedIn = false;
    }
}