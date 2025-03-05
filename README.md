# ✈️ TICKETA - Flight Reservation

TICKETA is a mobile application for **flight reservations** built with **React Native, Expo, and Firebase**. The app allows users to search for flights, view booking history, search for airlines and airports, and access relevant information.  

---

## 🚀 Features  

- **Flight Search** – Find available flights based on user input.  
- **View Booking History** – Users can check their past bookings.  
- **Airlines Search** – View detailed airline information.  
- **Airports Search** – Search for airports and view their details.  

---

## 🌐 APIs Used  

The app integrates several APIs to fetch real-time data:  

| API | Purpose | Documentation Link |
|------|---------|------------------|
| [Flagpedia](https://flagpedia.net/) | Retrieve country flags | [Flagpedia API](https://flagpedia.net/api) |
| [Airhex](https://content.airhex.com/) | Get airline logos and airliner images | [Airhex API](https://www.airhex.com/airline-logos/) |
| [Airport Data](https://www.airport-data.com/) | Fetch airport details | [Airport Data API](https://www.airport-data.com/api/) |
| [OpenWeatherMap](http://api.openweathermap.org/) | Get the user's current location to find the nearest airport | [OpenWeatherMap API](https://openweathermap.org/api) |
| [Unsplash](https://api.unsplash.com/) | Fetch high-quality images (used for airport images) | [Unsplash API](https://unsplash.com/documentation) |

---

## 🛠 Installation & Setup  

### Prerequisites  
Before you begin, ensure you have the following installed:  
- **Node.js** (LTS version recommended)  
- **Expo CLI** (`npm install -g expo-cli`)  
- **Firebase Account** (for authentication & data storage)  

### Steps  

1. **Clone the Repository**  
  ```sh
  git clone https://github.com/nnewtrp/FlightReservation.git
  cd FlightReservation
  ```

2. **Install Dependencies**
```sh
npm install
```

3. **Set Up Firebase**
- Create a Firebase project.
- Enable authentication and Firestore.
- Copy your Firebase config and add it to the project.

4. **Start the Expo Development Server**
```sh
expo start
```
- Scan the QR code with your Expo Go app (on iOS/Android) or run it in an emulator.

---

## 📜 Learn More  

For additional details about the technologies used in this project, check out the official documentation:  

- [React Native Docs](https://reactnative.dev/docs/getting-started)  
- [Expo Documentation](https://docs.expo.dev/)  
- [Firebase Documentation](https://firebase.google.com/docs)  
- [React Navigation (for handling navigation)](https://reactnavigation.org/docs/getting-started)  

---

## 📬 More Information  

This project was developed as the **final project** for **ITS432 - Mobile Application Programming** at **Sirindhorn International Institute of Technology, Thammasat University**.

📧 Contact: teerapat.sat24@gmail.com

🔗 GitHub: [nnewtrp](https://github.com/nnewtrp)
