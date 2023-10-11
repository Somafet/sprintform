import Container from "./components/Container";
import Header from "./components/Header";

function App() {
	return (
		<>
			<div className="App">
				<Header />
				<Container>
					<p>Hello World</p>
				</Container>
			</div>
		</>
	);
}

export default App;
