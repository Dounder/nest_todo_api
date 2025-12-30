import { isCuid } from '@paralleldrive/cuid2';
import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

/**
 * Decorator that validates if a property is a valid CUID (Collision-resistant Unique ID).
 *
 * This decorator can be applied to class properties to ensure they contain a valid CUID string.
 * It uses the `isCuid` function to perform the validation.
 *
 * @param validationOptions - Optional validation options from class-validator, such as custom error messages or groups.
 * @returns A decorator function that registers the validation rule for the specified property.
 *
 * @example
 * ```typescript
 * class MyClass {
 *   @IsCuid()
 *   id: string;
 * }
 * ```
 */
export function IsCuid(validationOptions?: ValidationOptions) {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: 'isCuid',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: unknown, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          return isCuid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid CUID`;
        },
      },
    });
  };
}
