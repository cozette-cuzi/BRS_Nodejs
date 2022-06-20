export interface CreateUserDto {
    email: string;
    password: string;
    name?: string;
    isLibrarian?: number;
}
