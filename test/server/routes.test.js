const request = require('supertest')
const jest = require('jest')
const server = require('../../server/server')

jest.mock('../../server/db/meetings', () => ({
    getMeetings: () => Promise.resolve(
        {
            meetings:
                [
                    {
                        id: 1,
                        meeting_name: 'potatoes',
                        duration: 4000,
                        attendees: 9001,
                        cost: 9002
                    }
                ]
        }
    ),
    postMeeting: () => Promise.resolve(
        {
            id: 1,
            meeting_name: 'potatoes',
            duration: 4000,
            attendees: 9001,
            cost: 9002
        }
    ),
    getUsers: () => Promise.resolve(
        [
            {
                id: 1,
                user_name: 'potatoes',
                first_name: 'fourthousandandone',
                last_name: 'ninethousandsandone',
                hourly_wage: 12,
                hash: "kdurmchfdkldh73jr74j73jkfg"
            }
        ]
    )
}))


test('meeting get route works', (done) => {
    return request(server)
        .get('/api/meetings')
        .expect(200)
        .then(res => {
            expect(res.body).toBeTruthy()
            done()
        })
})

test('meeting post route works', (done) => {
    return request(server)
        .post('/api/meetings')
        .send({ meeting: { name: 'A big meeting' } })
        .expect(200)
        .then(res => {
            expect(res.body).toBeTruthy()
            done()
        })
})

test('get users route works', (done) => {
    return request(server)
        .get('/api/users')
        .expect(200)
        .then(res => {
            expect(res).toBeTruthy()
            done()
        })
})


//   return request(server)
//     .get('/api/greetings')
//     .expect(200)
//     .then(res => {
//       expect(res.body.length).toBe(2)
//     })
//     .catch(err => {
//       expect(err).toBeFalsy()
//     })


