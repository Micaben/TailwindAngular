export abstract class BaseListComponent<T> {

  currentPage = 1;

  itemsPerPage = 5;

  filteredItems: T[] = [];

  get totalPages(): number {

    return Math.ceil(
      this.filteredItems.length / this.itemsPerPage
    );

  }

  get currentItems(): T[] {

    const start =
      (this.currentPage - 1) * this.itemsPerPage;

    return this.filteredItems.slice(
      start,
      start + this.itemsPerPage
    );

  }

}