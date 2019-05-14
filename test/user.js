let user = require('../model/user');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

 describe('Users', () => {
    beforeEach((done) => { //Before each test we empty the database
        user.remove({}, (err) => { 
           done();           
        });        
 });

  describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request('http://localhost:4000')
            .get('/api/users?page=1&limit=10&name=le&sort=-age')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.data.should.be.a('array');
              done();
            });
      });
  });

 describe('/POST users', ()=>{
      let obj = {
          "first_name": "Josephine",
          "last_name": "Darakjy",
          "company_name": "Chanay, Jeffrey A Esq",
          "city": "Brighton",
          "state": "MI",
          "zip": 48116,
          "email": "josephine_darakjy@darakjy.org",
          "web": "http://www.chanayjeffreyaesq.com",
          "age": 48
      }

    it('it should add user to database', (done) =>{
      chai.request("http://localhost:4000")
          .post('/api/users')
          .send(obj)
          .end((err, res) => {
                    res.should.have.status(201);
                done();
              });  
        });
 });

 describe('/UPDATE User', ()=>{
  it('it should update the user details', (done)=>{
      let obj = {
	       "first_name": "Raunik",
        "last_name": "Darakjy",
        "company_name": "Chanay, Jeffrey A Esq"
      }
      chai.request('http://localhost:4000')
          .put('/api/users/2')
          .send(obj)
          .end((err, res)=>{
           res.should.have.status(200)
          });
      });
 });

  describe('/DELETE User', ()=>{
  it('it should delete the user', (done)=>{
      chai.request('http://localhost:4000')
          .delete('/api/users/3')
          .end((err, res)=>{
            res.should.have.status(200)
          });
      });
 });

});

