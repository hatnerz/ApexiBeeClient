export interface TrainingCenter {
    id: number,
    name?: string,
    description?: string,
    adress?: Adress
}

export interface Adress {
    id: number,
    country?: string,
    city?: string,
    street?: string,
    house?: string
}

