
# 🏠 Home Rental Application

A modern, full-featured mobile application connecting tenants with landlords. Built with **React Native (Expo)** and powered by **Supabase**.

## 🚀 Technologies Used

This project leverages a robust stack of modern technologies to ensure performance, scalability, and developer experience.

### Core Frameworks
*   **[React Native](https://reactnative.dev/)**: Cross-platform mobile application development.
*   **[Expo](https://expo.dev/)** (SDK 50+): The managed workflow for React Native, simplifying build and deployment.
*   **JavaScript (ES6+)**: The primary programming language.

### Backend & Services
*   **[Supabase](https://supabase.com/)**: An open-source Firebase alternative.
    *   **PostgreSQL**: Relational database for structured data (Properties, Users, Bookings).
    *   **Authentication**: Secure user management (Email/Password).
    *   **Row Level Security (RLS)**: Fine-grained data access control policies.

### Navigation
*   **[React Navigation](https://reactnavigation.org/)**:
    *   **Native Stack**: For standard screen transitions.
    *   **Bottom Tabs**: For main application navigation (Tenant & Landlord layouts).

### UI & Styling
*   **Custom UI Kit**: A centralized design system (`src/uikit`) managing colors, typography, spacing, and shadows for a consistent "Premium" look.
*   **Vector Icons**: `@expo/vector-icons` for scalable iconography.
*   **Safe Area Context**: Handling safe areas on notched devices.

### State Management
*   **React Context API**: implementation of `AuthContext` for global session management.

### Map & Location
*   **[React Native Maps](https://github.com/react-native-maps/react-native-maps)**: Interactive maps for displaying property locations.
*   **[Expo Location](https://docs.expo.dev/versions/latest/sdk/location/)**: Geolocation services to capture property coordinates (Latitude/Longitude).

---

## ✨ Features

### 👤 Tenant Role
*   **Browse Properties**: View available listings with images and prices.
*   **Search & Filter**: Find homes by location or keyword.
*   **Map View**: Interactive map showing nearby properties with price markers.
*   **Booking System**: Request to book properties.
*   **Management**: Track status of bookings (Pending, Approved, Rejected).

### 🏠 Landlord Role
*   **Dashboard**: Overview of rental metrics.
*   **Property Management**: List new properties with details and amenities.
*   **Booking Control**: Approve or reject tenant booking requests.
*   **Verification**: Identity verification flow for trust.

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/your-username/home-rent-app.git
cd home-rent-app
```

### 2. Install Dependencies
```bash
npm install
# or
npx expo install
```

### 3. Configure Supabase
1.  Create a project at [Supabase.com](https://supabase.com).
2.  Run the SQL script located in `db_schema.sql` in your Supabase SQL Editor.
3.  Update credentials in `src/services/supabase.js`:
    ```javascript
    const SUPABASE_URL = 'YOUR_SUPABASE_URL';
    const SUPABASE_ANON_KEY = 'YOUR_SUPABASE_ANON_KEY';
    ```

### 4. Run the Project
```bash
npx expo start
```
*   Scan the QR code with **Expo Go** (Android/iOS).
*   Press `a` for Android Emulator.
*   Press `i` for iOS Simulator.

---

## 📂 Project Structure

```
src/
├── components/      # Reusable UI components (Buttons, Cards, Inputs)
├── context/         # Global state (AuthContext)
├── navigation/      # Stack and Tab navigators
├── screens/         # Application screens
│   ├── Auth/        # Login, Signup, Onboarding
│   ├── Tenant/      # Tenant-specific screens
│   └── Landlord/    # Landlord-specific screens
├── services/        # External services (Supabase client)
├── uikit/           # Design system tokens (theme.js)
```
