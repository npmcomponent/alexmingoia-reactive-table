/**
 * table
 *
 * Reactive table component with sorting, filtering, and paging.
 *
 * @link https://github.com/bloodhound/table
 */

/**
 * Dependencies
 */

var reactive = require('reactive');

/**
 * Export `Table`
 */

module.exports = Table;

/**
 * Create a new reactive table from given `el`, `collection`, and `view`.
 *
 * @param {HTMLElement} el
 * @param {Array} collection
 * @param {Function} view
 * @return {Table}
 * @api public
 */

function Table(el, collection, view) {
  this.el = el;
  this.collection;
  this.view = view;
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
 * @return {Table}
 * @api public
 */

Table.prototype.setCollection = function(collection) {
  this.collection = collection;
  // Remove previous rows
  this.removeAllRows();
  // Add new rows
  for (var model in collection) {
    this.addRow(model);
  }
  return this;
};

/**
 * Add row to table with given `model` and optional `index`.
 *
 * @param {Object} model
 * @param {Number} index
 * @return {Table}
 * @api private
 */

Table.prototype.addRow = function(model, index) {
  var row = new Row(model, this.view);
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
 * @return {Table}
 * @api private
 */

Table.prototype.removeRow = function(index) {
  var tbody = this.el.childNodes[1];
  tbody.removeChild(tbody.childNodes[index]);
  return this;
};

/**
 * Remove all rows from table.
 *
 * @return {Table}
 * @api private
 */

Table.prototype.removeAllRows = function() {
  var tbody = this.el.childNodes[1];
  for (var len = tbody.childNodes.length, i=0; i<len; i++) {
    this.removeRow(i);
  }
  return this;
};

/**
 * Create a new table row with given `model` and `view`.
 *
 * @param {Object} model
 * @param {Function} view
 * @return {Row}
 * @api private
 */

function Row(model, view) {
  this.el = document.createElement('tr');
  this.model = model;
  this.view = view;
  // Bind model to row element
  reactive(this.el, this.model, this.view);
  return this;
};
