# ⚔️ Versus

> **Dos opciones. Una respuesta. Cero piedad.**
> Un juego donde tu intuición, tu memoria y tu sangre fría deciden si sobrevives… o si te hundes con el barco.

---

Versus es un juego de preguntas en el que no basta con saber: hay que arriesgar. Cada ronda te planta delante decisiones imposibles y números que nadie debería tener en la cabeza (pero que tú vas a intentar adivinar igualmente). Puedes jugar solo contra el cronómetro de tu propio ego… o medirte contra otra persona y ver quién cae primero.

Spoiler: casi siempre cae el que se confía.

---

## 🎮 Los modos

### 🩸 Supervivencia — *3 vidas. Sin red.*
Dos opciones en pantalla. Una es correcta. La otra te quita una vida. Así de simple, así de cruel. ¿Cuánto aguantas antes de que la tercera equis sea definitiva?

### 📉 Precisión — *la barra de vida que sangra números*
Te lanzamos una pregunta con respuesta numérica. *"¿Cuántos seguidores tiene Cristiano en Instagram?"* *"¿Cuántos goles marcó Messi en 2012?"* *"¿Cuánto recaudó Titanic?"*

Tú tiras un número. Cuanto más te desvíes, más vida pierdes. Pero ojo: si clavas la respuesta o te acercas una barbaridad, **recuperas vida**. Aquí el que se atreve, gana. Y el que tiembla, se queda sin barra.

### 🆚 Duelo binario — *igual que Supervivencia, pero con alguien mirándote a los ojos*
Mismas reglas del modo de las 3 vidas, pero contra otra persona en tiempo real. Gana el último en pie. Pierde el que se desmorone primero.

### 🥊 Duelo de precisión — *dos barras, un ganador*
El modo Precisión pero a dos bandas. Cada uno con su barra de vida, cada uno con sus nervios. El primero en llegar a cero, se va a casa.

### ☠️ Modo Sabotaje — *el daño ya no es tuyo, es suyo*
La variante más sucia. Aquí no pierdes vida por fallar: **se la quitas al otro por acertar mejor que él**. Si tu respuesta está más cerca de la real, tu rival recibe el golpe. Si es al revés, lo recibes tú. Cada pregunta es un puñetazo. Gana el que siga respirando.

---

## 🧰 Qué hay bajo el capó

Versus está construido con piezas serias para un juego que no se toma a sí mismo tan en serio:

- **Frontend en Angular** — rápido, reactivo, pensado para que el clic del duelo llegue sin retraso.
- **Backend en Spring Boot** — aguanta los duelos en tiempo real sin pestañear (WebSockets para que las partidas multijugador vayan al milisegundo).
- **PostgreSQL** — donde viven las miles de preguntas y las estadísticas de cada caída épica.
- **Scrapy** — los arañitas de Python que recorren la web de madrugada trayendo datos frescos: seguidores, goles, taquillas, récords. Si el número existe en algún sitio, Versus lo sabe.

---

## 🗂 Mapa del proyecto

```
versus/
├── backend/      → el cerebro (Spring Boot)
├── frontend/     → la cara bonita (Angular)
├── scraper/      → los cazadores de datos (Scrapy)
└── docker-compose.yml
```

---

## 🚀 Cómo arrancarlo

**Lo fácil — con Docker:**

```bash
git clone https://github.com/tu-usuario/versus.git
cd versus
cp .env.example .env
docker compose up --build
```

Y listo. Abre `http://localhost:4200` y que empiece el espectáculo.

**Lo manual — si te gusta sufrir:**

```bash
# Base de datos
createdb versus_db

# Backend
cd backend && ./mvnw spring-boot:run

# Frontend
cd frontend && npm install && npm start

# Scraper (cuando quieras renovar preguntas)
cd scraper && pip install -r requirements.txt && scrapy crawl all
```

---

## 🔑 Variables de entorno

Copia `.env.example` como `.env` y rellena lo tuyo:

```env
POSTGRES_DB=versus_db
POSTGRES_USER=versus
POSTGRES_PASSWORD=...

JWT_SECRET=pon-aqui-algo-largo-y-aleatorio
API_URL=http://localhost:8080/api
WS_URL=ws://localhost:8080/ws
```

---

## 🕷 De dónde salen las preguntas

Los spiders de Scrapy se pasean por fuentes públicas (estadísticas deportivas, redes sociales, taquillas de cine, récords, lo que haga falta) y rellenan la base de datos con preguntas frescas. Así Versus nunca se queda sin munición y cada semana hay cosas nuevas que fallar espectacularmente.

Se ejecutan programados (cron o similar), respetan los `robots.txt` y van con calma para no molestar a nadie.

---

## 🧪 ¿Funciona? Compruébalo

```bash
# Backend
cd backend && ./mvnw test

# Frontend
cd frontend && npm test

# Scraper
cd scraper && pytest
```

---

## 🗺 Lo que viene

- 🏆 Torneos por eliminación directa
- 🎖 Logros, rachas y títulos ridículos para presumir
- 💬 Chat en mitad del duelo (para picar al rival, básicamente)
- 🌍 Multi-idioma
- 📱 Versión móvil
- 👑 Modo *"el veterano"* con preguntas imposibles para quien ya se sabe todas

---

## 📄 Licencia

MIT. Haz con esto lo que quieras, pero si montas un torneo invítanos.

---

**¿Listo?** Elige modo. Elige rival. Y que gane el que menos dude.

*— El equipo de Versus*