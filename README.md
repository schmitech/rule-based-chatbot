# Mobile-Style Rule-Based Chatbot

A React application that simulates a traditional rule-based customer service chatbot with a modern mobile device UI. This project demonstrates a decision-tree based conversation flow within a realistic smartphone interface.

## Features

- **Realistic Mobile Device UI**:
  - Phone frame with curved edges
  - Status bar with time, WiFi, and battery indicators
  - Notch design
  - Home indicator
  - Realistic message bubbles

- **Rule-Based Chatbot**:
  - Predefined conversation paths
  - Multiple service categories (Billing, Technical Support, etc.)
  - Nested conversation options
  - Typing indicators
  - Timestamp on messages

## Technologies Used

- React
- TypeScript
- Tailwind CSS
- Lucide React (for icons)
- Vite (build tool)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/rule-based-chatbot.git
   cd rule-based-chatbot
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

- `src/App.tsx` - Main application component containing both the chatbot logic and UI
- `src/index.css` - Global styles and Tailwind imports
- `src/main.tsx` - Application entry point

## How It Works

The chatbot operates on a simple decision tree model:

1. Each conversation node contains:
   - A message from the chatbot
   - A set of options for the user to choose from
   - Links to the next nodes in the conversation

2. When a user selects an option:
   - Their choice is displayed as a user message
   - A typing indicator appears briefly
   - The chatbot responds with the next node's message
   - New options are presented based on the current node

3. The conversation history is maintained and displayed in a scrollable chat interface

## Customization

### Modifying the Conversation Tree

The conversation tree is defined in the `conversationTree` array in `App.tsx`. Each node has:

- `id`: Unique identifier for the node
- `message`: The chatbot's message for this node
- `options`: Array of user options, each with:
  - `id`: Unique identifier for the option
  - `text`: Display text for the option
  - `nextNodeId`: ID of the node to navigate to when selected
- `isEndpoint` (optional): Boolean indicating if this is an endpoint node

### Styling

The application uses Tailwind CSS for styling. You can modify the appearance by:

1. Editing the Tailwind classes in `App.tsx`
2. Customizing the theme in `tailwind.config.js`
3. Adding custom styles in `index.css`

## License

MIT

## Acknowledgments

- This project was created to demonstrate the limitations of traditional rule-based chatbots compared to modern AI-powered conversational interfaces.
- The mobile device UI design was inspired by modern smartphone interfaces. 