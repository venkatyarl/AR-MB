import { Component, Input, OnInit, ViewEncapsulation, AfterViewInit } from '@angular/core';
import { MapService } from '../map.service';
import { MapStyles } from '../map-style';

@Component({
  selector: 'app-overview-map',
  templateUrl: './overview-map.component.html',
  styleUrls: ['./overview-map.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OverviewMapComponent implements OnInit, AfterViewInit {

  readonly mapStyles: typeof MapStyles = MapStyles;

  @Input() mapStyle = this.mapStyles.Street.name;
  @Input() displayStyles = true;
  @Input() displaySearch = true;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.mapService.createMap();

    if (this.displaySearch) {
      this.mapService.addMapSearch();
    }
  }

  ngAfterViewInit(): void {
    this.mapService.addMarker(51.5, -0.09, '<b>I am a Marker.</b>');
    this.mapService.createCircle(51.508, -0.11, '<b>I am a circle.</b>');
    this.mapService.addPolygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047],
        [51.61, -0.049]
      ], '<b>I am a polygon.</b>'
    );
  }

  public onStyleChange(): void {
    this.mapService.setMapStyle(this.mapStyle);
  }
}
