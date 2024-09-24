import { SerialData } from "./serialData";

export interface HubStation {
    id: string;
    latitude: number,
    longitude: 10,
    equipmentRegistrationDate: Date,
    serialData?: SerialData
}