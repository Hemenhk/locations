import { rest } from "msw";

const baseURL = "https://locations-api.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 9,
        username: "Commodus",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 9,
        profile_image:
          "https://res.cloudinary.com/hemen/image/upload/v1/media/../default_profile_xxpwvt",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
];
