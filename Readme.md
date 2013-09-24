# reactive-table

Create a reactive table from a given collection and view. Each row in the table is created by applying the view to each model, and then passing that to reactive.

Uses [component/reactive](https://github.com/component/reactive).

## Installation

Install with [component(1)](http://component.io):

```sh
component install alexmingoia/reactive-table
```

## API

#### new ReactiveTable(collection, view)

Initialize a new table with given `collection`, and `view`.

```javascript
var ReactiveTable = require('reactive-table');

var users = [{
  id: 1,
  name: "alex"
}];

function view(model) {
  this.id = model.get('id');
  this.name = model.get('name');
};

var table = new ReactiveTable(users, view);

document.body.appendChild(table.el);
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

You can also specify an HTML string or element for the cells:

```javascript
function view(model) {
  this.id = model.get('id');
  this.name = '<span class="name">' + model.get('name') + '</span>';
};
```

#### table#setCollection(collection)

Set table collection with given `collection`. Removes all rows and replaces them
with the new collection.

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

## MIT Licensed
