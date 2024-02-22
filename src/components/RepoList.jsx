import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import '../styles.css';

const RepoList = ({ username }) => {
  const [repos, setRepos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reposPerPage] = useState(5);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`
        );
        const sortedRepos = response.data.sort((a, b) => b.size - a.size);
        setRepos(sortedRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username]);

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = repos.slice(indexOfFirstRepo, indexOfLastRepo);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Top 5 repositorios con más participación de {username}</h2>
      <ul>
        {currentRepos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Tamaño: {repo.size}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <ul>
          {Array.from({ length: Math.ceil(repos.length / reposPerPage) }).map(
            (item, index) => (
              <li key={index}>
                <button
                  style={{
                    padding: "5px 10px",
                    cursor: "pointer",
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    listStyle: "none",  // Elimina las viñetas
                    display: "inline-block",  // Muestra los botones en línea
                    marginRight: "5px",  // Espacio entre los botones
                  }}
                  onClick={() => paginate(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
};

export default RepoList;
