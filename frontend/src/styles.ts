import styled from "styled-components";

export const Container = styled.div`
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

export const ContentContainer = styled.div`
  @media (min-width: 800px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const FlagContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: 100%;
  @media (min-width: 800px) {
    justify-content: center;
  }
`;

export const ChartContainer = styled.div`
  position: relative;
  height: 50vh;
  width: 80vw;
  @media (min-width: 800px) {
    justify-content: center;
    display: flex;
  }
`;
