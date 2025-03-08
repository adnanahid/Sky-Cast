# 🌦 Sky Cast

#### A simple weather application built with Next.js and TypeScript that fetches weather data using the OpenWeatherMap API.

## 🚀 Features
- Search weather by city name 🌍
- Display current temperature 🌡
- Show weather conditions ☁️
- Responsive UI 📱

## 🛠️ Tech Stack
- **Frontend:** React (Next.js), TypeScript, TailwindCSS
- **API:** OpenWeatherMap API

## 📜 Getting Started
Follow the steps below to set up and run the project locally.

### 1️⃣ Clone the Repository

    git clone https://github.com/adnanahid/Sky-Cast.git
    cd Sky_Cast

### 2️⃣Install Dependencies

    npm install
    # or
    yarn install

### 3️⃣Set Up Environment Variables

    NEXT_PUBLIC_WEATHER_API_KEY=your_openweathermap_api_key

### 4️⃣ Run the Development Server

    npm run dev
    # or
    yarn dev

##  API Integration
This project uses the OpenWeatherMap API to fetch real-time weather data.

##  API Endpoint Used

    https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric
    https://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}&units=metric

- Replace {city} with the user's search query.
- Replace {latitude} from users geoLocation.
- Replace {longitude} from users geoLocation.
- Replace {API_KEY} with your OpenWeatherMap API key.

## Design Choice
 The decision to use OpenWeatherMap was based on its reliability and ease of integration with real-time weather data. The API provides accurate and up-to-date information that is critical for any weather application. Additionally, the option to get data in Celsius makes it more suitable for global users, as it’s widely used in most parts of the world.

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

## 📌 License
This project is open-source and available under the MIT License.
