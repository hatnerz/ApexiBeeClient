import { HubStation } from "./hub";

export interface Apiary {
    id: string,
    name: string,
    description: string,
    creationDate: Date,
    beekeeperId?: string,
    hub?: HubStation
}