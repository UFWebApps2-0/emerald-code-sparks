'use strict';

const {sanitizeEntity} = require("strapi-utils");
const { createCoreController } = require('@strapi/strapi').factories;

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = createCoreController('api::profile.profile', ({ strapi }) =>  ({
  async find(ctx) {
    const {id, student} = ctx.request.body

    let profile = await (() => {
      if (student) {
        return strapi.services.profiles.find({
          student: id,
          type: "student",
        }, [])
      } else {
        return strapi.services.profiles.find({
          user: id,
          type: "user",
        }, [])
      }
    })()

    if (!profile && false) {
      if (student) {
        const student = await strapi.services.student.find({
          id: id,
        });

        if (!student) {
          // Todo 404

          return;
        }
      } else {
        const user = await strapi.services.users.find({
          id: id,
        });
      }

      profile = await strapi.services.profiles.create({
        name: student.name,
        character: student.character,
        classroom: classroom
      })
    }

    // return the students and the current session
    return {
      profile: sanitizeEntity(profile),
    }
  },
}));
