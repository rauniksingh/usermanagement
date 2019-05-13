const UserModel = require('../model/user');

class  AccessUser {
  async  _fetchUser(text, skipRec, limit, sort) {
   let userData; 
   if(text){
      userData = await UserModel.find({ $or:[{"first_name": { "$regex": text, "$options": "i" }} , {"last_name": { "$regex": text, "$options": "i" }}] }).select('-createdAt -updatedAt -__v').sort(sort).skip(skipRec).limit(limit).lean();
   }else{
      userData = await UserModel.find({}).sort(sort).skip(skipRec).limit(limit).select('-createdAt -updatedAt -__v').lean();
   }
   return userData;
   };

   async _checkDuplicate(id) {
    let count = await UserModel.countDocuments({id: id});
    if(count){
     return true;
    }
    return false;
   };

   async _getLastUserCount(){
    let count = await UserModel.countDocuments({});
    return count;
   };

   async _createUser(userData){
    let user = await UserModel.create(userData);
    return user;
   };

   async _getUserById(id){
     let data;
     var mongoose = require('../node_modules/mongoose');
     
     if(mongoose.Types.ObjectId.isValid(id)){
      data = await UserModel.findOne({_id: id}).lean();
     }

     if(!mongoose.Types.ObjectId.isValid(id)){
       data = await UserModel.findOne({id: id}).lean(); 
     }

     return data
   };

   async _updateUserById(id, userData, userObj){
      let updateObj = {...userData, ...userObj };
      let user = await UserModel.findOneAndUpdate({ id: id}, {$set: updateObj});
      return user
   };

   async _deleteUserById(id){
      let userData = await UserModel.deleteOne({id: id}).lean();
      if (userData) return true
      else return false
   }
}

module.exports = new AccessUser();

