import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "../img/bg.png"; // Import the background image here
import { MainLayout } from "../styles/Layouts";
import Orb from "../Components/Orb/Orb";
import Navigation from "../Components/Navigation/Navigation";
import Dashboard from "../Components/Dashboard/Dashboard";
import Income from "../Components/Income/Income";
import Expenses from "../Components/Expenses/Expenses";
import { useGlobalContext } from "../context/globalContext";
import Transaction from "../Components/Transaction/Transaction";

const Home = () => {
	const [active, setActive] = useState(1);
	// eslint-disable-next-line
	const global = useGlobalContext();

	const displayData = () => {
		switch (active) {
			case 1:
				return <Dashboard />;
			case 2:
				return <Transaction />;
			case 3:
				return <Income />;
			case 4:
				return <Expenses />;
			default:
				return <Dashboard />;
		}
	};

	const orbMemo = useMemo(() => {
		return <Orb />;
	}, []);

	return (
		<HomeStyled className="Home">
			{orbMemo}
			<MainLayout>
				<Navigation
					name={"Cash Canvas"}
					active={active}
					setActive={setActive}
				/>
				<main>{displayData()}</main>
			</MainLayout>
		</HomeStyled>
	);
};
const HomeStyled = styled.div`
	height: 100vh;
	background-image: url(${bg}); // Use the background image here
	position: relative;

	main {
		flex: 1;
		background: rgba(252, 246, 249, 0.78);
		border: 3px solid #ffffff;
		backdrop-filter: blur(4.5px);
		border-radius: 32px;
		overflow-x: hidden;

		&::-webkit-scrollbar {
			width: 0;
		}
	}

	@media (max-width: 1200px) {
		main {
			border-radius: 24px;
		}
	}

	@media (max-width: 768px) {
		main {
			padding: 1rem;
			border-radius: 20px;
		}

		.Home {
			flex-direction: column; // Stack the elements on top of each other on smaller screens
		}
	}

	@media (max-width: 576px) {
		main {
			padding: 0.5rem;
			border-radius: 15px;
		}
	}
`;

export default Home;
