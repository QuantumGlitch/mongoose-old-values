# Package: mongoose-old-values

Package for mongoose useful for storing the old values of a model's document.

# Install

```shell
npm i mongoose-old-values
```

# Usage

Just apply as plugin on your schema or globally :

```js
// Globally
const mongoose = require('mongoose');
mongoose.plugin(require('mongoose-old-values'));

// Singularly
const TestSchema = new Schema({
    a: {},
    b: { c: {} },
    ...
 });
TestSchema.plugin(require('mongoose-old-values'));
const TestModel = mongoose.model('Test', TestSchema);
```

It will create a new post init hook and a new post save hook, storing the old values (copying them with one of the fastest library available fast-copy).

After the application of this plugin you will notice this behaviour:

```js
const document = await TestModel.findById(...);

// Any edit you want
document.a = ...;
document.a.b = ...;

...

// Get the old props

const oldA = document.$locals.old.get('a');
const oldAB = document.$locals.old.get('a.b');
```

Just use _document.\$locals.old.get(path)_ to access the old value

# Support

If you would like to support my work, [please buy me a coffe ☕](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=HRVBJMSU9CQXW).
Thanks in advice.
