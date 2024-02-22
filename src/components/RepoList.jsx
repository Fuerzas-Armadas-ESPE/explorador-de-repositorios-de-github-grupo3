// RepoList.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const RepoList = ({ username, stars, createdAt, language }) => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}/repos`,
          {
            params: {
              sort: "stars",
              order: "desc",
              stars: stars || undefined,
              created_at: createdAt || undefined,
              language: language || undefined,
            },
          }
        );

        const sortedRepos = response.data.sort((a, b) => b.stargazers_count - a.stargazers_count);
        const topRepos = sortedRepos.slice(0, 5);
        setRepos(topRepos);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchData();
  }, [username, stars, createdAt, language]);

  // Filtra los repositorios según los criterios
  const filteredRepos = repos.filter((repo) => {
    return (
      (!stars || repo.stargazers_count >= parseInt(stars, 10)) &&
      (!createdAt || new Date(repo.created_at) >= new Date(createdAt)) &&
      (!language || repo.language === language)
    );
  });

  return (
    <div>
      <h2>Top 5 repositorios con más participación de {username}</h2>
      <ul>
        {filteredRepos.map((repo) => (
          <li key={repo.id}>
            {repo.name} - Estrellas: {repo.stargazers_count}, Tamaño: {repo.size}
          </li>
        ))}
      </ul>
    </div>
  );
};

RepoList.propTypes = {
  username: PropTypes.string.isRequired,
  stars: PropTypes.string,
  createdAt: PropTypes.string,
  language: PropTypes.string,
};

export default RepoList;
