// front/src/components/MenuBar.tsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styled from "styled-components";

const Nav = styled.nav`
  background: linear-gradient(90deg, ${({ theme }) => theme.colors.primary} 0%, ${({ theme }) => theme.colors.primaryDark} 100%);
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
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(255,255,255,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  box-shadow: 0 6px 18px rgba(7, 42, 89, 0.14);
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.large};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
  color: #fff;
`;

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: ${({ theme }) => theme.spacing(6)};
    align-items: center;
  }
`;

const StyledLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background 0.12s ease, transform 0.12s ease;
  color: rgba(255,255,255,0.95);
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;

  &:hover {
    background: rgba(255,255,255,0.08);
    transform: translateY(-2px);
  }
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

const MobileMenu = styled.div`
  background: ${({ theme }) => theme.colors.primaryDark};
  width: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 6px 18px rgba(7, 42, 89, 0.12);
`;

const MobileLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  transition: background 0.12s;
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.04);

  &:hover {
    background-color: rgba(255,255,255,0.06);
  }
`;

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <Brand>
          <Logo><img src="" alt="BD" /></Logo>
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
