import * as JOI from 'joi';

// Define the structure that joi schemas must have;
interface JOISchema {
  rules: JOI.AnySchema;

  validate(value: unknown): JOI.ValidationResult;
}

export default JOISchema;
