import Chance from 'chance'

describe('Test for reqres', () => {

    let testingData = [
        {
            description: "Max values",
            requestData: {
                name: Chance().string({length: 100}),
                job: Chance().string({length: 100})
            }
        },
        {
            description: "Min values",
            requestData: {
                name: Chance().string({length: 1}),
                job: Chance().string({length: 1})
            }
        }
    ]

    testingData.forEach(({description, requestData}) => {
        it(`Positive:create user ${description}`, () => {
            cy.request('POST', '/api/users', requestData).then(response => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('name', requestData.name);
                expect(response.body).to.have.property('job', requestData.job);
            });
        });
    });

    it('Negative: POST request - login unsuccessful', () => {
        cy.request({
            method: 'POST', url: '/api/login', failOnStatusCode: false, body: {
                'email': "qwerty@gmail.com"
            }
        }).then(response => {
            expect(response.status).to.eq(400);
        });
    });
});