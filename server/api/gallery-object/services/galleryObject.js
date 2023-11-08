'use strict';

module.exports = {
  async create(data) {
    return await strapi.query('gallery-object').create(data);
  },

  async findOne(params) {
    return await strapi.query('gallery-object').findOne(params);
  },

  async update(params, data) {
    return await strapi.query('gallery-object').update(params, data);
  },
    async getNextObjectId() {
    // Find the maximum objectId from the existing gallery objects
    const maxObjectId = await strapi
      .query('galleryobject')
      .model.query(qb => {
        qb.max('objectId as maxObjectId');
      })
      .fetch();

    const nextObjectId = maxObjectId ? maxObjectId.get('maxObjectId') + 1 : 1;

    return nextObjectId;
  },
};
