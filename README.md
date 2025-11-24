# 📅 Mobile-Responsive Calendar Application

A modern, intuitive calendar application built with Next.js, React, and Tailwind CSS. Features responsive design that works seamlessly across all devices, from mobile phones to desktop computers.

![Calendar Preview](https://img.shields.io/badge/Status-Mobile%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-16.0.3-black)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-blue)

## ✨ Features

### 📱 **Mobile-First Design**
- **Responsive Layout**: Automatically adapts to any screen size
- **Touch-Friendly**: Optimized for mobile touch interactions
- **Scalable Typography**: Text sizes adjust based on device
- **Flexible Grid**: Calendar cells resize appropriately for mobile

### 🗓️ **Calendar Functionality**
- **Month Navigation**: Easy navigation between months
- **Today Highlight**: Current date is clearly marked
- **Event Display**: View events directly on calendar dates
- **Event Details**: Click any day to see detailed event information

### ⚠️ **Smart Conflict Detection**
- **Time Overlap Detection**: Automatically identifies conflicting events
- **Visual Indicators**: Conflicting events are highlighted with warning icons
- **Conflict Details**: Detailed conflict information in event modals

### 🎨 **Modern UI/UX**
- **Clean Design**: Minimalist interface with JetBrains Mono font
- **Smooth Animations**: Hover effects and transitions
- **Color-Coded Events**: Events display with custom colors
- **Intuitive Navigation**: Easy-to-use month controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd calendar-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
calendar-assignment/
├── app/
│   ├── globals.css          # Global styles and mobile optimizations
│   ├── layout.tsx          # Root layout with viewport configuration
│   └── page.tsx            # Main calendar component
├── public/
│   └── config.json         # Event data configuration
└── package.json            # Dependencies and scripts
```

## ⚙️ Configuration

### Event Data
Events are configured in `public/config.json`. Each event should have:

```json
{
  "startTime": "09:00",
  "endTime": "17:00",
  "color": "#FF0000",
  "title": "Meeting",
  "date": "2025-11-06"
}
```

### Responsive Breakpoints
The application uses Tailwind CSS breakpoints:
- **Mobile**: < 640px
- **Small (sm)**: ≥ 640px
- **Medium (md)**: ≥ 768px
- **Large (lg)**: ≥ 1024px

## 📱 Mobile Optimizations

- **Responsive Calendar Cells**: `h-16 sm:h-20 md:h-24 lg:h-28`
- **Adaptive Padding**: `p-2 sm:p-4 md:p-6 lg:p-8`
- **Scalable Typography**: `text-lg sm:text-2xl md:text-3xl`
- **Flexible Spacing**: `gap-0.5 sm:gap-1 md:gap-1`
- **Touch Targets**: Optimized button and interaction sizes

## 🛠️ Built With

- **[Next.js 16.0.3](https://nextjs.org/)** - React framework
- **[React 19.2.0](https://reactjs.org/)** - UI library
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

## 🎯 Key Components

### Calendar Grid
- 7-column responsive grid layout
- Dynamic cell heights based on screen size
- Event overflow indicators
- Today highlighting

### Event System
- JSON-based event configuration
- Time conflict detection algorithm
- Color-coded event display
- Modal event details

### Mobile Responsive Features
- Stacked navigation on mobile
- Appropriately sized touch targets
- Readable typography across devices
- Optimized spacing and padding

## 🔧 Development

### Adding Events
Add events to `public/config.json`:
```json
[
  {
    "startTime": "14:00",
    "endTime": "15:30",
    "color": "#00FF00",
    "title": "Team Meeting",
    "date": "2025-12-15"
  }
]
```

### Customizing Styles
The application uses Tailwind CSS. Modify `app/globals.css` for global styles or component classes in `app/page.tsx`.

### Mobile Testing
- Use browser dev tools mobile simulation
- Test on actual mobile devices
- Verify touch interactions work properly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Next.js and Tailwind CSS
