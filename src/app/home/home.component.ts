import { GetDataService } from './../get-data.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import {} from '@types/googlemaps';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ GetDataService ]
})
export class HomeComponent implements OnInit {

  el: ElementRef;
  map: google.maps.Map;
  mapWithMark: google.maps.Map;
  mark: google.maps.Marker;
  position = { lat: 24.980102, lng: 121.549126 };
  constructor(
    private element: ElementRef,
    private http: GetDataService
  ) {
    this.el = this.element;
  }

  ngOnInit() {
    const useragent = navigator.userAgent;
    console.log(useragent);
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
        position: this.position, title: '測試'
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

    // Info window with marker.
    this.infoWindow();

    // info window with multiple marker.
    this.mulInfoW();

    // directions api.
    this.directionsAPI();
  }

  /**
   * 要在Google console platform 啟用Directions API
   */
  directionsAPI() {
    const waypAry = [
      { lat: 24.978641, lng: 121.550183},
      { lat: 24.978835, lng: 121.551471},
      { lat: 24.980031, lng: 121.554078},
      { lat: 24.985215, lng: 121.554014},
      { lat: 24.989114, lng: 121.552426},
      { lat: 24.998537, lng: 121.553359},
      { lat: 24.999792, lng: 121.554089},
      { lat: 25.006005, lng: 121.558037},
      { lat: 25.013755, lng: 121.553700},
      { lat: 25.017200, lng: 121.550756},
      { lat: 25.018145, lng: 121.551001},
      { lat: 25.019426, lng: 121.551639},
      { lat: 25.022253, lng: 121.554548},
      { lat: 25.022036, lng: 121.555858},
      { lat: 25.021395, lng: 121.556491},
      { lat: 25.020733, lng: 121.556581},
      { lat: 25.019660, lng: 121.557472},
      { lat: 25.018747, lng: 121.558393},
      { lat: 25.015796, lng: 121.560833},
      { lat: 25.011942, lng: 121.563439},
      { lat: 25.007152, lng: 121.566270},
      // { lat: 25.003094, lng: 121.571877},
      // { lat: 24.999174, lng: 121.574110},
      // { lat: 24.997324, lng: 121.573606},
      // { lat: 24.992473, lng: 121.571290},
      // { lat: 24.991790, lng: 121.571143},
      // { lat: 24.990096, lng: 121.576859},
      // { lat: 24.989235, lng: 121.579685}
    ];
    const map9 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map9'),
      {center: this.position, zoom: 15 }
    );
    let dr = new google.maps.DirectionsService;
    let display = new google.maps.DirectionsRenderer;
    display.setMap(map9);
    let waypts = [];
    waypAry.forEach((loc) => {
      waypts.push({
        location: loc,
        stopover: false
      });
    });

    dr.route(
      {
        origin: { lat: 24.979577, lng: 121.548874 },
        destination: { lat: 24.987055, lng: 121.587794 },
        travelMode: google.maps.TravelMode.DRIVING,
        waypoints: waypts,
      },
      (resp, status) => {
        if ( status.toString() === 'OK') {
          display.setDirections(resp);
        } else {
          window.alert(`Directions request failed due to ${status.toString()}`);
        }
      }
    );
  }

  /**
   * multiple info window on marker.
   */
  mulInfoW() {
    const markersAry = [
      { lat: 24.980102, lng: 121.549126, img: 'ball.png'},
      { lat: 24.981312, lng: 121.546236, img: 'castle.png'},
      { lat: 24.980622, lng: 121.549246, img: 'ginza.jpg'},
      { lat: 24.982832, lng: 121.543656, img: 'goomba.png'},
      { lat: 24.980942, lng: 121.549966, img: 'mario.png'},
      { lat: 24.983052, lng: 121.547076, img: 'robot.png'}
    ];

    const map8 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map8'),
      {center: this.position, zoom: 15}
    );

    let multMarks: google.maps.Marker;
    let contentString: string;
    let infow: google.maps.InfoWindow;

    markersAry.forEach((loc) => {
      multMarks = new google.maps.Marker({
        position: { lat: loc.lat, lng: loc.lng },
        map: map8
      });

      contentString = `<div><img src="assets/${loc.img}"
        width='160' height='120'></img></div>`;

      infow = new google.maps.InfoWindow();
      google.maps.event.addListener(
        multMarks, 'click', ((
          mark: google.maps.Marker,
          content: string,
          infowindow: google.maps.InfoWindow) => {
            return () => {
            infowindow.setContent(content);
            infowindow.open(map8, mark);
          };
        })(multMarks, contentString, infow)
      );
    });
  }

/* setMarkers(map, locations: Array<any>) {

  let marker, i;
  for (i = 0; i < locations.length; i++) {
    let loan = locations[i][0];
    let lat = locations[i][1];
    let long = locations[i][2];
    let add = locations[i][3];

    let latlngset = new google.maps.LatLng(lat, long);
    let marker = new google.maps.Marker({
      map: map, title: loan, position: latlngset
    });
    map.setCenter(marker.getPosition());

    let content = 'Loan Number: <h3>' + loan + '</h3>' + ' Address: ' + add;
    let infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(
      marker, 'click', ((marker, content, infowindow) => {
        return () => {
          infowindow.setContent(content);
          infowindow.open(map, marker);
        };
      })(marker, content, infowindow));
  }
} */

  /**
   * Single info window
   */
  infoWindow() {
    const map7 = new google.maps.Map(
      this.el.nativeElement.querySelector('#map7'),
      { center: this.position, zoom: 15 }
    );
    const contentString = `<div><img src="assets/ginza.jpg"
    width='160' height='120'></img></div>`;
    const infow = new google.maps.InfoWindow({
      content: contentString,
    });

    const marker = new google.maps.Marker({
      position: this.position,
      map: map7,
      title: 'Clover'
    });
    marker.addListener('click', () => infow.open(map7, marker));
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


class DirectionObj {
  origin: string | google.maps.LatLng | google.maps.Place;
  destination: string | google.maps.LatLng | google.maps.Place;
  travelMode = 'DRIVING';
  waypoints?: [WayPoint];
}

class WayPoint {
  location: string | google.maps.LatLng | google.maps.Place;
  stopover: boolean;
  constructor (locate?, isstopover = false) {
    this.location = locate;
    this.stopover = isstopover;
  }
}
