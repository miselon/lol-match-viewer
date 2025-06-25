# League of Legends Match Viewer

A simple web application for retrieving a summoner’s historic matches and their statistics.  
This project was created to explore Riot’s API and understand how to access and work with in-game data.

## 🌐 Application Overview

This project is divided into two main components:


### 🖥️ Server Component

- **Tech Stack**: TypeScript, Node.js, Express
- **Architecture**: Domain-Driven Design (DDD)
- **Purpose**: Exposes a RESTful API to communicate with Riot’s official API and serve match data to the client.


### 💻 Client Component

- **Framework**: Angular
- **Design**: Minimalistic UI based on Google’s Material Design
- **Functionality**: Displays match history and statistics for a given summoner in a clean, user-friendly interface.


## 📦 Features

- Fetch match history by summoner name and tagline
- Display key statistics per match
- Simple and clean UI
- Clear separation of backend and frontend logic


## 🚀 Getting Started

1. Add your Riot API Development key to `server/.env` in `RIOT_API_KEY` variable
2. Run `npm run dev` in this directory
    - backend runs on port `3000`
    - web client runs on port `4200`