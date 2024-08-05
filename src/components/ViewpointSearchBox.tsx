// import { Button, Dropdown, Input, MenuProps, Segmented, Slider, Space } from "antd"
// import { SearchOutlined, CloseOutlined, StarOutlined, FireOutlined, HomeOutlined, CarOutlined } from '@ant-design/icons';
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { AppDispatch } from "../store";
// import { setCenter, setRadius, setViewpointType } from "../store/viewpointExplore/searchPropsSlice";

// const { Place } = await google.maps.importLibrary('places') as google.maps.PlacesLibrary;
// const { LatLngBounds } = await google.maps.importLibrary("core") as google.maps.CoreLibrary;

// export const ViewpointSearchBox = () => {

//     const dispatch = useDispatch<AppDispatch>();
//     const [candidateList, setCandidateList] = useState<MenuProps["items"]>([])
//     const [inputValue, setinputValue] = useState('')
//     const [firstViewpoint, setFirstViewpoint] = useState<google.maps.places.Place | null>(null)
//     async function findPlaces(textQuery: string) {
//         const request = {
//             textQuery,
//             fields: ['id', 'displayName', 'location', 'businessStatus', 'rating', 'websiteURI', 'formattedAddress', 'regularOpeningHours', 'nationalPhoneNumber', 'photos'],
//             isOpenNow: true,
//             language: 'zh-TW',
//             maxResultCount: 7,
//             minRating: 3.2,
//             region: 'TW',
//             useStrictTypeFiltering: false,
//         };

//         //@ts-ignore
//         const { places } = await Place.searchByText(request);

//         if (places) {
//             setFirstViewpoint(places[0])
//             const bounds = new LatLngBounds();
//             let viewpointList: MenuProps['items'] = []
//             places.forEach((place) => {
//                 console.log(place)
//                 viewpointList!.push({
//                     key: String(place.location), label: String(place.displayName), onClick: () => {
//                         setinputValue(place.displayName!)
//                         dispatch(setCenter(place))
//                     }
//                 })
//                 bounds.extend(place.location as google.maps.LatLng);
//             });
//             setCandidateList(viewpointList)
//         } else {
//             setCandidateList([])
//             alert('查無此地點')
//         }

//     }
//     return (
//         <Space className="ViewpointExplore-searchBox">
//             <Space.Compact style={{ width: '100%' }}>
//                 <Dropdown menu={{ items: candidateList }} placement="bottomRight" >
//                     <Input
//                         placeholder="搜尋地點"
//                         value={inputValue}
//                         onChange={(e) => {
//                             setinputValue(e.target.value)
//                             findPlaces(e.target.value)
//                         }}
//                         allowClear />
//                 </Dropdown>
//                 <Button
//                     icon={<SearchOutlined />}
//                     type="primary"
//                     onClick={() => {
//                         if (firstViewpoint) {
//                             dispatch(setCenter(firstViewpoint!))
//                         }
//                         else
//                             alert('查無此地點')
//                     }} />
//             </Space.Compact>
//             <h3 style={{ width: '70px' }}>進階搜尋:</h3>
//             <Segmented
//                 onChange={(e) => { dispatch(setViewpointType(e)) }}
//                 options={[{
//                     label: (
//                         <div className="ViewpointExplore-searchBox-catoeryItem">
//                             <CloseOutlined />
//                             <div>無</div>
//                         </div>
//                     ),
//                     value: '',
//                 },
//                 {
//                     label: (
//                         <div className="ViewpointExplore-searchBox-catoeryItem">
//                             <StarOutlined />
//                             <div>觀光景點</div>
//                         </div>
//                     ),
//                     value: 'tourist_attraction',
//                 },
//                 {
//                     label: (
//                         <div className="ViewpointExplore-searchBox-catoeryItem">
//                             <FireOutlined />
//                             <div>餐廳</div>
//                         </div>
//                     ),
//                     value: 'restaurant',
//                 },
//                 {
//                     label: (
//                         <div className="ViewpointExplore-searchBox-catoeryItem">
//                             <HomeOutlined />
//                             <div>住宿</div>
//                         </div>
//                     ),
//                     value: 'lodging',
//                 },
//                 {
//                     label: (
//                         <div className="ViewpointExplore-searchBox-catoeryItem">
//                             <CarOutlined />
//                             <div>停車場</div>
//                         </div>
//                     ),
//                     value: 'parking',
//                 }]} />
//             <h3 style={{ width: '40px' }}>範圍:</h3>
//             <Slider style={{ width: "100px" }} defaultValue={1000} min={200} max={2000} tooltip={{ open: true }} onChange={(e) => { dispatch(setRadius(e)) }} />
//         </Space>
//     )
// }
