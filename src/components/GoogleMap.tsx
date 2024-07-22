import { useEffect, useRef } from "react";
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentViewpoint } from "../store/viewpointExplore/CurrentViewpointSlice";

const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
const { Place, } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;

export const GoogleMap = () => {
    let map: google.maps.Map | null = null
    const ref = useRef<HTMLDivElement | null>(null);
    const searchProps = useSelector((state: RootState) => state.searchProps);
    const dispatch = useDispatch<AppDispatch>();

    // 刷新頁面
    useEffect(() => {
        if (ref.current) {
            if (searchProps.value.center) {
                map = new google.maps.Map(ref.current, {
                    center: searchProps.value.center?.location,
                    zoom: 15,
                    mapId: '82720ed726de0b9d'
                });
                centerMarker();
                nearbySearch();
            }
            else {
                map = new google.maps.Map(ref.current, {
                    center: new google.maps.LatLng(25.03796633677417, 121.51973488681502),
                    zoom: 15,
                    mapId: '82720ed726de0b9d'
                });
            }

        }
    }, [ref, searchProps]);

    //設置中心點標記
    const centerMarker = () => {
        if (searchProps.value.center) {
            const marker = new AdvancedMarkerElement({
                position: searchProps.value.center?.location,
                map,
                gmpClickable: true,
            })
            marker.addListener('click', () => {
                dispatch(setCurrentViewpoint(searchProps.value.center!))
            });
        }
    }

    //搜尋附近景點
    async function nearbySearch() {
        const request = {
            fields: ['id', 'displayName', 'location', 'businessStatus', 'rating', 'websiteURI', 'formattedAddress', 'regularOpeningHours', 'nationalPhoneNumber', 'photos', 'svgIconMaskURI', 'iconBackgroundColor'],
            locationRestriction: {
                center: searchProps.value.center?.location,
                radius: searchProps.value.radius,
            },
            includedPrimaryTypes: [searchProps.value.viewpointType],
            maxResultCount: 10,
            language: 'zh-TW',
            region: 'TW',
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
                    document.getElementById("placeDetail")!.style.display = 'flex';
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