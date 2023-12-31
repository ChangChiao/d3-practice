import { CountryData } from './../../model/country.model';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponentStore } from 'src/app/store/app.state';
import { map, single, tap } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { VoteState } from 'src/app/model';
import { BarComponent } from '../bar/bar.component';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-bar-container',
  standalone: true,
  imports: [CommonModule, LetDirective, ChartComponent, BarComponent],
  template: `
    <div *ngrxLet="vm$ as vm">
      <app-chart
        [filterOject]="filterOject()"
        [data]="filterResult()"
      ></app-chart>
      <!-- <app-bar [filterOject]="filterOject()" [data]="filterResult()"></app-bar> -->
    </div>
  `,
  styleUrls: ['./bar-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BarContainerComponent {
  #store = inject(AppComponentStore);
  filterOject = signal({
    type: 'taiwan',
    id: '',
  });
  fullData = signal({});
  vm$ = this.#store.vm$.pipe(
    tap(({ voteData }) => {
      console.log(voteData);
      this.fullData.set(voteData);
    })
  );

  isEmptyObject(obj: Record<string, any>) {
    return Object.keys(obj).length === 0;
  }

  filterResult = computed(() => {
    if (this.isEmptyObject(this.fullData())) return [];
    const fullData = this.fullData() as VoteState;
    const filterOject = this.filterOject();
    if (this.filterOject().type === 'taiwan') return fullData.country;
    if (this.filterOject().type === 'country') {
      return fullData?.village?.filter(
        (item) => item.countyId === filterOject.id
      );
    }
    if (this.filterOject().type === 'town') {
      return fullData?.village?.filter(
        (item) => item.townId === filterOject.id
      );
    }
    return [];
  });
}
