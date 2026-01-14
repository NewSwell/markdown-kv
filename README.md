# markdown-kv

A TypeScript library for working with markdown key-value pairs.

## What is Markdown-KV?

**Markdown-KV** (Markdown Key-Value) is a data format that combines hierarchical Markdown headers with code blocks containing key-value pairs. It's a non-standardized format designed to represent structured data in a way that's both human-readable and highly optimized for Large Language Models (LLMs).

### Format Structure

Markdown-KV uses a hierarchical structure where:
- Each record is introduced with a Markdown header (typically `## Record N` or similar)
- The key-value pairs for each record are contained within a code block (using triple backticks)
- Each key-value pair is written as `key: value` on separate lines

### Example

Here's an example of Markdown-KV format:

```markdown
# Employee Database

## Record 1

```
id: 1
name: Diana A0
age: 46
city: London
department: Engineering
salary: 141015
years_experience: 7
project_count: 17
```

## Record 2

```
id: 2
name: Grace B1
age: 59
city: Berlin
department: Engineering
salary: 100066
years_experience: 11
project_count: 32
```

## Record 3

```
id: 3
name: Grace C2
age: 64
city: Dubai
department: Engineering
salary: 91727
years_experience: 9
project_count: 49
```
```

This structure provides:
- **Clear hierarchy**: Headers organize records into logical groups
- **Explicit key-value delineation**: The `key: value` syntax makes relationships unambiguous
- **Human readability**: Easy for developers to read and understand
- **LLM optimization**: Structured in a way that language models can parse and understand effectively

## Why is Markdown-KV Useful?

Research has shown that Markdown-KV can be more effective than common formats like JSON, CSV, XML, and YAML when passing tabular data to LLMs. The format's combination of hierarchical structure and explicit key-value pairs appears to improve LLM comprehension of structured data.

### Key Benefits

- **Improved Accuracy**: Studies suggest Markdown-KV may provide better accuracy for LLM-based data extraction and question-answering compared to formats like CSV and JSON
- **RAG Pipeline Optimization**: Useful for Retrieval-Augmented Generation (RAG) systems that process documents containing tables
- **Human Readable**: Maintains structured data benefits while remaining easy for developers to read and debug
- **Balanced Trade-offs**: Offers a reasonable balance between accuracy and token usage compared to other formats

### Important Disclaimers

**⚠️ Model and Date Considerations**: The AI technology landscape evolves rapidly. Research findings are based on specific models (e.g., GPT-4.1-nano) and testing dates. Different models may have different optimal formats, and newer models may perform differently. Always test with your specific use case and model to determine the best format for your needs.

**⚠️ Format Standardization**: Markdown-KV is a non-standardized format, so you'll need tools (like this library) to generate it consistently.

### References

- [Which Table Format Do LLMs Understand Best? (Results for 11 Formats) - Improving Agents](https://www.improvingagents.com/blog/best-input-data-format-for-llms?ref=dailydev)
- [Reddit Discussion: Which format is best for passing tables of data to LLMs?](https://www.reddit.com/r/LLMDevs/comments/1nw3jha/which_format_is_best_for_passing_tables_of_data/)

## Features

- 🚀 Built with TypeScript
- 📦 Dual package exports (ESM + CommonJS)
- ✅ Fully tested with Vitest
- 🔧 Type-safe APIs
- 📝 Comprehensive documentation

## Installation

```bash
npm install markdown-kv
```

## Input Types

The library supports the following input types for working with key-value pairs:

### 1. Array of Key-Value Pairs

An array where each element is a tuple (array) containing a key and value pair. Values can be strings, numbers, booleans, or null.

```typescript
const input = [
  ['name', 'John Doe'],
  ['email', 'john@example.com'],
  ['age', 30],
  ['score', 95.5],
  ['active', true],
  ['middleName', null]
];
```

### 2. Shallow Objects

A plain object with string keys and string, numeric, boolean, or null values. Nested objects are not supported.

```typescript
const input = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  score: 95.5,
  active: true,
  middleName: null
};
```

### 3. Collections/Array of Shallow Objects

An array of shallow objects, where each object represents a set of key-value pairs. Values can be strings, numbers, booleans, or null.

```typescript
const input = [
  { name: 'John Doe', email: 'john@example.com', age: 30, active: true, middleName: null },
  { name: 'Jane Smith', email: 'jane@example.com', age: 28, active: false, score: null },
  { name: 'Bob Johnson', email: 'bob@example.com', age: 35, active: true, score: 92.3 }
];
```

## Usage

### Basic Usage

```typescript
import { stringify } from 'markdown-kv';

// Convert an object to markdown-kv
const data = {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30,
  active: true
};

const markdown = stringify(data);
console.log(markdown);
// Output:
// ```
// name: John Doe
// email: john@example.com
// age: 30
// active: true
// ```
```

### With Options

#### Adding a Header

```typescript
import { stringify } from 'markdown-kv';

const data = { name: 'John', age: 30 };
const markdown = stringify(data, { name: 'User Profile' });
console.log(markdown);
// Output:
// # User Profile
//
// ```
// name: John
// age: 30
// ```
```

#### Filtering Values with `drop` Option

The `drop` option allows you to exclude certain values from the output. You can use either an array of values or a predicate function.

**Using an array:**

```typescript
import { stringify, DROP_FALSY } from 'markdown-kv';

const data = {
  name: 'John',
  email: '',
  middleName: null,
  active: false,
  age: 30
};

// Drop null and empty strings
const markdown = stringify(data, { drop: [null, ''] });
console.log(markdown);
// Output:
// ```
// name: John
// active: false
// age: 30
// ```

// Use the preset constant for common falsy values
const markdown2 = stringify(data, { drop: DROP_FALSY });
// DROP_FALSY = [null, false, undefined, '']
```

**Using a function:**

```typescript
import { stringify } from 'markdown-kv';

const data = {
  name: 'John',
  email: '',
  middleName: null,
  age: 30
};

// Drop null and empty strings using a predicate
const markdown = stringify(data, {
  drop: (value) => value === null || value === ''
});
console.log(markdown);
// Output:
// ```
// name: John
// age: 30
// ```
```

**Dropping specific string values:**

```typescript
import { stringify } from 'markdown-kv';

const data = {
  status: 'pending',
  name: 'John',
  status2: 'pending',
  status3: 'active'
};

// Drop any value matching 'pending'
const markdown = stringify(data, { drop: ['pending'] });
console.log(markdown);
// Output:
// ```
// name: John
// status3: active
// ```
```

### Working with Collections

When you pass an array of objects, each object becomes a separate record with a header:

```typescript
import { stringify } from 'markdown-kv';

const users = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 28, email: 'jane@example.com' },
  { name: 'Bob Johnson', age: 35, email: 'bob@example.com' }
];

const markdown = stringify(users, { name: 'Users' });
console.log(markdown);
// Output:
// # Users
//
// ## Record 1
//
// ```
// name: John Doe
// age: 30
// email: john@example.com
// ```
//
// ## Record 2
//
// ```
// name: Jane Smith
// age: 28
// email: jane@example.com
// ```
//
// ## Record 3
//
// ```
// name: Bob Johnson
// age: 35
// email: bob@example.com
// ```
```

### Using Array of Key-Value Pairs

You can also pass an array of tuples:

```typescript
import { stringify } from 'markdown-kv';

const data = [
  ['name', 'John Doe'],
  ['email', 'john@example.com'],
  ['age', 30],
  ['active', true]
];

const markdown = stringify(data);
console.log(markdown);
// Output:
// ```
// name: John Doe
// email: john@example.com
// age: 30
// active: true
// ```
```

### TypeScript Types

The library exports TypeScript types for type safety:

```typescript
import {
  stringify,
  type StringifyInput,
  type StringifyOptions,
  type DropValue,
  DROP_FALSY
} from 'markdown-kv';

// Use types for better type safety
const data: StringifyInput = { name: 'John', age: 30 };
const options: StringifyOptions = {
  name: 'Profile',
  drop: DROP_FALSY
};

const markdown = stringify(data, options);
```

### API Reference

#### `stringify(data, options?)`

Converts data to Markdown-KV format.

**Parameters:**
- `data` (`StringifyInput`): Input data - can be:
  - Array of tuples: `Array<[string, string | number | boolean | null]>`
  - Shallow object: `Record<string, string | number | boolean | null>`
  - Array of objects: `Array<Record<string, string | number | boolean | null>>`
- `options` (`StringifyOptions`, optional): Configuration options
  - `name` (`string`, optional): Header title. If `undefined`, no header is added.
  - `drop` (`DropOption`, optional): Values to exclude from output
    - Array: `DropValue[]` - Array of values to drop (exact match)
    - Function: `(value: unknown) => boolean` - Predicate function returning `true` to drop

**Returns:** `string` - Markdown-KV formatted string

**Exported Types:**
- `StringifyInput` - Input data type
- `StringifyOptions` - Options type
- `DropValue` - Type for values that can be dropped: `null | false | undefined | ''`
- `DropOption` - Type for drop option: `DropValue[] | ((value: unknown) => boolean)`

**Exported Constants:**
- `DROP_FALSY` - Preset array: `[null, false, undefined, '']`

## Development

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Setup

```bash
# Install dependencies
npm install

# Build the library
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
markdown-kv/
├── src/              # Source code
├── dist/             # Build output
├── .github/          # GitHub Actions workflows
└── tests/            # Test files
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Badges

[![CI](https://github.com/newswell/markdown-kv/workflows/CI/badge.svg)](https://github.com/newswell/markdown-kv/actions)
[![npm version](https://badge.fury.io/js/markdown-kv.svg)](https://badge.fury.io/js/markdown-kv)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

