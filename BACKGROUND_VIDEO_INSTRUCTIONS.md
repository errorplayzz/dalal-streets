# Background Video Setup Instructions

I've added a background video feature to your website's landing page. To make it work properly, you'll need to:

## 1. Get a suitable background video

You can find free stock videos at:
- [Pexels](https://www.pexels.com/search/videos/website%20background/)
- [Pixabay](https://pixabay.com/videos/search/background/)
- [Mixkit](https://mixkit.co/free-video-backgrounds/)

## 2. Prepare the video file

For optimal performance:
- Format: MP4 with H.264 encoding
- Resolution: 1920x1080 (HD) or 1280x720 (HD)
- Duration: 10-30 seconds (it will loop automatically)
- File size: Under 10MB

## 3. Add the video to your project

1. Name your video file `background.mp4`
2. Place it in the `/public/videos/` folder
3. Restart your development server

## 4. Adjusting the overlay darkness

If you need to adjust how dark the overlay is on top of the video:
1. Open `src/components/common/BackgroundVideo.css`
2. Find the `.video-overlay` class
3. Modify the `background: rgba(0, 0, 0, 0.4);` value:
   - 0.0 is completely transparent
   - 1.0 is completely black

## Testing

The background video will only appear on the landing page (first screen). As soon as a user selects either "Client" or "Vendor", the video will no longer display to avoid distracting from the content.
