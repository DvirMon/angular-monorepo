import { isNumber, isDate } from './compare.helpers';
import { FilterOperation } from '../filter.types';
import { FilterStrategy } from './strategies.types';

export class LessThanStrategy
 implements FilterStrategy {
  operation: FilterOperation = FilterOperation.LESS_THAN;

  evaluate(value: unknown, criterionValue: unknown): boolean {
    if (this.isComparable(value, criterionValue)) {
      return (value as number | Date) < (criterionValue as number | Date);
    }

    console.warn('Invalid value types provided for lessThan strategy.');
    return false;
  }

  isComparable(value: unknown, criterionValue: unknown): boolean {
    return (
      (isNumber(value) && isNumber(criterionValue)) ||
      (isDate(value) && isDate(criterionValue))
    );
  }
}
