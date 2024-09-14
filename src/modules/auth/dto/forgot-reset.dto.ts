export interface ResetPasswordDto {
    newPassword:string
    confirmPassword:string
};

export function ResetPasswordDTO(body:any) : ResetPasswordDto{
    return {
        newPassword: body.newPassword,
        confirmPassword:body.confirmPassword
    };
}

