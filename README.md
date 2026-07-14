# InformaTech Resgate Lite

Projeto fullstack simples e profissional para um app de resgate em calamidades.

## Stack

### Backend
- Node.js
- Express
- TypeScript
- TypeORM
- MySQL
- JWT
- Zod
- Helmet
- CORS
- dotenv
- Multer
- bcryptjs

### Mobile
- React Native
- Expo Router
- TypeScript
- Axios
- Expo Secure Store
- Expo Location
- React Native WebView
- Leaflet + OpenStreetMap

## Funcionalidades

- Cadastro de usuário
- Login com JWT
- Perfil autenticado
- CRUD de pedidos de resgate
- Aceitar pedido como voluntário
- Finalizar pedido
- Mapa com Leaflet via WebView
- Localização atual para criar pedido
- Upload preparado no backend com Multer

---

# 1. Banco de dados

Abra o MySQL Workbench e execute:

```sql
CREATE DATABASE IF NOT EXISTS InformaTech_lite CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE DATABASE IF NOT EXISTS InformaTech;
USE InformaTech;
```

---

# 2. Rodar o backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

No Windows, se o comando acima não funcionar, crie manualmente um arquivo chamado `.env` e copie o conteúdo de `.env.example`.

Exemplo:

```env
PORT=3333
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456 troque por root
DB_NAME=InformaTech_lite
JWT_SECRET=troque_por_uma_chave_grande_e_segura
UPLOAD_DIR=uploads
```

Crie a pasta de uploads:

```bash
mkdir uploads
```

Rode o backend:

```bash
npm run dev
```

Teste no navegador:

```txt
http://localhost:3000/health
```

Deve aparecer:

```json
{ "status": "ok", "app": "InformaTech Lite API" }
```

---

# 3. Rodar o mobile

Entre na pasta:

```bash
cd mobile
```

Instale as dependências:

```bash
npm install
```

Crie o arquivo `.env`:
- Para descobrir o IPV4:
 windows powershell: ipconfig

```env
EXPO_PUBLIC_API_URL=http://SEU_IP_LOCAL:3000
EXPO_PUBLIC_API_URL=http://192.168.1.107:3000
```

Importante: no celular físico, não use `localhost`.
Use o IP do computador na mesma rede Wi-Fi.

Exemplo:

```env
EXPO_PUBLIC_API_URL=http://192.168.0.10:3000
EXPO_PUBLIC_API_URL=http://192.168.1.107:3000
```

Para descobrir o IP no Windows:

```bash
ipconfig
```

Procure por `Endereço IPv4`.

Rode:

```bash
npx expo start
```

---

# 4. Fluxo de uso

1. Cadastre uma conta como `Preciso de ajuda`.
2. Crie um pedido de resgate.
3. Abra o mapa para ver o marcador.
4. Cadastre outra conta como `Quero ajudar`.
5. Aceite o pedido.
6. Finalize o atendimento.

---

# 5. Rotas principais da API

## Autenticação

```txt
POST /auth/register
POST /auth/login
GET  /auth/me
```

## Pedidos

```txt
GET    /requests
GET    /requests/:id
POST   /requests
PUT    /requests/:id
PATCH  /requests/:id/accept
PATCH  /requests/:id/resolve
DELETE /requests/:id
```

---

# 6. Observações importantes

- O TypeORM está com `synchronize: true` para facilitar o desenvolvimento.
- Em produção, o ideal é usar migrations.
- Troque o `JWT_SECRET` por uma chave segura.
- O Leaflet funciona dentro do app usando WebView.
- O backend já está preparado para upload com Multer, embora o mobile lite não envie imagem ainda.
