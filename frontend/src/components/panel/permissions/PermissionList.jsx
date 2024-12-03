import axiosInstance from "../../../config/axiosSetup";
import { useEffect, useState } from "react";
import apiUrl from "../../../api";
import { Link } from "react-router-dom";
import { Table, Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

export default function PermissionList() {
  const [permissions, setPermissions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance
      .get(`${apiUrl}/api/permissions`)
      .then((res) => {
      console.log(res);
      setPermissions(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="flex flex-row justify-between mb-3 text-2xl">
        <h1>Permissions</h1>
        <Button onClick={() => navigate(`/dashboard/permissions/add`)}>Add</Button>
      </div>
      <Table>
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {permissions.map((permission, index) => (
            <Table.Row key={permission.id}>
              <Table.Cell>{index}</Table.Cell>
              <Link to={`${permission._id}`}>
                <Table.Cell>{permission.name}</Table.Cell>
              </Link>
              <Table.Cell>{permission.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}