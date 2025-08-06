# Data Visualization Dashboard

A stunning, modern data visualization dashboard built with React, D3.js, and FastAPI featuring a beautiful dark theme with 3D animations and interactive charts.

![Dashboard Preview](https://img.shields.io/badge/Status-Active-brightgreen)
![React](https://img.shields.io/badge/React-18.x-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)
![D3.js](https://img.shields.io/badge/D3.js-7.x-orange)

## Features

### **Visual Excellence**
- **Dark Theme** - Elegant dark mode with glassmorphism effects
- **3D Animations** - Smooth hover effects and transforms
- **Holographic Borders** - Animated gradient borders
- **Particle Effects** - Floating background particles
- **Responsive Design** - Works perfectly on all devices

### **Interactive Analytics**
- **Dynamic Charts** - Beautiful D3.js visualizations with tooltips
- **Real-time Filtering** - 8 different filter categories
- **Key Insights** - Live analytics with visual metrics
- **Data Export** - Download filtered data as JSON
- **Print Support** - Clean print-ready layouts

### **Technical Features**
- **Fast Performance** - Optimized React components
- **Error Handling** - Graceful error states with retry options
- **Loading States** - Smooth loading animations
- **Accessibility** - WCAG compliant with keyboard navigation
- **Modern Architecture** - Clean, maintainable codebase

##  Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **D3.js 7** - Advanced data visualizations
- **Bootstrap 5** - Responsive grid system
- **CSS3** - Custom animations and glassmorphism

### Backend
- **FastAPI** - High-performance Python API
- **Pydantic** - Data validation and serialization
- **Uvicorn** - ASGI server for production

### Styling
- **Custom CSS** - Hand-crafted animations
- **Google Fonts** - Inter & JetBrains Mono
- **CSS Variables** - Consistent theming

## Screenshots

### Main Dashboard
![Main Dashboard](./docs/dashboard-main.png)

### Interactive Charts
![Interactive Charts](./docs/dashboard-chart.png)

### Mobile View
![Mobile Responsive](./docs/dashboard-mobile.png)

## Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nirajkumaryadav/data-viz-dashboard.git
   cd data-viz-dashboard
   ```

2. **Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload --port 8000
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

4. **Access the Dashboard**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Project Structure

```
data-viz-dashboard/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application
│   │   ├── schemas.py           # Pydantic models
│   │   └── data/
│   │       └── jsondata.json    # Sample dataset
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js    # Main dashboard component
│   │   │   ├── Chart.js        # D3.js chart component
│   │   │   └── DataTable.js    # Data table component
│   │   ├── services/
│   │   │   └── api.js          # API service layer
│   │   ├── dashboard.css       # Main styles
│   │   ├── utilities.css       # Utility classes
│   │   └── App.js              # Root component
│   └── package.json            # Node.js dependencies
└── README.md                   # Project documentation
```

## Key Components

### Dashboard Component
- **State Management** - React hooks for data and filters
- **3D Mouse Tracking** - Interactive card animations
- **Filter System** - 8 dynamic filter categories
- **Insights Calculation** - Real-time analytics

### Chart Component
- **D3.js Integration** - Advanced bar charts
- **Interactive Tooltips** - Detailed hover information
- **Gradient Effects** - Beautiful visual styling
- **Responsive Layout** - Adapts to screen size

### DataTable Component
- **Sortable Columns** - Click to sort functionality
- **Striped Rows** - Enhanced readability
- **Hover Effects** - Interactive row highlights
- **Mobile Responsive** - Horizontal scrolling on mobile

## Styling Features

### Animations
- **Particle Float** - Subtle background movement
- **3D Transforms** - Card hover effects
- **Gradient Shifts** - Animated color transitions
- **Loading Spinners** - Smooth rotation effects

