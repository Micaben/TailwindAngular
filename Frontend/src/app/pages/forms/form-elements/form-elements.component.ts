
import { Component } from '@angular/core';
import { PageBreadcrumbComponent } from '../../../shared/components/common/page-breadcrumb/page-breadcrumb.component';
import { DefaultInputsComponent } from '../../../shared/components/form/form-elements/default-inputs/default-inputs.component';
import { InputStatesComponent } from '../../../shared/components/form/form-elements/input-states/input-states.component';
import { FileInputExampleComponent } from '../../../shared/components/form/form-elements/file-input-example/file-input-example.component';
import { DropzoneComponent } from '../../../shared/components/form/form-elements/dropzone/dropzone.component';

@Component({
  selector: 'app-form-elements',
  imports: [
    PageBreadcrumbComponent,
    DefaultInputsComponent,
    InputStatesComponent,
    FileInputExampleComponent,
    DropzoneComponent
],
  templateUrl: './form-elements.component.html',
  styles: ``
})
export class FormElementsComponent {

}
