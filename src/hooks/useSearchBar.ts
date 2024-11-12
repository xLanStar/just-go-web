import { useState } from "react";

const useSearchBar = () => {
  const [placeType, setPlaceType] = useState<string>("tourist_attraction");

  const changePlaceType = (key: string) => {
    switch (key) {
      case "1": // 景點
        setPlaceType("tourist_attraction");
        break;
      case "2": // 住宿
        setPlaceType("lodging");
        break;
      case "3": // 購物
        setPlaceType("store");
        break;
      case "4": // 餐廳
        setPlaceType("restaurant");
        break;
      case "5": // 交通
        setPlaceType("subway_station");
        break;
    }
  };

  return { placeType, changePlaceType };
};

export default useSearchBar;
