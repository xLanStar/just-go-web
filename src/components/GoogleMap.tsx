import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewpoint } from "../store/viewpointExplore/CurrentViewpointSlice";

const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
const { Place, } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;

export const GoogleMap = () => {
    let map: google.maps.Map | null = null
    const ref = useRef<HTMLDivElement | null>(null);
    const center = useSelector((state: RootState) => state.center);
    const viewpointType = useSelector((state: RootState) => state.viewpointType);
    const radius = useSelector((state: RootState) => state.radius);
    const dispatch = useDispatch<AppDispatch>();

    // 刷新頁面
    useEffect(() => {
        if (ref.current) {
            if (center.value) {
                map = new google.maps.Map(ref.current, {
                    center: center.value.location,
                    zoom: 15,
                    mapId: 'searchMap'
                });
                centerMarker();
                nearbySearch();
            }
            else {
                map = new google.maps.Map(ref.current, {
                    center: new google.maps.LatLng(25.03796633677417, 121.51973488681502),
                    zoom: 15,
                    mapId: 'searchMap'
                });
            }

        }
    }, [ref, center, viewpointType, radius]);

    //設置中心點標記
    const centerMarker = () => {
        if (center.value) {
            const marker = new AdvancedMarkerElement({
                position: center.value?.location,
                map,
                gmpClickable: true,
            })
            marker.addListener('click', () => {
                dispatch(setCurrentViewpoint(center.value!))
            });
        }
    }

    //搜尋附近景點
    async function nearbySearch() {
        const request = {
            fields: ['displayName', 'location', 'businessStatus', 'rating', 'websiteURI', 'formattedAddress', 'regularOpeningHours', 'nationalPhoneNumber', 'photos', 'svgIconMaskURI', 'iconBackgroundColor'],
            locationRestriction: {
                center: center.value?.location,
                radius: radius.value,
            },
            includedPrimaryTypes: [viewpointType.value],
            maxResultCount: 10,

            language: 'zh-TW',
            region: 'tw',
        };

        //@ts-ignore
        const { places } = await Place.searchNearby(request);

        if (places.length) {
            const bounds = new LatLngBounds();
            places.forEach((place: google.maps.places.Place) => {
                const pinElement = new PinElement({
                    background: place.iconBackgroundColor,
                    borderColor: place.iconBackgroundColor,
                    glyph: new URL(String(place.svgIconMaskURI))
                });
                const markerView = new AdvancedMarkerElement({
                    map,
                    position: place.location,
                    title: place.displayName,
                    content: pinElement.element,
                });
                markerView.addListener('click', () => {
                    dispatch(setCurrentViewpoint(place))
                    document.getElementById("placeDetail")!.style.display = 'block';
                });

                bounds.extend(place.location as google.maps.LatLng);
                console.log(place);
            });

        } else {
            console.log("No results");
        }
    }

    return (
        <div ref={ref} className="ViewpointExplore-map" />
    );

};