# Backend README for Data Visualization Dashboard

## Overview
This project is a data visualization dashboard that utilizes FastAPI for the backend and React.js for the frontend. The dashboard visualizes data from a JSON file and provides interactive charts and tables.

## Setup Instructions

### Prerequisites
- Python 3.7 or higher
- pip (Python package installer)

### Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd data-viz-dashboard/backend
   ```

2. Install the required packages:
   ```
   pip install -r requirements.txt
   ```

### Running the Application
1. Navigate to the `app` directory:
   ```
   cd app
   ```

2. Start the FastAPI application:
   ```
   uvicorn main:app --reload
   ```

3. The application will be running at `http://127.0.0.1:8000`.

### API Endpoints
- **GET /data**: Fetches the data for visualization.
- **GET /data/{id}**: Fetches a specific data entry by ID.

### JSON Data
The JSON data used for the dashboard visualizations is located in `jsondata.json`. Ensure that the data structure adheres to the expected format for the API to function correctly.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.