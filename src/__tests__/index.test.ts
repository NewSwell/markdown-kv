import { describe, it, expect } from 'vitest';
import {
  stringify,
  DROP_FALSY,
  type StringifyInput,
  type StringifyOptions,
  type DropValue,
} from '../index';
import {
  arrayOfKeyValuePairs,
  shallowObject,
  collectionOfShallowObjects,
  emptyArrayOfKeyValuePairs,
  emptyShallowObject,
  emptyCollection,
  singleKeyValuePair,
  singleObjectCollection,
  allNullKeyValuePairs,
  allNullShallowObject,
  allNumericKeyValuePairs,
  allNumericShallowObject,
  allStringKeyValuePairs,
  allStringShallowObject,
  allBooleanKeyValuePairs,
  allBooleanShallowObject,
} from './test-data';

describe('stringify', () => {
  describe('exports', () => {
    it('should export stringify function', () => {
      expect(stringify).toBeDefined();
      expect(typeof stringify).toBe('function');
    });

    it('should export DROP_FALSY constant', () => {
      expect(DROP_FALSY).toBeDefined();
      expect(Array.isArray(DROP_FALSY)).toBe(true);
      expect(DROP_FALSY).toEqual([null, false, undefined, '']);
    });

    it('should export types', () => {
      // Type checking - if these compile, types are exported correctly
      const input: StringifyInput = { name: 'test' };
      const options: StringifyOptions = { name: 'test' };
      const dropValue: DropValue = null;
      expect(input).toBeDefined();
      expect(options).toBeDefined();
      expect(dropValue).toBeDefined();
    });
  });

  describe('array of key-value pairs', () => {
    it('should convert array of tuples to markdown-kv', () => {
      const result = stringify(arrayOfKeyValuePairs);
      expect(result).toContain('name: John Doe');
      expect(result).toContain('age: 30');
      expect(result).toContain('score: 95.5');
      expect(result).toContain('active: true');
      expect(result).toContain('middleName: null');
    });

    it('should handle empty array of tuples', () => {
      const result = stringify(emptyArrayOfKeyValuePairs);
      expect(result).toBe('');
    });

    it('should handle single key-value pair', () => {
      const result = stringify(singleKeyValuePair);
      expect(result).toContain('key: value');
    });

    it('should handle all null values', () => {
      const result = stringify(allNullKeyValuePairs);
      expect(result).toContain('field1: null');
      expect(result).toContain('field2: null');
      expect(result).toContain('field3: null');
    });

    it('should handle all numeric values', () => {
      const result = stringify(allNumericKeyValuePairs);
      expect(result).toContain('count: 0');
      expect(result).toContain('price: 19.99');
      expect(result).toContain('quantity: 100');
      expect(result).toContain('discount: 0.15');
    });

    it('should handle all string values', () => {
      const result = stringify(allStringKeyValuePairs);
      expect(result).toContain('name: Test');
      expect(result).toContain('description: A test description');
      expect(result).toContain('category: testing');
    });

    it('should handle all boolean values', () => {
      const result = stringify(allBooleanKeyValuePairs);
      expect(result).toContain('active: true');
      expect(result).toContain('verified: false');
      expect(result).toContain('enabled: true');
      expect(result).toContain('locked: false');
    });
  });

  describe('shallow object', () => {
    it('should convert object to markdown-kv', () => {
      const result = stringify(shallowObject);
      expect(result).toContain('name: Jane Smith');
      expect(result).toContain('age: 28');
      expect(result).toContain('score: 88.7');
      expect(result).toContain('active: true');
      expect(result).toContain('middleName: null');
    });

    it('should handle empty object', () => {
      const result = stringify(emptyShallowObject);
      expect(result).toBe('');
    });

    it('should handle all null values', () => {
      const result = stringify(allNullShallowObject);
      expect(result).toContain('field1: null');
      expect(result).toContain('field2: null');
      expect(result).toContain('field3: null');
    });

    it('should handle all numeric values', () => {
      const result = stringify(allNumericShallowObject);
      expect(result).toContain('count: 0');
      expect(result).toContain('price: 19.99');
      expect(result).toContain('quantity: 100');
      expect(result).toContain('discount: 0.15');
    });

    it('should handle all string values', () => {
      const result = stringify(allStringShallowObject);
      expect(result).toContain('name: Test');
      expect(result).toContain('description: A test description');
      expect(result).toContain('category: testing');
    });

    it('should handle all boolean values', () => {
      const result = stringify(allBooleanShallowObject);
      expect(result).toContain('active: true');
      expect(result).toContain('verified: false');
      expect(result).toContain('enabled: true');
      expect(result).toContain('locked: false');
    });
  });

  describe('collection of objects', () => {
    it('should convert array of objects to markdown-kv with record headers', () => {
      const result = stringify(collectionOfShallowObjects);
      expect(result).toContain('## Record 1');
      expect(result).toContain('## Record 2');
      expect(result).toContain('## Record 3');
      expect(result).toContain('## Record 4');
      expect(result).toContain('name: John Doe');
      expect(result).toContain('name: Jane Smith');
      expect(result).toContain('name: Bob Johnson');
      expect(result).toContain('name: Alice Williams');
    });

    it('should handle empty collection', () => {
      const result = stringify(emptyCollection);
      expect(result).toBe('');
    });

    it('should handle single object collection', () => {
      const result = stringify(singleObjectCollection);
      expect(result).toContain('name: Single User');
      expect(result).toContain('age: 25');
      expect(result).not.toContain('## Record');
    });
  });

  describe('name option', () => {
    it('should add header when name is provided', () => {
      const result = stringify(shallowObject, { name: 'User Profile' });
      expect(result).toContain('# User Profile');
      expect(result.startsWith('# User Profile')).toBe(true);
    });

    it('should not add header when name is undefined', () => {
      const result = stringify(shallowObject);
      expect(result).not.toContain('#');
    });

    it('should add header for collections', () => {
      const result = stringify(collectionOfShallowObjects, { name: 'Users' });
      expect(result).toContain('# Users');
      expect(result.startsWith('# Users')).toBe(true);
    });

    it('should handle empty string name', () => {
      const result = stringify(shallowObject, { name: '' });
      expect(result).toContain('# ');
    });
  });

  describe('drop option - array', () => {
    it('should drop null values', () => {
      const data = { name: 'John', age: 30, middleName: null };
      const result = stringify(data, { drop: [null] });
      expect(result).toContain('name: John');
      expect(result).toContain('age: 30');
      expect(result).not.toContain('middleName');
    });

    it('should drop false values', () => {
      const data = { name: 'John', active: true, verified: false };
      const result = stringify(data, { drop: [false] });
      expect(result).toContain('name: John');
      expect(result).toContain('active: true');
      expect(result).not.toContain('verified');
    });

    it('should drop undefined values', () => {
      const data: Record<string, string | number | boolean | null | undefined> =
        {
          name: 'John',
          age: 30,
          email: undefined,
        };
      const result = stringify(
        data as Record<string, string | number | boolean | null>,
        {
          drop: [undefined],
        }
      );
      expect(result).toContain('name: John');
      expect(result).toContain('age: 30');
      expect(result).not.toContain('email');
    });

    it('should drop empty strings', () => {
      const data = { name: 'John', email: '', phone: '123-456-7890' };
      const result = stringify(data, { drop: [''] });
      expect(result).toContain('name: John');
      expect(result).toContain('phone: 123-456-7890');
      expect(result).not.toContain('email:');
    });

    it('should drop multiple values', () => {
      const data = { name: 'John', email: '', middleName: null, active: false };
      const result = stringify(data, { drop: [null, false, ''] });
      expect(result).toContain('name: John');
      expect(result).not.toContain('email');
      expect(result).not.toContain('middleName');
      expect(result).not.toContain('active');
    });

    it('should drop any matching string value', () => {
      const data = {
        status: 'pending',
        name: 'John',
        status2: 'pending',
        status3: 'active',
      };
      const result = stringify(data, { drop: ['pending'] });
      expect(result).toContain('name: John');
      expect(result).toContain('status3: active');
      expect(result).not.toContain('status: pending');
      expect(result).not.toContain('status2: pending');
    });

    it('should use DROP_FALSY preset', () => {
      const data = { name: 'John', email: '', middleName: null, active: false };
      const result = stringify(data, { drop: DROP_FALSY });
      expect(result).toContain('name: John');
      expect(result).not.toContain('email');
      expect(result).not.toContain('middleName');
      expect(result).not.toContain('active');
    });
  });

  describe('drop option - function', () => {
    it('should drop values using predicate function', () => {
      const data = { name: 'John', email: '', middleName: null };
      const result = stringify(data, {
        drop: (value) => value === null || value === '',
      });
      expect(result).toContain('name: John');
      expect(result).not.toContain('email');
      expect(result).not.toContain('middleName');
    });

    it('should drop falsy values using function', () => {
      const data = { name: 'John', email: '', active: false, count: 0 };
      const result = stringify(data, {
        drop: (value) => !value,
      });
      expect(result).toContain('name: John');
      expect(result).not.toContain('email');
      expect(result).not.toContain('active');
      expect(result).not.toContain('count');
    });

    it('should drop specific string values using function', () => {
      const data = { status: 'pending', name: 'John', status2: 'pending' };
      const result = stringify(data, {
        drop: (value) => value === 'pending',
      });
      expect(result).toContain('name: John');
      expect(result).not.toContain('status');
      expect(result).not.toContain('status2');
    });
  });

  describe('combined options', () => {
    it('should combine name and drop options', () => {
      const data = { name: 'John', email: '', middleName: null };
      const result = stringify(data, {
        name: 'User Profile',
        drop: [null, ''],
      });
      expect(result).toContain('# User Profile');
      expect(result).toContain('name: John');
      expect(result).not.toContain('email');
      expect(result).not.toContain('middleName');
    });

    it('should work with collections and drop option', () => {
      const data = [
        { name: 'John', email: '', age: 30 },
        { name: 'Jane', email: '', age: 25 },
      ];
      const result = stringify(data, { name: 'Users', drop: [''] });
      expect(result).toContain('# Users');
      expect(result).toContain('## Record 1');
      expect(result).toContain('## Record 2');
      expect(result).toContain('name: John');
      expect(result).toContain('name: Jane');
      expect(result).not.toContain('email:');
    });
  });

  describe('edge cases', () => {
    it('should handle zero values', () => {
      const data = { count: 0, price: 0.0 };
      const result = stringify(data);
      expect(result).toContain('count: 0');
      expect(result).toContain('price: 0');
    });

    it('should handle negative numbers', () => {
      const data = { balance: -100, temperature: -5.5 };
      const result = stringify(data);
      expect(result).toContain('balance: -100');
      expect(result).toContain('temperature: -5.5');
    });

    it('should handle very long strings', () => {
      const longString = 'a'.repeat(1000);
      const data = { description: longString };
      const result = stringify(data);
      expect(result).toContain(`description: ${longString}`);
    });

    it('should handle special characters in keys and values', () => {
      const data = {
        'key:with:colons': 'value with spaces',
        'key-with-dashes': 'value',
      };
      const result = stringify(data);
      expect(result).toContain('key:with:colons: value with spaces');
      expect(result).toContain('key-with-dashes: value');
    });

    it('should handle boolean true and false', () => {
      const data = { active: true, verified: false };
      const result = stringify(data);
      expect(result).toContain('active: true');
      expect(result).toContain('verified: false');
    });
  });

  describe('format validation', () => {
    it('should produce valid markdown-kv format for single record', () => {
      const result = stringify({ name: 'John', age: 30 });
      expect(result).toContain('name: John');
      expect(result).toContain('age: 30');
    });

    it('should produce valid markdown-kv format for multiple records', () => {
      const result = stringify([
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ]);
      expect(result).toContain('## Record 1');
      expect(result).toContain('## Record 2');
    });

    it('should produce valid markdown-kv format with header', () => {
      const result = stringify({ name: 'John', age: 30 }, { name: 'Profile' });
      expect(result.startsWith('# Profile')).toBe(true);
      expect(result).toContain('name: John');
      expect(result).toContain('age: 30');
    });
  });
});
