import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, EMPTY } from 'rxjs';
import { Sollicitatie } from '../../../../../../models/sollicitatie.interface';


// TODO: replace this with real data from your application
const EXAMPLE_DATA: Sollicitatie[] = [
      {
      datum: '2024-01-15',
      bedrijf: 'Tech Solutions',
      functie: 'Software Engineer',
      sluitingsdatum: '2024-02-01',
      sollicitatie: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.',
      status: 'pending'
    },
    {
      datum: '2024-01-20',
      bedrijf: 'Innovatech',
      functie: 'Frontend Developer',
      sluitingsdatum: '2024-02-10',
      sollicitatie: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.',
      status: 'accepted'
    },
    {
      datum: '2024-01-25',
      bedrijf: 'WebWorks',
      functie: 'UI/UX Designer',
      sluitingsdatum: '2024-02-15',
      sollicitatie: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.',
      status: 'rejected'
    },
    { 
      datum: '2024-02-01',
      bedrijf: 'DataCorp',
      functie: 'Data Analyst',
      sluitingsdatum: '2024-02-20',
      sollicitatie: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda molestias nisi dolore, hic necessitatibus quae sit. Repudiandae deleniti rem ad minima voluptatum assumenda nesciunt reiciendis consectetur voluptas perspiciatis! Atque, unde.',
      status: 'pending'
    }
];

/**
 * Data source for the Sollicitaties2 view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class SollicitatiesDataSource extends DataSource<Sollicitatie> {
  data: Sollicitatie[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Sollicitatie[]> {
    // If paginator is not set yet, return initial data
    if (!this.paginator) {
      return observableOf(this.data);
    }
    
    // Create an array of observables to merge
    const dataMutations: Observable<any>[] = [observableOf(this.data), this.paginator.page];
    
    // Add sort changes if sort is available
    if (this.sort) {
      dataMutations.push(this.sort.sortChange);
    }

    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    return merge(...dataMutations)
      .pipe(map(() => {
        return this.getPagedData(this.getSortedData([...this.data]));
      }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Sollicitatie[]): Sollicitatie[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Sollicitatie[]): Sollicitatie[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'bedrijf': return compare(a.bedrijf, b.bedrijf, isAsc);
        case 'datum': return compare(+new Date(a.datum), +new Date(b.datum), isAsc);
        case 'sluitingsdatum': return compare(+new Date(a.sluitingsdatum), +new Date(b.sluitingsdatum), isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
}

// Keep a public alias for table row item type so components can import it.
export type SollicitatiesItem = Sollicitatie;

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
