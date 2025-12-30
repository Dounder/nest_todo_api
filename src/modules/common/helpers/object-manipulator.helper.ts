/**
 * Object manipulation utilities provided as static methods in a helper class.
 *
 * This class provides static methods for common object manipulation tasks
 * while ensuring type safety, immutability principles, and proper error handling.
 *
 * @remarks
 * The `exclude` method follows immutability principles by creating and returning a new object
 * rather than modifying the original. The `delete` method mutates the original object.
 * All methods include comprehensive input validation and meaningful error messages.
 *
 * @example Basic Usage
 * ```typescript
 * const user = { id: 1, name: 'John', email: 'john@example.com', temp: true };
 *
 * // Create a new object excluding specified keys
 * const cleanUser = ObjectManipulator.exclude(user, ['temp']);
 * console.log(cleanUser); // { id: 1, name: 'John', email: 'john@example.com' }
 *
 * // Delete properties from the original object
 * ObjectManipulator.delete(user, ['temp']);
 * console.log(user); // { id: 1, name: 'John', email: 'john@example.com' }
 * ```
 *
 * @author dr.glasdou
 * @version 2.0.0
 * @since 1.0.0
 * @public
 * @namespace Helpers
 */

export class ObjectManipulator {
  /**
   * Excludes specified keys from an object and returns a new partial object.
   *
   * @param obj - The object to exclude keys from.
   * @param keys - An array of keys to exclude.
   * @returns A new object with the specified keys excluded.
   * @throws {TypeError} If the object is invalid or keys is not an array.
   */
  static exclude<T extends object>(obj: T, keys: (keyof T)[]): Partial<T> {
    // Input validation
    if (!obj || typeof obj !== 'object') {
      throw new TypeError('Invalid object provided for exclusion. Expected a non-null object.');
    }

    if (!Array.isArray(keys)) {
      throw new TypeError('Keys parameter must be an array of property keys.');
    }

    // Use Set for efficient O(1) key lookup performance
    const keysToExclude = new Set(keys);

    // Build new object excluding specified keys
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (!keysToExclude.has(key as keyof T)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        result[key] = value;
      }
    }

    return result as Partial<T>;
  }

  /**
   * Deletes specified keys from the original object.
   *
   * @param obj - The object to delete keys from.
   * @param keys - An array of keys to delete.
   */
  static delete<T extends object>(obj: T, keys: (keyof T)[]): void {
    if (!obj || typeof obj !== 'object') {
      console.warn('Invalid object provided for deletion');
      return;
    }

    keys.forEach((key) => {
      if (!(key in obj)) {
        console.warn(`Property ${String(key)} does not exist on the object.`);
        return;
      }

      try {
        delete obj[key];
      } catch (error) {
        console.error(`Failed to delete property ${String(key)}:`, error);
      }
    });
  }
}
