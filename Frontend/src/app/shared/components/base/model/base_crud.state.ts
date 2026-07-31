export interface CrudState<T, F = {}> {
  items: T[];
  selected: Partial<T>;
  filters?: F;
  modo: 'crear' | 'editar';
  searchTerm: string;
  isOpen: boolean;
  formSubmitted: boolean;
  loading: boolean;
}