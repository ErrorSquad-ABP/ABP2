// front/src/components/MenuBar.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import simasLogo from "../assets/simas.png";
import furnasLogo from "../assets/furnas.png";
import balcarLogo from "../assets/balcar.png";

const Nav = styled.nav`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: ${({ theme }) => theme.colors.text.inverse};
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing(4)};
  max-width: 1400px;
  margin: 0 auto;
`;

/* left brand area: pushed more to the left using gap and margin */
const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  margin-right: auto;
`;

const Logo = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 6px 18px rgba(7, 42, 89, 0.14);
  overflow: hidden;
`;

/* wrapper for the logo image inside the square */
const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

/* title next to logo */
const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.large};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: #fff;
`;

/* area on the right for the external/internal logos */
const RightLogos = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`;

/* each external logo button */
const LogoButton = styled.a`
  display: inline-flex;
  width: 44px;
  height: 44px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.06);
  box-shadow: 0 6px 18px rgba(7,42,89,0.08);
  text-decoration: none;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255,255,255,0.12);
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    display: block;
    padding: 6px;
  }
`;

/* mobile hamburger */
const MobileButton = styled.button`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;

  @media (min-width: 768px) {
    display: none;
  }
`;

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <Brand to="/">
          <Logo>
            {/* substitute with your own icon or keep text fallback */}
            <LogoImg src="/DBIcon.png" alt="BDLimnologico" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
          </Logo>
          <Title>BDLimnologico</Title>
        </Brand>

        <RightLogos>
          {/* SIMAS */}
          <LogoButton
            href="/simas" /* use external url or internal route here */
            aria-label="Ir para SIMAS"
            title="SIMAS"
          >
            <img src={simasLogo} alt="SIMAS"/>
          </LogoButton>

          {/* FURNAS */}
          <LogoButton
            href="/furnas"
            aria-label="Ir para FURNAS"
            title="FURNAS"
          >
            <img src={furnasLogo} alt="FURNAS" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
          </LogoButton>

          {/* BALCAR */}
          <LogoButton
            href="/balcar"
            aria-label="Ir para BALCAR"
            title="BALCAR"
          >
            <img src={balcarLogo} alt="BALCAR" onError={(e)=>{(e.target as HTMLImageElement).style.display='none'}} />
          </LogoButton>

          {/* hamburger for mobile */}
          <MobileButton onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </MobileButton>
        </RightLogos>
      </Container>
    </Nav>
  );
}

export default MenuBar;
