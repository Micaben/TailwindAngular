import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../form/input/input-field.component';
import { Component, Input, Output, EventEmitter, ElementRef, viewChild, AfterViewInit } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';
import { ModalService } from '../../services/modal.service';
import { ModalComponent } from '../ui/modal/modal.component';
import { DocumentosService } from '../../../core/services/documentos.service';
import { Serie } from '../../../core/models/serie.model';
import { FormsModule } from '@angular/forms';
import { AutoFocusFirstDirective } from '../../directives/autofocus';
import { AlertService } from '../../../core/services/alert.services';
import { PaginationComponent } from '../../components/pagination/pagination.component';

interface Formulario {
    id?: number;
    serie: string;
    ultimo: string;
    comprobante: string;
}

interface Option {
    value: string;
    label: string;
}

const EMPTY_FORM: Formulario = {
    id: undefined,
    serie: '',
    ultimo: '',
    comprobante: '',
};

@Component({
    selector: 'app-series',
    imports: [
        CommonModule,
        ButtonComponent,
        InputFieldComponent,
        PaginationComponent,
        ModalComponent,
        PageBreadcrumbComponent,
        FormsModule,
        AutoFocusFirstDirective,
    ],
    templateUrl: './series.component.html',
    styles: ``
})

export class SeriesComponent {
    selected: Formulario = { ...EMPTY_FORM };
    modo: 'crear' | 'editar' = 'crear';
    formSubmitted = false;
    constructor(public modal: ModalService, private alertService: AlertService, private documentosService: DocumentosService) { }
    boxIcon = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>`
    searchTerm: string = '';
    filteredItems: Serie[] = [];
    serie: Serie[] = [];
    comprobanteoption: Option[] = [];
    isOpen = false;
    openModal() { this.isOpen = true; }
    closeModal() { this.isOpen = false; }
    currentPage = 1;
    itemsPerPage = 5;
    @Input() options: Option[] = [];
    get totalPages(): number {
        return Math.ceil(this.filteredItems.length / this.itemsPerPage);
    }

    get currentItems(): Serie[] {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        return this.filteredItems.slice(start, start + this.itemsPerPage);
    }

    goToPage(page: number) {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
        }
    }

    filterTable() {
        const term = this.searchTerm.trim().toLowerCase();
        if (!term) {
            this.filteredItems = [...this.serie];
            return;
        }

        this.filteredItems = this.serie.filter(item =>
            item.serie?.toLowerCase().includes(term) ||
            item.comprobante?.toLowerCase().includes(term)
        );
    }

    async cargarSerie() {
        try {
            this.serie = await this.documentosService.obtenerSerie();
            this.filteredItems = [...this.serie];
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
            ? this.documentosService.crearSerie(payload)
            : this.documentosService.actualizarSerie(
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

                await this.cargarSerie();
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
            this.cargarSerie(),            
            this.cargarComprobante(),
        ]);
    }

    openCreateModal() {
        this.formSubmitted = false;
        this.modo = 'crear';
        this.selected = { ...EMPTY_FORM };
        this.isOpen = true;
    }

    mapOptions<T>(data: T[], valueKey: keyof T, labelKey: keyof T): Option[] {
        return data.map(item => ({
            value: String(item[valueKey]),
            label: String(item[labelKey])
        }));
    }


    async cargarComprobante() {
        const data = await this.documentosService.obtenerDocumentos();
        this.comprobanteoption = this.mapOptions(
            data,
            'codigo',
            'descripcion'
        );
    }

    async openEditModal(item: Serie) {
        this.formSubmitted = false;
        this.modo = 'editar';
        this.selected = {
            id: item.id,
            serie: item.serie || '',
            ultimo: item.ultimo || '',
            comprobante: item.comprobante || '',
        };
        this.isOpen = true;
    }
}
