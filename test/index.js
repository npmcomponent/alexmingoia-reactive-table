var Table = require('table');
var assert = require('assert');

describe('table(el, collection, view)', function() {
  var table = new Table(document.getElementById('test-table'), []);

  it('should initialize new tables', function() {
    assert(table instanceof Table);
  });

  it('should set collection', function() {
    table.setCollection([{id: 1, name: 'alex'}, {id:2, name: 'jeff'}]);
    assert(table.collection.length > 0);
  });
});
