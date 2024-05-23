import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
  registerDecorator,
} from 'class-validator';

export function ConfirmedPassword(
  property: string,
  validationOption?: ValidatorOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOption,
      constraints: [property],
      validator: ConfirmedPasswordConstrains,
    });
  };
}

@ValidatorConstraint({
  name: 'ConfirmedPassword',
})
export class ConfirmedPasswordConstrains
  implements ValidatorConstraintInterface
{
  validate(value: any, args?: ValidationArguments) {
    const { object, constraints } = args;
    const [property] = constraints;
    const relatedValue = object[property];
    return value === relatedValue;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(validationArguments?: ValidationArguments): string {
    return 'رمزعبور و تکرار آن باید برابر باشد';
  }
}
