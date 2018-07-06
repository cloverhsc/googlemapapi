import { Component, OnInit, ElementRef } from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  el: ElementRef;
  map: google.maps.Map;
  mapWithMark: google.maps.Map;
  mark: google.maps.Marker;
  position = { lat: 24.980102, lng: 121.549126 };
  constructor(private element: ElementRef) {
    this.el = this.element;
  }

  ngOnInit() {
    // only map.
    this.map = new google.maps.Map(
      this.el.nativeElement.querySelector('#map'),
      {
        center: this.position,
        zoom: 15
      }
    );


    // map with marked.
    this.mapWithMark = new google.maps.Map(
      this.el.nativeElement.querySelector('#map1'),
      {
      center: this.position,
      zoom: 15
    });
    this.mark = new google.maps.Marker(
      {
        position: this.position, title: '秀育'
    });

    this.mark.setMap(this.mapWithMark);

    // put multiple marked.
    this.multipleMarkers();

    // Shapes Polyline
    this.drawPolyline();

    // Shapes Polygon
    this.drawPolygon();

    // Shapes Rectangel
    this.drawRectangle();

    // Shapes Circle
    this.drawCircle();
  }

  importData() {
    const map7 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map7'),
      { center: this.position, zoom: 2}
    );
  }

  /**
   * Circle
   */
  drawCircle() {
    const map6 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map6'),
      { center: this.position, zoom: 15 }
    );

    const citymap = {
      biotrump: {
        center: this.position,
        population: 6553
      }
    };

    for ( let id in citymap) {
      if (id) {
        const cityCircle = new google.maps.Circle({
          strokeColor: '#1000ff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#e14fff',
          fillOpacity: 0.5,
          map: map6,
          center: citymap[id].center,
          radius: Math.sqrt(citymap[id].population) * 10
        });
      }
    }
  }

  /**
   * Rectangle
   */
  drawRectangle() {
    const map5 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map5'),
      { center: this.position, zoom: 15 }
    );

    const rectgl = new google.maps.Rectangle({
      strokeColor: '#1000ff',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#69a0d6',
      fillOpacity: 0.5,
      map: map5,
      bounds: {
        north: 24.98502,
        south: 24.98002,
        east: 121.547526,
        west: 121.540026
      }
    });
  }

  /**
   * Polygon
   */
  drawPolygon() {
    const pointAry = [
      { lat: 24.980102, lng: 121.549126 },
      { lat: 24.981312, lng: 121.546236 },
      { lat: 24.980622, lng: 121.549246 },
      { lat: 24.982832, lng: 121.543656 },
      { lat: 24.980942, lng: 121.549966 },
      { lat: 24.983052, lng: 121.547076 }
    ];

    const map4 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map4'),
      { center: this.position, zoom: 15 }
    );

    const mypolygon = new google.maps.Polygon({
      paths: pointAry,
      strokeColor: '#1000ff',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#69a0d6',
      fillOpacity: 0.5
    });

    mypolygon.setMap(map4);
  }

  /**
   * Draw polyline
   */
  drawPolyline() {
    const markersAry = [
      { lat: 24.980102, lng: 121.549126},
      { lat: 24.981312, lng: 121.546236},
      { lat: 24.980622, lng: 121.549246},
      { lat: 24.982832, lng: 121.543656},
      { lat: 24.980942, lng: 121.549966},
      { lat: 24.983052, lng: 121.547076}
    ];

    const map3 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map3'),
      {
        center: this.position,
        zoom: 15
      }
    );

    const lineSymbol = {
      path: google.maps.SymbolPath.FORWARD_OPEN_ARROW
    };
    const drawPath = new google.maps.Polyline({
      path: markersAry,
      // icons: [{
      //   icon: lineSymbol,
      //   offset: '100%'
      // }],
      geodesic: true,
      strokeColor: '#1000ff',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });

    drawPath.setMap(map3);
  }

  /**
   * multiple markers.
   */
  multipleMarkers() {
    const markersAry = [
      [24.980102, 121.549126],
      [24.981312, 121.546236],
      [24.980622, 121.549246],
      [24.982832, 121.543656],
      [24.980942, 121.549966],
      [24.983052, 121.547076]
    ];

    const map2 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map2'),
      {
        center: this.position,
        zoom: 15
      }
    );

    let multMarks: google.maps.Marker;

    markersAry.forEach((loc) => {
      multMarks = new google.maps.Marker({
        position: {lat: loc[0], lng: loc[1]},
        map: map2
      });
    });
  }
}
