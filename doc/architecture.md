# Cloud-Native Backend Platform – Architecture

## Services

- Auth Service: Authentication, JWT, RBAC
- User Service: User profile management
- Order Service: Order lifecycle
- API Gateway: Single entry point

## Communication

- REST over HTTP
- JWT-based authentication

## Data

- Oracle SQL (separate schema per service)
- Redis for caching and rate limiting

## Infrastructure

- Docker for containerization
- Kubernetes for orchestration
- Jenkins for CI/CD
- AWS (EKS, EC2)

## Non-Goals (for now)

- Event-driven messaging
- Service mesh
