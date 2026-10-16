# AuraTravel — Premium Animated Travel Experience Platform

> "The world is closer than you think. Find your next extraordinary."

AuraTravel is a modern, design-led travel discovery and trip-planning web application built for discerning travelers. Designed with cinematic aesthetics, restrained microinteractions, and client-side data persistence.

---

## 🌟 Architecture & Key Features

### 1. Cinematic Hero & Exploration Experience
- **Fluid Motion Hero**: Staggered headline reveal, ambient gradients, floating coordinates badge, and responsive quick-search panel.
- **12 Curated Global Destinations**:
  - Bali, Indonesia
  - Kyoto, Japan
  - Swiss Alps, Switzerland
  - Santorini, Greece
  - Maldives
  - Dubai, United Arab Emirates
  - Kerala, India
  - Kashmir, India
  - Goa, India
  - Cappadocia, Türkiye
  - Paris, France
  - Banff, Canada
- **Multi-Factor Search & Filtering**:
  - Live case-insensitive keyword search
  - Category chips (Beaches, Mountains, Adventure, Culture, Luxury, Nature, City escapes)
  - Interactive budget slider ($1,000 to $8,000)
  - Duration selector (Short, Medium, Extended)
  - Instant reset & dynamic result count

### 2. Editorial Destination Profiles
- High-resolution photography with aspect ratio guarantees and graceful fallbacks
- Overview, 5 signature highlights, day-by-day suggested itineraries with interactive tabs
- Local insider travel tips and mindful cultural etiquette guidelines
- Clear illustrative weather forecast widget (labeled demo data)
- Similar sanctuaries recommendations
- Direct "Save to Bucket List" and "Adopt in Trip Planner" actions

### 3. Interactive Trip Planner
- **Full Itinerary Authoring**:
  - Custom trip naming and destination selection
  - Date picking with calendar validation (end date cannot precede start date)
  - Traveler count slider and automatic per-person budget computation
  - Travel pace and accommodation preference configuration
- **Day-by-Day Activity Scheduler**:
  - Add signature experiences from catalog or author custom notes
  - Up / Down activity sequencing controls
  - Activity removal
- **Defensive LocalStorage Persistence**:
  - Trips saved with defensive JSON error recovery
  - Manage, load, edit, and delete trips with confirmation modal

### 4. Saved Sanctuaries (Favorites)
- In-browser persistent bucket list
- One-click heart toggle on destination cards with toast notification feedback
- Polished empty state with "Discover Havens" call to action
- Modal confirmation to clear all bookmarks

### 5. Accessibility & Motion Harmony
- **Reduced Motion Support**: Listens to system `prefers-reduced-motion` settings and adapts animation transitions.
- **Keyboard Navigation & ARIA**: Full keyboard accessibility, visible focus rings, dialog `role="dialog"` modals with Escape key listeners and background scroll locking.
- **No Layout Shifts**: Pre-allocated aspect ratios for visual media.

---

## 🛠️ Technology Stack

- **Framework**: React 18 (JSX)
- **Tooling**: Vite
- **Styling**: Tailwind CSS with custom design tokens (`Midnight #0B1220`, `Ocean #0E7490`, `Teal #14B8A6`, `Sand #F3E9D2`, `Gold #E9B949`)
- **Animations**: Motion for React (`motion/react`) & refined CSS keyframes
- **Icons**: Lucide React
- **Routing**: React Router v6
- **Storage**: HTML5 LocalStorage with fallback error handling

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Run

```bash
# 1. Navigate into project folder
cd auratravel

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Create production build
npm run build
```

---

## 📋 Verification & Testing Results

| Test Category | Status | Notes |
| :--- | :--- | :--- |
| Project Structure | Passed | Clean modular architecture across `components/`, `pages/`, `hooks/`, `data/`, `styles/` |
| Navigation | Passed | React Router routes working across Home, Explore, Details, Planner, Saved, About, Contact, 404 |
| Responsive Layout | Passed | Tested across 320px, 375px, 768px, 1024px, and 1440px+ without horizontal overflow |
| LocalStorage Persistence | Passed | Favorites and custom trips survive browser refresh with safe defensive parsing |
| Form Validation | Passed | Date consistency checks and email regex validation implemented |
| Accessibility | Passed | Focus rings, ARIA roles, Escape dismiss on modals |

---

## 📄 License & Credits
Developed as an HR Frontend Technical Assessment Project. All photographs sourced via Unsplash royalty-free travel assets.
