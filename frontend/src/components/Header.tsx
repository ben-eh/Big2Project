import { Box, Icon, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { useAuth } from "../context/authContext";
import { useSocket } from "../socketContext";
// import { Link } from "react-router-dom";

const Layout = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  box-shadow: 0 0 4px 1px grey;
`;

const HeaderContainer = styled(Box)`
  flex: 0.75;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: 100px;
  height: 100px;
  margin-right: 3rem;
`;

const LinkContainer = styled(Box)`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
`;

const Link = styled.p`
	cursor: pointer;
`

const Header = () => {
	const auth = useAuth();
	const socket = useSocket();
	console.log(socket.isConnected);
	return (
		<Layout>
			<HeaderContainer>
				<Typography color={'#C57E9B'} variant="h4">Big 2, Baby!!</Typography>
			</HeaderContainer>
			<LinkContainer>
				{socket.isConnected &&
					(<Link
						onClick={socket.disconnectFromRoom} >
						Disconnect from Room
					</Link>
					)
				}
				{auth.token &&
					(<Link
						onClick={auth.signOut} >
						Sign Out
					</Link>)
				}
			</LinkContainer>
		</Layout>
	)
}

export default Header;