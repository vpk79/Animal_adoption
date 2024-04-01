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
export class EmailValidatorDirective implements Validator, OnChanges {

  @Input() appEmailValidator: string[] = [];

  constructor() { }

  validator: ValidatorFn = () => null;

  validate(control: AbstractControl<any, any>): ValidationErrors | null {
    return this.validator(control);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['appEmailValidator']);

    const { currentValue } = changes['appEmailValidator'];
    if (currentValue?.length) {
      this.validator = this.emailValidator(currentValue)
    }
  }

  emailValidator(domains: string[]): ValidatorFn {
    //[A-Za-z0-9]+gmail\.(com|bg)
    const domeinString = domains.join('|');
    const regExp = new RegExp(`[A-Za-z0-9]+gmail\.(${domeinString}`)



    return (control) => {

      const isEmailInValid = regExp.test(control.value)
      console.log('Test Regex', isEmailInValid, "controlValue", control);

      return isEmailInValid ? null : { emailValidator: true }
        ;
    }
  }
}
