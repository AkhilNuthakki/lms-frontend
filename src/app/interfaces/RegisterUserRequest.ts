
export class RegisterUserRequest {

    user_email_id: string;
    user_name: string;
    password: string;

    constructor(email: string, name: string, password: string) {
        this.user_email_id = email;
        this.user_name = name;
        this.password = password;
    }
}