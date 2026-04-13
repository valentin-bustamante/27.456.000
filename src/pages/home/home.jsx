import { Titulo } from "../../components/titulo/titulo";

const nombreProyecto = "27.456.000 pesos por mes";

function Home() {
	return (
		<>
	
			<Titulo texto={nombreProyecto} />
		</>
	);
}

export default Home;