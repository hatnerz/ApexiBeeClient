import { SerialData } from "./serialData";

export interface Hive {
    id: string,
    name: string,
    description: string,
    isActive: boolean,
    installationDate: Date,
    lastInspectionDate: Date,
    numberofFrames: number,
    latitude: number,
    longitude: number,
    apiaryId?: number,
    serialData?: SerialData
}

export interface CreateHiveModel {
    name: string,
    description: string,
    numberOfFrames: number,
    latitude: number,
    longitude: 0,
    apiaryId: number,
    serialNumber: string
}