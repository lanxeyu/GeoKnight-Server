## GeoKnight Backend Repo

A link to the backend Render site can be found here: https://geoknightbackend.onrender.com

The purpose of this backend is to store data used throughout the app. This consists of the `scoreboard.json` and the `questions.json`.

### scoreboard.json:
 - handles the fetching and retrieving of user data, like their score and username.

### questions.json:
 - stores all question data, which consists of the question, answer, and three incorrect answers that are called on when the user is choosing to answer the provided question. 

## Want to try it for yourself?

1. Open your GitBash terminal
2. Create a folder to house the server with ```mkdir *directory-name*```
3. Change into that directory with ```cd *directory-name*```
4. Initialise git ```git init```
5. Clone the repo ```git clone git@github.com:emptybagelman/GeoKnight-Server.git```
6. Then run these commands in order to get the required node packages:
    ```
        npm init
        npm i -D nodemon
        npm i cors
        npm i express
    ```

7. You should be good to go!
