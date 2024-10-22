import { isValidString } from './compare.helpers';
import { FilterOperation } from '../filter.types';
import { FilterStrategy } from './strategies.types';

export class ContainsStrategy<T> implements FilterStrategy {
  operation: FilterOperation = FilterOperation.CONTAINS;


  evaluate(value: unknown, criterionValue: unknown): boolean {
    if (this.isComparable(value, criterionValue)) {
      console.warn('Invalid value types provided for contains strategy.');
      return false;
    }

    // Check if the normalized value includes the normalized criterion value
    return (value as string).includes(criterionValue as string);

  }

  // Method to validate if values are comparable
  isComparable(value: unknown, criterionValue: unknown): boolean {
    return !isValidString(value) || !isValidString(criterionValue);
  }
}
