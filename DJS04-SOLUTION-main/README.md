# DJS05 – React Podcast App with Search, Sort, Filter, Pagination and Routing

This project is a **React-based podcast browsing application** that allows users to explore podcasts using powerful features such as search, sort, filter by genre, and automatic pagination. It builds upon earlier solutions (DJS04) and introduces shared state management using the React Context API, along with dynamic routing for individual podcast detail pages.

## Core Functionality

- **Fetch Podcasts from API**

  - Data is loaded from: `https://podcast-api.netlify.app/shows`
  - Podcasts include metadata like title, updated date, genres, image, and seasons
  - Individual podcast details are fetched from: `https://podcast-api.netlify.app/id/<ID>`

- **Search**

  - Users can search podcasts by title
  - Case-insensitive and dynamically updates the result list

- **Sort**

  - Sort options include:
    - Default
    - Newest (by updated date)
    - Oldest
    - Title A → Z
    - Title Z → A

- **Genre Filter**

  - Podcasts can be filtered by genre using a dropdown
  - All available genres are loaded from static data

- **Pagination**

  - The app dynamically adjusts how many podcast cards to show per page
  - Uses screen width to compute optimal layout (e.g., 2 rows × n columns)
  - Defaults to 10 items per page for tablet and smaller screens

- **Dynamic Routing**

  - Each podcast has a unique URL route: `/podcast/<id>`
  - Clicking a podcast card navigates to its detail page
  - Users can bookmark or share direct links to specific podcasts
  - Browser back/forward buttons work as expected

- **Podcast Detail Page**

  - Displays full podcast information including description and metadata
  - Shows all available seasons with a season selector
  - Lists all episodes for the selected season
  - Includes audio players for listening to episodes directly
  - "Back to Home" button returns to the main grid

- **Persistent State**

  - Search, sort, and filter states are preserved when navigating between pages
  - Context provider wraps the entire app to maintain state across routes

- **Shared State with Context API**
  - Uses a `PodcastProvider` to manage global podcast state
  - Exposes search term, sort key, selected genre, page, and filtered podcasts
  - Components consume state via `useContext(PodcastContext)`

## Project Structure
```
/src
│
├── /api
│ └── fetchPodcasts.js # Fetch podcasts from the API
│
├── /components
│ ├── Header.jsx # Top navigation bar with controls
│ ├── PodcastCard.jsx # Individual podcast preview card
│ ├── PodcastGrid.jsx # Grid layout of podcast cards
│ ├── PodcastDetail.jsx # Detailed podcast page with seasons/episodes
│ ├── SearchBar.jsx # Search input component
│ ├── SortSelect.jsx # Sort dropdown component
│ ├── GenreFilter.jsx # Genre filter dropdown
│ └── Pagination.jsx # Page navigation component
│
├── /context
│ └── PodcastContext.jsx # React context for global podcast state
│
├── /utils
│ └── formatDate.js # Formats ISO date to readable format
│
├── App.jsx # Root app component with routing
└── main.jsx # React entry point with BrowserRouter
```
- There are individual css modules for specific functions and objects to improve maintainability 

## How It Works

- When the app loads, it fetches all podcast data once from the preview API.
- The data is passed into the `PodcastProvider`, which handles:
  - Searching titles
  - Sorting by selected key
  - Filtering by genre
  - Splitting into pages based on screen size
- Components like `PodcastGrid` display the processed data.
- Clicking a podcast card uses React Router to navigate to `/podcast/<id>`.
- The `PodcastDetail` component fetches full podcast data including all seasons and episodes.
- Users can switch between seasons and play episodes using the built-in audio player.
- The "Back to Home" button returns to the main grid with all filters preserved.

## How to Run

1. Clone the project or download the source code.
2. Install dependencies using:
```bash
   npm install
```

3. Run the development server with:
```bash
   npm run dev
```

4. Open http://localhost:5173 in your browser to view the app.


