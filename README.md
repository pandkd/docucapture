# DocuCapture

DocuCapture is a free desktop application that helps you create professional step-by-step documentation by capturing screenshots as you work and organizing them into clear, shareable guides.

## Features

- 📸 **Easy Screenshot Capture**: Capture your screen with a simple keyboard shortcut (Cmd/Ctrl+Shift+S)
- 📝 **Step-by-Step Organization**: Organize screenshots into numbered steps with titles and descriptions
- ✏️ **Rich Editing**: Add detailed descriptions and titles to each step
- 🔄 **Flexible Reordering**: Easily rearrange steps by moving them up or down
- 💾 **Save Projects**: Save your documentation projects and continue editing them later
- 📄 **Export to HTML**: Export your documentation as a standalone HTML file for easy sharing
- 🎨 **Professional Design**: Clean, modern interface that's easy to use

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup
```bash
# Clone the repository
git clone https://github.com/pandkd/docucapture.git
cd docucapture

# Install dependencies
npm install

# Build the application
npm run build

# Start the application
npm start
```

## Development

```bash
# Build and run in development mode
npm run dev
```

## Usage

1. **Create a New Project**: When you launch DocuCapture, give your project a name and description in the sidebar.

2. **Capture Screenshots**: Click the "📸 Capture Screenshot" button or use the keyboard shortcut (Cmd/Ctrl+Shift+S) to capture your screen.

3. **Edit Steps**: Click on any step in the sidebar to edit its title and description.

4. **Organize Steps**: Use the up (▲) and down (▼) buttons to reorder steps, or the delete (🗑️) button to remove unwanted steps.

5. **Save Your Work**: Click "💾 Save Project" to save your documentation project as a `.json` file.

6. **Export**: Click "📄 Export to HTML" to export your documentation as a standalone HTML file that can be shared with others.

## Keyboard Shortcuts

- `Cmd/Ctrl+N` - New Project
- `Cmd/Ctrl+O` - Open Project
- `Cmd/Ctrl+S` - Save Project
- `Cmd/Ctrl+Shift+S` - Take Screenshot

## Project Structure

```
docucapture/
├── src/
│   ├── main/           # Electron main process
│   │   └── index.ts    # Main process logic, IPC handlers
│   └── renderer/       # React renderer process
│       ├── App.tsx     # Main React component
│       ├── index.tsx   # Renderer entry point
│       └── styles.css  # Application styles
├── public/             # Static assets
│   └── index.html      # HTML template
└── dist/               # Build output
```

## Technologies Used

- **Electron**: Desktop application framework
- **React**: UI library
- **TypeScript**: Type-safe JavaScript
- **Webpack**: Module bundler

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

