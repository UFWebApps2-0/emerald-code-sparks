//
// Check if the current user is a member of a specific org
//
module.exports = async (ctx, next) => {

    const requestedId = parseInt(ctx.params.id);
    console.log(typeof (requestedId));
    console.log(requestedId);
    console.log(typeof (ctx.state.user.organization));
    console.log(ctx.state.user.organization);
    console.log(Number.isInteger(requestedId));
    console.log(ctx.state.user.organization == requestedId);
    if (((ctx.state.user.organization !== undefined) && Number.isInteger(requestedId)) && ctx.state.user.organization === requestedId) {
        // Go to next policy or controller
        return await next()
    }

    ctx.unauthorized(`You're not allowed to perform this action!`)
}