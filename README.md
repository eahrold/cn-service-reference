# Community Node (CN) Service

This is a reference implementation of the Community Node Service written in NodeJS

## Requirements

- [NodeJS Version 10 LTS](https://nodejs.org/en/)
- [Node Package Manager](https://www.npmjs.com/) (Distributed with NodeJS)

## Setup

Follow these steps to deploy the CN Service on the local machine. 

Note that a Dockerfile is also provided for use in a containerized environment.

### Edit Info

Modify the `/data/info.json` file to use your desired values. 

**Example info.json**
```
{
    "title": "My Community Node",
    "summary": "My Example Community Node",
    "website": "https://example.com"
}
```

### Edit Landing Page

Modify the `/data/index.html` file to display your desired landing page.

### Edit Icon

Modify the `/data/icon.png` file to display your desired avatar icon. 

Note: The icon size should be 120px by 120px. The file should be a PNG.

### Install and Run

Run
```
npm install
npm start
```
The service will be running at port 8080.

