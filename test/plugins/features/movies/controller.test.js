'use strict';

const Controller = require('../../../../lib/plugins/features/movies/controller');
const Movie      = require('../../../../lib/models/movie');
const Knex       = require('../../../../lib/libraries/knex');

const firstMovie  = { title: 'The Prestige', release_year: 2006 };
const secondMovie = { title: 'Memento' };
const thirdMovie  = { title: 'The Departed', release_year: 2006 };

describe('movie controller', () => {

  beforeEach(() => {
    return Knex('movies').insert([firstMovie, secondMovie, thirdMovie]);
  });

  describe('filter', () => {

    it('lists all movies', () => {
      const filter = {};

      return Controller.list(filter)
      .then((movies) => {
        expect(movies).to.have.length(3);
      });
    });

    it('filters by title', () => {
      const filter = { title: firstMovie.title.toLowerCase() };

      return Controller.list(filter)
      .then((movies) => {
        expect(movies).to.have.length(1);
        expect(movies.at(0).get('title')).to.eql(firstMovie.title);
      });
    });

    it('filters by release year', () => {
      const filter = { release_year: thirdMovie.release_year };

      return Controller.list(filter)
      .then((movies) => {
        expect(movies).to.have.length(2);
        expect(movies.at(0).get('release_year')).to.eql(filter.release_year);
        expect(movies.at(1).get('release_year')).to.eql(filter.release_year);
      });
    });

  });

  describe('create', () => {

    it('creates a movie', () => {
      const payload = {
        title: 'Inception',
        release_year: 2010
      };

      return Controller.create(payload)
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
        expect(movie.get('release_year')).to.eql(payload.release_year);

        return new Movie({ id: movie.id }).fetch();
      })
      .then((movie) => {
        expect(movie.get('title')).to.eql(payload.title);
        expect(movie.get('release_year')).to.eql(payload.release_year);
      });
    });

  });

});
