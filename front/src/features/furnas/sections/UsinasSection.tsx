import { JSX } from "react";
import { Block, BlockTitle, Image } from "../ui/furnasContent";
import UsinasImg1 from "../../../assets/usinashidreletricas1.png";
import UsinasImg2 from "../../../assets/usinashidreletricas2.png";

export function UsinasSection(): JSX.Element {
  return (
    <>
      <Block>
        <BlockTitle>Usinas em Operação</BlockTitle>

        {/* styled Image (defina no topo do arquivo, se quiser modular) */}
        <Image src={UsinasImg1} alt="Mapa Usinas Hidrelétricas 1" />

        <Image src={UsinasImg2} alt="Mapa Usinas Hidrelétricas 2" style={{ marginTop: "1rem" }} />
      </Block>
    </>
  );
}
