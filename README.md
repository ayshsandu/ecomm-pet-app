# Run the app on your own


1. Get the backend APIs from https://github.com/ayshsandu/code-challenge-2023/tree/restAPI and get it hosted in [Choreo](https://choreo.dev/).

3. Configure [Asgardeo](https://wso2.com/asgardeo/) as the Identity Provider.
2. Add the following environment variable to the `.env` file located in the <root> directory of this project.
    ```
    REACT_APP_SIGN_IN_REDIRECT_URL=http://localhost:3000
    REACT_APP_SIGN_OUT_REDIRECT_URL=http://localhost:3000
    REACT_APP_CLIENT_ID=<CLIEN ID of the Application>
    REACT_APP_BASE_URL=https://api.asgardeo.io/t/<ASGARDEO ORG NAME>
    REACT_APP_SCOPE=openid email profile urn:ayeshaecomm:ecommercerestapi:update-items urn:ayeshaecomm:ecommercerestapi:add-items
    REACT_APP_ADD_ITEMS_SCOPE=urn:ayeshaecomm:ecommercerestapi:add-items
    REACT_APP_RESOURCE_SERVER_URL=<BASE URL of the Backend APIS>
    REACT_APP_APPLICATION_NAME=<Name of the application registered in Asgardeo>
    ```

3. Start the app by `npm start` 