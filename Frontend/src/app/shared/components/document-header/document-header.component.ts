export interface DocumentField {

  key: string;

  label: string;

  type:
    | 'text'
    | 'number'
    | 'date'
    | 'select'
    | 'autocomplete';

  required?: boolean;

  options?: any[];
}