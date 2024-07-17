You must create an app from developer.spotify.com and set the redirect URI to http://localhost:3000
1. Go into client folder >> src >> component >> Login.jsx and assign the client_ID variable with your client ID from your app
2. Go into .env file in the server folder and enter your CLIENT_ID and CLIENT_SECRET values from your spotify app basic information settings

3. In terminal, cd into client folder and run the following:
    npm i axios,
    npm i react-spotify-web-playback,
    npm i spotify-web-api-node,

4. Then cd into server folder and run the following:
    npm i express,
    npm i nodemon --save-dev,
    npm i axios,
    npm i spotify-web-api-node,
    npm i cors,
    npm i body-parser,
    npm i dotenv,

5. To run app, open terminal and cd into client folder and run the following:
    npm run dev

6. Then open up another terminal window and cd into server folder and run the following:
    npm run devStart



