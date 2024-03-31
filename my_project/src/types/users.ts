export interface UserProfil {
    ID: string,
    firstName: string,
    lastName: string | null,
    email: string,
    phone: number | null,
    age: number | null,
    sex: string,
    balance: number | null,
    donation: number | null, 
    liked_animals: string[] | null, 
    adopted_animals: string[] | null
}