# Contributing to Hardwave Studios Suite

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/hardwave-studios-suite.git`
3. Create a branch: `git checkout -b feature/your-feature-name`
4. Make your changes
5. Test thoroughly
6. Commit: `git commit -m "Add: your feature description"`
7. Push: `git push origin feature/your-feature-name`
8. Create a Pull Request

## Development Setup

```bash
# Install dependencies
npm install

# Run in development mode
npm run electron:dev

# Run linter
npm run lint

# Build for production
npm run build:win  # Windows
npm run build      # Linux/Mac
```

## Project Structure

```
src/
├── components/
│   ├── LoginPage.tsx
│   ├── SubscriptionRequired.tsx
│   ├── MainLayout.tsx
│   └── apps/
│       ├── KickForge.tsx
│       ├── MelodyGenerator.tsx
│       └── FileOrganizer.tsx
├── store/
│   └── authStore.ts
├── services/
│   └── api.ts
├── types/
│   └── auth.ts
└── App.tsx
```

## Coding Standards

### TypeScript
- Use TypeScript for all new code
- Define proper interfaces and types
- Avoid `any` type when possible
- Use meaningful variable names

### React Components
- Use functional components with hooks
- Keep components focused and small
- Extract reusable logic into custom hooks
- Use proper prop typing

### Styling
- Use Tailwind CSS utility classes
- Follow the existing color scheme
- Maintain responsive design
- Use the design system (gradients, spacing, etc.)

### Git Commits
Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: Add export functionality to KickForge
fix: Resolve subscription validation error
docs: Update README with new features
```

## Testing

Before submitting a PR:
1. Test all three apps (KickForge, Melody Generator, File Organizer)
2. Verify login/logout functionality
3. Test subscription validation
4. Ensure no TypeScript errors
5. Run the linter
6. Test the build process

## Code Review Process

1. All PRs require review before merging
2. Address all review comments
3. Keep PRs focused on a single feature/fix
4. Update documentation if needed
5. Ensure CI/CD passes

## Feature Requests

For new features:
1. Open an issue first to discuss
2. Explain the use case
3. Describe expected behavior
4. Wait for approval before implementing

## Bug Reports

When reporting bugs:
1. Describe the issue clearly
2. Provide steps to reproduce
3. Include error messages/screenshots
4. Specify OS and Node version
5. Include relevant logs

## Pull Request Guidelines

### PR Title
Use clear, descriptive titles:
- ✅ "Add MIDI export to Melody Generator"
- ✅ "Fix subscription validation timeout"
- ❌ "Update stuff"
- ❌ "Fix bug"

### PR Description
Include:
- What changes were made
- Why the changes were necessary
- How to test the changes
- Screenshots (if UI changes)
- Related issues (if any)

### Checklist
Before submitting:
- [ ] Code follows project style guidelines
- [ ] TypeScript compiles without errors
- [ ] Linter passes
- [ ] Tested locally
- [ ] Documentation updated
- [ ] No console errors/warnings
- [ ] Commit messages are clear

## Areas for Contribution

### High Priority
- Full MIDI export implementation
- WAV export for KickForge
- File scanner for File Organizer
- Preset system
- Auto-update functionality

### Medium Priority
- Additional scales for Melody Generator
- More KickForge effects
- File tagging improvements
- Dark/light theme toggle
- Keyboard shortcuts

### Documentation
- Video tutorials
- User guides
- API documentation
- Code comments

## Questions?

- Open an issue for questions
- Check existing issues first
- Be respectful and constructive

## License

By contributing, you agree that your contributions will be licensed under the project's license.

---

Thank you for contributing to Hardwave Studios Suite! 🎵
