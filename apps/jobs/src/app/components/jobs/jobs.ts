import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Sollicitatie } from '../../../../models/sollicitatie.interface';
import { StorageService } from '../../services/StorageService';
import { environment } from '../../../environments';
import { Search } from '../search/search';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-jobs',
  imports: [
    DatePipe,
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

  private router = inject(Router);
  private storageService = inject(StorageService);
  protected jobs$!: Promise<Sollicitatie[]>;
  protected BUILD_COMMIT = environment.BUILD_COMMIT.substring(0, 5);
  protected BUILD_DATE = environment.BUILD_DATE;
  tableDataExists = signal<boolean>(true)

  ngOnInit(){
    this.storageService.getAlljobs().then(data => {
      this.tableDataExists.set(data.length > 0)
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
      this.tableDataExists.set(data.length > 0)
      // doe iets met de data
    });
  }
}
