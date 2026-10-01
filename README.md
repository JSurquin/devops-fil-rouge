# Fil rouge — Introduction au DevOps

Petite API Node 24. C'est l'application des 3 jours : Git, GitHub Actions, Docker, Kubernetes, Terraform local.

Le dossier `java/` est une petite app Java : on construit son image au module Docker. La CI, Compose et Kubernetes restent sur l'API Node.

Ce dépôt ne contient pas les anciennes démos (Next.js, Python, ni `lab/apps/java-demo`). Elles ne font pas partie du parcours.

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

## Docker (Java)

Même geste que l'API Node, depuis `java/` :

```bash
cd java
docker build -t fil-rouge-java:1.0.0 .
docker run -d --name fil-rouge-java -p 8080:8080 fil-rouge-java:1.0.0
# http://127.0.0.1:8080/health
```

## Kubernetes (kind ou minikube)

Chargez d'abord l'image dans le cluster (`kind load docker-image fil-rouge-api:1.0.0` ou `minikube image load`).

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

Le workflow `.github/workflows/ci.yml` vit à la racine : les tests tournent dans `app/`, le `docker build` se lance ici (là où est le Dockerfile de l'API Node).

## Contenu

- `app/` — l'API Express et ses tests
- `Dockerfile` / `docker-compose.yml` — image et Compose de l'API Node
- `java/` — petite app Java et son Dockerfile (image Docker)
- `.github/workflows/ci.yml` — pipeline GitHub Actions
- `k8s/` — Namespace, Deployment, Service
- `terraform/` — démo locale, sans cloud
