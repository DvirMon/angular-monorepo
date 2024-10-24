import { InjectionToken } from '@angular/core';
import { FilterOperation } from '../filter.types';

export interface FilterStrategy{
  operation: FilterOperation | string;
  evaluate(value: unknown, criterionValue: unknown): boolean;
  isComparable(value: unknown, criterionValue: unknown): boolean;
}

export interface RangeFilterStrategy {
  operation: FilterOperation;
  evaluate(value: unknown, criterionValue: unknown, rangeEnd: unknown): boolean;
  isComparable(
    value: unknown,
    criterionValue: unknown,
    rangeEnd: unknown
  ): boolean;
}

// Injection token for filter strategies
export const FILTER_STRATEGIES = new InjectionToken<FilterStrategy[]>(
  'FILTER_STRATEGIES'
);
