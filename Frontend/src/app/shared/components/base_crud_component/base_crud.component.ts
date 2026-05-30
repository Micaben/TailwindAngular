import { computed, Directive, inject, OnInit, signal } from '@angular/core';
import { NgForm } from '@angular/forms';
import { finalize } from 'rxjs';
import { CrudState } from '../base_crud_component/base_crud.state';
import { AlertService } from '../../../core/services/alert.services';
import { BaseCrudService } from '../base_crud_component/base_crud.service';

@Directive()
export abstract class BaseCrudComponent<T extends {
  id?: number;
  codigo?: string;
  descripcion?: string;
}
> implements OnInit {
  protected getInitialData(): Partial<T> {
    return {};
  }
  // =========================
  // SERVICE
  // =========================

  protected abstract service:
    BaseCrudService<T>;

  // =========================
  // ALERT
  // =========================

  protected readonly alertService =
    inject(AlertService);

  // =========================
  // STATE
  // =========================

  readonly state = signal<CrudState<T>>({
    items: [],
    selected: {},
    modo: 'crear',
    searchTerm: '',
    isOpen: false,
    formSubmitted: false,
    loading: false
  });

  readonly selected = computed(() => this.state().selected ?? {});
  readonly submitted = computed(() => this.state().formSubmitted);
  // =========================
  // FILTER
  // =========================

  readonly filteredItems = computed(() => {
    const { items, searchTerm } =
      this.state();

    const term =
      searchTerm.toLowerCase().trim();

    if (!term) return items;
    return items.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  });

  // =========================
  // INIT
  // =========================

  ngOnInit(): void {
    this.load();
  }

  // =========================
  // LOAD
  // =========================

  load(): void {
    this.setLoading(true);
    this.service
      .getAll()
      .pipe(finalize(() => {
        this.setLoading(false);
      })
      )
      .subscribe({
        next: data => {
          this.setItems(data);
        },

        error: err => {
          console.error(err);
          this.alertService.error(
            'Error cargando registros'
          );
        }
      });
  }

  // =========================
  // SAVE
  // =========================

  save(form: NgForm): void {
    this.setFormSubmitted(true);
    if (form.invalid) return;
    this.setLoading(true);
    const currentState = this.state();
    const isCreate = currentState.modo === 'crear';
    const request$ = isCreate
      ? this.service.create(currentState.selected)
      : this.service.update(currentState.selected.id!, currentState.selected);

    request$
      .pipe(finalize(() => this.setLoading(false)))
      .subscribe({
        next: (res) => {

          this.state.update(s => ({
            ...s,
            modo: 'editar',
            selected: {
              ...s.selected,
              ...res
            },
            isOpen: true
          }));
          this.load();
          this.alertService.success(
            isCreate
              ? 'Creado correctamente'
              : 'Actualizado correctamente'
          );
        },
        error: err => {
          console.error(err);
        }
      });
  }

  // =========================
  // FIELD UPDATE
  // =========================

  updateField<K extends keyof T>(field: K, value: T[K]): void {
    this.state.update(state => ({
      ...state,
      selected: {
        ...state.selected,
        [field]: value
      }
    }));
  }

  // =========================
  // MODAL
  // =========================

  openCreate(): void {
    this.state.update(state => ({
      ...state,
      selected: this.getInitialData() as T,
      modo: 'crear',
      isOpen: true,
      formSubmitted: false
    }));
  }

  openEdit(item: T): void {
    console.log('ITEM EDIT:', item);

    this.state.update(state => ({
      ...state,
      selected: { ...item },
      modo: 'editar',
      isOpen: true,
      formSubmitted: false
    }));
  }

  closeModal(): void {
    this.state.update(state => ({
      ...state,
      isOpen: false
    }));
  }

  // =========================
  // HELPERS
  // =========================

  setItems(items: T[]): void {
    this.state.update(state => ({
      ...state,
      items
    }));
  }

  setLoading(value: boolean): void {
    this.state.update(state => ({
      ...state,
      loading: value
    }));
  }

  setFormSubmitted(value: boolean): void {
    this.state.update(state => ({
      ...state,
      formSubmitted: value
    }));
  }

  resetForm(): void {
    this.setFormSubmitted(false);
  }

  setSearch(term: string): void {
    this.state.update(state => ({
      ...state,
      searchTerm: term
    }));
  }

}