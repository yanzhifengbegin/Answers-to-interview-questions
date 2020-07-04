/**
 * Example problem with existing solution and passing test.
 * See problem 0 in the spec file for the assertion
 * @returns {string}
 */
exports.example = () => 'hello world';

exports.stripPrivateProperties = (keys, datasource) => datasource.map((item) => {
  const target = Object.keys(item).reduce((final, itemKey) => {
    if (keys.includes(itemKey)) {
      return final;
    }
    const finalCopy = final;

    finalCopy[itemKey] = item[itemKey];
    return final;
  }, {});

  return target;
});
exports.excludeByProperty = (key, datasource) => {
  return datasource.filter(item => !Object.prototype.hasOwnProperty.call(item, key));
};
exports.sumDeep = (datasource) => {
  return datasource.map((item) => {
    const sum = item.objects.reduce((final, itemProp) => final + itemProp.val, 0);
    return { objects: sum };
  });
};
exports.applyStatusColor = (rules, datasource) => {
  const arr = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < datasource.length; i++) {
    const { status } = datasource[i];
    let color = '';

    Object.keys(rules).forEach((item) => {
      color = rules[item].includes(status) ? item : '';
    });

    arr.push({
      status,
      color,
    })
  }

  return arr.filter(item => item.color !== '');
};
exports.createGreeting = (fn, prefix) => {
  return name => `${prefix} ${name}`;
};
exports.setDefaults = obj => target => ({ ...obj, ...target });
exports.fetchUserByNameAndUsersCompany = (username, service) => {
  return new Promise((resolve) => {
    let company = null;
    let user = null;
    let status = null;

    service.fetchUsers().then((users) => {
      user = users.find(item => item.name === username);
      service.fetchCompanyById(user.companyId).then((companyRes) => {
        company = companyRes;
        service.fetchStatus().then((statusRes) => {
          status = statusRes;

          resolve({
            company,
            status,
            user,
          });
        });
      });
    });
  });
};
