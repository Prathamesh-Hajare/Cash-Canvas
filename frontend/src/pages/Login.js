import React, { useState, useMemo } from "react";
import styled from "styled-components";
import bg from "../img/bg.png";
import { MainLayout } from "../styles/Layouts";
import Orb from "../Components/Orb/Orb";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			toast.error("Please fill in all fields");
			return;
		}

		try {
			const res = await axios.post("http://localhost:5000/api/v1/login", {
				email,
				password,
			});
			console.log("API Response:", res.data);

			const token = res.data.jwtToken;
			localStorage.setItem("token", token);
			navigate("/home");
			toast.success("Login Successfully");
		} catch (error) {
			// console.error("Login failed",error);
			toast.error("Something went wrong");
		}
	};

	const orbMemo = useMemo(() => <Orb />, []);

	return (
		<HomeStyled>
			{orbMemo}
			<MainLayout>
				<main>
					<h1>Login</h1>
					<form onSubmit={handleSubmit}>
						<div>
							<label htmlFor="email">E-mail</label>
							<input
								type="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								autoFocus
								placeholder="Enter your email"
							/>
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<input
								type="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
							/>
						</div>
						<button type="submit">Login</button>
						<span>
							Don't have an account? <Link to="/signup">Register</Link>
						</span>
					</form>
				</main>
			</MainLayout>
		</HomeStyled>
	);
};

const HomeStyled = styled.div`
	height: 100vh;
	background-image: url(${bg});
	background-size: cover;
	background-position: center;
	display: flex;
	justify-content: center;
	align-items: center;
	position: relative;

	main {
		height: 70vh;
		width: 32vw;
		max-width: 500px;
		background: rgba(255, 255, 255, 0.85);
		border: 3px solid #ffffff;
		backdrop-filter: blur(6px);
		border-radius: 32px;
		padding: 2rem;
		box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
		overflow-x: hidden;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 1.5rem;

		h1 {
			text-align: center;
			color: #333;
			margin-bottom: 1.5rem;
			font-size: 2.5rem;
		}

		form {
			display: flex;
			justify-content: center;
			flex-direction: column;
			gap: 1.5rem;

			div {
				display: flex;
				flex-direction: column;

				label {
					margin-bottom: 0.5rem;
					color: #555;
					font-size: 1rem;
				}

				input {
					padding: 0.75rem;
					border: 1px solid #ccc;
					border-radius: 8px;
					font-size: 1rem;
					transition: border-color 0.3s ease;
					width: 100%;

					&:focus {
						border-color: #007bff;
						outline: none;
					}
				}
			}

			button {
				padding: 0.75rem;
				background-color: #007bff;
				color: white;
				border: none;
				border-radius: 8px;
				font-size: 1rem;
				cursor: pointer;
				transition: background-color 0.3s ease;
				width: 100%;

				&:hover {
					background-color: #0056b3;
				}
			}

			span {
				margin-top: 1rem;
				text-align: center;
				color: #333;
				font-size: 0.9rem;

				a {
					color: #007bff;
					text-decoration: none;
					margin-left: 0.5rem;

					&:hover {
						text-decoration: underline;
					}
				}
			}
		}
	}

	@media (max-width: 768px) {
		main {
			width: 90%;
			padding: 1rem;
		}

		h1 {
			font-size: 1.25rem;
		}
	}

	@media (max-width: 480px) {
		main {
			width: 95%;
		}

		h1 {
			font-size: 1rem;
		}
	}
`;

export default Login;
