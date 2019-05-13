const __ = require('../utils/response'),
      UserAccess = require('../data-access/users');

class Users {

//-------fetch users-------------
   async _getUsers(req, res){
     if(!req.query.limit){
        req.query.limit = 10
       }

      req.query.limit = parseInt(req.query.limit)

       if(req.query.page){
          req.query.page = parseInt(req.query.page)
          req.query.page =  req.query.page - 1
       }

      let skipRec = req.query.page * req.query.limit;
      let text = req.query.name;

     try {
      let userData = await UserAccess._fetchUser(text, skipRec, req.query.limit, req.query.sort);
      return __.successMsg(res,200, userData, "User list" )
     } catch (error) {
         __.errorMsg(res, 500, 'Internal server error', error)
       };
    };

//-------------Add  User-----------
    async _addUser(req, res) {
      let id
        if(typeof(req.body.age) || typeof(req.body.zip)  !== 'number') {
           req.body.age = parseInt(req.body.age);
           req.body.zip = parseInt(req.body.zip);
        };

      try {
       if(req.body.id && typeof(req.body.id) !== 'number'){
          req.body.id = parseInt(req.body.id);
          let isDup = await UserAccess._checkDuplicate(req.body.id);
          if(isDup) return  __.customMsg(res, 409, `User with ${req.body.id} already exists.`);
       };

       if(!req.body.id){
         let lastCount = await UserAccess._getLastUserCount();
         req.body.id = lastCount + 1;
       };

       let user = await UserAccess._createUser(req.body);
       if(user) __.successMsg(res, 201); 

     } catch (error) {
         __.errorMsg(res, 500, 'Internal server error', error);      
       };
    };

//---------Get user details----------------
    async _getUser(req, res){
     try {
       let id = req.params.id;
       let userDetails = await UserAccess._getUserById(id);

       if(!userData) return __.customMsg(res, 404, 'User not found');
       
       return __.successMsg(res, 200, userDetails);
     } catch (error) {
       __.errorMsg(res, 500, 'Internal server error', error);
      };
    };

//----------------Update user-------
    async _updateUser(req, res){
     try {
      let userData = await UserAccess._getUserById(req.params.id);
      
      if(!userData) return __.customMsg(res, 404, 'User not found');
      await UserAccess._updateUserById(req.params.id, userData, req.body);

      return __.successMsg(res, 200)
     } catch (error) {
       __.errorMsg(res, 500, 'Internal server error', error); 
      };
    };

//---------Delete User-------
    async _deleteUser(req, res) {
     try {
       let userData = await UserAccess._getUserById(req.params.id);
       if(!userData) return __.customMsg(res, 404, 'User not found');

      await UserAccess._deleteUserById(req.params.id);
      return __.successMsg(res, 200);

     } catch (error) {
      __.errorMsg(res, 500, 'Internal server error', error)
     }
    }
 
};

module.exports = new Users();