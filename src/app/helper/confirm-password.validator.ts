import { FormGroup } from "@angular/forms";

export function ConfirmPasswordValidator(controlName:string, matchControlName : string){
    return(formGroup:FormGroup)=>{
        const passwordControl = formGroup.controls[controlName];
        const confirmPasswordContol = formGroup.controls[matchControlName];
        if(confirmPasswordContol.errors && confirmPasswordContol.errors['confirmPasswordValidator']){
            return;
        }
        if(passwordControl.value !== confirmPasswordContol.value){
            confirmPasswordContol.setErrors({confirmPasswordValidator :true})
        }else{
            confirmPasswordContol.setErrors(null)
        }
    }
}