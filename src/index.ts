/**
 * Main entry point for markdown-kv library
 */

// Type definitions
export type StringifyInput =
  | Array<[string, string | number | boolean | null]>
  | Record<string, string | number | boolean | null>
  | Array<Record<string, string | number | boolean | null>>;

export type DropValue = null | false | undefined | '';
export type DropOption = DropValue[] | ((value: unknown) => boolean);

export interface StringifyOptions {
  name?: string; // Optional, defaults to undefined (no header)
  drop?: DropOption; // Optional, defaults to undefined (no dropping)
}

// Preset constants
export const DROP_FALSY: DropValue[] = [null, false, undefined, ''];

/**
 * Converts data to Markdown-KV format
 * @param data - Input data (array of tuples, object, or array of objects)
 * @param options - Optional configuration
 * @returns Markdown-KV formatted string
 */
export function stringify(
  data: StringifyInput,
  options?: StringifyOptions
): string {
  const { name, drop } = options || {};

  // Normalize input to array of key-value pairs
  const records = normalizeInput(data);

  // Filter records based on drop option
  const filteredRecords = drop
    ? records.map((record) => filterRecord(record, drop))
    : records;

  // Generate markdown output
  return generateMarkdown(filteredRecords, name);
}

/**
 * Normalizes different input types to a consistent format
 */
function normalizeInput(
  data: StringifyInput
): Array<Array<[string, string | number | boolean | null]>> {
  // Array of tuples - wrap in array (single record)
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    Array.isArray(data[0]) &&
    data[0].length === 2 &&
    typeof data[0][0] === 'string'
  ) {
    return [data as Array<[string, string | number | boolean | null]>];
  }

  // Array of objects - convert each to key-value pairs
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    typeof data[0] === 'object' &&
    !Array.isArray(data[0]) &&
    data[0] !== null
  ) {
    return (data as Array<Record<string, string | number | boolean | null>>).map(
      (obj) => Object.entries(obj)
    );
  }

  // Single object - convert to key-value pairs and wrap in array
  if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
    return [Object.entries(data as Record<string, string | number | boolean | null>)];
  }

  // Empty array - return empty records
  if (Array.isArray(data) && data.length === 0) {
    return [];
  }

  // Fallback - should not reach here with proper types
  return [];
}

/**
 * Filters a record based on drop option
 */
function filterRecord(
  record: Array<[string, string | number | boolean | null]>,
  drop: DropOption
): Array<[string, string | number | boolean | null]> {
  if (typeof drop === 'function') {
    return record.filter(([, value]) => !drop(value));
  }

  // Array of values to drop
  return record.filter(([, value]) => !drop.includes(value as DropValue));
}

/**
 * Generates markdown output from filtered records
 */
function generateMarkdown(
  records: Array<Array<[string, string | number | boolean | null]>>,
  name?: string
): string {
  // Filter out empty records
  const nonEmptyRecords = records.filter((record) => record.length > 0);

  if (nonEmptyRecords.length === 0) {
    return name !== undefined ? `# ${name}\n` : '';
  }

  const parts: string[] = [];

  // Add header if name is provided (including empty string)
  if (name !== undefined) {
    parts.push(`# ${name}\n`);
  }

  // Generate records
  records.forEach((record, index) => {
    // Add record header (only if multiple records)
    if (records.length > 1) {
      parts.push(`## Record ${index + 1}\n`);
    }

    // Add code block with key-value pairs
    parts.push('```\n');
    record.forEach(([key, value]) => {
      parts.push(`${key}: ${formatValue(value)}\n`);
    });
    parts.push('```\n');
  });

  return parts.join('');
}

/**
 * Formats a value for output
 */
function formatValue(value: string | number | boolean | null): string {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  return value;
}
