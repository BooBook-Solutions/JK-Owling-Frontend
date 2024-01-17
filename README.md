# JK-Owling-Frontend
Service and Design Engineering 2023 Course Project

## Project Overview

This repository hosts the frontend application for the project. The foundation of the project relies on the `React` JavaScript framework, and it seamlessly interacts with all APIs exposed by the backend application.

## Installation of Requirements

To install all the necessary libraries for the proper execution of the code, navigate to the root folder and run:

```
npm install -y
```

## Running the Project

To initiate the project, once again in the root folder, execute:

```
npm start
```

After a brief moment, the browser page should open with the application running on port `3000`.

## Environment Setup

To ensure the proper functioning of the application, specific environment variables must be provided. These variables are outlined in the table below and should be placed in your .env file:

| Name                       | Description                                                               |
|----------------------------|---------------------------------------------------------------------------|
| REACT_APP_GOOGLE_CLIENT_ID | Google client ID used for Google authentication                           |
| REACT_APP_BACKEND_URL      | Base backend URL for calling all API endpoints                            |
