import { isNumber, isDate, isValidString } from './compare.helpers';
import { FilterOperation } from '../filter.types';
import { FilterStrategy } from './strategies.types';

export class EqualsStrategy<T> implements FilterStrategy {
  operation: FilterOperation = FilterOperation.EQUALS;

  evaluate(value: unknown, criterionValue: unknown): boolean {
    if (this.isComparable(value, criterionValue)) {
      return value === criterionValue;
    }

    console.warn('Invalid value types provided for equals strategy.');
    return false;
  }

  // Method to validate if values are comparable
  isComparable(value: unknown, criterionValue: unknown): boolean {
    return (
      (isNumber(value) && isNumber(criterionValue)) ||
      (isDate(value) && isDate(criterionValue)) ||
      (isValidString(value) && isValidString(criterionValue))
    );
  }
}
