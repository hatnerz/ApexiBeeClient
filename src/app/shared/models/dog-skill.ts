export interface Skill {
    id: number;
    name: string;
    type: string;
    maxValue: number;
    measureUnit: string;
}

export interface DogSkill {
    id: number;
    value: number | null;
    dogId: number | null;
    skillId: number | null;
}

export interface DogSkillLog {
    id: number;
    currentValue: number | null;
    dogId: number | null;
    skillId: number | null;
    changeDate: Date
}

export interface DogSkillViewModel {
    id: number;
    value: number | null;
    dogId: number | null;
    skill: Skill;
}