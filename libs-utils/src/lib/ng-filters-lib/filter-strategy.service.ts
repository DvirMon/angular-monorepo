import { inject, Injectable, Injector } from '@angular/core';
import { ContainsStrategy } from './filter-strategies/contains';
import { EqualsStrategy } from './filter-strategies/equals';
import { GreaterThanStrategy } from './filter-strategies/greaterThen';
import { LessThanStrategy } from './filter-strategies/lessThen';
import {
  FILTER_STRATEGIES,
  FilterStrategy,
} from './filter-strategies/strategies.types';
import { FilterOperation } from './filter.types';

@Injectable({
  providedIn: 'root', // Register this service as a singleton
})
export class FilterStrategyService<T> {
  #strategies: Map<string, FilterStrategy> = new Map();
  #strategyFactories: Map<string, () => FilterStrategy> = new Map(); // Lazy-loading strategy factories
  #injectedStrategies = inject(FILTER_STRATEGIES, { optional: true });
  #injector = inject(Injector);

  constructor() {
    this.#setBuiltInStrategyFactories();

    if (this.#injectedStrategies && this.#injectedStrategies.length > 0) {
      this.#injectedStrategies.forEach((strategy) => {
        this.#strategies.set(strategy.operation, strategy);
      });
    }
  }

  getStrategy(operation: string): FilterStrategy | undefined {
    const strategy = this.#strategies.get(operation);
    if (strategy) {
      return strategy;
    }
    return this.#createStrategy(operation);
  }

  #createStrategy(operation: string): FilterStrategy | undefined {
    const strategyFactory = this.#strategyFactories.get(operation);

    if (!strategyFactory && this.#isBuiltInOperation(operation)) {
      throw new Error(
        `Required built-in strategy for operation "${operation}" not found.`
      );
    }

    const strategy = strategyFactory?.();

    strategy ?? this.#handleMissingStrategy(operation);

    // Cache and return the strategy if found
    strategy && this.#strategies.set(operation, strategy);

    return strategy;
  }

  #handleMissingStrategy(operation: string) {
    console.warn(`No strategy found for operation "${operation}"`);
    console.warn(
      `A strategy should be provided using the FILTER_STRATEGY token.`
    );
  }

  #setBuiltInStrategyFactories() {
    // Use the injector to lazily load strategies when needed
    this.#strategyFactories.set(FilterOperation.EQUALS, () =>
      this.#injector.get(EqualsStrategy)
    );
    this.#strategyFactories.set(FilterOperation.CONTAINS, () =>
      this.#injector.get(ContainsStrategy)
    );
    this.#strategyFactories.set(FilterOperation.GREATER_THAN, () =>
      this.#injector.get(GreaterThanStrategy)
    );
    this.#strategyFactories.set(FilterOperation.LESS_THAN, () =>
      this.#injector.get(LessThanStrategy)
    );
  }

  #isBuiltInOperation(operation: string): boolean {
    return Object.values(FilterOperation).includes(
      operation as FilterOperation
    );
  }
}
