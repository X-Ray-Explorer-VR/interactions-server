# 🚨 Interactions server - X-Ray Explorer VR

<p align="right">
  Developed by: <a href="https://github.com/AlexAzumi">Alejandro Suárez 🪐</a>
</p>

Interactions server is a web sockets server that allows to connect and make interactions between the X-Ray Explorer VR application with its spectator web page

## Running using Docker

Execute the next command in a terminal

```console
docker run -p 8080:8080 ghcr.io/x-ray-explorer-vr/interactions-server:latest
```

## Running barebones

### 1. Prerequisites

* Node.js v22.12.0 or newer

### 2. Steps

1. Clone the repository

    ```console
    git clone https://github.com/X-Ray-Explorer-VR/interactions-server.git
    ```

2. Install the required dependecies

    ```console
    npm install
    ```

3. Run the server

    ```console
    npm run
    ```
