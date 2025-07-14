# Fix Git Author Configuration

## Problem

Commits are showing "builderio-bot" instead of "PrakashKrishnamoorthi" as the author.

## Solution

### Method 1: Quick Fix (Recommended)

Run these commands in your terminal:

```bash
# Set your name globally
git config --global user.name "PrakashKrishnamoorthi"

# Set your email globally (replace with your actual email)
git config --global user.email "your-email@example.com"
```

### Method 2: Repository-Specific Configuration

If you only want to change it for this repository:

```bash
# Navigate to your project directory
cd /path/to/your/taskflow-project

# Set name for this repository only
git config user.name "PrakashKrishnamoorthi"

# Set email for this repository only
git config user.email "your-email@example.com"
```

### Method 3: Use the Setup Script

Run the provided setup script:

```bash
# Make the script executable
chmod +x setup-git.sh

# Run the setup script
./setup-git.sh
```

## Verify Configuration

Check your current git configuration:

```bash
# Check global configuration
git config --global --list | grep user

# Check repository-specific configuration
git config --list | grep user
```

## Fix Existing Commits (Optional)

If you want to change the author of previous commits:

### Change the last commit

```bash
git commit --amend --author="PrakashKrishnamoorthi <your-email@example.com>"
```

### Change multiple commits

```bash
git rebase -i HEAD~n --rebase-merges
# (where n is the number of commits to change)
```

### Change all commits in a branch

```bash
git filter-branch --env-filter '
    if [ "$GIT_COMMITTER_EMAIL" = "builderio-bot@users.noreply.github.com" ]
    then
        export GIT_COMMITTER_NAME="PrakashKrishnamoorthi"
        export GIT_COMMITTER_EMAIL="your-email@example.com"
    fi
    if [ "$GIT_AUTHOR_EMAIL" = "builderio-bot@users.noreply.github.com" ]
    then
        export GIT_AUTHOR_NAME="PrakashKrishnamoorthi"
        export GIT_AUTHOR_EMAIL="your-email@example.com"
    fi
' --tag-name-filter cat -- --branches --tags
```

## Important Notes

1. **Replace Email**: Make sure to replace `"your-email@example.com"` with your actual email address.

2. **Global vs Local**:

   - `--global` sets configuration for all repositories
   - Without `--global` sets configuration only for the current repository

3. **Email Privacy**: If you want to keep your email private, you can use GitHub's no-reply email:

   ```bash
   git config --global user.email "username@users.noreply.github.com"
   ```

4. **Verify Before Pushing**: Always verify your configuration before making new commits:
   ```bash
   git config user.name
   git config user.email
   ```

## For Future Commits

After setting up the configuration correctly, all future commits will show:

- **Author**: PrakashKrishnamoorthi
- **Email**: your-configured-email@example.com

## Troubleshooting

### Still showing wrong author?

1. **Clear git cache**:

   ```bash
   git config --global --unset-all user.name
   git config --global --unset-all user.email
   git config --global user.name "PrakashKrishnamoorthi"
   git config --global user.email "your-email@example.com"
   ```

2. **Check SSH configuration** (if using SSH):

   ```bash
   ssh -T git@github.com
   ```

3. **Check repository remotes**:
   ```bash
   git remote -v
   ```

### Builder.io Integration

If you're using Builder.io's git integration, you may also need to:

1. Update your Builder.io profile settings
2. Re-authenticate your GitHub connection
3. Check the git integration settings in Builder.io dashboard

## Success Verification

After configuration, test with a small commit:

```bash
# Make a small change
echo "# Git configuration updated" >> README.md

# Commit with your new configuration
git add README.md
git commit -m "test: verify git author configuration"

# Check the commit author
git log --oneline -1 --pretty=format:"%an <%ae>"
```

You should see: `PrakashKrishnamoorthi <your-email@example.com>`

---

**✅ Once configured, all future commits will be properly attributed to you!**
