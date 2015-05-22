describe("angular-translate-storage unit test", function() {

	var translateStorage;

	it("load service module", function() {
		beforeEach(module("angular-translate-storage"));
	});

	it("get service instance", inject(function(_translateStorage_) {
		translateStorage = _translateStorage_;
		expect(translateStorage).toBeDefined();
	}));

	it("exported methods", function() {
		expect(typeof translateStorage.get).toEqual("function");
		expect(typeof translateStorage.set).toEqual("function");
	});

});