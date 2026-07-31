import { Component, inject, OnInit } from '@angular/core';
import { CrudTableComponent } from '../../shared/components/tables/crud-table/crud-table.component';
import { NaturalezaService } from '../../core/services/naturaleza.service';
import { Modelobase } from '../../core/models/modelobase.model';
import { NATURALEZA_TABLE_COLUMNS } from './naturaleza_table_config';
import { BaseCrudComponent } from '../../shared/components/base/components/base_crud.component';
import { NaturalezaFormModelComponent } from '../../pages/naturaleza/naturaleza-form-model.component';

@Component({
    selector: 'app-naturaleza-page',
    standalone: true,
    templateUrl: './naturaleza.page.html',
    imports: [
        CrudTableComponent,
        NaturalezaFormModelComponent,

    ]
})
export class NaturalezaPage extends BaseCrudComponent<Modelobase> {

    protected override service = inject(NaturalezaService);

    readonly tableColumns = NATURALEZA_TABLE_COLUMNS;
}