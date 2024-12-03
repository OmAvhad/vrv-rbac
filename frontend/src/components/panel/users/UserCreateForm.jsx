import axiosInstance from "../../../config/axiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserCreateFrom() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([]);

  const [roleOptions, setRoleOptions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get(`${apiUrl}/api/roles`).then((res) => {
      setRoleOptions(res.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(`${apiUrl}/api/users`, {
        name,
        email,
        password,
        roles,
      })
      .then((res) => {
        console.log(res);
        toast.success("User created successfully", { autoClose: 2000 });
        navigate("/dashboard/users");
      });
  };

  return (
    <form className="flex max-w-md flex-col gap-4" onSubmit={handleSubmit}>
      <h1>Add User</h1>
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
          <Label htmlFor="password1" value="Your password" />
        </div>
        <TextInput
          id="password1"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
                checked={roles.includes(roleItem._id)}
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
      <Button type="submit">Submit</Button>
    </form>
  );
}
