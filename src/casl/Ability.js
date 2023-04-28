import { AbilityBuilder } from '@casl/ability';

export function updateAbility(ability, user) {
	const { can, rules } = new AbilityBuilder();

	if (user != null) {
		if (user.role == 'Admin') {
			can('login', 'adminPanel');
		}

		const userPermissions = JSON.parse(user.permissions);

		for (const permission of userPermissions) {
			can(permission.Key, permission.Value);
		}

		can('authorized');
	} else {
		can('unauthorized');
	}

	ability.update(rules);
}
