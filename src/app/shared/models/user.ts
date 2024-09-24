export interface User {
    id: string,
    userAccountId: string,
    role: string,
    firstName?: string,
    lastName?: string,
    userName: string,
    email: string
}

export interface UserAccount {
    id: string,
    registrationDate?: Date,
    firstName?: string,
    lastName?: string
}