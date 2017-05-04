/* tslint:disable */

export function getSchema(schema: any) {
	const schemas = {
		employee: new schema.Entity('employee'),
		person: new schema.Entity('person')
	}

	schemas['employee'].define({
		manager: schemas['employee']
	});

	schemas['person'].define({
		parents: [ schemas['person'] ]
	});

	return schema;
}
