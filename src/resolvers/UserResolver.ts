import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { User } from '../models/User';
import crypto from 'crypto';

@Resolver()
export class UserResolver {
	private data: User[] = [];

	@Query(() => [User])
	async users() {
		return this.data;
	}

	@Mutation(() => User)
	async create(@Arg('name') name: string) {
		const user = { id: crypto.randomUUID(), name };

		this.data.push(user);

		return user;
	}

	@Mutation(() => User)
	async delete(@Arg('id') id: string) {
		const user = this.data.filter((user) => user.id !== id);
		return user;
	}

	@Mutation(() => User)
	async update(@Arg('id') id: string, @Arg('name') name: string) {
		const user = this.data.find((user) => user.id === id);

		if (!user) {
			throw new Error('User not found.');
		}

		user.name = name;

		return user;
	}
}
