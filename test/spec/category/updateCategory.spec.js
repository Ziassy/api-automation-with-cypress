require('dotenv').config();

const base_url = process.env.BASE_URL
const request = require("supertest")(`${base_url}`);
const expect = require("chai").expect;

const loginData = require("../../../data/loginData")
const categoryData = require("../../../data/categoryData")
const wording = require("../../../data/wordingFailed")

describe("User update category product", () => {
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

  it("Success update category product", async () => {
    const response = await request
      .put(api_url)
      .send(categoryData.UPDATE_CATEGORY)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    console.log(await response.body)

    expect(await response.statusCode).to.eql(200)
    expect(await response.body.status).to.eql(wording.WORDING_SUCCESS.status)
    expect(await response.body.data.name).to.eql(categoryData.UPDATE_CATEGORY.name)

  })

  it("Failed update category product when name is empty", async () => {
    const response = await request
      .put(api_url)
      .send(categoryData.CREATE_CATEGORY_WITH_EMPTY_NAME_PAYLOAD)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    expect(await response.statusCode).to.eql(400)
    expect(await response.body.message).to.eql(wording.WORDING_FAILED.empty_name_payload)

  })

})