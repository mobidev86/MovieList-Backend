export interface ICreateUser {
    user_name: string;
    email: string;
    password: string
}

export interface ILogin {
    email: string;
    password: string
}