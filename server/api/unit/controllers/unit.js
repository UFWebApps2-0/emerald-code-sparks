'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async update(ctx) {
    const { id } = ctx.params;

    // ensure request was not sent as formdata
    if (ctx.is('multipart'))
      return ctx.badRequest('Multipart requests are not accepted!', {
        id: 'Unit.update.format.invalid',
        error: 'ValidationError',
      });

    // ensure the request has the right number of params
    const params = Object.keys(ctx.request.body).length;
    if (params !== 5)
      return ctx.badRequest('Invalid number of params!', {
        id: 'Unit.update.body.invalid',
        error: 'ValidationError',
      });

    // validate the request
    const {
      grade: gradeId,
      name,
      number,
      standards_id,
      standards_description,
    } = ctx.request.body;
    if (
      !strapi.services.validator.isPositiveInt(number) ||
      !strapi.services.validator.isPositiveInt(gradeId) ||
      !standards_id ||
      !name ||
      !standards_description
    )
      return ctx.badRequest(
        'A grade, name, standards_description must be provided! Number and Standards_id must be positive interger! ',
        { id: 'Unit.update.body.invalid', error: 'ValidationError' }
      );

    // ensure the grade is valid
    const grade = await strapi.services.grade.findOne({ id: gradeId });
    if (!grade)
      return ctx.notFound('The grade provided is invalid!', {
        id: 'Unit.update.grade.invalid',
        error: 'ValidationError',
      });

    return await strapi.services.unit.update({ id }, ctx.request.body);
  },
  // async find(){
  //   const { grade } = ctx.query;

  //   // If grade is provided, filter units by grade
  //   if (grade) {
  //     // Ensure the provided grade is a positive integer
  //     if (!strapi.services.validator.isPositiveInt(grade)) {
  //       return ctx.badRequest('Invalid grade parameter!', {
  //         id: 'Unit.find.grade.invalid',
  //         error: 'ValidationError',
  //       });
  //     }

  //     // Find units by grade
  //     const units = await strapi.services.unit.find({ grade });
  //     return ctx.send(units);
  //   }

  //   // If grade is not provided, perform the default find operation
  //   console.log('Finding');
  //   // You can customize this part based on your actual find logic
  //   const allUnits = await strapi.services.unit.allUnits;
  //   return ctx.send(allUnits);
  // }
};
