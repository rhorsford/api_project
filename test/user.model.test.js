process.env.NODE_ENV = 'test';
const apps = 'http://localhost:3600';
const {User} = require("../users/models/user.model");

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../users/routes.config');
let should = chai.should();

chai.use(chaiHttp);

   /*
    * DB Clear down before test
    */
describe('User', () => {
    beforeEach((done) => {
        User.deleteMany({}, (err) => {
            done();
        });
    });
    /*
     * Test the /GET route
     */
    describe('/GET user', () => {
        it('it should GET all the list of Users', (done) => {
            chai.request(apps)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });
    /*
     * Test the /POST route
     */
    describe('/POST user', () => {
        it('it should not POST without User fields', (done) => {
            let user = {
                firstName: "John",
                familyName: "Doe",
            };
            chai.request(apps)
                .post('/users')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property("id");
                    done();
                });
        });

    });
    /*
     * Test the /PATCH/:id route
     */
    describe('/PATCH/:id user', () => {
        it('it should UPDATE a user by a given the id', (done) => {
            let user = new User({firstName: "Johnny", familyName: "Doesa"});
            user.save((err, user) => {
                chai.request(apps)
                    .patch('/users/' + user.id)
                    .send(user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User ' + user.id + ' Updated');
                        done();
                    });
            });
        });
    });
    /*
     * Test the /DELETE/:id route
     */
    describe('/DELETE/:id user', () => {
        it('it should DELETE a user with the given the id', (done) => {
            let user = new User({firstName: "Johnny", familyName: "Doesa"});
            user.save((err, user) => {
                chai.request(apps)
                    .delete('/users/' + user.id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('message').eql('User ' + user.id + ' Deleted');
                        res.body.should.be.a('object');
                        done();
                    });
            });
        });
    });
});
