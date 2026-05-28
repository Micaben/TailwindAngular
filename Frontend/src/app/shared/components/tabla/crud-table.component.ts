import { CommonModule } from '@angular/common';
import { Component, signal, computed, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TableComponent, TableColumn } from '../tabla/table.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { ButtonComponent } from '../ui/button/button.component';
import { PageBreadcrumbComponent } from '../common/page-breadcrumb/page-breadcrumb.component';

@Component({
  selector: 'app-crud-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonComponent,
    PageBreadcrumbComponent,
    TableComponent,
    PaginationComponent
  ],
  templateUrl: './crud-table.component.html',
})
export class CrudTableComponent {

  title = input('');
  buttonText = input('Nuevo');
  columns = input<TableColumn[]>([]);
  data = input<any[]>([]);
  pageSize = input(10);
  iconName = input('');

  search = output<string>();
  create = output<void>();
  edit = output<any>();

  //  SIGNALS (estado interno)
  currentPage = signal(1);
  searchTerm = signal('');

  //  TOTAL PAGES
  get totalPages(): number {
    return Math.ceil(this.data().length / this.pageSize());
  }

  //  PAGINATED DATA
  get paginatedData(): any[] {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.data().slice(start, start + this.pageSize());
  }

  // SEARCH
  onSearch() {
    this.currentPage() + 1;
    this.search.emit(this.searchTerm());
  }

}