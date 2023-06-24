require('dotenv').config();

const base_url = process.env.BASE_URL
const request = require("supertest")(`${base_url}`);
const expect = require("chai").expect;

const loginData = require("../../../data/loginData")
const categoryData = require("../../../data/categoryData")
const wording = require("../../../data/wordingFailed")

let api_url = "/categories"

describe("Create category product", () => {
  let accessToken;

  before(async () => {
    const response = await request
      .post('/authentications')
      .send(loginData.LOGIN_USER);

    accessToken = response.body.data.accessToken;
  })

  it("Success create category product", async () => {
    const response = await request
      .post(api_url)
      .send(categoryData.CREATE_CATEGORY)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    expect(await response.statusCode).to.eql(201)
    expect(await response.body.status).to.eql(wording.WORDING_SUCCESS.status)
    expect(await response.body.message).to.eql(`Category ${wording.WORDING_SUCCESS.message}`)
    expect(await response.body.data.name).to.eql(categoryData.CREATE_CATEGORY.name)

  })

  it("Failed create category product when name is empty", async () => {
    const response = await request
      .post(api_url)
      .send(categoryData.CREATE_CATEGORY_WITH_EMPTY_NAME_PAYLOAD)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    expect(await response.statusCode).to.eql(400)
    expect(await response.body.message).to.eql(wording.WORDING_FAILED.empty_name_payload)

  })

})