import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import styled from "styled-components";

const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text.inverse};
  width: 100%;
  box-shadow: ${({ theme }) => theme.shadows.small};
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing(4)};
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.fonts.size.large};
  font-weight: ${({ theme }) => theme.fonts.weight.bold};
`;

const DesktopMenu = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    gap: ${({ theme }) => theme.spacing(6)};
  }
`;

const StyledLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing(1)} ${theme.spacing(3)}`};
  border-radius: ${({ theme }) => theme.borderRadius};
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
`;

const MobileButton = styled.button`
  display: block;
  padding: ${({ theme }) => theme.spacing(2)};
  background: none;
  border: none;
  cursor: pointer;

  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const MobileLink = styled(Link)`
  padding: ${({ theme }) => `${theme.spacing(2)} ${theme.spacing(4)}`};
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;

function MenuBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Nav>
      <Container>
        <Title>Meu Projeto</Title>

        {/* Menu desktop */}
        <DesktopMenu>
          <StyledLink to="/sima">Sima</StyledLink>
          <StyledLink to="/about">Sobre</StyledLink>
          <StyledLink to="/contact">Contato</StyledLink>
        </DesktopMenu>

        {/* Botão hambúrguer */}
        <MobileButton onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileButton>
      </Container>

      {/* Menu mobile */}
      {isOpen && (
        <MobileMenu>
          <MobileLink to="/sima" onClick={() => setIsOpen(false)}>
            Sima
          </MobileLink>
          <MobileLink to="/about" onClick={() => setIsOpen(false)}>
            Sobre
          </MobileLink>
          <MobileLink to="/contact" onClick={() => setIsOpen(false)}>
            Contato
          </MobileLink>
        </MobileMenu>
      )}
    </Nav>
  );
}

export default MenuBar;
