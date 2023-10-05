import { Box } from "@mui/material";
import { styled } from "styled-components";
import Header from "../components/Header";

const Layout = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Body = styled(Box)`
	display: flex;
	justify-content: center;
`;

export const Page = ({children}: any) => {
	return (
		<Layout>
			<Header />
			<Body>
				{children}
			</Body>
		</Layout>
	)
}