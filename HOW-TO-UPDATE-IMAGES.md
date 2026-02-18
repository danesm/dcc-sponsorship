# How to Update Sponsorship Package Images

## Quick Guide: Replace an Image

### Option 1: Keep Same Filename (Easiest - No Code Changes!)

1. **Find the image you want to replace**
   - Images are in: `dcc-sponsorship-website/images/`
   - Named: `1.png`, `2.png`, `3.png`, etc.

2. **Replace the file**
   ```bash
   # Example: Replace slide 4 (Platinum Package)
   cp ~/Desktop/new-platinum-slide.png images/4.png
   ```

3. **Done!** Refresh your browser to see the change

### Option 2: Add New Image with Different Name

1. **Add your new image to the images folder**
   ```bash
   cp ~/Desktop/new-slide.png images/12.png
   ```

2. **Edit `script.js`** (lines 133-143)
   
   Find this section:
   ```javascript
   const packages = [
       { img: 'images/1.png', title: 'Cover - Sponsorship Packages 2026' },
       { img: 'images/2.png', title: 'About Dartford Cricket Club' },
       // ... more slides ...
       { img: 'images/11.png', title: 'Contact Information' }
   ];
   ```

3. **Add your new slide**
   ```javascript
   const packages = [
       { img: 'images/1.png', title: 'Cover - Sponsorship Packages 2026' },
       { img: 'images/2.png', title: 'About Dartford Cricket Club' },
       // ... existing slides ...
       { img: 'images/11.png', title: 'Contact Information' },
       { img: 'images/12.png', title: 'Your New Slide Title' }  // ← NEW
   ];
   ```

4. **Save and refresh** your browser

## Common Tasks

### Change a Slide Title

Edit `script.js` line with the slide you want to change:

```javascript
// Before
{ img: 'images/4.png', title: 'Platinum Package' },

// After
{ img: 'images/4.png', title: 'Premium Platinum Sponsorship' },
```

### Remove a Slide

Delete the entire line from the array in `script.js`:

```javascript
const packages = [
    { img: 'images/1.png', title: 'Cover' },
    { img: 'images/2.png', title: 'About' },
    // DELETE THIS LINE to remove slide 3:
    // { img: 'images/3.png', title: 'Overview' },
    { img: 'images/4.png', title: 'Platinum' },
];
```

### Reorder Slides

Cut and paste lines in `script.js` to change order:

```javascript
// Original order
const packages = [
    { img: 'images/1.png', title: 'Cover' },
    { img: 'images/2.png', title: 'About' },
    { img: 'images/3.png', title: 'Overview' },
];

// New order (moved Overview to second position)
const packages = [
    { img: 'images/1.png', title: 'Cover' },
    { img: 'images/3.png', title: 'Overview' },  // ← Moved up
    { img: 'images/2.png', title: 'About' },     // ← Moved down
];
```

### Add Multiple New Slides

1. Add all new images to `images/` folder
2. Add all entries to the array:

```javascript
const packages = [
    // ... existing slides ...
    { img: 'images/11.png', title: 'Contact Information' },
    { img: 'images/12.png', title: 'New Slide 1' },
    { img: 'images/13.png', title: 'New Slide 2' },
    { img: 'images/14.png', title: 'New Slide 3' }
];
```

## File Locations

- **Images folder**: `dcc-sponsorship-website/images/`
- **Configuration file**: `dcc-sponsorship-website/script.js` (lines 133-143)
- **Current images**: 1.png through 11.png

## Image Requirements

- **Format**: PNG, JPG, or JPEG
- **Size**: Any size (will auto-resize)
- **Recommended**: 1920x1080px or similar 16:9 ratio
- **File size**: Keep under 5MB per image for fast loading

## After Making Changes

1. **Save all files**
2. **Refresh browser** (Cmd+R or Ctrl+R)
3. **Clear cache if needed** (Cmd+Shift+R or Ctrl+Shift+R)
4. **Test on mobile** (resize browser window)

## If You're Deploying to GitHub Pages

After making changes:

```bash
git add .
git commit -m "Updated sponsorship package images"
git push
```

Wait 1-2 minutes for GitHub Pages to rebuild your site.

## Need Help?

- Images not showing? Check the filename matches exactly (case-sensitive!)
- Wrong order? Check the array order in `script.js`
- Title not updating? Make sure you saved `script.js` and refreshed browser

---

**Pro Tip**: Keep the same filenames (1.png, 2.png, etc.) and just replace the files. This way you never need to edit code!
