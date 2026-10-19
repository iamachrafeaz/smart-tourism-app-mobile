# 📍 Smart Tourism App — Mobile

[![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-v54-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![NativeWind](https://img.shields.io/badge/Styling-NativeWind%20v4-38BDF8?logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An intuitive, cross-platform mobile application designed to enhance the travel experience across Morocco. The platform connects travelers with verified local guides, provides a community discovery hub, and integrates an intelligent AI tourist companion.

---

## 🌟 Key Features

### 🧳 For Tourists
* **Discovery & Exploration**: Browse curated Moroccan tourist destinations, activities, and local experiences.
* **Certified Guide Booking**: View verified local guides, access transparent ratings and reviews, and book personalized tours.
* **Community Travel Hub**: Interactive Q&A space to share tips, ask travel recommendations, and connect with other travelers.
* **Atlas AI Assistant**: Dedicated chat interface backed by a Retrieval-Augmented Generation (RAG) agent for on-demand historical insights and trip advice.
* **Monument & QR Scanner**: Camera integration for point-of-interest discovery.

### 🧭 For Local Guides
* **Streamlined Onboarding**: Role-based signup with profile customization.
* **Accreditation & Document Verification**: Secure document upload system for professional license validation.
* **Application Tracking**: Real-time status tracker for profile approval.

### 🔒 Security & Architecture
* **Expo Router v6**: Clean, file-based routing architecture with route groups (`(touristScreens)`, `(guideScreens)`, `(auth)`, `(modals)`).
* **JWT & Secure Storage**: Token persistence using `expo-secure-store` and automated request interceptors via `Axios`.

---

## 🛠️ Tech Stack

* **Core**: [React Native 0.81](https://reactnative.dev/), [Expo 54](https://expo.dev/), [TypeScript](https://www.typescriptlang.org/)
* **Routing**: [Expo Router v6](https://docs.expo.dev/router/introduction/)
* **Styling**: [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS)
* **Networking**: Axios with request/response interceptors
* **Hardware & Device APIs**: `expo-camera`, `expo-location`, `expo-document-picker`, `expo-image-picker`
* **UI Components & Icons**: `lucide-react-native`, `expo-linear-gradient`

---

## 🏗️ Ecosystem Architecture

This mobile application is part of the **Smart Tourism Ecosystem**:
* ⚙️ **Backend API**: [smart-tourism-app-backend](https://github.com/iamachrafeaz/smart-tourism-app-backend) — Express, TypeScript, MongoDB & JWT authentication.
* 🤖 **AI Microservice**: [smart-tourism-app-chatbot](https://github.com/iamachrafeaz/smart-tourism-app-chatbot) — FastAPI, LangChain, ChromaDB & Groq LLM (RAG pipeline).

---

## 🚀 Getting Started

### Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher)
* [Expo Go](https://expo.dev/go) app installed on your physical mobile device, or an iOS Simulator / Android Emulator.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/iamachrafeaz/smart-tourism-app-mobile.git
   cd smart-tourism-app-mobile
