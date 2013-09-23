var ReactiveTable = require('reactive-table');
var assert = require('assert');

describe('ReactiveTable(el, collection, view)', function() {
  var table = new ReactiveTable(document.createElement('table'), []);

  beforeEach(function() {
    table.setCollection([{id: 1, name: 'alex'}, {id:2, name: 'jeff'}]);
  });

  it('should initialize new tables', function() {
    assert(table instanceof ReactiveTable);
  });

  it('should set collection', function() {
    assert(table.collection.length > 0);
  });

  it('should create table headers', function() {
    assert(table.el.getElementsByTagName('th').length > 0);
  });

  it('should create table rows', function() {
    assert(table.el.getElementsByTagName('td').length > 0);
  });

  it('should add rows', function() {
    table.addRow({id: 3, name: 'paul'});
    assert(~table.el.innerHTML.indexOf('paul'));
  });

  it('should add rows at specific index/position', function() {
    table.addRow({id: 3, name: 'paul'}, 1);
    assert(~table.el.innerHTML.indexOf('paul'));
    var tbody = table.el.childNodes[1];
    assert(tbody);
    assert(~tbody.childNodes[1].innerHTML.indexOf('paul'));
  });

  it('should remove rows', function() {
    table.removeRow(1);
    assert(!(~table.el.innerHTML.indexOf('jeff')));
  });

  it('should remove all rows', function() {
    table.removeAllRows();
    assert(!table.el.childNodes[1].childNodes.length);
  });
});
