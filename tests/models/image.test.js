var ImageModel = require("../../models/image"),
should = require('chai').should();
describe("Image Model", function () {
  var image;
  it("should have a mongoose schema", function () {
    ImageModel.schema.should.exist;
  });
  beforeEach(function () {
    image = new ImageModel({
      title: "Test",
      description: "Testing",
      filename: "testfile.jpg",
    });
  });
  describe("Schema", function () {
    it("should have a title string", function () {
      image.title.should.exist;
    });
    it("should have a description string", function () {
      image.description.should.exist;
    });
    it("should have a filename string", function () {
      image.filename.should.exist;
    });
    it("should have a views number default to 0", function () {
      image.views.should.exist;
      expect(image.views).to.equal(0);
    });
    it("should have a likes number default to 0", function () {
      image.likes.should.exist;
      expect(image.likes).to.equal(0);
    });
    it("should have a timestamp date", function () {
      image.timestamp.should.exist;
    });
  });
  describe("Virtuals", function () {
    describe("uniqueId", function () {
      it("should be defined", function () {
        image.uniqueId.should.exist;
      });
      it("should get filename without extension", function () {
        expect(image.uniqueId).to.equal("testfile");
      });
    });
  });
});
