# Task #0.4

1. User types text
2. User clicks the submit button
3. Browser sends user input to the server
4. Server responds with 302 (Redirect)
5. Browser goes to provided link and reloads the UI
6. Browser requests files from the server (css, js, json)
7. Server sends the requested files to the browser
8. Browser renders the new UI to the user

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    U->>B: Types note text
    U->>B: Clicks 'submit' button
    activate B
    B->>S: Sends input form
    activate S
    S-->>B: Responds with 302 (Redirect)
    deactivate S
    B->>B: Goes to the redirect location
    B->>S: Requests files from the server (css, js, json)
    activate S
    S-->B: Sends requested files
    deactivate S
    B-->>U: Rendes new page UI
    deactivate B
```


# Task #0.5

1. User clicks the link
2. Bowser forwards to the link
3. Browser requests html content from the server
4. Server sends the html to the browser with status code 200 (Success)
5. Browser starts rendering the html
6. Browser requests main.css from the server
7. Server sends the css to the browser with status code 200 (Success)
8. Browser requests spa.js file from the server
9. Server sends the js to the browser with status code 200 (Success)
10. Browser executes the js
11. Browser requests data.json from the server
12. Server sends the json to the browser with status code 200 (Success)
13. Browser finished rendering the UI
14. Browser displays the UI to the user.

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    U->>B: Clicks the link
    activate B
    B->>B: Forwards to the link
    B->>S: Requests html content
    activate S
    S->>B: Sends the html with status code 200 (Success)
    deactivate S
    B-->>B: Starts rendering the html
    B->>S: Requests main.css
    activate S
    S-->>B: Sends the css with status code 200 (Success)
    deactivate S
    B->>S: Requests spa.js
    activate S
    S-->>B: Sends the js with status code 200 (Success)
    deactivate S
    B->>B: Executes the js
    B->>S: Requests data.json
    activate S
    S-->>B: Sends the json with status code 200 (Success)
    deactivate S
    B->>B: Finishes rendering the UI
    B-->>U: Displays the UI
    deactivate B
```


# Task #0.6

1. User types input
2. User presses submit button
3. Browser adds input to the local version of the data list
4. Browser redraws the list
5. Browser sends the new note to the server
6. Server responds with 201 (Created)

```mermaid
sequenceDiagram
    participant U as User
    participant B as Browser
    participant S as Server
    U->>B: Types note text
    U->>B: Clicks 'submit' button
    activate B
    B->>B: Adds input data to the local version of the data list
    B->>B: Redraws the UI (to displat the updated data)
    B-->>U: Renders the UI for the user
    B->>S: Sendes a POST request with the new note to be saved
    activate S
    S-->>B: Responds with status code 201 (Created)
    deactivate S
    deactivate B
```
