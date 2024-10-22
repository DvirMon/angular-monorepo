import { TestBed } from '@angular/core/testing';
import { EvaluateFilterService } from '../evaluate-filter.service';
import { FilterStrategyService } from '../filter-strategy.service';
import {
  EvaluateConfig,
  LOGICAL_OPERATOR
} from '../filter.types';

// Fake for FilterStrategyService
class FakeFilterStrategyService {
  getStrategy(operation: string) {
    if (operation === 'equals') {
      return {
        evaluate: (a: unknown, b: unknown) => a === b,
      };
    } else if (operation === 'greaterThan') {
      return {
        evaluate: (a: unknown, b: unknown) => (a as number) > (b as number),
      };
    }
    return null;
  }
}

describe('EvaluateFilterService', () => {
  let service: EvaluateFilterService;
  let strategyService: FakeFilterStrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EvaluateFilterService,
        { provide: FilterStrategyService, useClass: FakeFilterStrategyService },
        { provide: LOGICAL_OPERATOR, useValue: 'AND' }, // Use 'OR' for testing OR logic
      ],
    });

    service = TestBed.inject(EvaluateFilterService);
    strategyService = TestBed.inject(
      FilterStrategyService
    ) as FakeFilterStrategyService;
  });

  it('should filter an array of numbers with "greaterThan" criteria', () => {
    const config: EvaluateConfig = {
      criteria: [{ key: 'value', operation: 'greaterThan', value: 10 }],
    };

    const items = [{ value: 5 }, { value: 15 }, { value: 20 }];

    const filtered = items.filter(service.evaluate(config));

    expect(filtered).toEqual([{ value: 15 }, { value: 20 }]);
  });

  it('should filter an array of strings with "equals" criteria', () => {
    const config: EvaluateConfig = {
      criteria: [{ key: 'name', operation: 'equals', value: 'John' }],
    };
    const items = [{ name: 'John' }, { name: 'Jane' }, { name: 'John' }];

    const filtered = items.filter(service.evaluate(config));

    expect(filtered).toEqual([{ name: 'John' }, { name: 'John' }]);
  });

  it('should return an empty array when no items match "equals" criteria', () => {
    const config = { criteria:  [
      { key: 'name', operation: 'equals', value: 'Michael' },
    ]};

    const items = [{ name: 'John' }, { name: 'Jane' }, { name: 'Jake' }];

    const filtered = items.filter(service.evaluate(config));

    expect(filtered).toEqual([]);
  });

  it('should filter an array of numbers with "AND" logic for multiple criteria', () => {
    const config = {
      criteria: [
        { key: 'age', operation: 'greaterThan', value: 18 },
        { key: 'score', operation: 'greaterThan', value: 80 },
      ]
    }; 

    const items = [
      { age: 20, score: 90 },
      { age: 17, score: 85 },
      { age: 22, score: 75 },
    ];

    const filtered = items.filter(service.evaluate(config));

    expect(filtered).toEqual([{ age: 20, score: 90 }]);
  });

  describe('OR logic', () => {
    beforeEach(() => {
      TestBed.resetTestingModule(); // Reset the TestBed to allow reconfiguration

      TestBed.configureTestingModule({
        providers: [
          EvaluateFilterService,
          {
            provide: FilterStrategyService,
            useClass: FakeFilterStrategyService,
          },
          { provide: LOGICAL_OPERATOR, useValue: 'OR' }, // Use 'OR' for this specific case
        ],
      });

      service = TestBed.inject(EvaluateFilterService);
      strategyService = TestBed.inject(
        FilterStrategyService
      ) as FakeFilterStrategyService;
    });

    it('should filter an array with "OR" logic when LOGICAL_OPERATOR is set to "OR"', () => {
      const config = {
        criteria: [
          { key: 'age', operation: 'greaterThan', value: 18 },
          { key: 'score', operation: 'greaterThan', value: 80 },
        ]
      };

      const items = [
        { age: 20, score: 70 },
        { age: 17, score: 85 },
        { age: 15, score: 75 },
      ];

      const filtered = items.filter(service.evaluate(config));

      expect(filtered).toEqual([
        { age: 20, score: 70 },
        { age: 17, score: 85 },
      ]);
    });
  });

  it('should return the original array when no criteria is provided', () => {
    const config  = {criteria: []} 

    const items = [{ value: 5 }, { value: 15 }, { value: 20 }];

    const filtered = items.filter(service.evaluate(config));

    expect(filtered).toEqual(items);
  });
});
