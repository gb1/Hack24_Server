## Backend server for Hack24 app

to run:
-npm install
-node server.js


## Server functions

+ Push chat notifications.
+ Handle messages being posted to it.


### Database Schema

#### Article
Describes the article in the reader

+ id
+ url
+ banner
+ header
+ summary
+ publish_datetime
+ categories {
	place: ;
}


#### Loop
Describes a Loop connected to an article

+ id
+ location


#### Message
Describe a message posted by a user.

+ id
+ user_id
+ article_id
+ created_at
+ body


#### User
Describes a user

+ name
+ id
+ lat
+ lon