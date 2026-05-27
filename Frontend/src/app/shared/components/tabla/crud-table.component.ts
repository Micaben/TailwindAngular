import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent, TableColumn} from '../tabla/table.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ButtonComponent } from '../ui/button/button.component';
import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TableComponent,
    PaginationComponent,
    ButtonComponent,
    PageBreadcrumbComponent
  ],
  templateUrl: './crud-table.component.html',
})
export class CrudTableComponent {
  @Input() title = '';
  @Input() buttonText = 'Nuevo';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() search = new EventEmitter<string>();
  @Output() create = new EventEmitter<void>();
  @Output() edit = new EventEmitter<any>();
  @Output() pageChange = new EventEmitter<number>();
  searchTerm = '';
  onSearch() {
    this.search.emit(this.searchTerm);
  }
  boxIcon = `
  <svg xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
       stroke-width="1.5"
       stroke="currentColor"
       class="size-6">

    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 4.5v15m7.5-7.5h-15" />

  </svg>`;
}