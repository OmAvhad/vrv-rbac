import axiosInstance from "../../../config/axiosSetup";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router";
import apiUrl from "../../../api";
import { toast } from "react-toastify";

export default function UserUpdateFrom() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState([]);

  const [roleOptions, setRoleOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axiosInstance.get(`${apiUrl}/api/users/${id}`).then((res) => {
        const { name, email, roles } = res.data;
        setName(name);
        setEmail(email);
        if (roles) {
          const roleIds = roles.map((role) => role);
          setRoles(roleIds);
        }
      });
      axiosInstance.get(`${apiUrl}/api/roles`).then((res) => {
        setRoleOptions(res.data);
      });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name,
      email,
      roles,
    };
    axiosInstance.put(`${apiUrl}/api/users/${id}`, payload).then(() => {
      toast.success("User updated successfully", { autoClose: 2000 });
      navigate(`/dashboard/users`);
    });
  };

  const handleDelete = () => {
    axiosInstance.delete(`${apiUrl}/api/users/${id}`).then(() => {
      toast.success("User deleted successfully", { autoClose: 2000 });
      navigate(`/dashboard/users`);
    });
  };

  return (
    <form className="flex w-full flex-row gap-4" onSubmit={handleSubmit}>
      <div className="w-full">
        <h1>User</h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Your name" />
          </div>
          <TextInput
            id="name1"
            type="name"
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            required
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="role" value="Select Role" />
          </div>
          <div className="mb-2 block">
            {roleOptions.map((roleItem) => (
              <div key={roleItem._id} className="flex items-center gap-2">
                <Checkbox
                  id={`role-${roleItem._id}`}
                  value={roleItem._id}
                  checked={roles.some((roleId) => roleId === roleItem._id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setRoles([...roles, roleItem._id]);
                    } else {
                      setRoles(roles.filter((r) => r !== roleItem._id));
                    }
                  }}
                />
                <Label htmlFor={`role-${roleItem._id}`}>{roleItem.name}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start mt-12 w-full gap-2 ">
        <Button type="submit" className="w-2/6">
          Save
        </Button>
        <Button className="w-2/6 bg-red-800 text-white" onClick={handleDelete}>
          Delete
        </Button>
      </div>
    </form>
  );
}