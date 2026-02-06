#!/usr/bin/env python3
"""
Fetch Instagram posts from @lashspace.sa and save images + metadata
for the Lash Space website gallery.

Usage: python3 scripts/fetch-instagram.py [--count 12]
"""

import json
import os
import sys
import shutil
from pathlib import Path
from datetime import datetime

try:
    import instaloader
except ImportError:
    print("❌ instaloader not installed. Run: pip3 install instaloader")
    sys.exit(1)

# Config
ACCOUNTS = ["lashspace.sa", "lash_space222"]
OUTPUT_DIR = Path(__file__).parent.parent / "public" / "images" / "gallery"
DATA_FILE = Path(__file__).parent.parent / "src" / "data" / "instagram-posts.json"
MAX_POSTS = int(sys.argv[sys.argv.index("--count") + 1]) if "--count" in sys.argv else 12


def fetch_posts():
    """Fetch latest posts from Instagram accounts."""
    L = instaloader.Instaloader(
        download_comments=False,
        download_geotags=False,
        download_video_thumbnails=False,
        save_metadata=False,
        post_metadata_txt_pattern="",
        max_connection_attempts=3,
        request_timeout=30,
        quiet=True,
    )

    all_posts = []
    
    for username in ACCOUNTS:
        print(f"📸 Fetching posts from @{username}...")
        try:
            profile = instaloader.Profile.from_username(L.context, username)
            print(f"   Found: {profile.full_name} ({profile.mediacount} posts, {profile.followers} followers)")
            
            count = 0
            for post in profile.get_posts():
                if count >= MAX_POSTS:
                    break
                
                if post.is_video:
                    count_skip = True
                    continue
                
                post_data = {
                    "id": post.shortcode,
                    "username": username,
                    "caption": (post.caption or "")[:200],
                    "permalink": f"https://instagram.com/p/{post.shortcode}/",
                    "timestamp": post.date_utc.isoformat(),
                    "likes": post.likes,
                    "imageUrl": f"/images/gallery/{post.shortcode}.jpg",
                    "downloaded": False,
                }
                
                # Download image
                img_path = OUTPUT_DIR / f"{post.shortcode}.jpg"
                if not img_path.exists():
                    try:
                        L.download_pic(str(OUTPUT_DIR / post.shortcode), post.url, post.date_utc)
                        # Rename the downloaded file
                        for f in OUTPUT_DIR.glob(f"{post.shortcode}*"):
                            if f.suffix in [".jpg", ".jpeg", ".png", ".webp"]:
                                if f.name != f"{post.shortcode}.jpg":
                                    shutil.move(str(f), str(img_path))
                                post_data["downloaded"] = True
                                break
                        print(f"   ✅ Downloaded: {post.shortcode}")
                    except Exception as e:
                        print(f"   ⚠️ Failed to download {post.shortcode}: {e}")
                else:
                    post_data["downloaded"] = True
                    print(f"   ⏭️ Already exists: {post.shortcode}")
                
                all_posts.append(post_data)
                count += 1
                
        except instaloader.exceptions.ProfileNotExistsException:
            print(f"   ❌ Profile @{username} not found")
        except instaloader.exceptions.ConnectionException as e:
            print(f"   ❌ Connection error for @{username}: {e}")
        except Exception as e:
            print(f"   ❌ Error fetching @{username}: {e}")
    
    return all_posts


def save_data(posts):
    """Save post metadata as JSON for the Next.js app."""
    # Ensure directories exist
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    
    # Sort by date (newest first)
    posts.sort(key=lambda p: p["timestamp"], reverse=True)
    
    # Save JSON
    data = {
        "lastUpdated": datetime.utcnow().isoformat(),
        "accounts": ACCOUNTS,
        "posts": posts,
    }
    
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
    
    print(f"\n📊 Summary:")
    print(f"   Total posts: {len(posts)}")
    print(f"   Downloaded: {sum(1 for p in posts if p['downloaded'])}")
    print(f"   Data saved: {DATA_FILE}")
    print(f"   Images dir: {OUTPUT_DIR}")


def main():
    print("🌸 Lash Space Instagram Fetcher")
    print("=" * 40)
    
    posts = fetch_posts()
    
    if posts:
        save_data(posts)
        print("\n✨ Done! Rebuild the site to see updated gallery.")
    else:
        print("\n⚠️ No posts fetched. Check connection or account names.")


if __name__ == "__main__":
    main()
