import { useState } from "react";
import { Menu, X } from "lucide-react";
import styled from "styled-components";
import { Link } from "react-router-dom";

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
  max-width: 1200px;
  margin: 0 auto;
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
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
`;

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
        <Brand as={Link} to="/">
          <Logo>
            <LogoImg src="/DBIcon.png" alt="BDLimnologico" />
          </Logo>
          <Title>BDLimnologico</Title>
        </Brand>

        {/* Botão hambúrguer */}
        <MobileButton onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileButton>
      </Container>
    </Nav>
  );
}

export default MenuBar;
