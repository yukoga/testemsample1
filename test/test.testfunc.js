if (typeof require !== 'undefined') {
	var should = require('should')
	,	sample = require('../contents/js/sample');
}

describe('testfunc', function() {
	it('should exist testfunc function', function () {
		should.exist(testfunc);
	});
	it('testfunc should be a function', function () {
		testfunc.should.be.an.instanceof(Function);
	});
	it('testfunc() should say \'testfunc world\'', function () {
		testfunc().should.equal('testfunc world!!');
	});
});
