export interface AnimalGender {
    Any : string,
    Male: string,
    Female: string
}

export interface AnimalSize {
    Any: string | 'Any',
    Small: string | 'Small',
    Medium: string | 'Medium',
    Large: string | 'Large'
}


export interface AnimalAge {
    Under6months: string | 'Under 6 months',
    Sixmonths3years: string | '6 months - 3 years',
    Over3years: string | 'Over 3 years'
}



