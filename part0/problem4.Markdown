sequenceDiagram
    participant browser
    participant server

    server ->>browser:POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate browser
    browser-->>server: 302 found, note:casa
    deactivate browser

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: 304 Not modified , HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: 304 Not modified , the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: 304 Not Modified , the JavaScript file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser:  [ {"content": "evilaje en discord","date": "2024-01-23T18:12:04.817Z"},...]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
