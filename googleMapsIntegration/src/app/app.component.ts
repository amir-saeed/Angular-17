import { Component, ViewChild } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { GoogleMapsModule, MapAdvancedMarker, MapInfoWindow } from "@angular/google-maps";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, GoogleMapsModule],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
})
export class AppComponent {
  title = "google-maps-integration";
  options: google.maps.MapOptions = {
    center: { lat: -31, lng: 147 },
    zoom: 4,
    mapId: "DEMO_MAP_ID",
  };

  frLocations: any[] = [
    { lat: 48.8566, lng: 2.3522 },  // Paris
    { lat: 45.7640, lng: 4.8357 },  // Lyon
    { lat: 43.7102, lng: 7.2620 },  // Nice
    { lat: 43.6045, lng: 1.4442 },  // Toulouse
    { lat: 44.8378, lng: -0.5792 },  // Bordeaux
    { lat: 47.2184, lng: -1.5536 },  // Nantes
    { lat: 48.1173, lng: -1.6778 },  // Rennes
    { lat: 45.1885, lng: 5.7245 },  // Grenoble
    { lat: 43.2965, lng: 5.3698 },  // Marseille
    { lat: 50.6292, lng: 3.0573 },  // Lille
  ];
  
  ukLocations: any[] = [
    { lat: 51.5074, lng: -0.1278 },  // London
    { lat: 52.4862, lng: -1.8904 },  // Birmingham
    { lat: 53.483959, lng: -2.244644 },  // Manchester
    { lat: 55.9533, lng: -3.1883 },  // Edinburgh
    { lat: 51.4545, lng: -2.5879 },  // Bristol
    { lat: 53.4084, lng: -2.9916 },  // Liverpool
    { lat: 51.4816, lng: -3.1791 },  // Cardiff
    { lat: 54.9784, lng: -1.617439 },  // Newcastle
    { lat: 52.2053, lng: 0.1218 },  // Cambridge
    { lat: 50.8225, lng: -0.1372 },  // Brighton
  ];

  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  ngOnInit() {
    const parser = new DOMParser();
    const svgString = `<svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FF5733" stroke="#FFFFFF" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
                      </svg>`;
    this.frLocations.forEach((location) => {
      location.content = parser.parseFromString(svgString, "image/svg+xml").documentElement;
    });
    const beachFlag =
      "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    this.ukLocations.forEach((location) => {
      let imgTag = document.createElement("img");
      imgTag.src = beachFlag;
      location.content = imgTag;
    });
  }

  onMarkerClick(marker: MapAdvancedMarker) {
    this.infoWindow.openAdvancedMarkerElement(marker.advancedMarker, marker.advancedMarker.title);
  }
}