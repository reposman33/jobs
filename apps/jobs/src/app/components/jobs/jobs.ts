import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {
  MatTableModule,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';
import { StorageService } from '../../services/StorageService';
import { DatePipe } from '@angular/common';
import { environment } from '../../../environments';
import { Search } from '../search/search';

@Component({
  selector: 'app-jobs',
  imports: [
    DatePipe,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    Search
  ],
  providers: [],
  templateUrl: './jobs.html',
  styleUrls: ['./jobs.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class jobs {
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  @ViewChild(MatSort) sort?: MatSort;
  @ViewChild(MatTable) table?: MatTable<Sollicitatie>;

  protected dataSource = new MatTableDataSource<Sollicitatie>();
  private router = inject(Router);
  private storageService = inject(StorageService);
  protected jobs$!: Promise<Sollicitatie[]>;
  protected BUILD_COMMIT = environment.BUILD_COMMIT.substring(0, 5);
  protected BUILD_DATE = environment.BUILD_DATE;

  async ngAfterViewInit(): Promise<void> {

    this.dataSource.data = await this.storageService.getAlljobs();
    
    if (this.paginator) {
      this.paginator.pageIndex = this.storageService.currentPaginatorPage; // Herstel de pagina-index bij het initialiseren van de paginator
      this.dataSource.paginator = this.paginator;

      this.paginator.page.subscribe((event: PageEvent) => {
        this.storageService.currentPaginatorPage = event.pageIndex; // Sla de huidige pagina-index op in de service
      });
      
    }
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.sort.sort({ id: 'datum', start: 'desc', disableClear: true });
    }

  }

  activateRoute(route: string, id: string | null = null): void {
    if (id) {
      this.router.navigate([route, id]);
    } else {
      this.router.navigate([route]);
    }
  }

  onSearch($event: string): void {
    this.storageService.searchSollicitaties($event).then((data) => {
      this.dataSource.data = data;
      this.sort?.sort({ id: 'datum', start: 'desc', disableClear: true });
    });
  }
}
