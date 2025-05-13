/**
 * Define every responses which we going to
 * use while building product CRUD.
 */

const httpStatus = require('http-status');

module.exports = {
  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  ok: (res, options = {}) => {
    const opts = {statusCode: httpStatus.OK, ...options};
    return res.status(httpStatus.OK).send(opts);
  },

  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  created: (res, options = { message: 'data inserted' }) => {
    const opts = {statusCode: httpStatus.CREATED, ...options};
    return res.status(httpStatus.CREATED).send(opts);
  },

  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  badRequest: (res, options = { message: 'bad request' }) => {
    const opts = {statusCode: httpStatus.BAD_REQUEST, ...options};
    return res.status(httpStatus.BAD_REQUEST).send(opts);
  },

  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  noData: (res, options = { message: 'no data found' }) => {
    const opts = {statusCode: httpStatus.NOT_FOUND, ...options};
    return res.status(httpStatus.NOT_FOUND).send(opts);
  },

  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  noContent: (res, options = {message:'no content'}) => {
    const opts = {statusCode: httpStatus.NO_CONTENT, ...options};
    return res.status(httpStatus['204']).send(opts);
  },

  /**
  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  unauthorized: (res, options = { message: 'Unauthorized' }) => {
    const opts = {statusCode: httpStatus.UNAUTHORIZED, ...options};
    return res.status(httpStatus.UNAUTHORIZED).send(opts);
  },

  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */

  forbidden: (res, options = { message: 'Unauthorized' }) => {
    const opts = {statusCode: httpStatus.FORBIDDEN, ...options};
    return res.status(httpStatus.FORBIDDEN).send(opts);
  },

  /**
     * successful response
     * @param {Object<response>} res response object of express.js
     * @param {Object} options options.
     * @param {boolean} options.success message to be pass.
     * @param {Any}   options.data data be send.
     * @param {Any} options.error
     */
  unprocessableEntity: (res, options = { message: 'Unprocessable Entity' }) => {
    const opts = {statusCode: httpStatus.UNPROCESSABLE_ENTITY, ...options};
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send(opts);
  },
};
