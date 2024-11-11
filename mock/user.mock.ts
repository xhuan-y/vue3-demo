import { defineMock } from "./base";

export default defineMock([
  {
    url: "users/me",
    method: ["GET"],
    body: {
      code: "00000",
      data: {
        userId: 2,
        username: "admin",
        nickname: "系统管理员",
        avatar:
          "https://foruda.gitee.com/images/1723603502796844527/03cdca2a_716974.gif",
        roles: ["ADMIN"],
        perms: [
          "sys:notice:edit",
          "sys:menu:delete",
          "sys:dict:edit",
          "sys:notice:query",
          "sys:dict:delete",
          "sys:config:add",
          "sys:config:refresh",
          "sys:menu:add",
          "sys:user:add",
          "sys:user:export",
          "sys:role:edit",
          "sys:dept:delete",
          "sys:config:update",
          "sys:user:password:reset",
          "sys:notice:revoke",
          "sys:user:import",
          "sys:user:delete",
          "sys:dict_type:delete",
          "sys:dict:add",
          "sys:role:add",
          "sys:notice:publish",
          "sys:notice:delete",
          "sys:dept:edit",
          "sys:dict_type:edit",
          "sys:user:query",
          "sys:user:edit",
          "sys:config:delete",
          "sys:dept:add",
          "sys:notice:add",
          "sys:role:delete",
          "sys:menu:edit",
          "sys:config:query",
        ],
      },
      msg: "一切ok",
    },
  },
]);