import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { fetchUsers, setUserStatus } from "../../redux/usersSlice";
import UsersTable from "./UsersTable";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

const UsersPage: React.FC = () => {
  const dispatch: ThunkDispatch<any, void, AnyAction> = useDispatch();
  const { users, loading, error } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleSetUserStatus = async (userId: number, active: boolean) => {
    await dispatch(setUserStatus({ id: userId, active }));
    dispatch(fetchUsers());
  };

  const handleActivateUser = (userId: number) => handleSetUserStatus(userId, true);
  const handleDeactivateUser = (userId: number) => handleSetUserStatus(userId, false);

  if (loading) return <div className="gradient-background min-vh-100 ps-2 pe-2">Loading...</div>;
  if (error) return <div className="gradient-background min-vh-100 ps-2 pe-2">Error: {error}</div>; // Assuming 'error' is an instance of Error

  return (
    <div className="gradient-background min-vh-100 ps-2 pe-2">
      <h1>Users Page</h1>
      <UsersTable
        users={users}
        onActivateUser={handleActivateUser}
        onDeactivateUser={handleDeactivateUser}
      />
    </div>
  );
};

export default UsersPage;
