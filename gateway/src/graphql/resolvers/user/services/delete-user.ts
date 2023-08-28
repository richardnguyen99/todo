import config from "@/config";
import mock from "@graphql/resolvers/mock";

const willUseMock =
  config.env.testing || (config.env.development && process.env.USE_MOCK);

const _deleteUserMock = async (id: string) => {
  const user = mock.find((user) => user.id === id);

  if (!user) {
    throw new Error(`User ID not found: ${id}`);
  }

  mock.splice(mock.indexOf(user), 1);

  return user;
};

const _deleteUser = async (id: string) => {
  const user = mock.find((user) => user.id === id);

  if (!user) {
    throw new Error(`User ID not found: ${id}`);
  }

  mock.splice(mock.indexOf(user), 1);

  return user;
};

const deleteUser = willUseMock ? _deleteUserMock : _deleteUser;

export default deleteUser;
