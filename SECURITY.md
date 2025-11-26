# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Netmon, please email **security@netmon.io** instead of using the issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

We will acknowledge your email within 48 hours and provide an estimated timeline for a fix.

## Security Considerations

### For Production Deployment

Before deploying Netmon to production, ensure:

- [ ] Change `SECRET_KEY` in `.env` to a strong random value
- [ ] Use strong passwords for all user accounts
- [ ] Enable HTTPS/TLS for all connections
- [ ] Configure PostgreSQL with strong credentials
- [ ] Use environment variables for all secrets
- [ ] Enable Redis authentication if exposed
- [ ] Set up regular database backups
- [ ] Monitor and log all access
- [ ] Restrict network access appropriately
- [ ] Keep dependencies updated

### Database Security

- Use strong PostgreSQL passwords
- Enable PostgreSQL authentication
- Restrict database network access
- Regular backups stored securely
- Monitor for unauthorized access

### API Security

- Rotate JWT secret regularly
- Implement rate limiting
- Monitor for suspicious activity
- Enable request logging
- Use HTTPS exclusively
- Validate all inputs
- Sanitize all outputs

### Container Security

- Use specific image versions (not `latest`)
- Scan images for vulnerabilities
- Run containers with minimal privileges
- Keep Docker up to date
- Review volume mounts carefully

## Known Security Limitations

- This is an MVP - not recommended for critical production systems without additional hardening
- No built-in RBAC (role-based access control)
- No email verification for accounts
- No rate limiting on API endpoints
- No audit logging
- No encryption for metrics at rest

## Dependency Management

- Dependencies are pinned to specific versions
- Regular updates are performed
- Security advisories are monitored
- Deprecations are tracked

## Responsible Disclosure

We appreciate your responsible disclosure. We request that you:

1. **Don't** publicly disclose the vulnerability until we've had time to fix it
2. **Don't** access other users' data or systems
3. **Do** work with us to understand and resolve the issue
4. **Do** keep the vulnerability confidential
5. **Do** give us reasonable time to fix (typically 90 days)

## Security Updates

Security fixes are released as soon as possible in patch versions (x.y.Z).

Subscribe to releases to be notified of security updates:
https://github.com/your-org/Netmon/releases

## Contact

- Security Issues: security@netmon.io
- General Questions: support@netmon.io
- GitHub Issues: https://github.com/your-org/Netmon/issues

---

Thank you for helping keep Netmon secure!
