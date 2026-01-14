/**
 * Synthetic test data for markdown-kv library
 * Covers all supported input types with various value types (string, number, boolean, null)
 */

// Type definitions for test data
export type KeyValuePair = [string, string | number | boolean | null];
export type ShallowObject = Record<string, string | number | boolean | null>;
export type Collection = ShallowObject[];

/**
 * Array of key-value pairs test data
 * Includes strings, numbers, booleans, and null values
 */
export const arrayOfKeyValuePairs: KeyValuePair[] = [
  ['name', 'John Doe'],
  ['email', 'john@example.com'],
  ['age', 30],
  ['score', 95.5],
  ['middleName', null],
  ['active', true],
  ['balance', 0],
  ['description', 'A test user'],
  ['rating', 4.5],
  ['phone', null],
];

/**
 * Shallow object test data
 * Includes strings, numbers, booleans, and null values
 */
export const shallowObject: ShallowObject = {
  name: 'Jane Smith',
  email: 'jane@example.com',
  age: 28,
  score: 88.7,
  middleName: null,
  active: true,
  balance: 150.25,
  description: 'Another test user',
  rating: 4.8,
  phone: null,
};

/**
 * Collection of shallow objects test data
 * Includes strings, numbers, booleans, and null values across multiple objects
 */
export const collectionOfShallowObjects: Collection = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30,
    score: 95.5,
    middleName: null,
    active: true,
    balance: 0,
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    age: 28,
    score: null,
    middleName: 'Marie',
    active: false,
    balance: 150.25,
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    age: 35,
    score: 92.3,
    middleName: null,
    active: true,
    balance: 250.75,
  },
  {
    name: 'Alice Williams',
    email: 'alice@example.com',
    age: 42,
    score: 87.9,
    middleName: 'Elizabeth',
    active: null,
    balance: 0,
  },
];

/**
 * Edge case test data - empty arrays
 */
export const emptyArrayOfKeyValuePairs: KeyValuePair[] = [];
export const emptyCollection: Collection = [];

/**
 * Edge case test data - empty object
 */
export const emptyShallowObject: ShallowObject = {};

/**
 * Edge case test data - single item arrays
 */
export const singleKeyValuePair: KeyValuePair[] = [['key', 'value']];
export const singleObjectCollection: Collection = [{ name: 'Single User', age: 25 }];

/**
 * Edge case test data - all null values
 */
export const allNullKeyValuePairs: KeyValuePair[] = [
  ['field1', null],
  ['field2', null],
  ['field3', null],
];

export const allNullShallowObject: ShallowObject = {
  field1: null,
  field2: null,
  field3: null,
};

/**
 * Edge case test data - all numeric values
 */
export const allNumericKeyValuePairs: KeyValuePair[] = [
  ['count', 0],
  ['price', 19.99],
  ['quantity', 100],
  ['discount', 0.15],
];

export const allNumericShallowObject: ShallowObject = {
  count: 0,
  price: 19.99,
  quantity: 100,
  discount: 0.15,
};

/**
 * Edge case test data - all string values
 */
export const allStringKeyValuePairs: KeyValuePair[] = [
  ['name', 'Test'],
  ['description', 'A test description'],
  ['category', 'testing'],
];

export const allStringShallowObject: ShallowObject = {
  name: 'Test',
  description: 'A test description',
  category: 'testing',
};

/**
 * Edge case test data - all boolean values
 */
export const allBooleanKeyValuePairs: KeyValuePair[] = [
  ['active', true],
  ['verified', false],
  ['enabled', true],
  ['locked', false],
];

export const allBooleanShallowObject: ShallowObject = {
  active: true,
  verified: false,
  enabled: true,
  locked: false,
};
