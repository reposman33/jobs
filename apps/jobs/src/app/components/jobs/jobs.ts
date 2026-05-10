import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
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
import { environment } from '../../../environments';
import { Search } from '../search/search';
import { DatePipe } from '@angular/common';

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
  @ViewChild(MatPaginator) set paginator(value: MatPaginator | undefined) {
    if (!value) {
      return;
    }
    value.pageIndex = this.storageService.currentPaginatorPage;
    this.dataSource.paginator = value;

    value.page.subscribe((event: PageEvent) => {
      this.storageService.currentPaginatorPage = event.pageIndex;
    });
  }
  @ViewChild(MatSort) set sort(value: MatSort) {
  if(value) {
    this.dataSource.sort = value
    this.dataSource.sort.sort({ id: 'datum', start: 'desc', disableClear: true });
  };}
  @ViewChild(MatTable) table?: MatTable<Sollicitatie>;

  protected dataSource = new MatTableDataSource<Sollicitatie>();
  private router = inject(Router);
  private storageService = inject(StorageService);
  protected jobs$!: Promise<Sollicitatie[]>;
  protected BUILD_COMMIT = environment.BUILD_COMMIT.substring(0, 5);
  protected BUILD_DATE = environment.BUILD_DATE;
  tableData = signal<any[]>([])

  ngOnInit(){
    this.storageService.getAlljobs().then(data => {
      this.tableData.set(data)
      this.dataSource.data = data
    });
  }

  ngAfterViewInit(): void {}

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
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      this.sort?.sort({ id: 'datum', start: 'desc', disableClear: true });
    });
  }
}
