# Hero Banner API Integration

This document explains the hero banner integration for the Lakshadweep Adventure Hub home page.

## Overview

The home page now displays dynamic hero banners fetched from your backend API instead of a static image. The banners are automatically rotated and support fallback to the default hero image if the API is unavailable.

## Files Created/Modified

### New Files
- **`src/lib/api/banner.functions.ts`**: Server-side function to fetch active banners from the API
- **`src/components/HeroBanner.tsx`**: React component that displays the hero banner with carousel functionality
- **`.env.example`**: Environment variable template
- **`.env.local`**: Local environment configuration

### Modified Files
- **`src/routes/index.tsx`**: Updated to use the new `HeroBanner` component instead of static hero

## Configuration

### Step 1: Set Up Environment Variables

1. Copy `.env.example` to `.env.local` (or update existing `.env.local`):
   ```bash
   VITE_API_BASE_URL=http://your-api-domain.com
   ```

2. Replace `http://your-api-domain.com` with your actual API base URL:
   - **Development**: `http://localhost:3000` or your local API server
   - **Production**: Your production API domain

### Step 2: Verify API Credentials

The banner API function uses the following configuration:
- **Account Type ID**: `6a2907f92d4f8b2751cc8c71` (configured in `banner.functions.ts`)
- **API Endpoint**: `/business_website/banner/get_active_banners`
- **HTTP Method**: `GET`

If your account type ID changes, update it in `src/lib/api/banner.functions.ts`:

```typescript
const accountTypeId = "6a2907f92d4f8b2751cc8c71"; // Change this value
```

## API Response Format

The component expects the API to return data in the following format:

```json
{
  "success": true,
  "message": "success",
  "data": [
    {
      "_id": "66f0a1b2c3d4e5f678901001",
      "title": "Summer Sale",
      "subtitle": "Up to 30% off selected products",
      "imageUrl": "https://cdn.example.com/banners/summer-sale.jpg",
      "buttonText": "Shop Now",
      "buttonUrl": "/collections/summer-sale",
      "status": "Published"
    }
  ],
  "totalRecords": 1
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `_id` | string | Unique banner identifier |
| `title` | string | Banner title (displayed as main heading) |
| `subtitle` | string | Banner subtitle (displayed as description) |
| `imageUrl` | string | URL to banner background image |
| `buttonText` | string | CTA button text |
| `buttonUrl` | string | CTA button navigation URL |
| `status` | string | Banner status (typically "Published") |

## Features

### Auto-Rotation
- Banners automatically rotate every 5 seconds if multiple banners are available
- Rotation respects user interactions (clicking indicators pauses auto-rotation until the next auto-rotate occurs)

### Carousel Controls
- Bottom dot indicators show current banner position
- Click any dot to jump to that banner
- Visual feedback on active indicator

### Fallback Handling
- If API fails or returns no banners, the component falls back to the default hero image
- Default text: "Your Island Escape" with "Begins with Adventure Peak" branding
- Maintains responsive design and functionality

### Error Handling
- Network errors are logged to console (development mode)
- Component gracefully degrades when API is unavailable
- No breaking of page functionality if banner fetch fails

## Component Props

### HeroBanner
```typescript
interface HeroBannerProps {
  fallbackImage: string; // URL to fallback image (e.g., imported hero image)
}
```

## Usage in HomePage

```tsx
import { HeroBanner } from "@/components/HeroBanner";
import hero from "@/assets/hero-lakshadweep.jpg";

export function HomePage() {
  return (
    <SiteLayout>
      <HeroBanner fallbackImage={hero} />
      {/* Rest of the page content */}
    </SiteLayout>
  );
}
```

## Testing

### Local Testing
1. Ensure your API server is running on the configured `VITE_API_BASE_URL`
2. Start the development server: `npm run dev`
3. Navigate to the home page
4. Check the browser console for any errors
5. Verify the banner loads with the API data

### Fallback Testing
1. Stop your API server or misconfigure the URL
2. Refresh the page
3. Verify the fallback hero image displays
4. Check console for error messages

## Troubleshooting

### Banners Not Loading
1. **Check API URL**: Verify `VITE_API_BASE_URL` in `.env.local` is correct
2. **Check CORS**: Ensure your API allows requests from your frontend domain
3. **Check Network**: Open browser DevTools Network tab to see the API request
4. **Check Console**: Look for error messages in the browser console

### Images Not Displaying
1. **Verify Image URLs**: Ensure `imageUrl` in API response is accessible
2. **Check CORS**: Image URLs might need CORS headers
3. **Test Image URL**: Try accessing the image URL directly in browser

### Component Not Updating
1. Clear browser cache (Ctrl+Shift+Delete)
2. Hard refresh the page (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
3. Check that API is returning data with `success: true`

## Performance Considerations

- Banner images are loaded on-demand as users interact with carousel
- Auto-rotation prevents unnecessary re-renders (5-second interval)
- Responsive images using native `<img>` tag with `object-cover`
- Lazy loading not currently applied; consider adding for production

## Future Enhancements

- [ ] Add pagination for large banner sets
- [ ] Implement banner analytics (track banner clicks)
- [ ] Add animation transitions between banners
- [ ] Support for video backgrounds in addition to images
- [ ] Caching strategy for banner data
- [ ] Admin interface for managing banners

## Support

For issues or questions, check:
1. Browser console for error messages
2. Network tab in DevTools to inspect API calls
3. API server logs for request details
4. Configuration in `.env.local` for correct settings
