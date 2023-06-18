import React from "react";
import { User } from "../../models/User";
import { Button } from "react-bootstrap";
import { BsCheckCircle, BsXCircle } from "react-icons/bs";
interface UsersRowProps {
  user: User;
  onActivateUser: (userId: number) => void;
  onDeactivateUser: (userId: number) => void;
}
interface UserRoleMap {
    [key: number]: string;
  }
  
  const userRoleMap: UserRoleMap = {
    0: "User",
    1: "Librarian",
    2: "Admin"
  };
const UsersRow: React.FC<UsersRowProps> = ({
  user,
  onActivateUser,
  onDeactivateUser,
}) => {
  return (
    <tr>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{userRoleMap[user.role]}</td>
      <td>{user.isActive ? "Yes" : "No"}</td>
      <td className="d-flex justify-content-center">
        {!user.isActive ? (
          <Button variant="success" onClick={() => onActivateUser(user.id)}>
            <BsCheckCircle /> Activate
          </Button>
        ) : (
          <Button variant="danger" onClick={() => onDeactivateUser(user.id)}>
            <BsXCircle /> Deactivate
          </Button>
        )}
      </td>
    </tr>
  );
};

export default UsersRow;
