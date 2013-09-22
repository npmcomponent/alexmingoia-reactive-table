# table

Table component with sorting, filtering, and paging.

## Installation

Install with [component(1)](http://component.io):

```sh
component install bloodhound/table
```

## API

#### new Table(el, collection, view)

Initialize a new table with given `el`, `collection`, and `view`.

```javascript
var Table = require('table');

var users = [{
  id: 1,
  name: "alex"
}];

function View(model) {
  this.id = model.get('id');
  this.name = model.get('name');
};

var table = new Table(document.createElement('table'), users, View);
```

Results in a reactive table:

```html
<table>
  <thead>
    <tr><th>id</th><th>name</th></tr>
  </thead>
  <tbody>
    <tr><td>1</td><td>alex</td></tr>
  </tbody>
</table>
```

#### table#setCollection(collection)

Set table collection with given `collection`. Removes all rows.

```javascript
table.setCollection(collection);
```

#### table#addRow(model, index)

Add row to table with given `model` and optional `index`.

```javascript
table.addRow(model);
```

#### table#removeRow(index)

Remove row from table with given `index`.

```javascript
table.removeRow(3);
```

#### table#removeAllRows()

Removes all rows from table.

```javascript
table.removeAllRows();
```

## License

MIT
