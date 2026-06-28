#!/bin/bash

# Check if a directory was provided
if [ -z "$1" ]; then
  echo "❌ Usage: $0 /path/to/your/directory"
  exit 1
fi

# Assign and validate the input directory
TARGET_DIR="$1"
if [ ! -d "$TARGET_DIR" ]; then
  echo "❌ Error: '$TARGET_DIR' is not a valid directory."
  exit 1
fi

# Move into the directory
cd "$TARGET_DIR" || exit

# Step 1: Rename files by removing "Property 1=" prefix
for file in "Property 1="*; do
  [ -e "$file" ] || continue  # Skip if no match
  new_name="${file#Property 1=}"
  mv "$file" "$new_name"
done

# Step 2: Create destination folders if they don’t exist
mkdir -p png svg

# Step 3: Move files based on extension
mv *.png png/ 2>/dev/null
mv *.svg svg/ 2>/dev/null

echo "✅ Done! Files have been renamed and sorted in '$TARGET_DIR'"
