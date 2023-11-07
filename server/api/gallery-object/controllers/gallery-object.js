'use strict';

module.exports = {
    async initializeAndCreate(ctx) {
    const {
      title,
      user_name,
      like_count,
      view_count,
      discussion_board,
      type,
      visibility,
    } = ctx.request.body;

    // Generate a unique objectId based on a counter that increments
    const objectId = await strapi.services.galleryobject.getNextObjectId();

    const current_date = new Date();
    const data = {
      title,
      user_name,
      date_posted: current_date,
      like_count,
      view_count,
      discussion_board,
      objectId, // Use the generated objectId
      type,
      visibility,
    };

    try {
      const galleryObject = await strapi.services.galleryobject.create(data);
      return galleryObject;
    } catch (error) {
      return ctx.badRequest('Failed to create the gallery object.', {
        error: 'CreationError',
      });
    }
  },

  async getGalleryObject(ctx) {
    const { id } = ctx.params;

    try {
      const galleryObject = await strapi.services['gallery-objects'].findOne({ id });
      if (!galleryObject) {
        return ctx.notFound('Gallery object not found.');
      }

      return galleryObject;
    } catch (error) {
      return ctx.badRequest('Failed to retrieve the gallery object.', {
        error: 'RetrievalError',
      });
    }
  },

  async updateGalleryObject(ctx) {
    const { id } = ctx.params;
    const { title, like_count, view_count } = ctx.request.body;

    try {
      const existingGalleryObject = await strapi.services['gallery-objects'].findOne({ id });
      if (!existingGalleryObject) {
        return ctx.notFound('Gallery object not found.');
      }

      const updatedGalleryObject = await strapi.services['gallery-objects'].update({ id }, {
        title,
        like_count,
        view_count,
      });

      return updatedGalleryObject;
    } catch (error) {
      return ctx.badRequest('Failed to update the gallery object.', {
        error: 'UpdateError',
      });
    }
  },
  
  async find(ctx) {
    // Query the database or your data source to fetch gallery objects
    // For example, you can use the Strapi service to get your gallery objects
    try {
      const galleryObjects = await strapi.services['gallery-objects'].find();
      return galleryObjects;
    } catch (error) {
      ctx.throw(500, 'Internal Server Error', { error });
    }
  },
  //add delete function
};
