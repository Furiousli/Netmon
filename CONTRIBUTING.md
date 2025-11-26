# Contributing to Netmon

Thank you for your interest in contributing to Netmon! This document provides guidelines and instructions for contributing.

## Code of Conduct

Please read and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Git
- Python 3.11+ (for backend development)
- Node.js 20+ (for frontend development)

### Local Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Netmon.git
   cd Netmon
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Set Up Environment**
   ```bash
   docker-compose up --build
   ```

4. **Make Changes**
   - Write clear, descriptive commit messages
   - Follow the style guidelines below
   - Add tests for new features
   - Update documentation as needed

5. **Test Locally**
   ```bash
   # Backend tests
   cd api
   pytest --cov tests/

   # Frontend linting
   cd ../frontend
   npm run lint
   ```

6. **Commit & Push**
   ```bash
   git commit -m "feat/component: brief description"
   git push origin feat/your-feature-name
   ```

7. **Open a Pull Request**
   - Use the PR template provided
   - Link related issues
   - Provide screenshots for UI changes
   - Ensure CI/CD passes

## Coding Standards

### Python (Backend)

- Follow **PEP 8** style guide
- Use type hints for all functions
- Write docstrings for modules, classes, and functions
- Maximum line length: 100 characters
- Use meaningful variable names

**Example:**
```python
def get_host_metrics(host_id: int, limit: int = 100) -> List[Metric]:
    """
    Retrieve metrics for a specific host.
    
    Args:
        host_id: The ID of the host
        limit: Maximum number of metrics to return
        
    Returns:
        List of Metric objects ordered by timestamp descending
    """
    pass
```

### JavaScript/React (Frontend)

- Follow **ESLint** configuration
- Use functional components with hooks
- Use meaningful component names (PascalCase)
- Write JSDoc comments for complex logic
- Keep components small and focused

**Example:**
```jsx
/**
 * KPI Card Component
 * @param {string} title - Card title
 * @param {number} value - Metric value
 * @param {string} unit - Unit of measurement
 */
export function KPICard({ title, value, unit = '' }) {
  return (
    <div className="card">
      <p>{title}</p>
      <p className="text-2xl font-bold">{value}{unit}</p>
    </div>
  )
}
```

### Git Commit Messages

Follow the conventional commits format:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring without feature changes
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build, dependency, or tool updates
- `ci`: CI/CD configuration changes

**Examples:**
```
feat(auth): add two-factor authentication support
fix(api): handle null metrics gracefully
docs(readme): update installation instructions
test(metrics): add edge case tests for data validation
```

## Pull Request Process

1. **Update documentation** if needed
2. **Run tests** and ensure all pass
3. **Run linting** and fix any issues
4. **Create descriptive PR title** using commit format
5. **Fill out PR template** completely
6. **Request review** from maintainers
7. **Respond to feedback** promptly
8. **Squash commits** if requested

## Testing

### Backend Tests

```bash
cd api

# Run all tests
pytest

# Run specific test file
pytest tests/test_auth.py

# Run with coverage
pytest --cov=. tests/

# Run specific test
pytest tests/test_auth.py::test_login
```

### Frontend Tests

```bash
cd frontend

# Run linting
npm run lint

# Build for production
npm run build
```

### Coverage Requirements

- **Backend**: Target 70%+ coverage
- **Frontend**: Focus on critical components
- New features should have corresponding tests

## Documentation

- **Update README.md** for user-facing changes
- **Update API docs** for endpoint changes
- **Add docstrings** to all functions
- **Include code examples** for complex features
- **Update CHANGELOG.md** with significant changes

## Issue Reporting

### Bug Reports

Include:
- Clear, descriptive title
- Reproduction steps
- Expected behavior
- Actual behavior
- Environment details (OS, versions, etc.)
- Screenshots/logs if applicable

### Feature Requests

Include:
- Motivation and use case
- Proposed solution
- Alternative approaches
- Any additional context

## Review Process

Maintainers will:
1. Review code quality and style
2. Check test coverage
3. Verify documentation
4. Run CI/CD checks
5. Provide feedback

Reviews typically take 2-7 days.

## Merging

- PRs require at least 1 approval
- All CI/CD checks must pass
- Commits will be squashed on merge
- Merged features will be included in next release

## Release Process

Releases follow **Semantic Versioning**:
- MAJOR: Breaking changes
- MINOR: New features (backward compatible)
- PATCH: Bug fixes

Releases are cut monthly or as needed.

## Recognition

Contributors are recognized in:
- CHANGELOG.md
- GitHub contributors page
- Release notes

## Questions?

- Check existing issues and PRs
- Review documentation
- Open a discussion

---

Thank you for helping make Netmon better! 🚀
