export interface RegisterDto {
    username: string;
    password: string;
    email?: string;
    fullName?: string;
}
export function RegisterDTO(body: any): RegisterDto {
    return {
        username: body.username,
        password: body.password,
        email: body.email,
        fullName: body.fullName
    }
}