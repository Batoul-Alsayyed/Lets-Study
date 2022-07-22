import { Component } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import "../index.css";

class MapComponent extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        style={{ width: "57%", height: "50%" }}
        zoom={13}
        initialCenter={{
          lat: 33.88863,
          lng: 35.49548,
        }}
      />
    );
  }
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyAb3oidKodSu-NLzMw0ozwhVHz7MpIgG4A",
})(MapComponent);
