'use strict';

const { sanitizeEntity } = require('strapi-utils/lib');

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx) {
        const { id } = ctx.state.user;

        const orgs = await strapi.services.organization.find({});
        console.log(strapi.services.organization);
        console.log(orgs);
        console.log(ctx)
        return orgs.map(entity => sanitizeEntity(entity, { model: strapi.models.organization }));
    },

    async findOneUsers(ctx) {


        // console.log(strapi.services.organization);
        // console.log(orgs);
        console.log(ctx);
        const { id } = ctx.params;
        console.log(id);
        const org = await strapi.services.organization.findOne({ id: id });
        console.log(org);
        //return orgs.map(entity => sanitizeEntity(entity, { model: strapi.models.organization }));
        return sanitizeEntity(org, { model: strapi.models.organization });
    }
};
