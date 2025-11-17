# 🎮 Video Game Humanities

An interactive public humanities project making video game preservation accessible through interactive storytelling, multimedia presentations, and educational content.

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## 📖 About

Video Game Humanities is an educational website dedicated to preserving and presenting video game history through:

- **Interactive Timeline**: Explore 50+ years of gaming history with a filterable, scrollable timeline
- **Era Explorations**: Deep dives into each console generation (1972-present)
- **Console Profiles**: Detailed technical specifications and historical context
- **Educational Lessons**: In-depth articles on preservation efforts and graphics evolution
- **Visual Archives**: Image galleries showcasing hardware and archival materials
- **Interactive Visualizations**: Data-driven infographics and comparison tools

## ✨ Features

- 🎯 **Native Web Technologies**: Built with HTML, CSS, and vanilla JavaScript (no frameworks)
- 📱 **Fully Responsive**: Works beautifully on mobile, tablet, and desktop
- ⚡ **Fast & Lightweight**: Optimized for quick loading even on slow connections
- ♿ **Accessible**: WCAG compliant with semantic HTML and ARIA labels
- 🎨 **Modern Design**: Bright, fun color palette with smooth animations
- 🔍 **SEO Optimized**: Semantic markup and meta tags for search engines
- 📦 **GitHub Pages Ready**: Static site deployment without build tools

## 🚀 Quick Start

### View Live Demo

Visit the deployed site at: `[Your GitHub Pages URL]`

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/VideoGameHumanities.git
   cd VideoGameHumanities
   ```

2. **Open in browser**

   Simply open `index.html` in your web browser. No build process or server required!

   **Option 1: Direct file access**
   ```bash
   open index.html  # macOS
   start index.html # Windows
   xdg-open index.html # Linux
   ```

   **Option 2: Local server (recommended for testing)**
   ```bash
   # Python 3
   python -m http.server 8000

   # Node.js (if you have npx)
   npx serve

   # PHP
   php -S localhost:8000
   ```

   Then navigate to `http://localhost:8000`

## 📁 Project Structure

```
VideoGameHumanities/
├── index.html              # Homepage with interactive timeline
├── learn.html              # Educational lessons
├── about.html              # About the project
├── css/
│   ├── main.css           # Global styles and components
│   ├── timeline.css       # Timeline-specific styles
│   ├── gallery.css        # Gallery and lightbox styles
│   └── responsive.css     # Mobile responsiveness
├── js/
│   ├── navigation.js      # Navigation and menu interactions
│   ├── timeline.js        # Timeline filtering and animations
│   ├── modal.js           # Modal/popup functionality
│   ├── gallery.js         # Image gallery and lightbox
│   └── visualizations.js  # Interactive charts
├── eras/
│   ├── gen3.html          # 3rd generation page
│   ├── gen5.html          # 5th generation page
│   └── [more eras]        # Additional generation pages
├── consoles/
│   ├── nes.html           # NES console page
│   └── [more consoles]    # Additional console pages
├── data/
│   ├── timeline-data.json # Timeline events data
│   ├── consoles-data.json # Console specifications
│   └── lessons-data.json  # Educational content
└── assets/
    ├── images/            # Image assets
    ├── videos/            # Video content
    └── audio/             # Audio files
```

## 🌐 Deployment to GitHub Pages

### Automatic Deployment

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Source: Deploy from branch
   - Branch: `main` (or your default branch)
   - Folder: `/ (root)`

2. **Push your code**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **Access your site**

   Your site will be available at: `https://your-username.github.io/VideoGameHumanities/`

## 🎨 Customization

### Changing Colors

Edit CSS custom properties in `css/main.css`:

```css
:root {
  --primary-blue: #4A90E2;
  --primary-purple: #9B59B6;
  --secondary-orange: #FF6B35;
  --secondary-yellow: #FFC300;
  /* ... more colors */
}
```

### Adding Timeline Events

Edit `data/timeline-data.json`:

```json
{
  "id": 27,
  "era": "gen9",
  "year": 2023,
  "title": "Your Event Title",
  "description": "Event description",
  "console": "Console Name",
  "manufacturer": "Manufacturer",
  "category": "console-release",
  "image": "assets/images/your-image.jpg"
}
```

### Adding New Pages

1. Copy an existing page template
2. Update content with new information
3. Add data entries to appropriate JSON files
4. Update navigation menus

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Report Issues**: Found a bug or historical inaccuracy? Open an issue
2. **Suggest Enhancements**: Have ideas for new features or content? Share them
3. **Submit Pull Requests**: Fork, create a feature branch, and submit a PR

### Contribution Guidelines

- Maintain the vanilla HTML/CSS/JS approach (no frameworks)
- Ensure all content is historically accurate
- Test on multiple browsers and devices
- Follow existing code style and structure

## 📚 Resources & Credits

This project builds upon the work of:

- [Video Game History Foundation](https://gamehistory.org)
- [The Strong National Museum of Play](https://www.museumofplay.org)
- [Internet Archive Software Library](https://archive.org/details/softwarelibrary)
- MAME Development Team
- Gaming preservation community

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Nintendo, Sony, Microsoft, Sega, Atari, and all gaming pioneers
- The video game preservation community
- Gaming historians and archivists

---

<p align="center">
  Made with ❤️ for video game preservation
</p>