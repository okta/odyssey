export const getTypedObjectEntries = <ObjectType extends object>(
  obj: ObjectType,
) => Object.entries(obj) as [keyof ObjectType, ObjectType[keyof ObjectType]][];
