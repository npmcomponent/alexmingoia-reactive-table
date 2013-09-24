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
 * Create a new reactive table from given `collection`, and `view`.
 *
 * @param {Array} collection
 * @param {Function} view
 * @return {ReactiveTable}
 * @api public
 */

function ReactiveTable(collection, view) {
  this.el = document.createElement('div');
  this.collection;
  this.columns = [];
  this.view = view || function(model) { return model; };
  // Create table
  this.el.table = document.createElement('table');
  this.el.appendChild(this.el.table);
  // Create thead
  this.el.thead = document.createElement('thead');
  this.el.table.appendChild(this.el.thead);
  // Create tbody
  this.el.tbody = document.createElement('tbody');
  this.el.table.appendChild(this.el.tbody);
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
  this.collection = collection;
  // Remove previous rows
  this.removeAllRows();
  // Add new rows
  for (var len = collection.length, i=0; i<len; i++) {
    this.addRow(collection[i]);
  }
  // Update thead
  while (this.el.thead.hasChildNodes()) {
    this.el.thead.removeChild(thead.lastChild);
  }
  this.el.thead.appendChild(document.createElement('tr'));
  for (var len = this.columns.length, i=0; i<len; i++) {
    var th = document.createElement('th');
    th.innerHTML = this.columns[i];
    this.el.thead.childNodes[0].appendChild(th);
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
  // Generate model view
  model = this.view(model);

  // Update column list
  this.columns = [];
  for (var column in model) {
    if (model.hasOwnProperty(column)) {
      this.columns.push(column);
    }
  }

  // Create reactive row
  var row = new ReactiveTableRow(model);

  // Insert row into table
  if (index) {
    this.el.tbody.insertBefore(row.el, this.el.tbody.childNodes[index]);
  }
  else {
    this.el.tbody.appendChild(row.el);
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

/**
 * Create a new table row with given `model`.
 *
 * @param {Object} model
 * @return {ReactiveTableRow}
 * @api private
 */

function ReactiveTableRow(model) {
  var tr = document.createElement('tr');

  // Add cells
  for (var key in model) {
    if (model.hasOwnProperty(key)) {
      var type = typeof model[key];
      var td = document.createElement('td');
      td.className = key;
      if (type == 'function') {
        model[key] = model[key]();
      }
      if (!model[key] || type == 'string' || typeof type == 'number') {
        td.innerHTML = model[key];
      }
      else {
        td.appendChild(model[key]);
      }
      tr.appendChild(td);
    }
  }

  // Bind model to row element
  this.reactive = reactive(tr, model);

  this.el = this.reactive.el;

  return this;
};
