import usersFromServer from '../api/users';
import { User } from '../types/User';

export function getUserId(userId: number): User | null {
  return usersFromServer.find(user => userId === user.id) || null;
}
