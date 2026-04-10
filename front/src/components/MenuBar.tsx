// front/src/components/MenuBar.tsx
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import simasLogo from "../assets/simas.png";
import furnasLogo from "../assets/furnas.png";
import balcarLogo from "../assets/Balcar.png";

const Nav = styled.nav`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.primary} 0%,
    ${({ theme }) => theme.colors.primaryDark} 100%
  );
  color: ${({ theme }) => theme.colors.text.inverse};
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.small};
  z-index: 100;
  position: relative;
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

  @media (max-width: 768px) {
    padding: 0 ${({ theme }) => theme.spacing(2)};
  }
`;

const Brand = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
`;

const Logo = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.large};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: #fff;

  @media (max-width: 480px) {
    font-size: ${({ theme }) => theme.fonts.size.medium};
  }
`;

const RightLogos = styled.div<{ $open?: boolean }>`
  display: flex;
  gap: 10px;
  align-items: center;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    position: absolute;
    top: 64px;
    left: 0;
    width: 100%;
    background: ${({ theme }) => theme.colors.primaryDark};
    flex-direction: row;
    justify-content: center;
    padding: ${({ theme }) => theme.spacing(2)} 0;
    overflow: hidden;
    max-height: ${({ $open }) => ($open ? "80px" : "0")};
    opacity: ${({ $open }) => ($open ? 1 : 0)};
    pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  }
`;

const LogoButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 10px rgba(7, 42, 89, 0.12);
  overflow: hidden;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 255, 255, 0.15);
  }

  img {
    width: 80%;
    height: 80%;
    object-fit: contain;
  }
`;

const MobileButton = styled.button`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  cursor: pointer;
  color: #fff;

  @media (min-width: 769px) {
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
            <LogoImg
              src="/DBIcon.png"
              alt="BDLimnologico"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </Logo>
          <Title>BDLimnologico</Title>
        </Brand>

        <MobileButton onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileButton>

        <RightLogos $open={isOpen}>
          <LogoButton to="/sima/institucional" title="SIMAS">
            <img src={simasLogo} alt="SIMAS" />
          </LogoButton>
          <LogoButton to="/furnas" title="FURNAS">
            <img src={furnasLogo} alt="FURNAS" />
          </LogoButton>
          <LogoButton to="/balcar" title="BALCAR">
            <img src={balcarLogo} alt="BALCAR" />
          </LogoButton>
        </RightLogos>
      </Container>
    </Nav>
  );
}

export default MenuBar;
