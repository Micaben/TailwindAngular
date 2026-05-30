import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BadgeComponent } from '../ui/badge/badge.component';

export interface TableColumn {
  header: string;
  field?: string;
  width?: string;
  type?: 'text' | 'date' | 'number' | 'badge';
  formatter?: (row: any) => string;
  badge?: (row: any) => {
    label: string;
    color: 'primary' | 'success' | 'error' | 'warning' | 'info' | 'light' | 'dark';
  };
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, BadgeComponent],
  templateUrl: './table.component.html',
})

export class TableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Output() edit = new EventEmitter<any>();

}