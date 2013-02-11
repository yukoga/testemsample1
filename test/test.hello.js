if (typeof require !== 'undefined') {
	var should = require('should')
	,	hello = require('../hello').hello;
}

describe('hello', function() {
	it('should exist hello function', function () {
		should.exist(hello);
	});
	it('hello should be a function', function () {
		hello.should.be.an.instanceof(Function);
	});
	it('hello() should say \'hello world\'', function () {
		hello().should.equal('hello world!!');
	});
});
