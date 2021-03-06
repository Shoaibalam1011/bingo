import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Games = new Mongo.Collection('games');
export const Quotes = new Mongo.Collection('quotes');

if (Meteor.isServer) {

  Meteor.publish('users', function UsersPublication() {
    return Meteor.users.find({},{username: 1, profile: 1});
  });

  Meteor.publish('thisGame', function ThisGamePublication(gameId) {
    var game = Games.find({ _id: gameId });
    return game;
  });

  Meteor.publish("activeUsers", function() {
    return Meteor.users.find({ "status.online": true });
  });

  Meteor.publish("allUsers", function() {
    return Meteor.users.find({},{username:1,'profile.name':1, status:1});
  });

  Meteor.publish("myGames", function() {
    var userId = this.userId;

    var games =  Games.find({ $or:[{userId: userId},{opponentId: userId}]});

    if(games){
      return games;
    }else{
      console.log("no games published");
      return null;
    }

  });

}

Meteor.methods({

});
