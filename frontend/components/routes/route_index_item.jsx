import React from 'react';

class RouteIndexItem extends React.Component {

  constructor(props) {
    super(props);
    this.setDirections = this.setDirections.bind(this);
    this.calculateAndDisplayRoute = this.calculateAndDisplayRoute.bind(this);
  }


  componentDidMount() {
    const mapDOMNode = this.refs.map;
    const mapOptions = {
      center: {lat: 37.7758, lng: -122.435},
      zoom: 13
    };
    this.map = new google.maps.Map(mapDOMNode, mapOptions);
    this.setDirections();
  }

  setDirections() {

    let rendererOptions = {
      map: this.map,
      suppressMarkers: false,
    };

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);

    this.directionsDisplay.setMap(this.map);
    this.calculateAndDisplayRoute(this.directionsService, this.directionsDisplay);
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay) {
    let that = this;
    let origin = {lat: this.props.route.start_lat, lng: this.props.route.start_lng};
    let destination = {lat: this.props.route.end_lat, lng: this.props.route.end_lng};
    directionsService.route({
      origin: origin,
      destination: destination,
      travelMode: 'WALKING'
    }, function(response, status) {
      if(status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to' + status);
      }
    });
  }

  render() {

    const route = this.props.route;
    let activity_type = "";
    if(route.activity_type === "WALKING") {
      activity_type = "Walk";
    } else if(route.activity_type === "RUNNING") {
      activity_type = "Run";
    } else {
      activity_type = "Bike";
    }

    return(
      <div className="route-list-div">
        <ul>
          <li>{route.title}</li>
          <li>{route.description}</li>
          <li>{activity_type}</li>
          <li>{route.distance}</li>
          <li>{route.duration}</li>
        </ul>
        <div className="small-map" ref="map"></div>
      </div>
    );
  }
}

export default RouteIndexItem;
