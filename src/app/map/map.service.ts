import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MapStyles } from './map-style';

import * as mapboxgl from 'mapbox-gl';
import * as _leaflet from 'leaflet';
import * as _mapboxglleaflet from 'mapbox-gl-leaflet';
import * as GeoCoder from 'leaflet-control-geocoder';
import { element } from 'protractor';

const mapBoxToken = environment.mapboxKey;
declare var L: any;

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map:any;
  private mapGl:any;
  private _leaflet = _leaflet;
  private _mapboxglleaflet = _mapboxglleaflet;
  private geoCoder = GeoCoder;

  constructor() {
    (mapboxgl as typeof mapboxgl).accessToken = environment.mapboxKey;
  }

  createMap() {
    this.map = L.map('map-div').setView([51.5, -.1], 10);
    this.mapGl = L.mapboxGL({
      accessToken: mapboxgl.accessToken,
      style: MapStyles.Street.style
    }).addTo(this.map);
    this.map.zoomControl.setPosition('bottomright');
  }

  addMapSearch() {
    this.geoCoder = new L.Control.Geocoder({
      expand: 'touch',
      showResultIcons: true,
      position: 'topleft',
      geocoder: L.Control.Geocoder.mapbox(mapboxgl.accessToken)
    }).addTo(this.map, 'topleft');
  }

  setMapStyle(style: string) {
    if (style === MapStyles.Satellite.name) {
      this.map.setStyle(MapStyles.Satellite.style);
    } else if (style === MapStyles.Street.name) {
      this.map.setStyle(MapStyles.Street.style);
    }
  }

  addMarker(long: number, lat: number, bindingMessage?: string) {
    const marker = L.marker([long, lat]).addTo(this.map);
    if (bindingMessage) {
      marker.bindPopup(bindingMessage).openPopup();
    }
  }
  createCircle(long: number, lat: number, bindingMessage?: string) {
    const marker = L.circle([long, lat], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
    }).addTo(this.map);
    if (bindingMessage) {
      marker.bindPopup(bindingMessage).openPopup();
    }
  }

  addPolygon(arrayOfLatLongs: Array<Array<number>>, bindingMessage?: string) {
    const polygon = L.polygon(arrayOfLatLongs).addTo(this.map);
    if (bindingMessage) {
      polygon.bindPopup(bindingMessage);
    }
  }
}
