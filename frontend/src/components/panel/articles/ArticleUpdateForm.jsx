import axiosInstance from "../../../config/axiosSetup";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Label, TextInput, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ArticleUpdateForm() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState("");
  const [created_at, setCreatedAt] = useState("");
  const [updated_at, setUpdatedAt] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`/api/articles/${id}`).then((res) => {
        setTitle(res.data.title);
        setContent(res.data.content);
        setAuthor(res.data.author);
        setStatus(res.data.status);
        setCreatedAt(res.data.created_at);
        setUpdatedAt(res.data.updated_at);
      });
    }
  }, [id]);

  const updateArticle = () => {
    axiosInstance
      .put(`/api/articles/${id}`, {
        title: title,
        content: content,
      })
      .then(() => {
        toast.success("Article updated successfully", { autoClose: 2000 });
        navigate("/dashboard/articles");
      })
      .catch((err) => {
        console.error("Error updating article", err);
        toast.error("Error updating article", { autoClose: 2000 });
      });
  };

  const deleteArticle = () => {
    axiosInstance
      .delete(`/api/articles/${id}`)
      .then(() => {
        toast.success("Article deleted successfully", { autoClose: 2000 });
        navigate("/dashboard/articles");
      })
      .catch((err) => {
        toast.error("Error deleting article", { autoClose: 2000 });
        console.error("Error deleting article", err);
      });
  };

  const publishArticle = () => {
    axiosInstance
      .put(`/api/articles/${id}/publish`, {
        status: "published",
      })
      .then(() => {
        navigate("/dashboard/articles");
      });
  };

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Permissions</h1>
      </div>
      <div className="flex w-full flex-row gap-4">
        <div className="w-full">
          <Label>Title</Label>
          <TextInput value={title} onChange={(e) => setTitle(e.target.value)} />
          <Label>Content</Label>
          <TextInput
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <Label>Author</Label>
          <TextInput
            value={author.name}
            onChange={(e) => setAuthor(e.target.value)}
            disabled
          />
          <Label>Status</Label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="form-select mt-1 block w-full"
            disabled
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
          <Label>Created At</Label>
          <TextInput
            value={created_at}
            onChange={(e) => setCreatedAt(e.target.value)}
            disabled
          />
          <Label>Updated At</Label>
          <TextInput
            value={updated_at}
            onChange={(e) => setUpdatedAt(e.target.value)}
            disabled
          />
        </div>
        <div className="flex flex-col justify-start mt-8 w-full gap-2 ">
          <Button type="submit" className="w-2/6" onClick={updateArticle}>
            Save
          </Button>
          <Button
            className="w-2/6 bg-red-800 text-white"
            onClick={deleteArticle}
          >
            Delete
          </Button>
          <Button
            className="w-2/6 bg-green-600 text-white"
            onClick={publishArticle}
          >
            Publish
          </Button>
        </div>
      </div>
    </>
  );
}