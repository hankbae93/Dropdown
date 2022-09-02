import { useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled from "styled-components";
import "./App.css";
import Page from "./Page";

const AppWrapper = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100vh;
`;

function App() {
	const queryClientRef = useRef<QueryClient>(new QueryClient());
	return (
		<QueryClientProvider client={queryClientRef.current}>
			<AppWrapper>
				<Page />
			</AppWrapper>
		</QueryClientProvider>
	);
}

export default App;
