
export class LoginUserRequest {

    user_email_id: string;
    password: string;

    constructor(email: string, password: string) {
        this.user_email_id = email;
        this.password = password;
    }
}