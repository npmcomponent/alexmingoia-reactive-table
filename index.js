/**
 * reactive-table
 *
 * Reactive table component with sorting, filtering, and paging.
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
 * Create a new reactive table from given `el`, `collection`, and `view`.
 *
 * @param {HTMLElement} el
 * @param {Array} collection
 * @param {Function} view
 * @return {ReactiveTable}
 * @api public
 */

function ReactiveTable(el, collection, view) {
  this.el = el;
  this.collection;
  this.columns = [];
  this.view = view || function(model) { return model; };
  // Create thead
  var thead = this.el.getElementsByTagName('thead');
  if (!thead.length) {
    thead = document.createElement('thead');
    this.el.appendChild(thead);
  }
  // Create tbody
  var tbody = this.el.getElementsByTagName('tbody');
  if (!tbody.length) {
    tbody = document.createElement('tbody');
    this.el.appendChild(tbody);
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
  this.collection = collection;
  // Remove previous rows
  this.removeAllRows();
  // Add new rows
  for (var len = collection.length, i=0; i<len; i++) {
    this.addRow(collection[i]);
  }
  // Update thead
  var thead = this.el.childNodes[0];
  while (thead.hasChildNodes()) {
    thead.removeChild(thead.lastChild);
  }
  thead.appendChild(document.createElement('tr'));
  for (var len = this.columns.length, i=0; i<len; i++) {
    var th = document.createElement('th');
    th.innerHTML = this.columns[i];
    thead.childNodes[0].appendChild(th);
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
  var tbody = this.el.childNodes[1];
  if (index) {
    tbody.insertBefore(row.el, tbody.childNodes[index]);
  }
  else {
    tbody.appendChild(row.el);
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
  var tbody = this.el.childNodes[1];
  tbody.removeChild(tbody.childNodes[index]);
  return this;
};

/**
 * Remove all rows from table.
 *
 * @return {ReactiveTable}
 * @api private
 */

ReactiveTable.prototype.removeAllRows = function() {
  var tbody = this.el.childNodes[1];
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.lastChild);
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
