import { useEffect } from "react";

const BarraBrasil = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://barra.brasil.gov.br/barra.js";
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return <div id="barra-brasil"></div>;
};

export default BarraBrasil;
