import { Titulo } from "../../components/titulo/titulo";

const nombreProyecto = "27.456.000 pesos por mes";

function Home() {
  return (
    <div>
      <Titulo texto={nombreProyecto} />
      <h2>hola</h2>
    </div>
  );
}

export default Home;
