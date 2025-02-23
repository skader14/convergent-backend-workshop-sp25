Once you've cloned this app, be sure to:
cd my-app

The main files here is api.ts, App.tsx, and index.tsx. All the code is happening in App.tsx.
api.ts is the set up for Axios. Finally, index.tsx displays the front end code from App.tsx

In my-app/src/api/api.ts, be sure to change the base URL to the Dev URL from repl.it .
This can be found by running the main.py file, going to the Webview tab, and clicking on the {...}.replit.dev button.
Copy this link and adjust api.ts.
Once this change has been made, be sure that you're in the my-app directory. Run the following:
npm start

Once you've got a good idea of what's going on in the code (ask for help!),
add a new endpoint or two in flask! Once you've got that going, add the functionality
for it with axios here on the front end! Follow the examples here.