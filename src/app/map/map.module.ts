import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapService } from './map.service';
import { OverviewMapComponent } from './overview-map/overview-map.component';
import { DetailMapComponent } from './detail-map/detail-map.component';

@NgModule({
  declarations: [OverviewMapComponent, DetailMapComponent],
  imports: [
    CommonModule
  ],
  entryComponents: [
    OverviewMapComponent,
    DetailMapComponent
  ],
  providers: [
    MapService
  ],
  exports: [
    OverviewMapComponent,
    DetailMapComponent
  ]
})
export class MapModule { }
