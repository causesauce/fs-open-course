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
