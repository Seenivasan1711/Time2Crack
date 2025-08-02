export declare enum UserRole {
    USER = "user",
    ADMIN = "admin",
    MODERATOR = "moderator"
}
export declare class User {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    hashPassword(): Promise<void>;
    comparePassword(candidatePassword: string): Promise<boolean>;
}
