import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Option } from '../../../core/models/option.model';

@Component({
    selector: 'app-autocomplete',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule
    ],

    templateUrl:
        './autocomplete.component.html',

   
})

export class AutocompleteComponent {

    // =========================
    // INPUTS
    // =========================

    @Input() options: Option[] = [];

    @Input() placeholder = 'Buscar...';

    // =========================
    // OUTPUT
    // =========================

    @Output() selected =  new EventEmitter<Option>();

    // =========================
    // VARIABLES
    // =========================

    search = '';
    filteredOptions: Option[] = [];
    showDropdown = false;

    // =========================
    // FILTRAR
    // =========================

    filtrar() {
        const texto = this.search.toLowerCase();
        this.filteredOptions =
            this.options.filter(option =>
                option.label
                    .toLowerCase()
                    .includes(texto)
            );
        this.showDropdown = true;
    }

    // =========================
    // SELECCIONAR
    // =========================

    seleccionar(option: Option) {

        this.search = option.label;
        this.selected.emit(option);
        this.showDropdown = false;
    }

    // =========================
    // FOCUS
    // =========================

    onFocus() {

        this.filteredOptions =  [...this.options];
        this.showDropdown = true;
    }
}