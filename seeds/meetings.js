
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('meetings').del()
    .then(function () {
      // Inserts seed entries
      return knex('meetings').insert([
        {id: 1, meeting_name: 'A Big Big Meeting', duration: 4000, attendees: 4, cost: 1000000}
      ]);
    });
};
