import { memo, MutableRefObject } from "react";
import {
  LatLngLiteral,
  MapOptions,
  Mark,
  PlacesService,
} from "../types/googleMapInterface";
import { GoogleMap, MarkerClusterer, MarkerF } from "@react-google-maps/api";

import "../assets/scss/map.scss";
import blueDot from "../assets/image/blueDot.png";
import cluster from "../assets/image/cluster.png";

const center: LatLngLiteral = {
  lat: 25.03796633677417,
  lng: 121.51973488681502,
};

const options: MapOptions = {
  mapId: "71806a6dd7222cce",
  disableDefaultUI: true,
  clickableIcons: false,
};

const clusterStyles = [
  {
    url: cluster,
    height: 50,
    width: 50,
    textColor: "#ffffff",
    textSize: 16,
  },
  {
    url: cluster,
    height: 60,
    width: 60,
    textColor: "#ffffff",
    textSize: 16,
  },
  {
    url: cluster,
    height: 70,
    width: 70,
    textColor: "#ffffff",
    textSize: 18,
  },
];

interface Props {
  mapRef: MutableRefObject<google.maps.Map | undefined>;
  placesServiceRef: MutableRefObject<PlacesService | undefined>;
  markList: Mark[];
  onMarkerClicked: (placeId: string) => void;
}

const Map: React.FunctionComponent<Props> = ({
  mapRef,
  placesServiceRef,
  markList,
  onMarkerClicked,
}) => {
  return (
    <div
      className="map"
      style={{
        width: "100%",
        height: "calc(100vh - 64px)",
        position: "absolute",
      }}
    >
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={(map) => {
          console.log("Maps API has loaded.");
          mapRef.current = map;
          placesServiceRef.current = new google.maps.places.PlacesService(map);
        }}
        options={options}
      >
        <MarkerClusterer
          options={{
            gridSize: 50,
            maxZoom: 17,
            styles: clusterStyles,
          }}
        >
          {(clusterer) => (
            <>
              {markList.map((mark) => (
                <MarkerF
                  key={mark.placeId}
                  position={mark.location}
                  clusterer={clusterer}
                  icon={{
                    url: blueDot,
                  }}
                  label={{
                    text: mark.name,
                    color: "blue",
                    fontSize: "14px",
                    fontWeight: "bold",
                    className: "marker_label",
                  }}
                  onClick={() => {
                    mapRef.current?.panTo(mark.location);
                    onMarkerClicked(mark.placeId);
                  }}
                />
              ))}
            </>
          )}
        </MarkerClusterer>
      </GoogleMap>
    </div>
  );
};

export default memo(Map);
