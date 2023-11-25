'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

console.log("in server api in study controller");

module.exports = {
    //add functionality to create a new study and save it in strapi
    async create(ctx) {
        console.log("in create");
        console.log(ctx.request.body);

        try {
            // create a new study using the request body
            const { studyTag, consentOptions } = ctx.request.body;
            console.log("studyTag:", studyTag);

            if (!studyTag || !consentOptions || consentOptions.length === 0) {
                    // You can customize this validation logic based on your requirements
                    throw strapi.errors.badRequest("Invalid request. Please provide studyTag and consentOptions.");
            }
            const newStudy = await strapi.services.study.create(ctx.request.body);
            console.log("Study created successfully:", newStudy);
            return newStudy;
        } catch (error) {
            console.error("Error creating study:", error);
            throw error; // rethrow the error to be caught by Strapi and returned as a 500 response
        }
    },

};


