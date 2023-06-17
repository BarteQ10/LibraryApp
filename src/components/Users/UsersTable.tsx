import React from "react";
import { User } from "../../models/User";
import UsersRow from "./UsersRow";
import { Table } from "react-bootstrap";

interface UsersTableProps {
  users: User[];
  onActivateUser: (userId: number) => void;
  onDeactivateUser: (userId: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onActivateUser, onDeactivateUser}) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th >ID</th>
        <th >Email</th>
        <th >Role</th>
        <th >Active</th>
        <th >Action</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <UsersRow key={user.id} user={user} onActivateUser={onActivateUser} onDeactivateUser={onDeactivateUser}/>
      ))}
    </tbody>
  </Table>
);

export default UsersTable;
