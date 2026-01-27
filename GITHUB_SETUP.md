# GitHub Setup Guide - Hardwave Studios Suite

## 🚀 Quick Setup

### 1. Create GitHub Repository

Go to [GitHub](https://github.com/new) and create a new repository:
- **Repository name**: `hardwave-studios-suite` (or your preferred name)
- **Description**: "All-in-One Production Suite - KickForge, Melody Generator & File Organizer"
- **Visibility**: Private (or Public if open source)
- **Don't initialize** with README (we already have one)

### 2. Push to GitHub

```bash
cd unified-app

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/hardwave-studios-suite.git

# Commit all files
git add .
git commit -m "Initial commit: Hardwave Studios Suite v1.0.0"

# Push to GitHub
git push -u origin main
```

### 3. Configure Secrets

Go to your repository on GitHub:
1. Click **Settings** → **Secrets and variables** → **Actions**
2. Add new repository secret:
   - Name: `VITE_API_URL`
   - Value: `https://hardwavestudios.com`

### 4. Enable GitHub Actions

1. Go to **Actions** tab
2. Enable workflows
3. The builds will now run automatically on:
   - Push to tags (v*)
   - Manual workflow dispatch

## 📦 Creating a Release

### Option 1: Via Tag (Automatic)

```bash
# Create and push a tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

This will automatically:
- Build for Windows, Linux, and macOS
- Create a GitHub release
- Attach all build artifacts

### Option 2: Via GitHub UI (Manual)

1. Go to **Actions** tab
2. Select **Build and Release** workflow
3. Click **Run workflow**
4. Select branch: `main`
5. Click **Run workflow**

## 🔧 GitHub Actions Workflows

### Build Workflow (`.github/workflows/build.yml`)
- Triggers on tags starting with `v*`
- Builds for Windows, Linux, macOS
- Creates GitHub release with artifacts
- Can be manually triggered

### Test Workflow (`.github/workflows/test.yml`)
- Triggers on push to `main` or `develop`
- Triggers on pull requests
- Runs linter and type checking
- Tests build process

## 📋 Branch Strategy

### Main Branch (`main`)
- Production-ready code
- Protected branch (require reviews)
- Only merge via pull requests
- Automatically tested via CI

### Develop Branch (`develop`)
- Development work
- Feature branches merge here first
- Test before merging to main

### Feature Branches
- `feature/your-feature-name`
- `fix/bug-description`
- `docs/documentation-update`

### Example Workflow
```bash
# Create feature branch
git checkout -b feature/midi-export

# Make changes and commit
git add .
git commit -m "feat: Add full MIDI export functionality"

# Push to GitHub
git push origin feature/midi-export

# Create pull request on GitHub
# After review, merge to develop
# Then merge develop to main for release
```

## 🏷️ Version Tagging

Follow semantic versioning (MAJOR.MINOR.PATCH):

```bash
# Patch release (bug fixes)
git tag -a v1.0.1 -m "Fix subscription validation bug"
git push origin v1.0.1

# Minor release (new features)
git tag -a v1.1.0 -m "Add auto-update functionality"
git push origin v1.1.0

# Major release (breaking changes)
git tag -a v2.0.0 -m "Major redesign with new architecture"
git push origin v2.0.0
```

## 📊 GitHub Repository Settings

### Branch Protection (Recommended)

For `main` branch:
1. Go to **Settings** → **Branches** → **Add rule**
2. Branch name pattern: `main`
3. Enable:
   - ✅ Require pull request reviews before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require branches to be up to date before merging
   - ✅ Include administrators

### Collaborators

Add team members:
1. **Settings** → **Collaborators**
2. Add people with appropriate permissions

### Issues & Projects

Enable useful features:
1. **Issues**: For bug tracking and feature requests
2. **Projects**: For organizing work
3. **Discussions**: For community questions

## 📝 Commit Message Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: Add new feature
fix: Fix a bug
docs: Documentation changes
style: Code style changes
refactor: Code refactoring
test: Adding tests
chore: Maintenance tasks
perf: Performance improvements
```

Examples:
```bash
git commit -m "feat: Add WAV export to KickForge"
git commit -m "fix: Resolve login timeout issue"
git commit -m "docs: Update README with new features"
git commit -m "refactor: Improve audio engine performance"
```

## 🔐 Security

### Secrets Management
- Never commit `.env` files
- Use GitHub Secrets for sensitive data
- Keep API keys secure

### Dependabot
Enable Dependabot:
1. **Settings** → **Security** → **Dependabot**
2. Enable:
   - Dependabot alerts
   - Dependabot security updates
   - Dependabot version updates

## 📥 Downloading Releases

Users can download builds from:
```
https://github.com/YOUR_USERNAME/hardwave-studios-suite/releases
```

Each release includes:
- Windows installer (.exe)
- Linux AppImage
- macOS DMG (if built)
- Source code

## 🔄 Automated Deployment

To automatically deploy to your website:

1. Add deployment step to workflow:
```yaml
- name: Deploy to website
  run: |
    scp release/**/*.exe user@server:/var/www/hardwavestudios.com/public/downloads/
  env:
    SSH_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
```

2. Add `SSH_DEPLOY_KEY` to GitHub Secrets

## 📚 Documentation

Keep these files updated:
- `README.md` - Overview and quick start
- `CHANGELOG.md` - Version history
- `CONTRIBUTING.md` - Contribution guidelines
- `DEPLOYMENT.md` - Deployment instructions
- `GITHUB_SETUP.md` - This file

## 🎯 GitHub Best Practices

1. **Write good commit messages** - Clear and descriptive
2. **Use pull requests** - Never push directly to main
3. **Review code** - All PRs need review
4. **Keep branches up to date** - Rebase regularly
5. **Tag releases** - Use semantic versioning
6. **Update changelog** - Document all changes
7. **Close issues** - Link PRs to issues
8. **Use milestones** - Organize releases
9. **Add labels** - Categorize issues and PRs
10. **Write tests** - Ensure code quality

## 🆘 Troubleshooting

### Push rejected
```bash
git pull --rebase origin main
git push origin main
```

### Workflow fails
1. Check Actions tab for error logs
2. Verify secrets are configured
3. Check Node version in workflow
4. Review build errors

### Can't create release
1. Ensure tag starts with `v`
2. Check workflow permissions
3. Verify GITHUB_TOKEN has release permissions

## 📧 Support

For help with GitHub setup:
- [GitHub Docs](https://docs.github.com)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Electron Builder Docs](https://www.electron.build/)

---

**Ready to push your code to GitHub! 🚀**
