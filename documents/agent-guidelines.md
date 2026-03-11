Agent Guidelines — Game Builds Platform
1. ### Project Overview

This project is a web platform where players can view optimized builds and information for characters from multiple games.

The system follows a microservices architecture, where each game is handled by an independent backend service and there is a dedicated authentication service.

The platform allows users to browse characters, recommended builds, equipment, and other gameplay information.

Builds are embedded inside character data, meaning users cannot create builds. Only administrators manage the information.
----------------------

2. ### Technology Stack
Frontend

React

TailwindCSS

React Router

Axios (API requests)

Backend

Node.js

Express

MongoDB

Mongoose

JWT Authentication

bcrypt (password hashing)

Deployment

Render (backend services + frontend)

MongoDB Atlas (database)
------------------------------------

3. ### System Architecture

The platform follows a microservices architecture.

Each service has its own database and models.

Services:

auth-service
honkai-service
genshin-service
umamusume-service
frontend

Each service is responsible for its own domain logic and data.
-------------------------

4. ## Folder Structure

Each backend service must follow this structure:

service
│
├── config
│   └── db.js
│
├── models
│
├── controllers
│
├── routes
│
├── middleware
│
└── server.js
Rules

models → MongoDB schemas

controllers → business logic

routes → API endpoints

middleware → authentication and role validation
----------------------------------------

5. ## Coding Conventions
File Naming

Use camelCase for files.

Examples:

userController.js
characterRoutes.js
authMiddleware.js
API Naming

All endpoints must follow this structure:

/api/resource

Example:

/api/characters
/api/weapons
/api/cards
HTTP Methods

Use standard REST methods.

Method	Purpose
GET	Retrieve data
POST	Create resource
PUT	Update resource
DELETE	Remove resource
------------------------------

6. ## User Roles

The platform has two roles.

User

Permissions:

view characters

view builds

view equipment

view game data

Restrictions:

cannot modify data

Admin

Permissions:

create characters

edit characters

delete characters

manage equipment

manage artifacts

manage cards and skills
--------------------------

7. ## Authentication System

Authentication is handled by the Auth Service.

Users authenticate using JWT tokens.

Authentication Flow

User registers

User logs in

Server generates JWT token

Token is stored on frontend

Token is sent in authenticated requests

Authorization header format:

Authorization: Bearer TOKEN
------------------------------------------

8. ## Auth Service Models
User Model

Fields:

username
email
password
role

Roles:

user
admin

Passwords must be hashed using bcrypt before storing.
-------------------------------------------

9. ## Game Data Model Philosophy

Each game service contains its own models and database.

Character documents include recommended builds and relationships with equipment.

Examples:

artifact sets

recommended weapons

teammates

skill trees

stats

progression systems

These relationships are implemented using MongoDB ObjectId references.
-------------------------------------------------

10. ## Honkai Star Rail Service
**Models**
Character
Lightcone
Artifact

**Character Fields**
name
element
path
principalRole
rarity
imageFull
iconImage
artifactSets
recommendedLightcones
teammates
stats
relicAttributes
statsSearched
recommendedEidolons
traces

The build recommendation is defined through:

artifactSets

recommendedLightcones

relicAttributes

statsSearched

**Lightcone Fields**
name
description
path
rarity
imageFull
iconImage
recommendedCharacters
stats
superpositionEffects

**Artifact Fields**
name
description1
description2
imageFull
recommendedCharacters
----------------------------------

11. ## Genshin Impact Service
**Models**
Character
Weapon
Artifact

**Character Fields**
name
element
weapon
principalRole
rarity
imageFull
iconImage
artifactSets
recommendedWeapons
teammates
stats
relicAttributes
statsSearched
recommendedConstellations
talents

The build recommendation uses:

recommendedWeapons

artifactSets

relicAttributes

statsSearched

**Weapon Fields**
name
weaponType
description
rarity
imageFull
iconImage
recommendedCharacters
stats
refinement

**Artifact Fields**
name
description1
description2
imageFull
recommendedCharacters
--------------------------------

12. ## Umamusume Service
**Models**
Character
Card
Skill

**Character Fields**
name
rarity
imageFull
iconImage
tracks
distances
styles
cardSet
legacyParents
legacySparks
stats
grownStatRate
skills
secretEvent
statsSearched

Character builds are represented using:

cardSet

legacyParents

legacySparks

stats

skills

**Card Fields**
name
uniquePerk
character
rarity
imageFull
iconImage
type
styles
skills
effects

**Skill Fields**
name
iconImage
type
cost
-----------------------------------

13. ## API Endpoint Design

Endpoints must follow REST conventions.

Character Endpoints
GET /api/characters
GET /api/characters/:id
Filtering Rules

Filters must use query parameters.

Examples:

GET /api/characters?rarity=5
GET /api/characters?element=Pyro
GET /api/characters?weapon=Lanza
GET /api/cards?rarity=SSR

Multiple filters are allowed.

Example:

GET /api/characters?rarity=5&element=Electro
Admin Endpoints

Admins manage data using:

POST /api/characters
PUT /api/characters/:id
DELETE /api/characters/:id

Similar endpoints exist for:

weapons
artifacts
lightcones
cards
skills
---------------------------------------

14. ## API Response Format

All endpoints must return JSON.

Success Response
{
  "success": true,
  "data": {}
}
Error Response
{
  "success": false,
  "message": "Error description"
}
-----------------------------------------

15. ## Security Rules

All services must:

hash passwords using bcrypt

validate JWT tokens

restrict admin endpoints

validate input data

prevent unauthorized modifications

Admin routes must use role middleware.
---------------------------------------

16. ## Frontend Pages

The React frontend must include:

Home
Games
Characters
Character Details
Login
Register
Admin Panel

Frontend must:

hide admin features for normal users

send JWT tokens in protected requests

handle authentication state
-----------------------------------------

17. ## Deployment

Deployment platform:

Render

Services:

Frontend → Static Site
Auth Service → Web Service
Honkai Service → Web Service
Genshin Service → Web Service
Umamusume Service → Web Service

Database:

MongoDB Atlas
-------------------------------------------

18. ## Agent Behavior

When generating code, the agent must:

follow the defined folder structure

implement RESTful APIs

use JWT authentication

enforce role-based permissions

maintain clear controller logic

keep code modular and reusable

respect the defined data models