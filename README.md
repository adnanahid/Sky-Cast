# 🌦 Sky Cast

#### A simple weather application built with Next.js and TypeScript that fetches weather data using the OpenWeatherMap API.

## Live Link:
https://sky-cast-peach.vercel.app/

## Features

- **Show weather for the user's current location by default:** Upon loading the app, the weather for the user's current location is displayed automatically.
- **Search weather by city name:** Allows users to search for weather in any city by typing the name in the search bar.
- **Display current temperature:** Shows the current temperature in Celsius for the selected city or user's location.
- **Show weather conditions:** Displays detailed weather conditions like clouds, wind, humidity, etc.
- **Responsive UI:** The application is designed to work seamlessly across both desktop and mobile devices using TailwindCSS.

## Tech Stack

- **Frontend:** React (Next.js), TypeScript, TailwindCSS
- **API:** OpenWeatherMap API

## Dependencies

    "dependencies": {
        "axios": "^1.8.2",
        "date-fns": "^4.1.0",
        "next": "^15.2.1",
        "react": "^19.0.0",
        "react-dom": "^19.0.0",
        "react-icons": "^5.5.0"
    },

## Getting Started

Follow the steps below to set up and run the project locally.

### 1️⃣ Clone the Repository

    git clone https://github.com/adnanahid/Sky-Cast.git
    cd Sky-Cast

### 2️⃣Install Dependencies
    npm install
    # or
    yarn install

### 3️⃣Set Up Environment Variables
create .env.local file then past following Environment Variables and replace with your api from openweathermap

    NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

### 4️⃣ Run the Development Server

    npm run dev
    # or
    yarn dev

## API Integration

This project uses the OpenWeatherMap API to fetch real-time weather data.

## API Endpoint Used

    https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
    https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric

- Replace {city} with the user's search query.
- Replace {latitude} from users geoLocation.
- Replace {longitude} from users geoLocation.
- Replace {API_KEY} with your OpenWeatherMap API key.

## Design Choice

I love creating simple and clean applications, so I focus on keeping the UI minimal and clutter-free. This is primarily a one-page app, where the home page layout is designed for easy access to essential information.

At the top, I placed the app logo on the left and the current time on the right. Below that, the weather component takes center stage, featuring a search bar at the top for quick location-based queries.

To provide users with insightful weather details, I designed three informative cards:

- Current Weather Update – Displays real-time weather conditions.
- Next 3-Hour Forecast – Positioned to the right, offering a short-term weather outlook.
- Extended Forecast – Located at the bottom, providing additional weather insights.

For real-time and accurate weather data, I chose OpenWeatherMap due to its reliability and ease of integration. The API delivers up-to-date information, which is crucial for any weather application. Additionally, its support for Celsius makes it user-friendly for a global audience, as Celsius is widely used in most parts of the world.

## Troubleshooting

### TailwindCSS Not Working?

Make sure:

- globals.css is imported in layout.tsx or \_app.tsx.
- Tailwind content paths are correctly set in tailwind.config.ts.
- Restart the Next.js server after changes.

### API Not Working?

- Check if your API key is correctly set in .env.local.
- Restart the development server.
- Ensure the OpenWeatherMap API key is valid and activated.

## License

This project is open-source and available under the MIT License.
