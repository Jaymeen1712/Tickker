# Contributing to Tickker

Thank you for your interest in contributing to Tickker! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## 📋 Development Workflow

### Setting Up Your Environment

1. Copy the environment variables:
```bash
cp .env.example .env
```

2. Set up the database:
```bash
npm run db:generate
npm run db:push
```

3. Start the development servers:
```bash
npm run dev
```

### Making Changes

1. **Code Style**: We use Prettier and ESLint for code formatting and linting
   - Run `npm run format` to format your code
   - Run `npm run lint` to check for linting errors

2. **Type Safety**: All code must be properly typed with TypeScript
   - Run `npm run type-check` to verify types

3. **Testing**: Write tests for new functionality
   - Run `npm run test` to run all tests
   - Maintain minimum 70% code coverage

### Commit Guidelines

We follow conventional commit messages:

- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation changes
- `style:` for formatting changes
- `refactor:` for code refactoring
- `test:` for adding tests
- `chore:` for maintenance tasks

Example:
```
feat(auth): add two-factor authentication support
fix(cart): resolve quantity update issue
docs(readme): update installation instructions
```

## 🏗️ Project Structure

### Monorepo Organization

- `apps/`: Contains the main applications
  - `store-front/`: Customer-facing website
  - `admin/`: Admin dashboard

- `packages/`: Shared packages
  - `shared-*`: Reusable utilities and components
  - `database/`: Prisma schema and client
  - `*-config/`: Configuration packages

### Adding New Packages

1. Create a new directory in `packages/`
2. Add a `package.json` with proper exports
3. Update the root `package.json` workspaces if needed
4. Add the package to relevant `tsconfig.json` path mappings

## 🧪 Testing Guidelines

### Unit Tests
- Test individual functions and components
- Use Jest and React Testing Library
- Mock external dependencies

### Integration Tests
- Test API routes and database operations
- Use MSW for API mocking
- Test component interactions

### Test Structure
```typescript
describe('ComponentName', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', () => {
    // Test implementation
  });
});
```

## 📦 Package Guidelines

### Creating Shared Packages

1. **Naming**: Use `shared-` prefix for shared utilities
2. **Exports**: Define clear export maps in `package.json`
3. **Dependencies**: Minimize external dependencies
4. **Documentation**: Include README with usage examples

### Package Structure
```
packages/shared-example/
├── src/
│   ├── index.ts
│   ├── utils.ts
│   └── types.ts
├── package.json
├── tsconfig.json
└── README.md
```

## 🔒 Security Guidelines

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Validate all user inputs
- Follow OWASP security guidelines
- Report security issues privately

## 📝 Documentation

### Code Documentation
- Use JSDoc for complex functions
- Include usage examples
- Document breaking changes

### README Files
- Each package should have a README
- Include installation and usage instructions
- Provide examples and API documentation

## 🐛 Bug Reports

When reporting bugs, please include:

1. **Description**: Clear description of the issue
2. **Steps to Reproduce**: Detailed steps to reproduce the bug
3. **Expected Behavior**: What you expected to happen
4. **Actual Behavior**: What actually happened
5. **Environment**: OS, Node.js version, browser (if applicable)
6. **Screenshots**: If applicable

## 💡 Feature Requests

For feature requests, please include:

1. **Problem**: What problem does this solve?
2. **Solution**: Proposed solution or feature
3. **Alternatives**: Alternative solutions considered
4. **Use Cases**: Specific use cases for the feature

## 🔄 Pull Request Process

1. **Branch**: Create a feature branch from `main`
2. **Changes**: Make your changes with proper tests
3. **Commit**: Use conventional commit messages
4. **Test**: Ensure all tests pass
5. **Documentation**: Update documentation if needed
6. **PR**: Create a pull request with a clear description

### PR Checklist

- [ ] Tests pass (`npm run test`)
- [ ] Linting passes (`npm run lint`)
- [ ] Type checking passes (`npm run type-check`)
- [ ] Code is formatted (`npm run format`)
- [ ] Documentation is updated
- [ ] Breaking changes are documented

## 🎯 Code Review Guidelines

### For Authors
- Keep PRs focused and small
- Provide clear descriptions
- Respond to feedback promptly
- Update based on review comments

### For Reviewers
- Be constructive and respectful
- Focus on code quality and maintainability
- Check for security issues
- Verify tests are adequate

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## 🤝 Community

- Be respectful and inclusive
- Help others learn and grow
- Share knowledge and best practices
- Follow the code of conduct

## 📄 License

By contributing to Tickker, you agree that your contributions will be licensed under the MIT License.

Thank you for contributing to Tickker! 🎉
