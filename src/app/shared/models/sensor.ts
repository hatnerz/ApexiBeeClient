import { Hive } from "./hive"

export interface SensorType {
    id: string
    name: string,
    description?: string,
    measureUnit: string,
}

export interface Sensor {
    id: string,
    sensorTypeId?: string,
    sensorType?: SensorType,
    hiveId?: string,
    hive?: Hive
}

export interface AddSensorModel {
    sensorTypeId: string,
    hiveId: string
}

export interface SensorReading {
    id: string,
    readingDate: Date,
    sensorId: string,
    value: number
}

export interface SensorAverageValue {
    sensorId: string,
    sensorTypeId: string,
    sensorType: string,
    value: number,
    measureUnit: string
}