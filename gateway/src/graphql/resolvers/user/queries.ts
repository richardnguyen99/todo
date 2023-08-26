import mock from "../mock";

const user = async (_: any, _args: any) => {
  return {
    id: "3",
    name: "Alice Wonderland",
    email: "alice@example.com",
  };
};

const users = async (_: any, _args: any) => {
  return mock;
};


export default {
  user,
  users,
};
