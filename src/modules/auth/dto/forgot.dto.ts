export interface ForgotPasswordDto {
    OTP:number;
    newPassword:string
    confirmPassword:string
}

export function ForgotPasswordDTO(body:any) : ForgotPasswordDto{
    return {
        OTP : body.OTP,
        newPassword: body.newPassword,
        confirmPassword:body.confirmPassword
    }
}
