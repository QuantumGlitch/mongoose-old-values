const copy = require('fast-copy');

module.exports =
  // Enable oldValues on docs for this schema
  function plugin(schema) {
    if (schema.oldValues) return;
    // Remember this plugin was applied
    schema.oldValues = true;

    function setOldValues(doc) {
      doc.$locals.old = {};

      // copy values
      schema.eachPath((path) => (doc.$locals.old[path] = copy(doc.get(path))));

      doc.$locals.old.get = function (path) {
        const splitted = path.split('.');
        const currentValue = this[splitted.shift()];

        for (let sub of splitted) currentValue = currentValue[sub];

        return currentValue;
      };
    }

    schema.post('init', setOldValues);
    schema.post('save', setOldValues);
  };
