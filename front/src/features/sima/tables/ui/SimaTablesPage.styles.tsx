import { JSX } from "react";
import styled, { keyframes } from "styled-components";
import { lightenHex } from "../../../../utils/limnologicData";

export const PRIMARY_BLUE = "#0b5fff";
export const PRIMARY_BLUE_HOVER = "#2a7bff";
export const MUTED_BLUE = "#e8f1ff";
export const TEXT_DARK = "#0b2740";
export const SURFACE = "#ffffff";
export const BORDER = "#e6eefb";

export const Page = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f6fbff 0%, #eef6ff 100%);
  color: ${TEXT_DARK};
  font-family: "Helvetica Neue", Arial, sans-serif;
`;

export const Container = styled.div`
  max-width: 1400px;
  margin: 22px auto;
  padding: 0 24px;
  width: 100%;
  display: grid;
  grid-template-columns: minmax(300px, 460px) minmax(0, 1fr);
  gap: 24px;
  align-items: stretch;
  min-height: 640px;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
    padding: 0 18px;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 100%;
`;

export const Controls = styled.div`
  background: #fff;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 8px 28px rgba(6, 58, 128, 0.06);
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 0 0 auto;
`;

export const Row = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #334155;
  min-width: 100px;
`;

export const Select = styled.select`
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid rgba(2, 6, 23, 0.06);
  width: 100%;
  background: white;
`;

export const ColumnItem = styled.label`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition:
    background 0.12s ease,
    transform 0.12s ease;

  &:hover {
    background: rgba(11, 95, 255, 0.04);
    transform: translateY(-1px);
  }

  input[type="checkbox"] {
    width: 16px;
    height: 16px;
    accent-color: ${PRIMARY_BLUE};
  }
`;

export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ControlsTopRight = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 720px) {
    justify-content: stretch;
    flex-direction: column;
  }
`;

export const Button = styled.button<{ $primary?: boolean }>`
  padding: 10px 14px;
  border-radius: 10px;
  border: ${(p) => (p.$primary ? "none" : `1px solid ${BORDER}`)};
  cursor: pointer;
  font-weight: 700;
  background: ${(p) => (p.$primary ? PRIMARY_BLUE : SURFACE)};
  color: ${(p) => (p.$primary ? "#fff" : TEXT_DARK)};
  display: inline-flex;
  align-items: center;
  gap: 8px;
  box-shadow: ${(p) => (p.$primary ? "0 6px 18px rgba(11,95,255,0.12)" : "none")};
  transition:
    transform 0.12s ease,
    background 0.12s ease,
    box-shadow 0.12s ease;
  border-radius: 8px;

  &:hover {
    transform: translateY(-2px);
    background: ${(p) => (p.$primary ? PRIMARY_BLUE_HOVER : MUTED_BLUE)};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

export const Panel = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  height: 100%;
  box-shadow: 0 12px 36px rgba(9, 30, 66, 0.06);
`;

export const ChartWrapper = styled.div`
  flex: 1;
`;

export const ChartMain = styled.div`
  padding: 12px;
  border-radius: 8px;
  background: linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
  position: relative;
  min-height: 420px;
`;

export const Tooltip = styled.div<{ left: number; top: number; color?: string }>`
  position: absolute;
  left: ${(p) => p.left}px;
  top: ${(p) => p.top}px;
  transform: translate(-8px, -100%);
  background: #ffffff;
  border-radius: 8px;
  padding: 8px 10px;
  box-shadow: 0 6px 20px rgba(2, 6, 23, 0.12);
  font-size: 13px;
  min-width: 160px;
  max-width: 340px;
  max-height: 320px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const TooltipStationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 220px;
  overflow: hidden;
`;

export const TooltipFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Legend = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
`;

export const LegendItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const MapPlaceholder = styled.div`
  position: relative;
  flex: 1;
  background: linear-gradient(180deg, #0b2340 0%, #082033 100%);
  border-radius: 8px;
  overflow: hidden;
  min-height: 260px;
`;

export const ZoomControls = styled.div`
  position: absolute;
  right: 18px;
  top: 18px;
  display: flex;
  gap: 8px;
  z-index: 70;
  background: rgba(255, 255, 255, 0.05);
  padding: 6px;
  border-radius: 8px;
  backdrop-filter: blur(4px);

  button {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
    border: none;
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 700;
  }

  label {
    color: #e6f0ff;
    font-size: 13px;
    display: flex;
    align-items: center;
    gap: 8px;
  }
`;

export const TablePreview = styled.div`
  margin-top: 12px;
  border-radius: 10px;
  overflow: auto;
  border: 1px solid ${BORDER};
  background: ${SURFACE};
  box-shadow: 0 8px 30px rgba(6, 58, 128, 0.04);
`;

export const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
  td,
  th {
    padding: 10px 12px;
    border-bottom: 1px solid ${BORDER};
    text-align: left;
    font-size: 14px;
    color: ${TEXT_DARK};
  }
  thead th {
    background: linear-gradient(180deg, ${PRIMARY_BLUE} 0%, ${PRIMARY_BLUE_HOVER} 100%);
    color: #fff;
    font-weight: 700;
    position: sticky;
    top: 0;
    z-index: 2;
    font-size: 13px;
  }
  tbody tr:hover {
    background: ${MUTED_BLUE};
  }
  tbody td {
    background: ${SURFACE};
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg) }
  100% { transform: rotate(360deg) }
`;

const SpinnerWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
`;

const SpinnerCircle = styled.div`
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 3px solid rgba(37, 99, 235, 0.15);
  border-top-color: rgba(37, 99, 235, 1);
  animation: ${spin} 0.9s linear infinite;
`;

export function Spinner(): JSX.Element {
  return (
    <SpinnerWrapper aria-hidden>
      <SpinnerCircle />
    </SpinnerWrapper>
  );
}

export const DownloadButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: no-wrap;
  align-items: center;
`;

export const DownloadButton = styled.button<{ variant: "csv" | "json" | "pdf" }>`
  padding: 8px 14px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  transition: all 0.12s ease;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  min-width: 86px;
  justify-content: center;

  background: ${SURFACE};
  color: ${TEXT_DARK};
  border: 1px solid ${BORDER};
  box-shadow: 0 6px 20px rgba(11, 95, 255, 0.06);

  &:hover {
    transform: translateY(-3px);
    background: ${MUTED_BLUE};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  ${(p) =>
    p.variant === "csv"
      ? `border-left: 4px solid ${PRIMARY_BLUE};`
      : p.variant === "json"
        ? `border-left: 4px solid ${PRIMARY_BLUE_HOVER};`
        : `border-left: 4px solid ${lightenHex(PRIMARY_BLUE, -0.05)};`}
`;
