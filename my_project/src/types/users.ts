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
    animalLikes: string[] | null, 
    adopted_animals: string[] | null,
    profile_img: string | null
}