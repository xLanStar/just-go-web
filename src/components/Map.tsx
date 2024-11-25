import { memo, MutableRefObject } from "react";
import {
  LatLngLiteral,
  MapOptions,
  Mark,
  PlacesService,
} from "../types/googleMapInterface";
import {
  GoogleMap,
  MarkerClusterer,
  MarkerF,
  Polyline,
} from "@react-google-maps/api";
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
  mode: "Clusterer" | "Polyline";
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
  mode,
}) => {
  return (
    <div className="map">
      <GoogleMap
        center={
          mode === "Clusterer"
            ? center
            : markList.length > 0
              ? markList[markList.length - 1].location
              : center
        }
        zoom={15}
        mapContainerStyle={{
          width: "100%",
          height: "100%",
        }}
        onLoad={(map) => {
          mapRef.current = map;
          placesServiceRef.current = new google.maps.places.PlacesService(map);
        }}
        options={options}
      >
        {mode === "Clusterer" ? (
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
                      className: "map_marker",
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
        ) : (
          <>
            {markList.map((mark) => (
              <MarkerF
                key={mark.placeId}
                position={mark.location}
                icon={{ url: blueDot }}
                label={{
                  text: mark.name,
                  color: "blue",
                  fontSize: "14px",
                  fontWeight: "bold",
                  className: "map_marker",
                }}
                onClick={() => {
                  mapRef.current?.panTo(mark.location);
                  onMarkerClicked(mark.placeId);
                }}
              />
            ))}
            <Polyline
              path={markList.map((mark) => mark.location)}
              options={{
                strokeColor: "blue",
                strokeOpacity: 1,
                strokeWeight: 2,
              }}
            />
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default memo(Map);
