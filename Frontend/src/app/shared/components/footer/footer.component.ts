import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
    selector: 'app-modal-footer',
    imports: [ButtonComponent],
    templateUrl: './footer.component.html',
})
export class FooterComponent {

    // INPUTS
    @Input() showNewButton: boolean = true;
    @Input() closeText: string = 'Cerrar';
    @Input() saveText: string = 'Guardar';
    @Input() loading = false;
    // OUTPUTS
    @Output() close = new EventEmitter<void>();
    @Output() create = new EventEmitter<void>();

    // METODOS
    onClose() { this.close.emit(); }
    onNew() { this.create.emit(); }
}