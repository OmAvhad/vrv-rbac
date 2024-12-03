import axiosInstance from "../../../config/axiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Link, useNavigate } from "react-router-dom";
import { Table, Button } from "flowbite-react";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";

export default function ArticleList() {
  const [articles, setArticles] = useState([]);
  const navigate = useNavigate();
  const { hasRole } = useContext(UserContext);

  useEffect(() => {
    let url = `${apiUrl}/api/articles/my`;
    
    if (hasRole("admin") || hasRole("editor")) {
      url = `${apiUrl}/api/articles`;
    }

    axiosInstance
      .get(url)
      .then((res) => {
        setArticles(res.data);
        navigate("/dashboard/articles");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Articles</h1>
        <Button onClick={() => navigate(`/dashboard/articles/add`)}>Add</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Title</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Author</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {articles.map((article, index) => (
            <Table.Row key={article.id}>
              <Table.Cell>{index}</Table.Cell>
              <Link to={`${article._id}`}>
                <Table.Cell>{article.title}</Table.Cell>
              </Link>
              <Table.Cell
                className={
                  article.status === "published"
                    ? "text-green-500"
                    : "text-gray-500"
                }
              >
                {article.status}
              </Table.Cell>
              <Table.Cell>{article.author.name}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
