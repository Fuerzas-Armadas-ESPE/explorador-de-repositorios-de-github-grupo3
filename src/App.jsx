// App.jsx
import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  AppBar,
  Toolbar,
} from "@mui/material";
import RepoList from "./components/RepoList";

function App() {
  const [username, setUsername] = useState("");
  const [stars, setStars] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [language, setLanguage] = useState("");
  const [showRepoList, setShowRepoList] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setShowRepoList(true);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Mi Explorador de Repositorios
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nombre de Usuario"
            variant="outlined"
            value={username}
            onChange={handleUsernameChange}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          {/* Nuevos campos de entrada para criterios de filtrado */}
          <TextField
            label="Número de Estrellas"
            variant="outlined"
            value={stars}
            onChange={(event) => setStars(event.target.value)}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            label="Fecha de Creación (YYYY-MM-DD)"
            variant="outlined"
            value={createdAt}
            onChange={(event) => setCreatedAt(event.target.value)}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <TextField
            label="Idioma Predominante"
            variant="outlined"
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            fullWidth
            sx={{ marginBottom: "10px" }}
          />

          <Button type="submit" variant="contained" fullWidth>
            Buscar Repositorios
          </Button>
        </form>

        {/* Pasa los criterios de filtrado al componente RepoList */}
        {showRepoList && <RepoList username={username} stars={stars} createdAt={createdAt} language={language} />}
      </Container>
    </div>
  );
}

export default App;
