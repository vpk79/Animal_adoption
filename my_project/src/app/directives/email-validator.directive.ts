import { Directive, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: EmailValidatorDirective,
      multi: true,
    }
  ]
})
export class EmailValidatorDirective implements Validator, OnChanges{
 
  @Input()appEmailValidator: string[] = [];

  constructor() { }

  validator: ValidatorFn = () => null;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    console.log('control', control);
    
    return null;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['appEmailValidator']);
    
    const { currentValue } = changes['appEmailValidator'];
    if(currentValue?.length){
     this.validator= this.emailValidator(currentValue)
    }
  }

  emailValidator(domains: string[]): ValidatorFn {
    //[A-Za-z0-9]+gmail\.(com|bg)
    return (control) => {
      console.log("controlValue", control);
      
      return null;
    }
  }
}
