var duplicates = (arr) => arr.reduce((acc, el, i, arr) => {
  if (arr.indexOf(el) !== i && acc.indexOf(el) < 0) {
    acc.push(el);
  }
  return acc;
}, []);

export const unifySchemas = (schemas) => {
  const keys = [].concat(
    schemas.map(schema => schema.items.map(item => item.key))
  ).flat();

  console.log(keys);

  const dulicateKeys = duplicates(keys);

  console.log(dulicateKeys);

  for (let i = 1; i < schemas.length - 1; i++) {
    schemas[i].items.forEach(item => {
      if (dulicateKeys.includes(item.key)) {
        item.duplicated = true;
      }
    });
  }

  return schemas;
}
