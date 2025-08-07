export type FormFieldType =
  | 'text'
  | 'boolean'
  | 'option'
  | 'multiple'
  | 'date'
  | 'time'
  | 'datetime'
  | 'number';

export interface FormFieldOption {
  value: string | number;
  label: string;
}

export interface FormFieldConfig<T extends Record<string, any> = any> {
  name: keyof T;
  label: string;
  type: FormFieldType;
  options?: FormFieldOption[];
  colSpan?: number;
}
