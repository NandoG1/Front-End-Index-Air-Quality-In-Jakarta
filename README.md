# Jakarta Weather AI

## Overview

Jakarta Weather AI is a web application that uses advanced machine learning models to predict weather conditions and classify air quality in Jakarta, Indonesia. The application offers two prediction modes:

1. **Date-based Weather Prediction** - Predicts weather conditions based on historical data for a specific date
2. **Parameter-based Air Quality Classification** - Classifies air quality based on user-provided environmental parameters (PM10, CO, SO2, NO2, O3)

## Features

- 💡 **Intelligent Prediction** - Uses advanced machine learning models (Random Forest, LightGBM)
- 📊 **Interactive UI** - Modern, responsive interface with real-time parameter adjustments
- 📱 **Mobile Friendly** - Fully responsive design works on all devices
- 🔍 **Detailed Results** - Provides comprehensive classification results with recommendations
- 📈 **High Accuracy** - Utilizes models with up to 99.8% accuracy

## Live Demo

[Visit the live application](https://front-end-index-air-quality-in-jakarta.vercel.app/)

## Technologies Used

- **Frontend**:

  - Next.js 15
  - React 19
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Radix UI Components
  - Recharts

- **Backend**:

  - Flask (Python web framework)
  - Flask-CORS (Cross-Origin Resource Sharing)
  - RESTful API architecture
  - Pandas for data manipulation
  - NumPy for numerical operations
  - scikit-learn for machine learning model deployment
  - Pickle for model serialization/deserialization
  - Deployed on Railway

- **AI/ML**:
  - Random Forest Classifier (99.8% accuracy)
  - LightGBM Classifier (71.2% accuracy)
  - scikit-learn for model training and evaluation
  - StandardScaler for feature normalization

## Github Repositories

- https://github.com/NandoG1/Model-Air-Quality-Index-in-Jakarta -> Model
- https://github.com/NandoG1/back-end-air-quality-index-in-jakarta -> Back-End

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm package manager

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/NandoG1/Front-End-Index-Air-Quality-In-Jakarta
   cd jakarta-weather-ai
   ```

2. Install dependencies

   ```bash
   npm install
   # or
   pnpm install
   ```

3. Start the development server

   ```bash
   npm run dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Date-based Weather Prediction

1. Navigate to the "Predict" page
2. Select the "Weather Prediction by Date" tab
3. Choose a date using the calendar picker
4. Click "Get Prediction"
5. View the predicted weather conditions and recommendations

### Parameter-based Air Quality Classification

1. Navigate to the "Predict" page
2. Select the "Air Quality Classification" tab
3. Adjust the environmental parameters using the sliders:
   - PM10 (Particulate Matter)
   - CO (Carbon Monoxide)
   - SO2 (Sulfur Dioxide)
   - NO2 (Nitrogen Dioxide)
   - O3 (Ozone)
4. Click "Get Prediction"
5. View the classification results and health recommendations

## Air Quality Classifications

The application provides the following air quality classifications:

- **BAIK** - Air quality is satisfactory; pollution poses little or no risk
- **SEDANG** - Air quality is acceptable but may cause concern for sensitive individuals
- **TIDAK SEHAT** - Health effects may be experienced by all individuals
- **SANGAT TIDAK SEHAT** - Health warnings of emergency conditions; entire population affected

## AI Models

### Random Forest Classifier

- Ensemble learning method using multiple decision trees
- 99.8% accuracy
- Features:
  - Bagging-based ensemble method
  - Reduces overfitting
  - Handles high-dimensional data
  - Works well with both categorical and numerical features

### LightGBM Classifier

- Highly efficient gradient boosting framework
- 71.2% accuracy
- Features:
  - Histogram-based decision tree learning
  - Faster training speed and lower memory usage
  - Efficient with large datasets
  - Supports categorical features natively

## Team

- Fernando Gunawan - Computer Science Student specializing in Intelligent Systems and Machine Learning

## Acknowledgments

- Weather data provided by [https://www.kaggle.com/datasets/senadu34/air-quality-index-in-jakarta-2010-2021?]
- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
