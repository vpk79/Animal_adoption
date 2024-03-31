export interface UserProfil {
    ID: string,
    firstName: string,
    lastName: string | undefined,
    email: string,
    phone: number | undefined,
    age: number | undefined,
    balance: number,
    donation: number,
    liked_animals: [],
    adopted_animals: [],
}