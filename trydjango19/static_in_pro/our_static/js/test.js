var chai = require('chai');
var superagent = require('superagent');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('Home', function(){
  it('should respond to GET',function(done){
  	this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/')
      .end(function(err,res){
      	console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('Dashboard ', function(){
  it('should respond to GET',function(done){
  	this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/dashboard/')
      .end(function(err,res){
      	console.log(res);
        res.should.have.status(200);
        done();
  });
});
});

describe('TripList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/triplist/')
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('OrdersList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/orders/')
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('TruckList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/trucks/')
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('DriverList', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/drivers/')
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('AddDriver', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/add_driver/')
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
describe('FAQ', function(){
  it('should respond to GET',function(done){
    this.timeout(15000);
    superagent
      .get('http://127.0.0.1:8000/faq')
      .end(function(err,res){
        console.log(res);
        res.should.have.status(200);
        done();
  });
});
});
