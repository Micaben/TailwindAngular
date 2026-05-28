import { Component, Input, Output, EventEmitter, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../ui/button/button.component';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent
  ],

  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {

  // =========================
  // INPUTS
  // =========================

  private _currentPage = signal(1);
  private _totalPages = signal(1);

  @Input()
  set currentPage(value: number) {
    this._currentPage.set(value || 1);
  }

  get currentPage(): number {
    return this._currentPage();
  }

  @Input()
  set totalPages(value: number) {
    this._totalPages.set(value || 1);
  }

  get totalPages(): number {
    return this._totalPages();
  }

  // =========================
  // OUTPUT
  // =========================

  @Output()
  pageChange =  new EventEmitter<number>();

  // =========================
  // PAGINAS VISIBLES
  // =========================
  visiblePages = computed(() => {

    const total = this.totalPages;
    const current = this.currentPage;
    const maxVisible = 5;
    let start = Math.max( current - 2, 1 );
    let end = start + maxVisible - 1;

    if (end > total) {
      end = total;
      start = Math.max( end - maxVisible + 1, 1 );
    }

    return Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );
  });

  // =========================
  // CAMBIAR PAGINA
  // =========================

  goToPage(page: number): void {
    if ( page < 1 || page > this.totalPages || page === this.currentPage ) {
      return;
    }
    this.pageChange.emit(page);
  }

  // =========================
  // HELPERS
  // =========================

  isActive(page: number): boolean {
    return page === this.currentPage;
  }

  hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }
}