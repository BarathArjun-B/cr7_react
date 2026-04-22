#!/bin/bash
# Loop to create 20 commits
for i in {1..20}
do
  # Update README.md with a timestamp to ensure a unique commit each time
  echo "<!-- Update $i: $(date) -->" >> README.md
  
  # Stage the change
  git add README.md
  
  # Commit with a numbered message
  git commit -m "docs: Automated update $i"
done

# Push all commits to the remote repository
git push origin main
