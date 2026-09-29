import "./App.css";

function App() {

  return (
    <div className="app">

      <header className="header">

        <div className="logo">
          🧠
        </div>

        <div>
          <h1>
            LifeOS AI
          </h1>

          <p>
            Tu información, organizada inteligentemente.
          </p>
        </div>

      </header>


      <main className="content">

        <section className="hero">

          <span className="badge">
            AI PERSONAL SYSTEM
          </span>

          <h2>
            Tu vida.
            <br />
            Una sola inteligencia.
          </h2>

          <p>
            LifeOS AI será el lugar donde podrás
            capturar, organizar y consultar tu
            información utilizando inteligencia artificial.
          </p>

        </section>


        <section className="cards">

          <div className="card">
            <span>📸</span>

            <h3>
              Captura
            </h3>

            <p>
              Imágenes, documentos, voz y texto.
            </p>
          </div>


          <div className="card">
            <span>🤖</span>

            <h3>
              Inteligencia
            </h3>

            <p>
              La IA entiende y organiza tu información.
            </p>
          </div>


          <div className="card">
            <span>🧠</span>

            <h3>
              Memoria
            </h3>

            <p>
              Encuentra posteriormente lo que guardaste.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default App;