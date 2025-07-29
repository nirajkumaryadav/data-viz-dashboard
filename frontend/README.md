# Frontend Data Visualization Dashboard

This project is a data visualization dashboard built using React.js for the frontend and FastAPI for the backend. The dashboard visualizes data from a JSON file and provides interactive charts and data tables.

## Project Structure

- **public/index.html**: The main HTML file that serves as the entry point for the React application.
- **src/App.js**: The main component that sets up routing and layout for the application.
- **src/index.js**: The entry point for the React application, rendering the App component.
- **src/components/Dashboard.js**: The component that displays the main dashboard layout, including charts and data tables.
- **src/components/Chart.js**: The component that renders interactive charts using D3.js or another visualization library.
- **src/components/DataTable.js**: The component that displays data in a tabular format with sorting and filtering capabilities.
- **src/services/api.js**: Contains functions for making API calls to the backend, handling data fetching and error management.

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd data-viz-dashboard/frontend
   ```

2. **Install Dependencies**
   Make sure you have Node.js installed. Then run:
   ```bash
   npm install
   ```

3. **Run the Application**
   Start the development server:
   ```bash
   npm start
   ```

4. **Access the Dashboard**
   Open your browser and navigate to `http://localhost:3000` to view the dashboard.

## Usage

- The dashboard fetches data from the backend API and displays it in various formats, including charts and tables.
- Users can interact with the charts to explore the data visually and use the data table for detailed insights.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.