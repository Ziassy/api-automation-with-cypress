require('dotenv').config();

const base_url = process.env.BASE_URL
const request = require("supertest")(`${base_url}`);
const expect = require("chai").expect;

const loginData = require("../../../data/loginData")
const categoryData = require("../../../data/categoryData")
const wording = require("../../../data/wordingFailed")

describe("User delete category product", () => {
  let accessToken;
  let categoryId;
  let api_url; // Declare api_url variable here

  before(async () => {
    const response = await request
      .post('/authentications')
      .send(loginData.LOGIN_USER);

    accessToken = response.body.data.accessToken;
  })

  before(async () => {
    const response = await request
      .post("/categories")
      .send(categoryData.CREATE_CATEGORY)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    categoryId = response.body.data.categoryId;
    api_url = `/categories/${categoryId}`; // Assign api_url with categoryId value
  });

  it("Success delete category product", async () => {
    const response = await request
      .delete(api_url)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });


    expect(await response.statusCode).to.eql(200)
    expect(await response.body.status).to.eql(wording.WORDING_SUCCESS.status)
    expect(Object.keys(response.body.data)).to.have.lengthOf(0);

  })

  it("Failed delete category product when categoryId is not exist", async () => {
    const response = await request
      .delete(`${api_url}failed`)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    expect(await response.statusCode).to.eql(404)
    expect(await response.body.status).to.eql(wording.WORDING_FAILED.status_fail)
    expect(await response.body.message).to.eql(wording.WORDING_FAILED.message_id_not_valid)

  })

})