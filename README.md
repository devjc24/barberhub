# TailAdmin Vue.js Dashboard

#### Preview
 - [Demo](https://themewagon.github.io/tailadmin-vuejs/)

#### Download
 - [Download from ThemeWagon](https://themewagon.com/themes/tailadmin-vuejs/)


### Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker (VPS/Produção)

Este repositório contém:


## Deploy automático (VPS + Docker Compose)

Este repositório publica as imagens no **GHCR** via GitHub Actions e pode fazer **deploy automático na VPS** via SSH rodando `docker compose`.

### 1) Pré-requisitos na VPS

- Docker + Docker Compose instalados.
- O projeto clonado na VPS (ex.: `/opt/barberhub`) e com `docker-compose.prod.yml` no diretório.
- Um usuário SSH com permissão para rodar docker (ex.: estar no grupo `docker`).

### 2) Secrets no GitHub (Settings → Secrets and variables → Actions)

Obrigatórios:
- `VPS_HOST`: IP/DNS da VPS
- `VPS_USER`: usuário SSH
- `VPS_SSH_KEY`: chave privada (PEM) correspondente à chave pública na VPS
- `VPS_PATH`: caminho do projeto na VPS (ex.: `/opt/barberhub`)

Opcional:
- `VPS_PORT`: porta SSH (se não for 22)

Se as imagens do GHCR forem privadas, adicione também:
- `GHCR_USERNAME`: seu usuário do GitHub
- `GHCR_PAT`: token (classic) com permissão `read:packages` (e, se necessário, `repo`)

### 3) O que acontece no deploy

No push para a branch `main`, o workflow:
- builda e publica `ghcr.io/<owner>/<repo>-api:main` e `ghcr.io/<owner>/<repo>-web:main`
- conecta na VPS via SSH
- atualiza o repositório na VPS (`git fetch` + `git reset --hard origin/main`)
- executa `docker compose -f docker-compose.prod.yml pull` e `up -d`

### Opção A — Portainer / Stack via Git (recomendado se você quer "via link do GitHub")

1. No VPS, abra o Portainer → **Stacks** → **Add stack** → **Repository**.
2. Cole a URL do seu repositório e informe o caminho do compose: `docker-compose.yml`.
3. Configure as variáveis do stack (ou use um arquivo `.env` equivalente).
4. Deploy the stack.

### Opção B — Build e Push no GitHub Actions + Pull na VPS

1. O workflow [Build & Push Docker Images](.github/workflows/docker.yml) faz build e publica as imagens no **GHCR**:
	- `ghcr.io/<owner>/<repo>-web:main`
	- `ghcr.io/<owner>/<repo>-api:main`
2. No VPS, crie uma pasta (ex: `/opt/barberhub`) e copie para lá:
	- `docker-compose.prod.yml`
	- um `.env` baseado em `.env.example`
3. Suba com:

```bash
docker compose -f docker-compose.prod.yml up -d
```

Opcionalmente, você pode usar o workflow [Deploy to VPS](.github/workflows/deploy-vps.yml) (manual) com secrets:


### Variáveis de ambiente

Use `.env.example` como base. Para produção, é importante definir pelo menos:



## Author 
```
Design and code is completely written by TailAdmin and development team. 
```

## License

 - Design and Code is Copyright &copy; [TailAdmin](https://tailadmin.com/)
 - Licensed cover under [MIT]
 - Distributed by [ThemeWagon](https://themewagon.com)