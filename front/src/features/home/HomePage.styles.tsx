import styled from "styled-components";
import { Link } from "react-router-dom";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f3f7fb 0%, #eef6ff 100%);
  color: ${({ theme }) => theme.colors.text.default};
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  scroll-behavior: smooth;
`;

export const Hero = styled.header`
  background: linear-gradient(90deg, rgba(6, 58, 128, 0.95), rgba(37, 99, 235, 0.95));
  color: #fff;
  padding: 48px 0;
  box-shadow: 0 6px 24px rgba(9, 30, 66, 0.12);

  @media (max-width: 700px) {
    padding: 32px 0;
  }
`;

export const HeroInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  text-align: center;

  h1 {
    margin: 0 0 8px;
    font-size: clamp(24px, 4vw, 36px);
    letter-spacing: -0.02em;
    font-weight: 800;
  }

  p {
    margin: 0 auto;
    max-width: 700px;
    color: rgba(255, 255, 255, 0.9);
    font-size: clamp(14px, 2.2vw, 16px);
  }
`;

export const Content = styled.main`
  max-width: 1200px;
  margin: 28px auto;
  padding: 0 18px 48px;
  width: 100%;
`;

export const TopSpot = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-bottom: 28px;
`;

export const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(240px, 320px));
  justify-content: center;
  gap: 24px;
  align-items: start;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(220px, 1fr));
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const CardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: flex;
  justify-content: center;
`;

export const Card = styled.article`
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  border-radius: 16px;
  padding: 22px;
  height: 220px;
  width: 100%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  box-shadow:
    0 18px 40px rgba(9, 30, 66, 0.08),
    0 4px 10px rgba(2, 6, 23, 0.03);
  border: 1px solid rgba(2, 6, 23, 0.04);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  text-align: center;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 24px 60px rgba(9, 30, 66, 0.12);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const Icon = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: linear-gradient(180deg, rgba(37, 99, 235, 0.12), rgba(6, 58, 128, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: inset 0 -6px 18px rgba(37, 99, 235, 0.06);

  img {
    width: 38px;
    height: 38px;
    object-fit: contain;
  }
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: #062244;
  font-weight: 700;
`;

export const CardDesc = styled.p`
  margin: 0;
  font-size: 13px;
  color: #475569;
  line-height: 1.25;
  max-width: 100%;
`;

export const CardCTA = styled.div`
  margin-top: auto;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  font-size: 13px;
  padding-top: 8px;
`;

export const SimaIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border-radius: 20%;
  width: 90px;
  height: 90px;
  transition:
    transform 0.25s ease,
    filter 0.25s ease;

  img {
    width: 100%;
    height: 100%;
    border-radius: 20%;
    box-shadow:
      0 8px 18px rgba(0, 0, 0, 0.25),
      inset 0 2px 4px rgba(255, 255, 255, 0.2);
    transition:
      transform 0.25s ease,
      box-shadow 0.25s ease;
  }

  &:hover img {
    transform: scale(1.08);
    box-shadow:
      0 12px 26px rgba(0, 0, 0, 0.4),
      inset 0 3px 6px rgba(255, 255, 255, 0.25);
  }

  &:active img {
    transform: scale(0.95);
  }
`;

export const SimaCardLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
`;

export const SimaCard = styled.article`
  background: linear-gradient(180deg, #0b5394 0%, #2563eb 100%);
  color: #fff;
  border-radius: 16px;
  padding: 28px 22px;
  min-height: 220px;
  width: 100%;
  max-width: 720px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  box-shadow: 0 20px 50px rgba(37, 99, 235, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;
  text-align: center;

  &:hover {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 34px 80px rgba(37, 99, 235, 0.22);
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const SimaCardTitle = styled.h3`
  margin: 0;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
`;

export const SimaCardDesc = styled.p`
  margin: 0;
  font-size: 15px;
  color: rgba(255, 255, 255, 0.92);
  line-height: 1.4;
  max-width: 88%;
`;

export const SimaCardCTA = styled.div`
  margin-top: auto;
  color: #ffffff;
  font-weight: 700;
  font-size: 13px;
  padding-top: 8px;
`;

export const Footer = styled.footer`
  margin-top: auto;
  background: ${({ theme }) => theme.colors.primaryDark};
  color: #e6f0ff;
  padding: 18px 0;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  box-shadow: 0 -6px 18px rgba(7, 42, 89, 0.06);
`;

export const FooterInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  flex-wrap: wrap;
  gap: 8px;
  text-align: center;

  a {
    color: rgba(230, 240, 255, 0.95);
    text-decoration: none;
  }
`;

export const ScrollTopButton = styled.button`
  position: fixed;
  bottom: 22px;
  right: 22px;
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  color: white;
  border-radius: 50%;
  padding: 12px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }

  &:active {
    transform: scale(0.96);
  }
`;
