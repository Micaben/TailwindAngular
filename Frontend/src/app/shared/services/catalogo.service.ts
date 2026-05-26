import { Injectable } from '@angular/core';
import { TablasService } from '../../core/services/tablas.service';
import { AlmacenesService } from '../../core/services/almacenes.services';
import { DocumentosService } from '../../core/services/documentos.service';
import { ProveedoresService } from '../../core/services/proveedores.service';
import { IngresosService } from '../../core/services/ingresos.service';
import { mapOptions } from '../services/select.utils';
import { Option } from '../../core/models/option.model';

@Injectable({
    providedIn: 'root'
})
export class CatalogosService {

    constructor(
        private tablasService: TablasService,
        private almacenesService: AlmacenesService,
        private documentosService: DocumentosService,
        private proveedoresService: ProveedoresService,
        private ingresosService: IngresosService
    ) { }

    // =========================
    // MONEDAS
    // =========================
    async obtenerMonedas(): Promise<Option[]> {
        const data =
            await this.tablasService.obtenerMoneda();
        return mapOptions(
            data,
            'codigo',
            'descripcion'
        );
    }

    // =========================
    // ALMACENES
    // =========================
    async obtenerAlmacenes(): Promise<Option[]> {
        const data =
            await this.almacenesService.obtenerAlmacenes();
        return mapOptions(
            data,
            'codigo',
            'descripcion'
        );
    }

    // =========================
    // DOCUMENTOS
    // =========================
    async obtenerDocumentos(): Promise<Option[]> {
        const data =
            await this.documentosService.obtenerDocumentos();
        return mapOptions(
            data,
            'codigo',
            'descripcion'
        );
    }

    // =========================
    // TIPO OPERACION
    // =========================
    async obtenerTipoOperacion(): Promise<Option[]> {
        const data =
            await this.ingresosService.obtenerTipooperacion();
        return mapOptions(
            data,
            'codigo',
            'descripcion'
        );
    }

    // =========================
    // SERIES
    // =========================
    async obtenerSeries(): Promise<Option[]> {
        const data =
            await this.ingresosService.obtenerSerie();
        return mapOptions(
            data,
            'serie',
            'serie',
            ['ultimo']
        );
    }

    // =========================
    // PROVEEDORES
    // =========================
    async obtenerProveedores(): Promise<Option[]> {
        const data =
            await this.proveedoresService.obtenerProveedor();
        return mapOptions(
            data,
            'ruc',
            'razon_social',
            ['ruc']
        );
    }

    
}