import { createContext, ReactNode, useContext } from "react";
import { Libraries, useLoadScript } from "@react-google-maps/api";

interface Props {
  children: ReactNode;
}

interface ContextProps {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const libraries: Libraries = ["places"];
const GoogleMapContext = createContext<ContextProps | undefined>(undefined);

const GoogleMapProvider: React.FC<Props> = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_API,
    libraries,
    region: "TW",
    language: "zh-TW",
  });

  return (
    <GoogleMapContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapContext.Provider>
  );
};

export const useGoogleMap = (): ContextProps => {
  const context = useContext(GoogleMapContext);

  if (!context) {
    throw new Error("useGoogleMap must be used within a GoogleMapProvider");
  }

  return context;
};

export default GoogleMapProvider;
