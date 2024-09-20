export interface UpdateUserDto {
    fullName:string
}
export function UpdateUserDTO(body: any): UpdateUserDto {
    return {
        fullName : body.fullName
    }
}