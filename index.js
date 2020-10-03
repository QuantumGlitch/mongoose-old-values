const copy = require('fast-copy');

module.exports =
  // Enable oldValues on docs for this schema
  function plugin(schema) {
    if (schema.oldValues) return;
    // Remember this plugin was applied
    schema.oldValues = true;

    function setOldValues(doc){
        doc.$locals.old = {
          data: {},

          get(path) {
            const splitted = path.split('.');
            let currentValue = this.data[splitted.shift()];
    
            for (const sub of splitted) currentValue = currentValue[sub];
    
            return currentValue;
          },

          set(path, value){
            const splitted = path.split('.');
            let currentValue = this.data;

            for (let i = 0;  i < splitted.length ; i++){
              const sub = splitted[i];

              if(i === splitted.length - 1){
                currentValue[sub] = value;
                break;
              }

              if(!currentValue[sub])              
                currentValue[sub] = {};

              currentValue = currentValue[sub];
            }        
          }
        };
  
        // copy values
        schema.eachPath((path) => doc.$locals.old.set(path,copy(doc.get(path))));
    }

    schema.post('init', setOldValues);
    schema.post('save', setOldValues);
  };
