# SnapCast

SnapCast is a web application for recording and sharing videos. This repository contains the Next.js application.

## Getting started

### Prerequisites

- Node.js
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build, run:

```bash
npm run build
npm start
```

## Docker

SnapCast uses a multi-stage Docker build and Next.js standalone output to keep the production image smaller.

### Build the image

```bash
docker build -t snapcast:local .
```

### Configure runtime environment

Create a local `.env` file with the real values required by your deployment. Do not commit this file.

```dotenv
DATABASE_URL_POSTGRES=your-postgres-connection-string
NEXT_PUBLIC_BASE_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Run the container, passing the environment file at runtime:

```bash
docker run --rm --name snapcast -p 3000:3000 --env-file .env snapcast:local
```

Open [http://localhost:3000](http://localhost:3000). The container needs network access to the configured PostgreSQL/Neon database and any external services it uses.

## CI/CD

The GitHub Actions workflow in `.github/workflows/ci.yml` runs linting, TypeScript type checking, a production build, and an HTTP smoke test for pull requests targeting `main` and pushes to `main`.

After successful validation on `main`, it builds the Docker image, scans the image for CRITICAL/HIGH OS and library vulnerabilities with Trivy, and pushes the image to Docker Hub only if the scan passes.

Configure these repository Actions secrets before merging the workflow:

- `DOCKERHUB_USERNAME`: your Docker Hub username.
- `DOCKERHUB_TOKEN`: a Docker Hub access token.

Published tags are `latest` and `sha-<commit>`.

## Theme

The interface supports light and dark themes. Use the theme control in the navigation bar to switch modes. The selected theme is saved in the browser's local storage.

## Contributing

1. Create a branch for your change.
2. Make a focused change and verify it locally.
3. Open a pull request describing what changed and how you tested it.

Before submitting a pull request, run the checks available in the project and review the affected screens in the browser.
