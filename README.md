# Home Library Service

## Downloading

```
git clone {repository URL}
```

## Running application with containerization

```
docker compose up
```

## Creating app and database image

```
docker build -t kchrgn/home-library-service:app .
docker build -t kchrgn/home-library-service:database ./database
```

## Scanning image

npm run scan

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
