# Getting Started with Rick & Morty React App

## Available Scripts

In the project directory, you can run:

```bash
yarn start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits
You will also see any lint errors in the console.

---

```bash
yarn test
```

Launches the test runner in the interactive watch mode.

---

```bash
yarn build
```

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

### Run the app in Docker

1. Build and run the image

```bash
docker-compose -f docker-compose.dev.yml up
```

visit [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Deploy production build using Docker

1. Build the image

```bash
docker-compose -f docker-compose.prod.yml build
```

2. Run the container

```bash
docker run -p 80:80 --name rick-and-morty-prod -d rick-and-morty-prod
```

visit [http://localhost](http://localhost) to view it in the browser.
