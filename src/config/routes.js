/**
 * The module contains all possible express routes for the server.
 * Having all routes in one file makes it easy to modify and add routes.
 * @module config/routes
 */

/**
 * Defines all the possible routes in the server.
 * Each route is a string containing the absolute path from the host address.
 * @name routes
 * @type {json}
 */
module.exports = {
    questionRoute: '/admin/question',
    courseRoute: '/admin/course',
    userRoute: '/user'
};