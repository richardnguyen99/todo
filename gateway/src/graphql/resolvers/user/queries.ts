import mock from "../mock";

const user = async (_: any, _args: any) => {
  const { id } = _args;

  const user = mock.find((user: any) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

const users = async (_: any, _args: any) => {
  return mock;
};


export default {
  user,
  users,
};
