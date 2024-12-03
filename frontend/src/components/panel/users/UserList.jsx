import axiosInstance from "../../../config/axiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import { useNavigate } from "react-router";

export default function UserList() {
  const [users, setUsers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}/api/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Users</h1>
        <Button onClick={() => navigate(`/dashboard/users/add`)}>Add</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Role</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {users.map((user, index) => (
            <Table.Row key={user.id}>
              <Table.Cell>{index}</Table.Cell>
              <Link to={`${user._id}`}>
                <Table.Cell>{user.name}</Table.Cell>
              </Link>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.roles.map((role) => role.name)}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}