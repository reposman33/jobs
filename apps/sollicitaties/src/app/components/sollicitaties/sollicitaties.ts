import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';
import { StorageService } from '../../services/StorageService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sollicitaties',
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './sollicitaties.html',
  styleUrls: ['./sollicitaties.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class Sollicitaties {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table?: MatTable<Sollicitatie>;

  protected dataSource = new MatTableDataSource<Sollicitatie>();
  private router = inject(Router);
  private storageService = inject(StorageService);
  protected sollicitaties$!: Promise<Sollicitatie[]>;
   
  ngOnInit(){
    this.sollicitaties$ = this.storageService.getAllSollicitaties();
  }

  ngAfterViewInit(): void {
    if(this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
    if(this.sort) {
      this.dataSource.sort = this.sort;
    }

    this.sollicitaties$.then(data => this.dataSource.data = data)
  }

  getLimitedSentences(text: string): string {
    if (!text.length) {
      return ''
    };
    const truncatedText = text.substring(0,55);
    return truncatedText < text ? truncatedText + '...' : text;
  }

  toonSollicitatie(id: string) {
    this.activateRoute('/add-sollicitatie', id)
  }

  activateRoute(route: string, id: string | null = null): void {
    if(id) {
      this.router.navigate([route,id]);
    } else {
      this.router.navigate([route]);
    }
  }
}
