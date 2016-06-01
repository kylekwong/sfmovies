'use strict';

const Joi = require('joi');

const ListValidator = require('../../../lib/validators/movies/list');

describe('list movie validator', () => {

  describe('title', () => {

    it('is optional', () => {
      const query = {
        release_year: 2005
      };
      const result = Joi.validate(query, ListValidator);

      expect(result.error).to.be.null;
    });

  });

  describe('release_year', () => {

    it('is optional', () => {
      const query = {
        title: 'Inception'
      };
      const result = Joi.validate(query, ListValidator);

      expect(result.error).to.be.null;
    });

  });

});
