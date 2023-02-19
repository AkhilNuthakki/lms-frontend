export class User {
    user_email_id: string;
    user_name: string;
    user_role: string;
    token: string;
    token_expiration_date: Date;

    constructor(email: string, name: string, role: string, token: string, exp_date: Date){
        this.user_email_id = email;
        this.user_name = name;
        this.user_role = role;
        this.token = token;
        this.token_expiration_date = exp_date;
    }

    get tokenInfo() : string | undefined {
        if (!this.token_expiration_date || new Date() > this.token_expiration_date) {
          return undefined;
        }
        return this.token;
      }
}