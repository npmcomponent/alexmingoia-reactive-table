/**
 * reactive-table
 *
 * Reactive table component. Create a table from a given collection and view.
 * Each row in the table is created by applying the view to each model, and then
 * passing that to reactive.
 *
 * Uses [component/reactive](https://github.com/component/reactive).
 *
 * @link https://github.com/alexmingoia/reactive-table
 */

/**
 * Dependencies
 */

var reactive = require('reactive');

/**
 * Export `ReactiveTable`
 */

module.exports = ReactiveTable;

/**
 * Create a new reactive table from given `collection`, `view`, and `table`.
 *
 * @param {HTMLElement} table
 * @param {Array} collection
 * @param {Function} view
 * @return {ReactiveTable}
 * @api public
 */

function ReactiveTable(table, collection, view) {
  this.el = document.createElement('table');
  this.rows = [];
  this.collection;
  this.view = view || function(model) { return model; };
  this.el = table || document.createElement('table');
  // Create tbody if not exists and wrap current children in it.
  var tbody = this.el.getElementsByTagName('tbody');
  if (!tbody.length) {
    tbody = document.createElement('tbody');
    while (this.el.hasChildNodes()) {
      var node = this.el.lastChild;
      this.el.removeChild(this.el.lastChild);
      tbody.appendChild(node);
    }
    this.el.appendChild(tbody);
  }
  else {
    tbody = tbody[0]
  }
  this.el.tbody = tbody;
  // Set row template html based on first row innerhtml
  this.rowTpl;
  var rows = this.el.tbody.getElementsByTagName('tr');
  if (rows.length) {
    this.rowTpl = rows[0].innerHTML;
  }
  // Set collection
  this.setCollection(collection);
};

/**
 * Set collection.
 *
 * @param {Array} collection
 * @return {ReactiveTable}
 * @api public
 */

ReactiveTable.prototype.setCollection = function(collection) {
  this.rows = [];
  this.collection = collection;
  // Remove previous rows
  this.removeAllRows();
  // Add new rows
  for (var len = collection.length, i=0; i<len; i++) {
    this.addRow(collection[i]);
  }
  return this;
};

/**
 * Add row to table with given `model` and optional `index`.
 *
 * @param {Object} model
 * @param {Number} index
 * @return {ReactiveTable}
 * @api private
 */

ReactiveTable.prototype.addRow = function(model, index) {
  var row = document.createElement('tr');

  // Generate model view
  model = new this.view(model);
  this.rows.push(model);

  if (this.rowTpl) {
    row.innerHTML = this.rowTpl;
  }
  else {
    // Add cells based on model fields if no row template is set
    for (var key in model) {
      if (model.hasOwnProperty(key)) {
        var type = typeof model[key];
        var td = document.createElement('td');
        td.className = key;
        if (type == 'function') {
          model[key] = model[key]();
        }
        if (!model[key] || type == 'string' || type == 'number') {
          td.innerHTML = model[key];
        }
        else {
          td.appendChild(model[key]);
        }
        tr.appendChild(td);
      }
    }
  }

  // Bind model to row element
  reactive(row, model, model);

  // Insert row into table
  if (index) {
    this.el.tbody.insertBefore(row, this.el.tbody.childNodes[index]);
  }
  else {
    this.el.tbody.appendChild(row);
  }

  return this;
};

/**
 * Remove row from table with given `index`.
 *
 * @param {Number} index
 * @return {ReactiveTable}
 * @api private
 */

ReactiveTable.prototype.removeRow = function(index) {
  this.el.tbody.removeChild(this.el.tbody.childNodes[index]);
  return this;
};

/**
 * Remove all rows from table.
 *
 * @return {ReactiveTable}
 * @api private
 */

ReactiveTable.prototype.removeAllRows = function() {
  while (this.el.tbody.hasChildNodes()) {
    this.el.tbody.removeChild(this.el.tbody.lastChild);
  }
  return this;
};
