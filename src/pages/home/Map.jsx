import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useUserStore } from "../../stores/userStore";
import { Marker, Popup, ZoomControl } from "react-leaflet";
import Routing from "./Routing";
import { useAppStore } from "../../stores/appStore";

function Map() {
  const { currPosition } = useUserStore();
  const { view } = useAppStore();

  return (
    <MapContainer
      center={currPosition}
      zoom={14}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ZoomControl position="bottomright" />
      {view == 2 ? <Routing /> : null}
      <Marker position={currPosition}>
        <Popup>
          <a href="http://openstreetmap.org">OpenStreetMap</a>
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
