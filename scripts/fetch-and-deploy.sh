#!/bin/bash
# Fetch Instagram posts and redeploy if new images found
set -e

cd /home/ec2-user/clawd/lash-studio

echo "🌸 Running Instagram fetcher..."
python3 scripts/fetch-instagram.py --count 12 2>&1

# Check if any new images were downloaded
GALLERY_COUNT=$(ls -1 public/images/gallery/*.jpg 2>/dev/null | wc -l)
echo "📸 Gallery images: $GALLERY_COUNT"

if [ "$GALLERY_COUNT" -gt 0 ]; then
  # Check if there are changes to commit
  if git diff --quiet src/data/instagram-posts.json public/images/gallery/ 2>/dev/null; then
    echo "✅ No new images. Skipping deploy."
  else
    echo "🚀 New images found! Committing and deploying..."
    git add src/data/instagram-posts.json public/images/gallery/
    git commit -m "Auto-update: Instagram gallery ($(date +%Y-%m-%d))" 2>/dev/null || true
    git push origin main 2>/dev/null || true
    railway up --detach --service web 2>/dev/null || true
    echo "✅ Deployed with new gallery images!"
  fi
else
  echo "⚠️ No images fetched yet. Will retry later."
fi
