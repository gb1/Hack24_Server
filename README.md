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
+ id
+ location


#### Message

+ id
+ user_id
+ article_id
+ created_at
+ body


#### User

+ name
+ id
+ lat
+ lon




