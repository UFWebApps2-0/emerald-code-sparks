'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    //add functionality to create a new study and save it in strapi
    async create(ctx) {
        const { user } = ctx.state;
        const { session } = user;
        const { classroom, lesson_module } = ctx.request.body;
        const { id: userId } = user;
        const { id: sessionId } = session;
        const { id: classroomId } = classroom;
        const { id: lessonModuleId } = lesson_module;
        const { id: studyId } = await strapi.services.study.create({
            user: userId,
            session: sessionId,
            classroom: classroomId,
            lesson_module: lessonModuleId,
        });
        return { id: studyId };
    },
    
};
