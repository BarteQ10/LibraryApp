import React from "react";
import { User } from "../../models/User";
import { Button } from "react-bootstrap";

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
      <td>
        {!user.isActive ? <Button onClick={() => onActivateUser(user.id)}>Activate</Button>:<Button onClick={() => onDeactivateUser(user.id)}>Deactivate</Button>}    
      </td>
      {/* Add more fields as needed */}
    </tr>
  );
};

export default UsersRow;
