require('dotenv').config();

const base_url = process.env.BASE_URL
const request = require("supertest")(`${base_url}`);
const expect = require("chai").expect;

const loginData = require("../../../data/loginData")
const userData = require("../../../data/userData")
const wording = require("../../../data/wordingFailed")

describe("Create User Kasir Aja", () => {
  let accessToken;
  const api_url = "/users"


  //Get access token login, before create user
  before(async () => {
    const response = await request
      .post('/authentications')
      .send(loginData.LOGIN_USER);

    accessToken = response.body.data.accessToken;
  })

  it("Success create user Kasir Aja", async () => {
    const response = await request
      .post(api_url)
      .send(userData.CREATE_USER)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    expect(await response.statusCode).to.eql(201)
    expect(await response.body.status).to.eql(wording.WORDING_SUCCESS.status)
    expect(await response.body.message).to.eql(`User ${wording.WORDING_SUCCESS.message}`)
    expect(await response.body.data.name).to.eql(userData.CREATE_USER.name)

  })

  it("Failed create user when name is empty", async () => {
    const response = await request
      .post(api_url)
      .send(userData.CREATE_USER_WITH_EMPTY_NAME_PAYLOAD)
      .set({
        "Authorization": `Bearer ${accessToken}`
      });

    expect(await response.statusCode).to.eql(400)
    expect(await response.body.message).to.eql(wording.WORDING_FAILED.empty_name_payload)

  })

})