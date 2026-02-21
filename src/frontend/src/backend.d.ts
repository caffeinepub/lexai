import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface LegalAnalysis {
    defendant_strength: string;
    summary: string;
    risk_level: string;
    disclaimer: string;
    plaintiff_strength: string;
    legal_issues: Array<string>;
    strong_points: Array<string>;
    law_sections: Array<string>;
    weak_points: Array<string>;
}
export interface DocumentData {
    content: string;
    fileName: string;
    fileSize: bigint;
    fileType: string;
}
export interface UserDTO {
    id: string;
    uploadedDocuments: Array<DocumentData>;
    questions: Array<string>;
    analysisResults: Array<LegalAnalysis>;
}
export interface backendInterface {
    deleteUserData(id: string): Promise<void>;
    getAllUserData(): Promise<Array<UserDTO>>;
    getUserData(id: string): Promise<UserDTO | null>;
    saveUserData(input: UserDTO): Promise<UserDTO>;
    updateUserData(id: string, update: UserDTO): Promise<UserDTO>;
}
