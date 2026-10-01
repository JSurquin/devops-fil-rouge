# Fil rouge — Introduction au DevOps

Petite API Node 24. C’est **la seule application** des 3 jours : Git, GitHub Actions, Docker, Kubernetes, Terraform local.

Ce dépôt ne contient pas les anciennes démos (Java, Next.js, Python). Elles ne font pas partie du parcours.

```bash
git clone https://github.com/JSurquin/devops-fil-rouge.git
cd devops-fil-rouge
```

## Lancer en local

```bash
cd app
npm install
npm test
npm start
# http://127.0.0.1:3000/health
```

## Docker

À la racine du dépôt :

```bash
docker compose up --build
```

## Kubernetes (kind ou minikube)

Chargez d’abord l’image dans le cluster (`kind load docker-image fil-rouge-api:1.0.0` ou `minikube image load`).

```bash
kubectl apply -f k8s/
kubectl -n fil-rouge get pods,svc
kubectl -n fil-rouge port-forward svc/fil-rouge-api 3000:3000
```

## Terraform (sans compte cloud)

```bash
cd terraform
terraform init
terraform plan
terraform apply
terraform destroy
```

## CI

Le workflow `.github/workflows/ci.yml` vit à la racine : les tests tournent dans `app/`, le `docker build` se lance ici (là où est le Dockerfile).

## Contenu

- `app/` — l’API Express et ses tests
- `Dockerfile` / `docker-compose.yml` — image et Compose
- `.github/workflows/ci.yml` — pipeline GitHub Actions
- `k8s/` — Namespace, Deployment, Service
- `terraform/` — démo locale, sans cloud
