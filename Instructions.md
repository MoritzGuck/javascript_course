# Instructions for javascript course

Help the user learn to write websites in javascript.

Your System-prompt is in ./.vibe/prompts/chrono_systemprompt.md
---

## Chapters

- [ ] How Websites Work
    - [x] Basics of Web-Communication
        - [x] GET, POST methods, request response cycle, how messages are structured with header, body, etc.,
        - [x] HTTPS, SSL, TLS encryption
        - [x] How data is sent over the internet: TCP, IP,
    - [x] Web Architecture & How Websites Are Built
        - [x] Client-server model (HTTP requests to a domain • DNS resolution (domain name → IP address))
        - [x] Web servers: What they do, types.
        - [x] Static and dynamic content
    - **🎯 Project: Tech History Timeline**
        - [x] **Exercise 1: HTTP in Action**
          - Research how the [Wikipedia API](https://www.mediawiki.org/wiki/API:Main_page) works.
          - Write down the **HTTP request** (method, URL, headers) needed to fetch a summary for the event *"First Moon Landing"*.
          - Use `curl` to test the request and inspect the response.
        - [x] **Exercise 2: Client-Server Diagram**
          - Draw a diagram showing:
            - Your browser (client) → Wikipedia API (server) → Response (JSON) → Timeline page (DOM update).
          - Label the **request/response cycle** and where HTTPS/SSL fits in.

---

- [x] HTML Refresher
    - [x] HTML syntax basics (header, body, div, br)
    - [x] Semantic HTML (article, section, nav, footer)
    - [x] Forms and input elements
    - **🎯 Project: Tech History Timeline**
        - [x] **Exercise 1: Static Timeline Structure**
          - Create `index.html` with:
            - `<header>` with title `"Tech History Timeline"` and a subtitle.
            - `<nav>` with placeholder `<select>` dropdowns for **era** (e.g., Industrial Revolution, Digital Age) and **category** (e.g., Aviation, Computing).
            - `<main>` with:
              - A `<canvas id="timeline">` for the visual timeline (width="1000", height="200").
              - A `<div id="events-container">` to list events as cards.
            - `<footer>` with a copyright notice.
        - [x] **Exercise 2: Canvas Setup**
          - Add a `<canvas>` element and verify it renders as a blank rectangle in the browser.
        - [x] **Exercise 3: Semantic Event Cards**
          - Inside `#events-container`, add **3 static event cards** using semantic HTML:
            ```html
            <article class="event">
              <h3>First Steam Engine</h3>
              <time datetime="1712">1712</time>
              <p>Invented by Thomas Newcomen...</p>
            </article>
            ```

- [x] CSS
    - [x] Basic selectors (class, ID, element), simple pseudo-classes (:hover)
    - [x] Box model (margin, border, padding), display, basic positioning
    - [x] Flexbox basics for layouts
    - [x] Responsive: viewport, simple media queries
    - **🎯 Project: Tech History Timeline**
        - [x] **Exercise 1: Styling the Timeline Structure**
          - Create `styles.css` and link it to `index.html`.
          - Style the `<header>` with a futuristic look: dark background, light text, centered title.
          - Style the `<nav>` dropdowns to look like Chrono-Vault control panels with metallic borders.
        - [x] **Exercise 2: Event Cards Layout**
          - Style `.event` cards with:
            - Flexbox layout for the date and content
            - Card-like appearance (shadow, border-radius, padding)
            - Hover effect using `:hover` to highlight cards
        - [x] **Exercise 3: Responsive Canvas**
          - Make the `<canvas>` responsive using viewport units and media queries.
          - Add a border to visualize the canvas area.

---

- [ ] Javascript Fundamentals
    - [ ] Language Basics
        - [x] Variables (let, const, var) and data types
        - [x] Operators and expressions
        - [x] Type coercion and truthy/falsy values
        - [x] Template literals
    - [x] Control Flow
        - [x] If/else, switch statements, Loops
    - [ ] Functions
        - [x] Function declarations vs expressions
        - [x] Arrow functions
        - [ ] Parameters, arguments, return values
        - [ ] Scope and closures
        - [ ] Higher-order functions
    - [ ] Data Structures
        - [ ] Arrays and array methods (map, filter, reduce, find, etc.)
        - [ ] Objects and object literals
        - [ ] Destructuring (arrays and objects)
        - [ ] Spread and rest operators
    - [ ] ES6+ Features
        - [ ] Modules (import/export)
        - [ ] Classes and OOP in JavaScript
        - [ ] Promises and async/await
        - [ ] Optional chaining and nullish coalescing
    - **🎯 Project: Tech History Timeline**
        - [x] **Exercise 1: Timeline Data Structure**
          - Create a JavaScript file `timeline.js`.
          - Define an array of **5 historical event objects** with properties: `id`, `title`, `year`, `description`, `category` (e.g., "Computing", "Aviation").
          - Use template literals to format event descriptions with emojis.
        - [ ] **Exercise 2: Event Filtering**
          - Write a function `filterEventsByCategory(events, category)` that uses `.filter()` to return events matching a category.
          - Write a function `getEventTitles(events)` that uses `.map()` to return an array of event titles.
        - [ ] **Exercise 3: Timeline Statistics**
          - Write a function `getEarliestEvent(events)` that uses `.reduce()` to find the oldest event.
          - Write a function `countEventsByCategory(events)` that returns an object with category counts.
        - [ ] **Exercise 4: Dynamic Event Display**
          - Write a function `displayEventInfo(event)` that uses destructuring to extract properties and logs a formatted string.

---

- [ ] Working with the DOM
    - [ ] DOM Basics
        - [ ] Selecting elements (getElementById, querySelector, etc.)
        - [ ] Traversing the DOM
        - [ ] Modifying elements (content, attributes, styles)
    - [ ] Events
        - [ ] Event listeners and handlers
        - [ ] Event object and event propagation
        - [ ] Common events (click, submit, keypress, etc.)
        - [ ] Event delegation
    - [ ] Forms
        - [ ] Form selection and validation
        - [ ] Handling form submission
        - [ ] Working with form data
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Selecting Timeline Elements**
          - Use `querySelector` and `getElementById` to select the `#events-container` and `#timeline` canvas.
          - Log these elements to verify selection.
        - [ ] **Exercise 2: Dynamic Event Rendering**
          - Write a function `renderEvents(events)` that:
            - Clears the `#events-container`
            - Creates `<article>` elements for each event with proper class and content
            - Appends them to `#events-container`
          - Call this function with your event data from `timeline.js`
        - [ ] **Exercise 3: Event Filter Dropdown**
          - Add an event listener to the category `<select>` dropdown.
          - When changed, call `renderEvents()` with filtered events using your `filterEventsByCategory` function.
        - [ ] **Exercise 4: Hover Effects with JS**
          - Add a mouseenter/mouseleave event listener to each event card.
          - Toggle a CSS class to highlight the card when hovered.

---

- [ ] Asynchronous JavaScript
    - [ ] Callbacks and callback hell
    - [ ] Promises
        - [ ] Creating and consuming promises
        - [ ] Promise chaining (then, catch, finally)
        - [ ] Promise static methods (all, race, allSettled)
    - [ ] Async/Await
        - [ ] async functions
        - [ ] await operator
        - [ ] Error handling with try/catch
    - [ ] Fetch API
        - [ ] Making HTTP requests
        - [ ] Handling responses and errors
        - [ ] Working with JSON data
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Simulating API with setTimeout**
          - Create a function `fetchEventsWithDelay()` that uses `setTimeout` to simulate fetching events after 1 second.
          - Return a Promise that resolves with your event data.
        - [ ] **Exercise 2: Promise Chaining for Events**
          - Create a function `loadAndRenderEvents()` that:
            - Calls `fetchEventsWithDelay()`
            - Uses `.then()` to call `renderEvents()` with the data
            - Uses `.catch()` to handle errors
        - [ ] **Exercise 3: Async/Await Refactor**
          - Rewrite `loadAndRenderEvents()` using `async/await` syntax.
          - Add try/catch for error handling.
        - [ ] **Exercise 4: Parallel Data Loading**
          - Create multiple Promise-based functions to fetch different categories of events.
          - Use `Promise.all()` to load all categories simultaneously and merge the results.

---

- [ ] Working with APIs
    - [ ] Understanding RESTful APIs
        - [ ] REST principles
        - [ ] HTTP methods and status codes
        - [ ] Authentication (API keys, tokens)
    - [ ] Consuming APIs
        - [ ] Fetching data from public APIs
        - [ ] Handling loading states and errors
        - [ ] Displaying API data in the DOM
    - [ ] Building a simple API client
        - [ ] Creating a reusable API service
        - [ ] Error handling strategies
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Wikipedia API Integration**
          - Use the `fetch` API to request data from the Wikipedia API for a historical event (e.g., "First Moon Landing").
          - Parse the JSON response and extract the summary text.
        - [ ] **Exercise 2: API Error Handling**
          - Enhance your fetch call with proper error handling for network errors and API errors.
          - Display user-friendly error messages in the UI.
        - [ ] **Exercise 3: Loading States**
          - Add a loading spinner (or text) that appears when data is being fetched.
          - Hide it when data loads or when an error occurs.
        - [ ] **Exercise 4: API Service Module**
          - Create a reusable module `apiService.js` with a function `fetchWikipediaSummary(title)` that encapsulates the Wikipedia API call logic.
          - Import and use this module in your main application.

---

- [ ] Data Visualization with JavaScript
    - [ ] Canvas API basics
    - [ ] Introduction to Chart.js or D3.js
        - [ ] Creating simple charts (bar, line, pie)
        - [ ] Customizing charts
        - [ ] Handling dynamic data
    - [ ] Visualizing data from APIs
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Canvas Timeline Drawing**
          - Use the Canvas API to draw a horizontal timeline line with year markers.
          - Position event dots along the timeline based on their year.
        - [ ] **Exercise 2: Event Visualization**
          - Draw circles or rectangles on the canvas at positions corresponding to event years.
          - Add tooltips (using title attributes or custom divs) showing event info on hover.
        - [ ] **Exercise 3: Chart.js Integration**
          - Install Chart.js via CDN or npm.
          - Create a bar chart showing the number of events per category using your event data.
        - [ ] **Exercise 4: Dynamic Data Visualization**
          - Update the chart when the user filters events by category.
          - Animate the chart update for smooth transitions.

---

- [ ] Modern JavaScript Development
    - [ ] Modules and Modular Code
        - [ ] ES Modules
        - [ ] Module patterns
    - [ ] npm and Package Management
        - [ ] Initializing a project
        - [ ] Installing and using packages
        - [ ] package.json and package-lock.json
    - [ ] Bundlers (Optional)
        - [ ] Introduction to webpack or vite
        - [ ] Basic configuration
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Modular Timeline Code**
          - Split your JavaScript code into modules:
            - `events.js` - event data and filtering functions
            - `rendering.js` - DOM rendering functions
            - `api.js` - API service functions
          - Use ES6 import/export to share functionality between modules.
        - [ ] **Exercise 2: npm Project Setup**
          - Initialize a new npm project with `npm init`.
          - Create a `package.json` with appropriate scripts for development.
        - [ ] **Exercise 3: Installing Chart.js via npm**
          - Install Chart.js as a dependency.
          - Replace your CDN usage with the npm-installed version.
        - [ ] **Exercise 4: Vite Setup (Optional)**
          - Initialize a Vite project for your timeline application.
          - Configure Vite to serve your HTML, CSS, and JavaScript files.

---

- [ ] Frontend Frameworks (Optional - Pick one based on interest)
    - [ ] React
        - [ ] Components and JSX
        - [ ] State and props
        - [ ] Hooks (useState, useEffect)
        - [ ] Building a simple React app
    - [ ] Vue.js
        - [ ] Templates and directives
        - [ ] Components and props
        - [ ] State management
        - [ ] Building a simple Vue app
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: React Component Structure**
          - Create a React project and set up the basic component structure.
          - Create a `Timeline` component that will hold the entire timeline.
        - [ ] **Exercise 2: Event Card Component**
          - Create a reusable `EventCard` component that takes event data as props.
          - Style it to match your existing design.
        - [ ] **Exercise 3: State Management**
          - Use `useState` to manage the list of events and the selected category.
          - Update the event list when the category filter changes.
        - [ ] **Exercise 4: API Integration in React**
          - Use `useEffect` to fetch Wikipedia summaries when an event is selected.
          - Display the summary in a modal or details panel.

---

- [ ] Backend with Node.js (Optional)
    - [ ] Node.js basics
        - [ ] Running JavaScript on the server
        - [ ] Node.js modules
    - [ ] Express.js
        - [ ] Setting up an Express server
        - [ ] Routing and middleware
        - [ ] Handling requests and responses
    - [ ] Building a simple API
        - [ ] REST API endpoints
        - [ ] Connecting to a database (SQLite, PostgreSQL)
        - [ ] CORS and security basics
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Express Server Setup**
          - Create a new Node.js project and install Express.
          - Set up a basic Express server with a route that returns "Chrono-Vault API Online".
        - [ ] **Exercise 2: Timeline API Endpoint**
          - Create a GET endpoint `/api/events` that returns your event data as JSON.
          - Add a GET endpoint `/api/events/:id` that returns a single event by ID.
        - [ ] **Exercise 3: POST Endpoint for New Events**
          - Create a POST endpoint `/api/events` that accepts new event data and adds it to your dataset.
          - Return the created event with a 201 status code.
        - [ ] **Exercise 4: Database Integration**
          - Set up SQLite and create a database schema for events.
          - Modify your endpoints to query the database instead of using in-memory data.

---

- [ ] Full-Stack Application
    - [ ] Connecting frontend and backend
    - [ ] Building a complete CRUD application
    - [ ] Authentication basics (if time permits)
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Connect Frontend to Backend**
          - Update your frontend to fetch events from your Express API instead of using local data.
          - Handle the response and render events as before.
        - [ ] **Exercise 2: Full CRUD Implementation**
          - Add a form to create new events that sends POST requests to your backend.
          - Add edit and delete buttons to each event card that make PUT and DELETE requests.
        - [ ] **Exercise 3: Real-time Updates**
          - After creating, updating, or deleting an event, refresh the event list without a full page reload.
          - Provide user feedback (e.g., toast notifications) on successful operations.
        - [ ] **Exercise 4: CORS Configuration**
          - Configure CORS in your Express server to allow requests from your frontend domain.
          - Test that your frontend can successfully communicate with the backend.

---

- [ ] Deployment
    - [ ] Static site hosting (GitHub Pages, Netlify, Vercel)
    - [ ] Deploying a Node.js app (Render, Railway, Heroku)
    - [ ] Environment variables and configuration
    - [ ] CI/CD basics (GitHub Actions)
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Deploy Frontend to Netlify**
          - Prepare your frontend code for production (remove development dependencies, set base path if needed).
          - Deploy your static frontend to Netlify and verify it works.
        - [ ] **Exercise 2: Deploy Backend to Render**
          - Configure your Express server for production (set PORT from environment variables).
          - Deploy your Node.js backend to Render or Railway.
          - Test your API endpoints using the deployed URL.
        - [ ] **Exercise 3: Environment Variables**
          - Move sensitive configuration (API keys, database URLs) to environment variables.
          - Use a `.env` file for development and configure production environment variables in your hosting provider.
        - [ ] **Exercise 4: GitHub Actions CI/CD**
          - Create a GitHub Actions workflow that runs tests on push.
          - Set up automatic deployment to Netlify on successful tests.

---

- [ ] Testing (Optional)
    - [ ] Introduction to testing in JavaScript
    - [ ] Jest basics
    - [ ] Testing DOM manipulations
    - [ ] Testing API calls
    - **🎯 Project: Tech History Timeline**
        - [ ] **Exercise 1: Jest Setup**
          - Install Jest and configure it for your project.
          - Write a simple test to verify your `filterEventsByCategory` function works correctly.
        - [ ] **Exercise 2: Testing Utility Functions**
          - Write tests for your timeline utility functions (`getEarliestEvent`, `countEventsByCategory`, etc.).
          - Test edge cases (empty arrays, single events, etc.).
        - [ ] **Exercise 3: Testing Async Code**
          - Write tests for your async functions (`fetchEventsWithDelay`, etc.).
          - Use Jest's async testing features (`async/await` or `.then()`).
        - [ ] **Exercise 4: DOM Testing**
          - Use Jest with jsdom to test your `renderEvents` function.
          - Verify that the correct number of event cards are created and have the right content.
