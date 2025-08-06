# Data Visualization Dashboard

This project is a data visualization dashboard built using FastAPI for the backend and React.js for the frontend. It provides interactive charts and data tables to visualize and analyze data from a JSON file.

## Project Structure

```
data-viz-dashboard
├── backend
│   ├── app
│   │   ├── main.py          # Entry point for the FastAPI application
│   │   ├── models.py        # Data models and ORM mappings
│   │   ├── routes.py        # API route definitions
│   │   ├── schemas.py       # Pydantic schemas for data validation
│   │   └── utils.py         # Utility functions for data processing
│   ├── jsondata.json        # JSON data for visualizations
│   ├── requirements.txt      # Python dependencies for the backend
│   └── README.md            # Documentation for the backend
├── frontend
│   ├── public
│   │   └── index.html       # Main HTML file for the React application
│   ├── src
│   │   ├── App.js           # Main component for the React application
│   │   ├── index.js         # Entry point for the React application
│   │   ├── components
│   │   │   ├── Dashboard.js  # Dashboard layout component
│   │   │   ├── Chart.js      # Component for rendering interactive charts
│   │   │   └── DataTable.js   # Component for displaying data in a table
│   │   └── services
│   │       └── api.js       # API call functions for the frontend
│   ├── package.json         # Configuration file for npm
│   └── README.md            # Documentation for the frontend
└── README.md                # Overall documentation for the project
```

## Backend Setup

1. Navigate to the `backend` directory.
2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```
3. Run the FastAPI application:
   ```
   uvicorn app.main:app --reload 
   or 
   python -m uvicorn app.main:app --reload
   ```

## Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the required dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

## Usage

- Access the dashboard at `http://localhost:3000` after starting the frontend.
- The backend API can be accessed at `http://localhost:8000` for data fetching.

