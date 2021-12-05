import styled, {createGlobalStyle} from 'styled-components';

export const GlobalStyles = createGlobalStyle`
	*{
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	
	body{
		height: 100vh;
		width: 100vw;
		font-family: monospace;
	}
`

export const Container = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100vw;
  max-width: 100vw;
  overflow: hidden;
  display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
  background-color: #132424;
`;

export const Grid = styled.div`
  width: 100vh;
	height: 100vh;
	display: grid;
	grid-template-columns: repeat(8, 1fr);
	grid-template-rows: repeat(8, 1fr);
	gap: calc(100vh * 0.015);
	padding: 16px;
`;

export const Pad = styled.button`
  border: none;
  background-color: rgba(108, 108, 108, 0.19);

  color: white;

  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: bold;
  outline: none;
  border-radius: calc(100vh * 0.015);

  position: relative;
  z-index: 0;

  &.hasData:before {
    content: '';
    background: linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #7a00ff, #ff00c8, #ff0000);
    position: absolute;
    top: -2px;
    left: -2px;
    background-size: 400%;
    z-index: -1;
    filter: blur(5px);
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    animation: glowing 20s linear infinite;
    opacity: 1;
    transition: opacity .3s ease-in-out;
    border-radius: calc(100vh * 0.015);
  }

  &.hasData:after {
    z-index: -1;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #704ee8;
    left: 0;
    top: 0;
    border-radius: 10px;
  }

  &.hasData:active {
    color: black;
  }

  &.hasData:active:after {
    background: transparent;
  }

  @keyframes glowing {
    0% {
      background-position: 0 0;
    }
    50% {
      background-position: 400% 0;
    }
    100% {
      background-position: 0 0;
    }
  }
`
