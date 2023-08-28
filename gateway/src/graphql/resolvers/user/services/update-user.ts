import config from "@/config";
import mock from "@graphql/resolvers/mock";
import { UpdateUserInput, User } from "@generated/resolvers-types";

const willUseMock =
  config.env.testing || (config.env.development && process.env.USE_MOCK);

const _updateUserMock = async (
  id: string,
  updateUserInput: UpdateUserInput
) => {
  const user = mock.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser: User = { ...user, ...updateUserInput } as User;

  (mock as User[]).splice(mock.indexOf(user), 1, updatedUser);

  return updatedUser;
};

const _updateUser = async (id: string, updateUserInput: UpdateUserInput) => {
  const user = mock.find((user) => user.id === id);

  if (!user) {
    throw new Error("User not found");
  }

  const updatedUser: User = { ...user, ...updateUserInput } as User;

  (mock as User[]).splice(mock.indexOf(user), 1, updatedUser);

  return updatedUser;
};

const updateUser = willUseMock ? _updateUserMock : _updateUser;

export default updateUser;
