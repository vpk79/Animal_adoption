export interface UserProfil {
    ID: string,
    firstName: string,
    lastName: string | null,
    email: string,
    phone: number | null,
    country: string | null,
    city: string | null,
    age: number | null,
    gender: string,
    balance: number | null,
    donation: number | null,
    comentary: [] | null, 
    liked_animals: string[] | null, 
    adopted_animals: string[] | null
}