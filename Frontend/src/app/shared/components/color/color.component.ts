import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { ColorService } from '../../../core/services/color.service';
import { Modelobase } from '../../../core/models/modelobase.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { CrudTableComponent } from '../../components/tabla/crud-table.component';
import { BaseListComponent } from '../../components/tabla/base.component';

interface Formulario {
  id?: number;
  codigo: string;
  descripcion: string;
}

interface Option {
  value: string;
  label: string;
}

const EMPTY_FORM: Formulario = {
  id: undefined,
  codigo: '',
  descripcion: '',
};

@Component({
  selector: 'app-color',
  imports: [
    CommonModule,
    InputFieldComponent,
    CrudTableComponent,
    ModalComponent,
    FormsModule,
    AutoFocusFirstDirective,
  ],
  templateUrl: './color.component.html',
  styles: ``
})

export class ColorComponent extends BaseListComponent<Modelobase> {
  selected: Formulario = { ...EMPTY_FORM };
  modo: 'crear' | 'editar' = 'crear';
  formSubmitted = false;
  constructor(public modal: ModalService, private alertService: AlertService, private colorService: ColorService) { super() }
  boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
  searchTerm: string = '';
  color: Modelobase[] = [];
  isOpen = false;
  openModal() { this.isOpen = true; }
  closeModal() { this.isOpen = false; }
  @Input() options: Option[] = [];

  
     tableColumns = [
    {
      header: 'Código',
      field: 'codigo',
      width: '15%'
    },
    {
      header: 'Nombre',
      field: 'descripcion',
      width: '25%'
    },

  ];

  filterTable() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredItems = [...this.color];
      return;
    }

    this.filteredItems = this.color.filter(item =>
      item.codigo?.toLowerCase().includes(term) ||
      item.descripcion?.toLowerCase().includes(term)
    );
  }

  async cargarColor() {
    try {
      this.color = await this.colorService.obtenerColor();
      this.filteredItems = [...this.color];
    } catch (error) {
      this.alertService.error('Error cargando productos');
    }
  }

  async handleSave(form: any) {
    this.formSubmitted = true;
    if (form.invalid) {
      return;
    }

    const payload = {
      ...this.selected,
      //fechaInicio: this.selected.fechaInicio || null, EJEMPLO PARA VARIAS FECHAS 
      //fechaFin: this.selected.fechaFin || null,
    };

    const isCreate = this.modo === 'crear';
    const request = isCreate
      ? this.colorService.crearColor(payload)
      : this.colorService.actualizarColor(
        this.selected.id!,

        payload
      );

    request.subscribe({
      next: async (resp: any) => {
        // guardar el ID retornado por el backend
        if (isCreate) {
          this.selected = resp.data;
          this.modo = 'editar';
        }

        await this.cargarColor();
        this.alertService.success(
          isCreate
            ? 'Datos guardados'
            : 'Datos modificados'
        );
        this.formSubmitted = false;
      },

      error: (err) => {
        this.alertService.error(
          err.error?.message || 'Ocurrió un error'
        );
      }
    });
  }

  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.cargarColor()
    ]);
  }

  openCreateModal() {
    this.formSubmitted = false;
    this.modo = 'crear';
    this.selected = { ...EMPTY_FORM };
    this.isOpen = true;
  }

  async openEditModal(item: Modelobase) {
    this.formSubmitted = false;
    this.modo = 'editar';
    this.selected = {
      id: item.id,
      codigo: item.codigo || '',
      descripcion: item.descripcion || '',
    };
    this.isOpen = true;
  }

    onSearch(term: string) {
    this.searchTerm = term;
    this.filterTable();

  }
}
