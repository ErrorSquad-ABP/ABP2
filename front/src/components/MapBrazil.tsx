import { useEffect, useState } from "react";
import MapSvg from "./MapSvg";

export default function MapWorld() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson")
      .then((res) => res.json())
      .then((data) => setCountries(data.features));
  }, []);

  const handleCountryClick = (id) => {
    console.log("País clicado:", id);
  };

  return <MapSvg countries={countries} onClickCountry={handleCountryClick} />;
}
