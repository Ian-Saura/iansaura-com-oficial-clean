import { RoadmapLevel } from '../../types/members';

export const level1_part2: Partial<RoadmapLevel> = {
  phases: [
    // ========== CAPÍTULO 9: DOCKER Y LINUX ==========
    {
      id: 'l1-docker',
      title: { es: 'Docker y Linux: Lo Básico', en: 'Docker and Linux: The Basics', pt: 'Docker e Linux: O Básico' },
      emoji: '🐳',
      sections: [
        {
          id: 'l1-docker-intro',
          title: { es: '🐳 Aprendiendo Docker', en: '🐳 Learning Docker', pt: '🐳 Aprendendo Docker' },
          description: {
            es: 'Docker aparece en el 80% de las ofertas de Data Engineering. No necesitás ser experto, pero sí entender los conceptos básicos.',
            en: 'Docker appears in 80% of Data Engineering job offers. You don\'t need to be an expert, but you need to understand the basic concepts.',
            pt: 'Docker aparece em 80% das ofertas de Data Engineering. Não precisa ser especialista, mas precisa entender os conceitos básicos.'
          },
          steps: [
            { 
              id: 'l1-dock-1', 
              text: { es: 'Instalé Docker en mi máquina', en: 'Installed Docker on my machine', pt: 'Instalei Docker na minha máquina' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Instalar Docker Desktop', en: 'Install Docker Desktop', pt: 'Instalar Docker Desktop' }, link: 'https://www.docker.com/products/docker-desktop/' },
              explanation: {
                es: `Paso a paso:

1. Andá a docker.com/products/docker-desktop
2. Descargá para tu sistema operativo
3. Ejecutá el instalador
4. Reiniciá tu computadora si te lo pide

⚠️ IMPORTANTE: Después de instalar, abrí Docker Desktop.
Tiene que estar CORRIENDO (icono de ballena en la barra).
Si no está corriendo, los comandos docker no funcionan.

Verificar que funciona:
1. Abrí la terminal
2. Escribí: docker --version
   → Debería mostrar: Docker version 24.x.x
3. Escribí: docker ps
   → Debería mostrar una tabla vacía (no error)

❌ Si dice "Cannot connect to the Docker daemon":
→ Docker Desktop no está corriendo. Abrilo desde Aplicaciones.`,
                en: `Step by step:

1. Go to docker.com/products/docker-desktop
2. Download for your operating system
3. Run the installer
4. Restart your computer if asked

⚠️ IMPORTANT: After installing, open Docker Desktop.
It must be RUNNING (whale icon in taskbar).
If not running, docker commands won't work.

Verify it works:
1. Open terminal
2. Type: docker --version
   → Should show: Docker version 24.x.x
3. Type: docker ps
   → Should show an empty table (no error)

❌ If it says "Cannot connect to the Docker daemon":
→ Docker Desktop is not running. Open it from Applications.`,
                pt: `Passo a passo:

1. Vá em docker.com/products/docker-desktop
2. Baixe para seu sistema operacional
3. Execute o instalador
4. Reinicie seu computador se pedir

⚠️ IMPORTANTE: Depois de instalar, abra o Docker Desktop.
Ele tem que estar RODANDO (ícone de baleia na barra).
Se não estiver rodando, os comandos docker não funcionam.

Verificar que funciona:
1. Abra o terminal
2. Digite: docker --version
   → Deve mostrar: Docker version 24.x.x
3. Digite: docker ps
   → Deve mostrar uma tabela vazia (não erro)

❌ Se disser "Cannot connect to the Docker daemon":
→ Docker Desktop não está rodando. Abra-o dos Aplicativos.`
              }
            },
            { 
              id: 'l1-dock-2', 
              text: { es: 'Entiendo qué es un container vs una imagen', en: 'I understand container vs image', pt: 'Entendo o que é um container vs uma imagem' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Docker 101', en: 'Docker 101', pt: 'Docker 101' }, link: 'https://docker-curriculum.com/' },
              explanation: {
                es: `Imagen = receta/plano (archivo estático)
Container = plato preparado (instancia corriendo)

Analogía:
- Imagen = Clase en programación
- Container = Objeto instanciado

De UNA imagen podés crear MUCHOS containers idénticos.`,
                en: `Image = recipe/blueprint (static file)
Container = prepared dish (running instance)

Analogy:
- Image = Class in programming
- Container = Instantiated object

From ONE image you can create MANY identical containers.`,
                pt: `Imagem = receita/plano (arquivo estático)
Container = prato preparado (instância rodando)

Analogia:
- Imagem = Classe em programação
- Container = Objeto instanciado

De UMA imagem você pode criar MUITOS containers idênticos.`
              }
            },
            { 
              id: 'l1-dock-3', 
              text: { es: 'Puedo correr un container: docker run hello-world', en: 'I can run a container: docker run hello-world', pt: 'Consigo rodar um container: docker run hello-world' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `docker run hello-world

Esto:
1. Busca la imagen "hello-world" localmente
2. Si no la tiene, la descarga de Docker Hub
3. Crea un container y lo ejecuta
4. Muestra un mensaje de bienvenida

💡 docker ps → ver containers corriendo`,
                en: `docker run hello-world

This:
1. Searches for "hello-world" image locally
2. If not found, downloads from Docker Hub
3. Creates a container and runs it
4. Shows a welcome message

💡 docker ps → see running containers`,
                pt: `docker run hello-world

Isso:
1. Busca a imagem "hello-world" localmente
2. Se não tiver, baixa do Docker Hub
3. Cria um container e executa
4. Mostra uma mensagem de boas-vindas

💡 docker ps → ver containers rodando`
              }
            },
            { 
              id: 'l1-dock-4', 
              text: { es: 'Puedo escribir un Dockerfile básico', en: 'I can write a basic Dockerfile', pt: 'Consigo escrever um Dockerfile básico' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `Dockerfile = receta para crear una imagen Docker.
Creá un archivo llamado "Dockerfile" (sin extensión).

Línea por línea:

FROM python:3.9
→ "Empezá con una imagen base que ya tiene Python 3.9"
→ Es como decir "quiero una compu con Python ya instalado"

WORKDIR /app
→ "Creá una carpeta /app y ponete ahí"
→ Todo lo que sigue se ejecuta en esa carpeta

COPY requirements.txt .
→ "Copiá requirements.txt de MI carpeta al container"
→ El . significa "la carpeta actual" (o sea /app)

RUN pip install -r requirements.txt
→ "Ejecutá este comando para instalar las dependencias"
→ Se ejecuta UNA VEZ cuando se construye la imagen

COPY . .
→ "Copiá TODO mi código al container"
→ El primer . = mi carpeta local
→ El segundo . = /app en el container

CMD ["python", "main.py"]
→ "Cuando el container arranque, ejecutá esto"

💡 El requirements.txt tiene las librerías:
pandas==2.1.0
requests==2.31.0

Crealo con: pip freeze > requirements.txt`,
                en: `Dockerfile = recipe to create a Docker image.
Create a file named "Dockerfile" (no extension).

Line by line:

FROM python:3.9
→ "Start with a base image that has Python 3.9"
→ It's like saying "I want a computer with Python installed"

WORKDIR /app
→ "Create a folder /app and go there"
→ Everything after executes in that folder

COPY requirements.txt .
→ "Copy requirements.txt from MY folder to the container"
→ The . means "current folder" (i.e., /app)

RUN pip install -r requirements.txt
→ "Run this command to install dependencies"
→ Executes ONCE when image is built

COPY . .
→ "Copy ALL my code to the container"
→ First . = my local folder
→ Second . = /app in the container

CMD ["python", "main.py"]
→ "When container starts, run this"

💡 requirements.txt has the libraries:
pandas==2.1.0
requests==2.31.0

Create it with: pip freeze > requirements.txt`,
                pt: `Dockerfile = receita para criar uma imagem Docker.
Crie um arquivo chamado "Dockerfile" (sem extensão).

Linha por linha:

FROM python:3.9
→ "Comece com uma imagem base que já tem Python 3.9"
→ É como dizer "quero um computador com Python já instalado"

WORKDIR /app
→ "Crie uma pasta /app e vá para lá"
→ Tudo que segue se executa nessa pasta

COPY requirements.txt .
→ "Copie requirements.txt da MINHA pasta para o container"
→ O . significa "pasta atual" (ou seja /app)

RUN pip install -r requirements.txt
→ "Execute este comando para instalar as dependências"
→ Se executa UMA VEZ quando se constrói a imagem

COPY . .
→ "Copie TODO meu código para o container"
→ O primeiro . = minha pasta local
→ O segundo . = /app no container

CMD ["python", "main.py"]
→ "Quando o container iniciar, execute isso"

💡 O requirements.txt tem as bibliotecas:
pandas==2.1.0
requests==2.31.0

Crie com: pip freeze > requirements.txt`
              }
            },
            { 
              id: 'l1-dock-5', 
              text: { es: 'Entiendo docker-compose (para levantar varios containers)', en: 'I understand docker-compose (running multiple containers)', pt: 'Entendo docker-compose (para levantar vários containers)' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `docker-compose = levantar varios containers con UN comando.

Ejemplo real: tu script de Python + PostgreSQL

Archivo docker-compose.yml:

services:
  app:
    build: .
    volumes:
      - ./data:/app/data
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mi_db
    ports:
      - "5432:5432"

Explicación:
- build: . → usa el Dockerfile de la carpeta actual
- volumes → comparte archivos entre tu PC y el container
- depends_on → espera a que db arranque primero
- environment → variables de entorno
- ports → "5432:5432" = puerto local:puerto container

Comandos:
docker-compose up       # Levanta todo
docker-compose up -d    # Levanta en background
docker-compose down     # Para y borra todo
docker-compose logs -f  # Ver logs en tiempo real`,
                en: `docker-compose = start multiple containers with ONE command.

Real example: your Python script + PostgreSQL

File docker-compose.yml:

services:
  app:
    build: .
    volumes:
      - ./data:/app/data
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: my_db
    ports:
      - "5432:5432"

Explanation:
- build: . → uses Dockerfile from current folder
- volumes → share files between your PC and container
- depends_on → waits for db to start first
- environment → environment variables
- ports → "5432:5432" = local port:container port

Commands:
docker-compose up       # Start everything
docker-compose up -d    # Start in background
docker-compose down     # Stop and remove everything
docker-compose logs -f  # View logs in real time`,
                pt: `docker-compose = levantar vários containers com UM comando.

Exemplo real: seu script de Python + PostgreSQL

Arquivo docker-compose.yml:

services:
  app:
    build: .
    volumes:
      - ./data:/app/data
    depends_on:
      - db
  db:
    image: postgres:15
    environment:
      POSTGRES_USER: usuario
      POSTGRES_PASSWORD: password
      POSTGRES_DB: meu_db
    ports:
      - "5432:5432"

Explicação:
- build: . → usa o Dockerfile da pasta atual
- volumes → compartilha arquivos entre seu PC e o container
- depends_on → espera db iniciar primeiro
- environment → variáveis de ambiente
- ports → "5432:5432" = porta local:porta container

Comandos:
docker-compose up       # Levanta tudo
docker-compose up -d    # Levanta em background
docker-compose down     # Para e remove tudo
docker-compose logs -f  # Ver logs em tempo real`
              }
            },
            { 
              id: 'l1-dock-6', 
              text: { es: 'Puedo explicar por qué Docker es útil en Data Engineering', en: 'I can explain why Docker is useful in Data Engineering', pt: 'Consigo explicar por que Docker é útil em Data Engineering' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `Docker resuelve: "En mi máquina funciona"

Beneficios en DE:
✅ Entornos reproducibles (misma versión de Python, libs)
✅ Fácil de deployar pipelines
✅ Aislamiento (cada pipeline tiene sus dependencias)
✅ Escalabilidad (Kubernetes usa containers)

💡 Casi todas las herramientas de DE corren en Docker.`,
                en: `Docker solves: "It works on my machine"

Benefits in DE:
✅ Reproducible environments (same Python version, libs)
✅ Easy to deploy pipelines
✅ Isolation (each pipeline has its dependencies)
✅ Scalability (Kubernetes uses containers)

💡 Almost all DE tools run on Docker.`,
                pt: `Docker resolve: "Na minha máquina funciona"

Benefícios em DE:
✅ Ambientes reproduzíveis (mesma versão de Python, libs)
✅ Fácil de fazer deploy de pipelines
✅ Isolamento (cada pipeline tem suas dependências)
✅ Escalabilidade (Kubernetes usa containers)

💡 Quase todas as ferramentas de DE rodam em Docker.`
              }
            },
          ],
          stopTitle: { es: '💡 Historia real: Por qué Docker me salvó', en: '💡 Real story: Why Docker saved me', pt: '💡 História real: Por que Docker me salvou' },
          stopContent: {
            es: `Mi primer laburo en datos: desarrollé un pipeline de Python en mi laptop (Mac). Lo subí al servidor (Linux). No funcionaba. "Pero en mi máquina funciona", le dije a mi jefe. Me miró con cara de "todos dicen eso". Perdí 2 días debuggeando versiones de librerías.

Si hubiera usado Docker: docker build + docker run. Mismo resultado en cualquier máquina. Fin del problema.

Desde ese día, TODO lo que hago va en Docker. Es estándar en la industria y te ahorra dolores de cabeza infinitos.`,
            en: `My first data job: I developed a Python pipeline on my laptop (Mac). Uploaded it to the server (Linux). Didn't work. "But it works on my machine," I told my boss. He looked at me like "everyone says that." Lost 2 days debugging library versions.

If I had used Docker: docker build + docker run. Same result on any machine. Problem solved.

Since that day, EVERYTHING I do goes in Docker. It's industry standard and saves you infinite headaches.`,
            pt: `Meu primeiro trabalho em dados: desenvolvi um pipeline de Python no meu laptop (Mac). Subi para o servidor (Linux). Não funcionou. "Mas na minha máquina funciona", disse para meu chefe. Ele me olhou com cara de "todo mundo diz isso". Perdi 2 dias debugando versões de bibliotecas.

Se eu tivesse usado Docker: docker build + docker run. Mesmo resultado em qualquer máquina. Problema resolvido.

Desde aquele dia, TUDO o que eu faço vai em Docker. É padrão na indústria e te poupa dores de cabeça infinitas.`
          }
        },
        {
          id: 'l1-docker-practica',
          title: { es: '🎯 Práctica: Dockerizá un Proyecto', en: '🎯 Practice: Dockerize a Project', pt: '🎯 Prática: Dockerize um Projeto' },
          description: {
            es: 'Agarrá uno de tus proyectos de Python y dockerizalo. Esto te da puntos extra en cualquier entrevista.',
            en: 'Take one of your Python projects and dockerize it. This gives you extra points in any interview.',
            pt: 'Pegue um dos seus projetos de Python e dockerize. Isso te dá pontos extras em qualquer entrevista.'
          },
          steps: [
            { 
              id: 'l1-dockp-1', 
              text: { es: 'Elegí un proyecto de Python para dockerizar', en: 'Chose a Python project to dockerize', pt: 'Escolhi um projeto de Python para dockerizar' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `Recomendado: uno de tus proyectos de ETL o análisis.

Necesitás:
- main.py (o el script principal)
- requirements.txt (con las dependencias)`,
                en: `Recommended: one of your ETL or analysis projects.

You need:
- main.py (or main script)
- requirements.txt (with dependencies)`,
                pt: `Recomendado: um dos seus projetos de ETL ou análise.

Você precisa:
- main.py (ou o script principal)
- requirements.txt (com as dependências)`
              }
            },
            { 
              id: 'l1-dockp-2', 
              text: { es: 'Creé Dockerfile con Python, dependencias, y script', en: 'Created Dockerfile with Python, dependencies, and script', pt: 'Criei Dockerfile com Python, dependências e script' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `Creá un archivo llamado "Dockerfile" (sin extensión):

FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]`,
                en: `Create a file named "Dockerfile" (no extension):

FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]`,
                pt: `Crie um arquivo chamado "Dockerfile" (sem extensão):

FROM python:3.9-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "main.py"]`
              }
            },
            { 
              id: 'l1-dockp-3', 
              text: { es: 'Puedo correr mi proyecto con: docker build + docker run', en: 'I can run my project with: docker build + docker run', pt: 'Consigo rodar meu projeto com: docker build + docker run' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `Paso 1: CREAR la imagen

docker build -t mi-proyecto .

Explicación:
- docker build = "construí una imagen"
- -t mi-proyecto = "dale este nombre (tag)"
- . = "buscá el Dockerfile en la carpeta ACTUAL"

⚠️ El . es importante! Tenés que estar en la carpeta donde está el Dockerfile.

Paso 2: CORRER un container

docker run mi-proyecto

Opciones útiles:
docker run -it mi-proyecto        # Modo interactivo (podés escribir)
docker run -d mi-proyecto         # En background (no bloquea terminal)
docker run --rm mi-proyecto       # Borra container al terminar

Paso 3: Si necesitás ARCHIVOS del container

docker run -v $(pwd)/data:/app/data mi-proyecto

Esto "conecta" tu carpeta local data/ con /app/data en el container.
Así podés leer/escribir archivos.

💡 Verificar que funcionó:
docker images           # Ver imágenes creadas
docker ps              # Ver containers corriendo
docker ps -a           # Ver TODOS los containers (incluso parados)`,
                en: `Step 1: CREATE the image

docker build -t my-project .

Explanation:
- docker build = "build an image"
- -t my-project = "give it this name (tag)"
- . = "look for Dockerfile in CURRENT folder"

⚠️ The . is important! You must be in the folder where Dockerfile is.

Step 2: RUN a container

docker run my-project

Useful options:
docker run -it my-project        # Interactive mode (you can type)
docker run -d my-project         # Background (doesn't block terminal)
docker run --rm my-project       # Delete container when finished

Step 3: If you need FILES from container

docker run -v $(pwd)/data:/app/data my-project

This "connects" your local data/ folder with /app/data in container.
So you can read/write files.

💡 Verify it worked:
docker images           # See created images
docker ps              # See running containers
docker ps -a           # See ALL containers (even stopped)`,
                pt: `Passo 1: CRIAR a imagem

docker build -t meu-projeto .

Explicação:
- docker build = "construa uma imagem"
- -t meu-projeto = "dê este nome (tag)"
- . = "procure o Dockerfile na pasta ATUAL"

⚠️ O . é importante! Você precisa estar na pasta onde está o Dockerfile.

Passo 2: RODAR um container

docker run meu-projeto

Opções úteis:
docker run -it meu-projeto        # Modo interativo (pode digitar)
docker run -d meu-projeto         # Em background (não bloqueia terminal)
docker run --rm meu-projeto       # Apaga container ao terminar

Passo 3: Se precisar de ARQUIVOS do container

docker run -v $(pwd)/data:/app/data meu-projeto

Isso "conecta" sua pasta local data/ com /app/data no container.
Assim pode ler/escrever arquivos.

💡 Verificar que funcionou:
docker images           # Ver imagens criadas
docker ps              # Ver containers rodando
docker ps -a           # Ver TODOS os containers (mesmo parados)`
              }
            },
            { 
              id: 'l1-dockp-4', 
              text: { es: 'Subí el Dockerfile a mi repo de GitHub', en: 'Uploaded Dockerfile to my GitHub repo', pt: 'Subi o Dockerfile para o meu repo no GitHub' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `git add Dockerfile
git commit -m "Add Docker support"
git push

💡 El Dockerfile demuestra que sabés containerizar.`,
                en: `git add Dockerfile
git commit -m "Add Docker support"
git push

💡 The Dockerfile demonstrates you know how to containerize.`,
                pt: `git add Dockerfile
git commit -m "Add Docker support"
git push

💡 O Dockerfile demonstra que você sabe containerizar.`
              }
            },
            { 
              id: 'l1-dockp-5', 
              text: { es: 'Agregué instrucciones de Docker al README', en: 'Added Docker instructions to README', pt: 'Adicionei instruções de Docker ao README' },
              type: 'task', 
              checkbox: true, 
              explanation: {
                es: `Agregá una sección "Docker" al README:

## Docker
\`\`\`bash
docker build -t mi-proyecto .
docker run mi-proyecto
\`\`\`

💡 Hace que tu proyecto sea fácil de usar para cualquiera.`,
                en: `Add a "Docker" section to README:

## Docker
\`\`\`bash
docker build -t my-project .
docker run my-project
\`\`\`

💡 Makes your project easy to use for anyone.`,
                pt: `Adicione uma seção "Docker" ao README:

## Docker
\`\`\`bash
docker build -t meu-projeto .
docker run meu-projeto
\`\`\`

💡 Faz com que seu projeto seja fácil de usar para qualquer um.`
              }
            },
          ]
        },
        {
          id: 'l1-linux',
          title: { es: '🐧 Linux/Terminal - Lo Básico', en: '🐧 Linux/Terminal - The Basics', pt: '🐧 Linux/Terminal - O Básico' },
          description: {
            es: 'La mayoría de los servidores corren Linux. No necesitás ser sysadmin, pero sí moverte cómodo en la terminal.',
            en: 'Most servers run Linux. You don\'t need to be a sysadmin, but you need to be comfortable in the terminal.',
            pt: 'A maioria dos servidores roda Linux. Não precisa ser sysadmin, mas precisa se mover confortável no terminal.'
          },
          steps: [
            { 
              id: 'l1-lin-1', 
              text: { es: 'Sé navegar: cd, ls, pwd', en: 'I can navigate: cd, ls, pwd', pt: 'Sei navegar: cd, ls, pwd' }, 
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'Tutorial Linux para principiantes', en: 'Linux tutorial for beginners', pt: 'Tutorial Linux para iniciantes' }, link: 'https://ubuntu.com/tutorials/command-line-for-beginners' },
              explanation: {
                es: `Comandos de navegación:

pwd (print working directory)
→ Te dice DÓNDE estás
→ Ejemplo: /Users/juan/proyectos

ls (list)
→ Te muestra qué archivos hay en la carpeta actual
→ ls -la muestra archivos ocultos y detalles

cd (change directory)
→ Te mueve a otra carpeta
→ cd proyectos → entrás a la carpeta "proyectos"
→ cd .. → volvés a la carpeta anterior
→ cd ~ → volvés a tu carpeta home

💡 Ejemplo práctico:
pwd                    # Estoy en /home/juan
ls                     # Veo: documentos proyectos
cd proyectos           # Entro a proyectos
pwd                    # Ahora estoy en /home/juan/proyectos`,
                en: `Navigation commands:

pwd (print working directory)
→ Tells you WHERE you are
→ Example: /Users/john/projects

ls (list)
→ Shows what files are in the current folder
→ ls -la shows hidden files and details

cd (change directory)
→ Moves you to another folder
→ cd projects → enter "projects" folder
→ cd .. → go back to previous folder
→ cd ~ → go to your home folder

💡 Practical example:
pwd                    # I'm at /home/john
ls                     # I see: documents projects
cd projects            # Enter projects
pwd                    # Now I'm at /home/john/projects`,
                pt: `Comandos de navegação:

pwd (print working directory)
→ Te diz ONDE você está
→ Exemplo: /Users/joao/projetos

ls (list)
→ Te mostra quais arquivos há na pasta atual
→ ls -la mostra arquivos ocultos e detalhes

cd (change directory)
→ Te move para outra pasta
→ cd projetos → entra na pasta "projetos"
→ cd .. → volta para a pasta anterior
→ cd ~ → volta para sua pasta home

💡 Exemplo prático:
pwd                    # Estou em /home/joao
ls                     # Vejo: documentos projetos
cd projetos            # Entro em projetos
pwd                    # Agora estou em /home/joao/projetos`
              }
            },
            { 
              id: 'l1-lin-2', 
              text: { es: 'Sé manipular archivos: cp, mv, rm, mkdir', en: 'I can manipulate files: cp, mv, rm, mkdir', pt: 'Sei manipular arquivos: cp, mv, rm, mkdir' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Comandos para archivos:

mkdir (make directory)
→ Crea una carpeta nueva
→ mkdir mi-proyecto

cp (copy)
→ Copia un archivo
→ cp original.txt copia.txt
→ cp -r carpeta/ carpeta_backup/  # -r para carpetas

mv (move/rename)
→ Mueve O renombra archivos
→ mv archivo.txt carpeta/  # Mover
→ mv viejo.txt nuevo.txt   # Renombrar

rm (remove)
→ BORRA archivos (¡cuidado, no hay papelera!)
→ rm archivo.txt
→ rm -r carpeta/  # Borra carpeta y todo su contenido

⚠️ CUIDADO: rm no tiene "deshacer". Verificá bien antes de borrar.`,
                en: `File commands:

mkdir (make directory)
→ Creates a new folder
→ mkdir my-project

cp (copy)
→ Copies a file
→ cp original.txt copy.txt
→ cp -r folder/ folder_backup/  # -r for folders

mv (move/rename)
→ Moves OR renames files
→ mv file.txt folder/  # Move
→ mv old.txt new.txt   # Rename

rm (remove)
→ DELETES files (careful, no recycle bin!)
→ rm file.txt
→ rm -r folder/  # Deletes folder and all contents

⚠️ WARNING: rm has no "undo". Verify before deleting.`,
                pt: `Comandos para arquivos:

mkdir (make directory)
→ Cria uma pasta nova
→ mkdir meu-projeto

cp (copy)
→ Copia um arquivo
→ cp original.txt copia.txt
→ cp -r pasta/ pasta_backup/  # -r para pastas

mv (move/rename)
→ Move OU renomeia arquivos
→ mv arquivo.txt pasta/  # Mover
→ mv velho.txt novo.txt   # Renomear

rm (remove)
→ APAGA arquivos (cuidado, não tem lixeira!)
→ rm arquivo.txt
→ rm -r pasta/  # Apaga pasta e todo seu conteúdo

⚠️ CUIDADO: rm não tem "desfazer". Verifique bem antes de apagar.`
              }
            },
            { 
              id: 'l1-lin-3', 
              text: { es: 'Sé ver contenido: cat, head, tail, less', en: 'I can view content: cat, head, tail, less', pt: 'Sei ver conteúdo: cat, head, tail, less' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Comandos para ver archivos:

cat (concatenate)
→ Muestra TODO el contenido del archivo
→ cat datos.csv

head
→ Muestra las primeras 10 líneas
→ head datos.csv
→ head -n 20 datos.csv  # Primeras 20 líneas

tail
→ Muestra las últimas 10 líneas
→ tail datos.csv
→ tail -f logs.txt  # Sigue el archivo en tiempo real (útil para logs!)

less
→ Abre el archivo para navegar
→ less datos.csv
→ Usá flechas para moverte, 'q' para salir

💡 Para Data Engineering:
- head -n 5 datos.csv → Ver estructura del CSV
- tail -f pipeline.log → Monitorear logs en tiempo real`,
                en: `Commands to view files:

cat (concatenate)
→ Shows ALL file content
→ cat data.csv

head
→ Shows first 10 lines
→ head data.csv
→ head -n 20 data.csv  # First 20 lines

tail
→ Shows last 10 lines
→ tail data.csv
→ tail -f logs.txt  # Follow file in real time (useful for logs!)

less
→ Opens file for navigation
→ less data.csv
→ Use arrows to move, 'q' to exit

💡 For Data Engineering:
- head -n 5 data.csv → See CSV structure
- tail -f pipeline.log → Monitor logs in real time`,
                pt: `Comandos para ver arquivos:

cat (concatenate)
→ Mostra TODO o conteúdo do arquivo
→ cat dados.csv

head
→ Mostra as primeiras 10 linhas
→ head dados.csv
→ head -n 20 dados.csv  # Primeiras 20 linhas

tail
→ Mostra as últimas 10 linhas
→ tail dados.csv
→ tail -f logs.txt  # Segue o arquivo em tempo real (útil para logs!)

less
→ Abre o arquivo para navegar
→ less dados.csv
→ Use setas para mover, 'q' para sair

💡 Para Data Engineering:
- head -n 5 dados.csv → Ver estrutura do CSV
- tail -f pipeline.log → Monitorar logs em tempo real`
              }
            },
            { 
              id: 'l1-lin-4', 
              text: { es: 'Sé buscar: grep, find', en: 'I can search: grep, find', pt: 'Sei buscar: grep, find' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Comandos de búsqueda:

grep (buscar DENTRO de archivos)
→ Busca texto dentro de archivos
→ grep "error" logs.txt
→ grep -i "ERROR" logs.txt  # -i ignora mayúsculas/minúsculas
→ grep -r "password" .      # -r busca en todos los archivos recursivamente

find (buscar archivos)
→ Busca archivos por nombre
→ find . -name "*.csv"      # Todos los CSV en carpeta actual
→ find . -name "datos*"     # Archivos que empiezan con "datos"
→ find . -type d -name "data"  # Solo carpetas llamadas "data"

💡 Combinación poderosa:
grep -r "SELECT" . --include="*.sql"
→ Busca "SELECT" en todos los archivos .sql`,
                en: `Search commands:

grep (search INSIDE files)
→ Searches text within files
→ grep "error" logs.txt
→ grep -i "ERROR" logs.txt  # -i ignores case
→ grep -r "password" .      # -r searches all files recursively

find (search for files)
→ Searches files by name
→ find . -name "*.csv"      # All CSVs in current folder
→ find . -name "data*"      # Files starting with "data"
→ find . -type d -name "data"  # Only folders named "data"

💡 Powerful combination:
grep -r "SELECT" . --include="*.sql"
→ Search "SELECT" in all .sql files`,
                pt: `Comandos de busca:

grep (buscar DENTRO de arquivos)
→ Busca texto dentro de arquivos
→ grep "error" logs.txt
→ grep -i "ERROR" logs.txt  # -i ignora maiúsculas/minúsculas
→ grep -r "password" .      # -r busca em todos os arquivos recursivamente

find (buscar arquivos)
→ Busca arquivos por nome
→ find . -name "*.csv"      # Todos os CSV na pasta atual
→ find . -name "dados*"     # Arquivos que começam com "dados"
→ find . -type d -name "data"  # Só pastas chamadas "data"

💡 Combinação poderosa:
grep -r "SELECT" . --include="*.sql"
→ Busca "SELECT" em todos os arquivos .sql`
              }
            },
            { 
              id: 'l1-lin-5', 
              text: { es: 'Entiendo permisos básicos (chmod)', en: 'I understand basic permissions (chmod)', pt: 'Entendo permissões básicas (chmod)' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Permisos en Linux (simplificado):

Cada archivo tiene 3 tipos de permisos:
r (read) = leer
w (write) = escribir/modificar
x (execute) = ejecutar (para scripts)

chmod (change mode)
→ Cambia permisos de un archivo

Ejemplos útiles:
chmod +x script.sh    # Hacer ejecutable
chmod 755 script.sh   # Lectura+ejecución para todos, escritura solo dueño

💡 Lo más común que vas a necesitar:
chmod +x mi_script.sh  # Para poder ejecutar: ./mi_script.sh

No te preocupes por los números (755, 644) por ahora - 
con +x para ejecutar y +r para leer alcanza.`,
                en: `Linux permissions (simplified):

Each file has 3 types of permissions:
r (read) = read
w (write) = write/modify
x (execute) = execute (for scripts)

chmod (change mode)
→ Changes file permissions

Useful examples:
chmod +x script.sh    # Make executable
chmod 755 script.sh   # Read+execute for all, write only owner

💡 Most common thing you'll need:
chmod +x my_script.sh  # To be able to run: ./my_script.sh

Don't worry about numbers (755, 644) for now - 
+x to execute and +r to read is enough.`,
                pt: `Permissões em Linux (simplificado):

Cada arquivo tem 3 tipos de permissões:
r (read) = ler
w (write) = escrever/modificar
x (execute) = executar (para scripts)

chmod (change mode)
→ Muda permissões de um arquivo

Exemplos úteis:
chmod +x script.sh    # Tornar executável
chmod 755 script.sh   # Leitura+execução para todos, escrita só dono

💡 O mais comum que vai precisar:
chmod +x meu_script.sh  # Para poder executar: ./meu_script.sh

Não se preocupe com números (755, 644) por agora - 
com +x para executar e +r para ler é suficiente.`
              }
            },
            { 
              id: 'l1-lin-6', 
              text: { es: 'Sé usar pipes (|) para combinar comandos', en: 'I know how to use pipes (|) to combine commands', pt: 'Sei usar pipes (|) para combinar comandos' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Pipes (|) = conectar la salida de un comando con la entrada de otro

cat datos.csv | head -n 5
→ Ver primeras 5 líneas del CSV

grep "ERROR" logs.txt | wc -l
→ Contar cuántos errores hay (wc -l = contar líneas)

cat datos.csv | grep "Argentina" | head -n 10
→ Filtrar filas de Argentina, mostrar primeras 10

💡 Redirección:
comando > archivo.txt   # Guarda salida en archivo (sobrescribe)
comando >> archivo.txt  # Agrega al final del archivo

Ejemplo:
grep "ERROR" logs.txt > errores.txt
→ Guarda todos los errores en un archivo nuevo`,
                en: `Pipes (|) = connect output of one command to input of another

cat data.csv | head -n 5
→ See first 5 lines of CSV

grep "ERROR" logs.txt | wc -l
→ Count how many errors (wc -l = count lines)

cat data.csv | grep "USA" | head -n 10
→ Filter USA rows, show first 10

💡 Redirection:
command > file.txt   # Save output to file (overwrites)
command >> file.txt  # Append to end of file

Example:
grep "ERROR" logs.txt > errors.txt
→ Save all errors to a new file`,
                pt: `Pipes (|) = conectar a saída de um comando com a entrada de outro

cat dados.csv | head -n 5
→ Ver primeiras 5 linhas do CSV

grep "ERROR" logs.txt | wc -l
→ Contar quantos erros há (wc -l = contar linhas)

cat dados.csv | grep "Brasil" | head -n 10
→ Filtrar linhas do Brasil, mostrar primeiras 10

💡 Redirecionamento:
comando > arquivo.txt   # Salva saída em arquivo (sobrescreve)
comando >> arquivo.txt  # Adiciona ao final do arquivo

Exemplo:
grep "ERROR" logs.txt > erros.txt
→ Salva todos os erros em um arquivo novo`
              }
            },
          ],
          stopTitle: { es: '💻 Practica en tu terminal', en: '💻 Practice in your terminal', pt: '💻 Pratique no seu terminal' },
          stopContent: {
            es: 'Si usás Mac o Linux, ya tenés terminal. Si usás Windows, instalá WSL (Windows Subsystem for Linux): microsoft.com/wsl. Practica navegando, creando archivos, usando grep. 10 minutos por día durante una semana y ya estás.',
            en: 'If you use Mac or Linux, you already have a terminal. If you use Windows, install WSL (Windows Subsystem for Linux): microsoft.com/wsl. Practice navigating, creating files, using grep. 10 minutes a day for a week and you\'re set.',
            pt: 'Se usa Mac ou Linux, já tem terminal. Se usa Windows, instale WSL (Windows Subsystem for Linux): microsoft.com/wsl. Pratique navegando, criando arquivos, usando grep. 10 minutos por dia durante uma semana e já está.'
          }
        },
      ]
    },
    // ========== CAPÍTULO 10: AWS BÁSICO ==========
    {
      id: 'l1-aws',
      title: { es: 'AWS: Tu Primer Paso en la Nube', en: 'AWS: Your First Step in the Cloud', pt: 'AWS: Seu Primeiro Passo na Nuvem' },
      emoji: '☁️',
      sections: [
        {
          id: 'l1-aws-intro',
          title: { es: '☁️ Por qué AWS', en: '☁️ Why AWS', pt: '☁️ Por que AWS' },
          description: {
            es: 'El 90% de las empresas usan algún cloud. AWS es el más grande (32% del mercado). Si aprendés AWS, podés aplicar a la mayoría de los trabajos. GCP y Azure son similares - lo que aprendas acá te sirve para todos.',
            en: 'The 90% of companies use some cloud. AWS is the largest (32% market share). If you learn AWS, you can apply to most jobs. GCP and Azure are similar - what you learn here applies to all.',
            pt: 'O 90% das empresas usam alguma nuvem. AWS é o maior (32% do mercado). Se aprender AWS, pode se candidatar à maioria dos trabalhos. GCP e Azure são similares - o que aprender aqui serve para todos.'
          },
          steps: [
            { 
              id: 'l1-aws-1', 
              text: { es: 'Entiendo qué es la nube y por qué las empresas la usan', en: 'I understand what the cloud is and why companies use it', pt: 'Entendo o que é a nuvem e por que as empresas a usam' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `¿Por qué la nube?

🏢 Antes (servidores propios):
❌ Comprar hardware caro
❌ Mantener data centers
❌ Escalar = comprar más hardware
❌ Pagar aunque no uses

☁️ Ahora (nube):
✅ Pagás solo lo que usás
✅ Escalás en minutos
✅ No mantenés hardware
✅ Acceso desde cualquier lugar

Para Data Engineering esto es CLAVE porque:
- Los datos crecen constantemente
- Necesitás escalar rápido
- No querés límites de capacidad`,
                en: `Why the cloud?

🏢 Before (own servers):
❌ Buy expensive hardware
❌ Maintain data centers
❌ Scale = buy more hardware
❌ Pay even if you don't use

☁️ Now (cloud):
✅ Pay only what you use
✅ Scale in minutes
✅ Don't maintain hardware
✅ Access from anywhere

For Data Engineering this is KEY because:
- Data grows constantly
- You need to scale fast
- You don't want capacity limits`,
                pt: `Por que a nuvem?

🏢 Antes (servidores próprios):
❌ Comprar hardware caro
❌ Manter data centers
❌ Escalar = comprar mais hardware
❌ Pagar mesmo sem usar

☁️ Agora (nuvem):
✅ Paga só o que usa
✅ Escala em minutos
✅ Não mantém hardware
✅ Acesso de qualquer lugar

Para Data Engineering isso é CHAVE porque:
- Os dados crescem constantemente
- Precisa escalar rápido
- Não quer limites de capacidade`
              }
            },
            { 
              id: 'l1-aws-2', 
              text: { es: 'Creé mi cuenta de AWS (Free Tier)', en: 'Created my AWS account (Free Tier)', pt: 'Criei minha conta AWS (Free Tier)' },
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'Crear cuenta AWS', en: 'Create AWS account', pt: 'Criar conta AWS' }, link: 'https://aws.amazon.com/free/' }
            },
            { 
              id: 'l1-aws-3', 
              text: { es: 'Entiendo qué es IAM (usuarios, roles, permisos)', en: 'I understand what IAM is (users, roles, permissions)', pt: 'Entendo o que é IAM (usuários, roles, permissões)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `IAM = Identity and Access Management

Es el "guardia de seguridad" de AWS. Controla:
- QUIÉN puede acceder (usuarios)
- QUÉ puede hacer (permisos)
- DÓNDE puede hacerlo (recursos)

Conceptos clave:
👤 Usuario: Una persona o aplicación
📋 Política: Lista de permisos
🎭 Rol: Permisos temporales para servicios

Ejemplo: Tu script de Python puede LEER de S3 pero NO puede BORRAR.

⚠️ NUNCA uses el usuario root para trabajar. Creá un usuario IAM.`,
                en: `IAM = Identity and Access Management

It's the "security guard" of AWS. Controls:
- WHO can access (users)
- WHAT they can do (permissions)
- WHERE they can do it (resources)

Key concepts:
👤 User: A person or application
📋 Policy: List of permissions
🎭 Role: Temporary permissions for services

Example: Your Python script can READ from S3 but CANNOT DELETE.

⚠️ NEVER use the root user for work. Create an IAM user.`,
                pt: `IAM = Identity and Access Management

É o "guarda de segurança" da AWS. Controla:
- QUEM pode acessar (usuários)
- O QUE pode fazer (permissões)
- ONDE pode fazer (recursos)

Conceitos chave:
👤 Usuário: Uma pessoa ou aplicação
📋 Política: Lista de permissões
🎭 Role: Permissões temporárias para serviços

Exemplo: Seu script Python pode LER do S3 mas NÃO pode DELETAR.

⚠️ NUNCA use o usuário root para trabalhar. Crie um usuário IAM.`
              }
            },
            { id: 'l1-aws-4', text: { es: 'Creé un usuario IAM con permisos de S3', en: 'Created IAM user with S3 permissions', pt: 'Criei um usuário IAM com permissões de S3' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l1-aws-s3',
          title: { es: '🪣 S3: Tu Primer Bucket', en: '🪣 S3: Your First Bucket', pt: '🪣 S3: Seu Primeiro Bucket' },
          description: {
            es: 'S3 es el servicio de almacenamiento de AWS. Pensalo como un "Dropbox infinito" pero para datos. El 99% de los Data Engineers lo usan diariamente.',
            en: 'S3 is AWS storage service. Think of it as an "infinite Dropbox" but for data. 99% of Data Engineers use it daily.',
            pt: 'S3 é o serviço de armazenamento da AWS. Pense como um "Dropbox infinito" mas para dados. 99% dos Data Engineers usam diariamente.'
          },
          steps: [
            { 
              id: 'l1-s3-1', 
              text: { es: 'Entiendo qué es S3 (Simple Storage Service)', en: 'I understand what S3 is (Simple Storage Service)', pt: 'Entendo o que é S3 (Simple Storage Service)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `S3 = Simple Storage Service

📦 Bucket = carpeta principal (nombre único global)
📄 Object = cualquier archivo (CSV, Parquet, JSON, imágenes)
🔑 Key = ruta del archivo: s3://mi-bucket/datos/ventas.csv

Estructura típica en Data Engineering:
s3://empresa-data/
├── raw/           ← datos crudos
│   ├── ventas/
│   └── clientes/
├── processed/     ← datos transformados
└── analytics/     ← datos para reportes

Ventajas:
✅ Almacenamiento "infinito"
✅ Muy barato ($0.023/GB/mes)
✅ Alta disponibilidad (99.99%)
✅ Se integra con TODO en AWS`,
                en: `S3 = Simple Storage Service

📦 Bucket = main folder (globally unique name)
📄 Object = any file (CSV, Parquet, JSON, images)
🔑 Key = file path: s3://my-bucket/data/sales.csv

Typical Data Engineering structure:
s3://company-data/
├── raw/           ← raw data
│   ├── sales/
│   └── customers/
├── processed/     ← transformed data
└── analytics/     ← reporting data

Advantages:
✅ "Infinite" storage
✅ Very cheap ($0.023/GB/month)
✅ High availability (99.99%)
✅ Integrates with EVERYTHING in AWS`,
                pt: `S3 = Simple Storage Service

📦 Bucket = pasta principal (nome único global)
📄 Object = qualquer arquivo (CSV, Parquet, JSON, imagens)
🔑 Key = caminho do arquivo: s3://meu-bucket/dados/vendas.csv

Estrutura típica em Data Engineering:
s3://empresa-data/
├── raw/           ← dados brutos
│   ├── vendas/
│   └── clientes/
├── processed/     ← dados transformados
└── analytics/     ← dados para relatórios

Vantagens:
✅ Armazenamento "infinito"
✅ Muito barato ($0.023/GB/mês)
✅ Alta disponibilidade (99.99%)
✅ Se integra com TUDO na AWS`
              }
            },
            { id: 'l1-s3-2', text: { es: 'Creé mi primer bucket de S3', en: 'Created my first S3 bucket', pt: 'Criei meu primeiro bucket S3' }, type: 'task', checkbox: true },
            { id: 'l1-s3-3', text: { es: 'Subí un archivo CSV manualmente (consola web)', en: 'Uploaded a CSV file manually (web console)', pt: 'Subi um arquivo CSV manualmente (console web)' }, type: 'task', checkbox: true },
            { 
              id: 'l1-s3-4', 
              text: { es: 'Configuré AWS CLI en mi computadora', en: 'Configured AWS CLI on my computer', pt: 'Configurei AWS CLI no meu computador' },
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'Instalar AWS CLI', en: 'Install AWS CLI', pt: 'Instalar AWS CLI' }, link: 'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html' },
              explanation: {
                es: `AWS CLI = Command Line Interface

Te permite interactuar con AWS desde tu terminal:

# Configurar credenciales
aws configure

# Listar buckets
aws s3 ls

# Subir archivo
aws s3 cp archivo.csv s3://mi-bucket/datos/

# Descargar archivo
aws s3 cp s3://mi-bucket/datos/archivo.csv .

# Sincronizar carpeta
aws s3 sync ./local s3://mi-bucket/carpeta/`,
                en: `AWS CLI = Command Line Interface

Lets you interact with AWS from your terminal:

# Configure credentials
aws configure

# List buckets
aws s3 ls

# Upload file
aws s3 cp file.csv s3://my-bucket/data/

# Download file
aws s3 cp s3://my-bucket/data/file.csv .

# Sync folder
aws s3 sync ./local s3://my-bucket/folder/`,
                pt: `AWS CLI = Command Line Interface

Permite interagir com AWS pelo terminal:

# Configurar credenciais
aws configure

# Listar buckets
aws s3 ls

# Subir arquivo
aws s3 cp arquivo.csv s3://meu-bucket/dados/

# Baixar arquivo
aws s3 cp s3://meu-bucket/dados/arquivo.csv .

# Sincronizar pasta
aws s3 sync ./local s3://meu-bucket/pasta/`
              }
            },
            { id: 'l1-s3-5', text: { es: 'Puedo subir/bajar archivos con aws s3 cp', en: 'I can upload/download files with aws s3 cp', pt: 'Consigo subir/baixar arquivos com aws s3 cp' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🐍 Bonus: S3 desde Python', en: '🐍 Bonus: S3 from Python', pt: '🐍 Bonus: S3 desde Python' },
          stopContent: {
            es: `Con boto3 (la librería de AWS para Python) podés leer/escribir a S3:

pip install boto3

import boto3
s3 = boto3.client('s3')

# Subir archivo
s3.upload_file('local.csv', 'mi-bucket', 'datos/archivo.csv')

# Leer con Pandas directamente desde S3
import pandas as pd
df = pd.read_csv('s3://mi-bucket/datos/archivo.csv')`,
            en: `With boto3 (AWS library for Python) you can read/write to S3:

pip install boto3

import boto3
s3 = boto3.client('s3')

# Upload file
s3.upload_file('local.csv', 'my-bucket', 'data/file.csv')

# Read with Pandas directly from S3
import pandas as pd
df = pd.read_csv('s3://my-bucket/data/file.csv')`,
            pt: `Com boto3 (biblioteca AWS para Python) pode ler/escrever no S3:

pip install boto3

import boto3
s3 = boto3.client('s3')

# Subir arquivo
s3.upload_file('local.csv', 'meu-bucket', 'dados/arquivo.csv')

# Ler com Pandas direto do S3
import pandas as pd
df = pd.read_csv('s3://meu-bucket/dados/arquivo.csv')`
          }
        },
        {
          id: 'l1-aws-practica',
          title: { es: '🎯 Práctica: Pipeline a S3', en: '🎯 Practice: Pipeline to S3', pt: '🎯 Prática: Pipeline para S3' },
          description: {
            es: 'Vamos a crear un mini pipeline que procesa datos y los guarda en S3.',
            en: 'Let\'s create a mini pipeline that processes data and saves it to S3.',
            pt: 'Vamos criar um mini pipeline que processa dados e salva no S3.'
          },
          steps: [
            { id: 'l1-aws-p1', text: { es: 'Creé estructura raw/ y processed/ en mi bucket', en: 'Created raw/ and processed/ structure in my bucket', pt: 'Criei estrutura raw/ e processed/ no meu bucket' }, type: 'task', checkbox: true },
            { id: 'l1-aws-p2', text: { es: 'Subí un dataset CSV a raw/', en: 'Uploaded a CSV dataset to raw/', pt: 'Subi um dataset CSV para raw/' }, type: 'task', checkbox: true },
            { id: 'l1-aws-p3', text: { es: 'Hice un script Python que: lee de S3, transforma, guarda en processed/', en: 'Made a Python script that: reads from S3, transforms, saves to processed/', pt: 'Fiz um script Python que: lê do S3, transforma, salva em processed/' }, type: 'task', checkbox: true },
            { id: 'l1-aws-p4', text: { es: 'Completé el proyecto "ETL con Python y S3"', en: 'Completed "ETL with Python and S3" project', pt: 'Completei o projeto "ETL com Python e S3"' }, type: 'task', checkbox: true, resource: { type: 'project', label: { es: 'Ir al Proyecto', en: 'Go to Project', pt: 'Ir ao Projeto' }, projectId: 'p1-etl-python' } },
          ]
        },
      ]
    },
    // ========== CAPÍTULO 11: SNOWFLAKE INTRO ==========
    {
      id: 'l1-snowflake',
      title: { es: 'Snowflake: Tu Primer Data Warehouse', en: 'Snowflake: Your First Data Warehouse', pt: 'Snowflake: Seu Primeiro Data Warehouse' },
      emoji: '❄️',
      sections: [
        {
          id: 'l1-sf-intro',
          title: { es: '❄️ Qué es Snowflake', en: '❄️ What is Snowflake', pt: '❄️ O que é Snowflake' },
          description: {
            es: 'Snowflake es un Data Warehouse en la nube. Pensalo como una base de datos SQL súper potente, optimizada para analytics y Big Data. Es una de las herramientas más pedidas en ofertas laborales.',
            en: 'Snowflake is a cloud Data Warehouse. Think of it as a super powerful SQL database, optimized for analytics and Big Data. It\'s one of the most requested tools in job postings.',
            pt: 'Snowflake é um Data Warehouse na nuvem. Pense como um banco de dados SQL super potente, otimizado para analytics e Big Data. É uma das ferramentas mais pedidas em vagas de emprego.'
          },
          steps: [
            { 
              id: 'l1-sf-1', 
              text: { es: 'Entiendo qué es un Data Warehouse vs Database', en: 'I understand what a Data Warehouse is vs Database', pt: 'Entendo o que é um Data Warehouse vs Database' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Database vs Data Warehouse:

🗃️ Database (PostgreSQL, MySQL):
- Para aplicaciones (tu app web)
- Escrituras rápidas
- Muchas transacciones pequeñas
- Datos "en vivo"

📊 Data Warehouse (Snowflake, BigQuery):
- Para analytics
- Lecturas rápidas de MUCHO dato
- Queries complejos (JOINs de millones de filas)
- Datos históricos

Como Data Engineer, vas a MOVER datos desde Databases hacia el Data Warehouse para que el equipo de analytics pueda analizarlos.`,
                en: `Database vs Data Warehouse:

🗃️ Database (PostgreSQL, MySQL):
- For applications (your web app)
- Fast writes
- Many small transactions
- "Live" data

📊 Data Warehouse (Snowflake, BigQuery):
- For analytics
- Fast reads of LOTS of data
- Complex queries (JOINs of millions of rows)
- Historical data

As a Data Engineer, you'll MOVE data from Databases to the Data Warehouse so the analytics team can analyze it.`,
                pt: `Database vs Data Warehouse:

🗃️ Database (PostgreSQL, MySQL):
- Para aplicações (sua app web)
- Escritas rápidas
- Muitas transações pequenas
- Dados "ao vivo"

📊 Data Warehouse (Snowflake, BigQuery):
- Para analytics
- Leituras rápidas de MUITOS dados
- Queries complexas (JOINs de milhões de linhas)
- Dados históricos

Como Data Engineer, vai MOVER dados de Databases para o Data Warehouse para que o time de analytics possa analisá-los.`
              }
            },
            { 
              id: 'l1-sf-2', 
              text: { es: 'Creé mi cuenta gratuita de Snowflake (30 días)', en: 'Created my free Snowflake account (30 days)', pt: 'Criei minha conta gratuita do Snowflake (30 dias)' },
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'Crear cuenta Snowflake', en: 'Create Snowflake account', pt: 'Criar conta Snowflake' }, link: 'https://signup.snowflake.com/' }
            },
            { 
              id: 'l1-sf-3', 
              text: { es: 'Entiendo la arquitectura de Snowflake', en: 'I understand Snowflake architecture', pt: 'Entendo a arquitetura do Snowflake' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Snowflake tiene 3 capas separadas:

1️⃣ ALMACENAMIENTO (Storage)
- Tus datos guardados en la nube
- Pagás por lo que guardás
- Compresión automática

2️⃣ CÓMPUTO (Warehouses)
- "Máquinas" que procesan queries
- Podés tener varios tamaños (XS, S, M, L, XL)
- Pagás por tiempo de uso
- Se apagan cuando no los usás

3️⃣ SERVICIOS (Cloud Services)
- Login, seguridad, optimización
- Manejo de metadata

Lo genial: Cómputo y Almacenamiento están SEPARADOS.
→ Podés escalar uno sin tocar el otro.`,
                en: `Snowflake has 3 separate layers:

1️⃣ STORAGE
- Your data saved in the cloud
- You pay for what you store
- Automatic compression

2️⃣ COMPUTE (Warehouses)
- "Machines" that process queries
- You can have various sizes (XS, S, M, L, XL)
- Pay for usage time
- They turn off when not in use

3️⃣ SERVICES (Cloud Services)
- Login, security, optimization
- Metadata management

The cool thing: Compute and Storage are SEPARATE.
→ You can scale one without touching the other.`,
                pt: `Snowflake tem 3 camadas separadas:

1️⃣ ARMAZENAMENTO (Storage)
- Seus dados salvos na nuvem
- Paga pelo que armazena
- Compressão automática

2️⃣ COMPUTE (Warehouses)
- "Máquinas" que processam queries
- Pode ter vários tamanhos (XS, S, M, L, XL)
- Paga por tempo de uso
- Se desligam quando não usa

3️⃣ SERVIÇOS (Cloud Services)
- Login, segurança, otimização
- Gerenciamento de metadata

O legal: Compute e Storage são SEPARADOS.
→ Pode escalar um sem tocar no outro.`
              }
            },
          ]
        },
        {
          id: 'l1-sf-practica',
          title: { es: '🎯 Práctica: Cargar tu Primer Dataset', en: '🎯 Practice: Load Your First Dataset', pt: '🎯 Prática: Carregar seu Primeiro Dataset' },
          description: {
            es: 'Vamos a cargar datos a Snowflake y hacer queries.',
            en: 'Let\'s load data to Snowflake and run queries.',
            pt: 'Vamos carregar dados no Snowflake e fazer queries.'
          },
          steps: [
            { id: 'l1-sf-p1', text: { es: 'Creé una database y un schema', en: 'Created a database and a schema', pt: 'Criei um database e um schema' }, type: 'task', checkbox: true },
            { id: 'l1-sf-p2', text: { es: 'Creé un warehouse tamaño XS', en: 'Created an XS size warehouse', pt: 'Criei um warehouse tamanho XS' }, type: 'task', checkbox: true },
            { id: 'l1-sf-p3', text: { es: 'Cargué un CSV usando la UI de Snowflake', en: 'Loaded a CSV using Snowflake UI', pt: 'Carreguei um CSV usando a UI do Snowflake' }, type: 'task', checkbox: true },
            { id: 'l1-sf-p4', text: { es: 'Hice queries SELECT, GROUP BY, JOIN en mis datos', en: 'Ran SELECT, GROUP BY, JOIN queries on my data', pt: 'Fiz queries SELECT, GROUP BY, JOIN nos meus dados' }, type: 'task', checkbox: true },
            { 
              id: 'l1-sf-p5', 
              text: { es: 'Entiendo cómo cargar datos desde S3 (COPY INTO)', en: 'I understand how to load data from S3 (COPY INTO)', pt: 'Entendo como carregar dados do S3 (COPY INTO)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `COPY INTO es el comando para cargar datos masivamente:

-- Crear stage (conexión a S3)
CREATE STAGE my_s3_stage
  URL = 's3://mi-bucket/datos/'
  CREDENTIALS = (AWS_KEY_ID='...' AWS_SECRET_KEY='...');

-- Cargar datos
COPY INTO mi_tabla
FROM @my_s3_stage/archivo.csv
FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1);

Esto es lo que vas a hacer en producción: cargar datos desde S3 a Snowflake automáticamente.`,
                en: `COPY INTO is the command to load data in bulk:

-- Create stage (S3 connection)
CREATE STAGE my_s3_stage
  URL = 's3://my-bucket/data/'
  CREDENTIALS = (AWS_KEY_ID='...' AWS_SECRET_KEY='...');

-- Load data
COPY INTO my_table
FROM @my_s3_stage/file.csv
FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1);

This is what you'll do in production: automatically load data from S3 to Snowflake.`,
                pt: `COPY INTO é o comando para carregar dados em massa:

-- Criar stage (conexão ao S3)
CREATE STAGE my_s3_stage
  URL = 's3://meu-bucket/dados/'
  CREDENTIALS = (AWS_KEY_ID='...' AWS_SECRET_KEY='...');

-- Carregar dados
COPY INTO minha_tabela
FROM @my_s3_stage/arquivo.csv
FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1);

Isso é o que vai fazer em produção: carregar dados do S3 para o Snowflake automaticamente.`
              }
            },
          ],
          stopTitle: { es: '📚 Recursos oficiales', en: '📚 Official resources', pt: '📚 Recursos oficiais' },
          stopContent: {
            es: 'La documentación de Snowflake es excelente. Bookmark: docs.snowflake.com. También tienen cursos gratuitos en learn.snowflake.com',
            en: 'Snowflake documentation is excellent. Bookmark: docs.snowflake.com. They also have free courses at learn.snowflake.com',
            pt: 'A documentação do Snowflake é excelente. Bookmark: docs.snowflake.com. Também têm cursos gratuitos em learn.snowflake.com'
          }
        },
      ]
    },
    // ========== CAPÍTULO 12: dbt FUNDAMENTALS ==========
    {
      id: 'l1-dbt',
      title: { es: 'dbt: Transformaciones Modernas', en: 'dbt: Modern Transformations', pt: 'dbt: Transformações Modernas' },
      emoji: '🔄',
      sections: [
        {
          id: 'l1-dbt-intro',
          title: { es: '🔄 Qué es dbt y por qué importa', en: '🔄 What is dbt and why it matters', pt: '🔄 O que é dbt e por que importa' },
          description: {
            es: 'dbt (data build tool) revolucionó cómo hacemos transformaciones. En vez de escribir scripts complejos, escribís SQL con superpoderes. Es una de las herramientas más demandadas actualmente.',
            en: 'dbt (data build tool) revolutionized how we do transformations. Instead of writing complex scripts, you write SQL with superpowers. It\'s one of the most in-demand tools currently.',
            pt: 'dbt (data build tool) revolucionou como fazemos transformações. Em vez de escrever scripts complexos, você escreve SQL com superpoderes. É uma das ferramentas mais demandadas atualmente.'
          },
          steps: [
            { 
              id: 'l1-dbt-1', 
              text: { es: 'Entiendo el problema que dbt resuelve', en: 'I understand the problem dbt solves', pt: 'Entendo o problema que dbt resolve' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `¿Qué problema resuelve dbt?

🤯 ANTES (caos):
- Scripts SQL sueltos en carpetas
- No sabés qué corre primero
- Sin tests de calidad de datos
- Sin documentación
- "Funciona en mi máquina"

✨ CON dbt (orden):
- Todos los modelos en un repo Git
- Dependencias automáticas (DAG)
- Tests integrados
- Documentación automática
- Versiones y rollback

dbt = SQL + Git + Software Engineering

La idea es simple: transformar datos usando SELECT (no más INSERT/UPDATE manuales).`,
                en: `What problem does dbt solve?

🤯 BEFORE (chaos):
- Loose SQL scripts in folders
- You don't know what runs first
- No data quality tests
- No documentation
- "Works on my machine"

✨ WITH dbt (order):
- All models in a Git repo
- Automatic dependencies (DAG)
- Built-in tests
- Automatic documentation
- Versions and rollback

dbt = SQL + Git + Software Engineering

The idea is simple: transform data using SELECT (no more manual INSERT/UPDATE).`,
                pt: `Que problema dbt resolve?

🤯 ANTES (caos):
- Scripts SQL soltos em pastas
- Não sabe o que roda primeiro
- Sem testes de qualidade de dados
- Sem documentação
- "Funciona na minha máquina"

✨ COM dbt (ordem):
- Todos os modelos em um repo Git
- Dependências automáticas (DAG)
- Testes integrados
- Documentação automática
- Versões e rollback

dbt = SQL + Git + Software Engineering

A ideia é simples: transformar dados usando SELECT (sem mais INSERT/UPDATE manuais).`
              }
            },
            { 
              id: 'l1-dbt-2', 
              text: { es: 'Hice el curso oficial dbt Fundamentals (GRATIS)', en: 'Took official dbt Fundamentals course (FREE)', pt: 'Fiz o curso oficial dbt Fundamentals (GRÁTIS)' },
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'dbt Learn (oficial)', en: 'dbt Learn (official)', pt: 'dbt Learn (oficial)' }, link: 'https://learn.getdbt.com/' }
            },
            { 
              id: 'l1-dbt-3', 
              text: { es: 'Instalé dbt-core en mi computadora', en: 'Installed dbt-core on my computer', pt: 'Instalei dbt-core no meu computador' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Hay dos versiones de dbt:

☁️ dbt Cloud: Versión web (tiene plan gratis)
💻 dbt Core: Versión CLI (100% gratis, open source)

Para empezar, instalá dbt-core:

pip install dbt-snowflake
# o dbt-postgres, dbt-bigquery, etc.

Verificar instalación:
dbt --version`,
                en: `There are two versions of dbt:

☁️ dbt Cloud: Web version (has free plan)
💻 dbt Core: CLI version (100% free, open source)

To start, install dbt-core:

pip install dbt-snowflake
# or dbt-postgres, dbt-bigquery, etc.

Verify installation:
dbt --version`,
                pt: `Existem duas versões de dbt:

☁️ dbt Cloud: Versão web (tem plano grátis)
💻 dbt Core: Versão CLI (100% grátis, open source)

Para começar, instale dbt-core:

pip install dbt-snowflake
# ou dbt-postgres, dbt-bigquery, etc.

Verificar instalação:
dbt --version`
              }
            },
            { 
              id: 'l1-dbt-4', 
              text: { es: 'Creé mi primer proyecto dbt (dbt init)', en: 'Created my first dbt project (dbt init)', pt: 'Criei meu primeiro projeto dbt (dbt init)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Crear un proyecto dbt:

dbt init mi_proyecto

Estructura que se crea:
mi_proyecto/
├── models/           ← tus transformaciones SQL
│   └── example/
├── tests/            ← tests de datos
├── macros/           ← funciones reutilizables
├── seeds/            ← CSV estáticos
├── dbt_project.yml   ← configuración
└── profiles.yml      ← conexión a tu DW

Cada archivo .sql en models/ es un "modelo" = una tabla o vista.`,
                en: `Create a dbt project:

dbt init my_project

Structure created:
my_project/
├── models/           ← your SQL transformations
│   └── example/
├── tests/            ← data tests
├── macros/           ← reusable functions
├── seeds/            ← static CSVs
├── dbt_project.yml   ← configuration
└── profiles.yml      ← connection to your DW

Each .sql file in models/ is a "model" = a table or view.`,
                pt: `Criar um projeto dbt:

dbt init meu_projeto

Estrutura criada:
meu_projeto/
├── models/           ← suas transformações SQL
│   └── example/
├── tests/            ← testes de dados
├── macros/           ← funções reutilizáveis
├── seeds/            ← CSVs estáticos
├── dbt_project.yml   ← configuração
└── profiles.yml      ← conexão ao seu DW

Cada arquivo .sql em models/ é um "modelo" = uma tabela ou view.`
              }
            },
          ]
        },
        {
          id: 'l1-dbt-models',
          title: { es: '📝 Escribiendo Modelos dbt', en: '📝 Writing dbt Models', pt: '📝 Escrevendo Modelos dbt' },
          description: {
            es: 'Un modelo dbt es simplemente un archivo SQL con un SELECT. dbt se encarga del resto.',
            en: 'A dbt model is simply a SQL file with a SELECT. dbt handles the rest.',
            pt: 'Um modelo dbt é simplesmente um arquivo SQL com um SELECT. dbt cuida do resto.'
          },
          steps: [
            { 
              id: 'l1-dbt-m1', 
              text: { es: 'Creé un modelo staging (limpieza de datos)', en: 'Created a staging model (data cleaning)', pt: 'Criei um modelo staging (limpeza de dados)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Modelo de staging (models/staging/stg_customers.sql):

-- Este SELECT se convierte en una tabla/vista automáticamente
SELECT
    id AS customer_id,
    LOWER(TRIM(email)) AS email,
    first_name || ' ' || last_name AS full_name,
    created_at
FROM {{ source('raw', 'customers') }}
WHERE email IS NOT NULL

dbt toma este SELECT y crea la tabla stg_customers.
{{ source() }} es una referencia a tus datos crudos.`,
                en: `Staging model (models/staging/stg_customers.sql):

-- This SELECT becomes a table/view automatically
SELECT
    id AS customer_id,
    LOWER(TRIM(email)) AS email,
    first_name || ' ' || last_name AS full_name,
    created_at
FROM {{ source('raw', 'customers') }}
WHERE email IS NOT NULL

dbt takes this SELECT and creates the stg_customers table.
{{ source() }} is a reference to your raw data.`,
                pt: `Modelo de staging (models/staging/stg_customers.sql):

-- Este SELECT se torna uma tabela/view automaticamente
SELECT
    id AS customer_id,
    LOWER(TRIM(email)) AS email,
    first_name || ' ' || last_name AS full_name,
    created_at
FROM {{ source('raw', 'customers') }}
WHERE email IS NOT NULL

dbt pega este SELECT e cria a tabela stg_customers.
{{ source() }} é uma referência aos seus dados brutos.`
              }
            },
            { 
              id: 'l1-dbt-m2', 
              text: { es: 'Usé ref() para referenciar otros modelos', en: 'Used ref() to reference other models', pt: 'Usei ref() para referenciar outros modelos' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `{{ ref() }} es la magia de dbt.

models/marts/dim_customers.sql:
SELECT
    customer_id,
    full_name,
    email,
    DATEDIFF('day', created_at, CURRENT_DATE) AS days_since_signup
FROM {{ ref('stg_customers') }}  -- ← referencia al modelo staging

Esto hace que:
1. dbt sabe que dim_customers DEPENDE de stg_customers
2. Corre stg_customers PRIMERO
3. Crea el DAG (grafo de dependencias) automáticamente`,
                en: `{{ ref() }} is dbt's magic.

models/marts/dim_customers.sql:
SELECT
    customer_id,
    full_name,
    email,
    DATEDIFF('day', created_at, CURRENT_DATE) AS days_since_signup
FROM {{ ref('stg_customers') }}  -- ← reference to staging model

This means:
1. dbt knows dim_customers DEPENDS on stg_customers
2. Runs stg_customers FIRST
3. Creates the DAG (dependency graph) automatically`,
                pt: `{{ ref() }} é a mágica do dbt.

models/marts/dim_customers.sql:
SELECT
    customer_id,
    full_name,
    email,
    DATEDIFF('day', created_at, CURRENT_DATE) AS days_since_signup
FROM {{ ref('stg_customers') }}  -- ← referência ao modelo staging

Isso faz com que:
1. dbt sabe que dim_customers DEPENDE de stg_customers
2. Roda stg_customers PRIMEIRO
3. Cria o DAG (grafo de dependências) automaticamente`
              }
            },
            { id: 'l1-dbt-m3', text: { es: 'Ejecuté dbt run y vi mis modelos creados', en: 'Ran dbt run and saw my models created', pt: 'Executei dbt run e vi meus modelos criados' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-m4', text: { es: 'Agregué tests básicos (unique, not_null)', en: 'Added basic tests (unique, not_null)', pt: 'Adicionei testes básicos (unique, not_null)' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-m5', text: { es: 'Ejecuté dbt test y todos pasaron', en: 'Ran dbt test and all passed', pt: 'Executei dbt test e todos passaram' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-m6', text: { es: 'Generé documentación con dbt docs generate', en: 'Generated documentation with dbt docs generate', pt: 'Gerei documentação com dbt docs generate' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '📚 Documentación oficial de dbt', en: '📚 Official dbt documentation', pt: '📚 Documentação oficial do dbt' },
          stopContent: {
            es: 'La documentación de dbt es EXCELENTE. Es una de las mejores que vas a encontrar. Guardá esto: docs.getdbt.com. También: el curso gratuito en learn.getdbt.com te da certificado.',
            en: 'dbt documentation is EXCELLENT. It\'s one of the best you\'ll find. Save this: docs.getdbt.com. Also: the free course at learn.getdbt.com gives you a certificate.',
            pt: 'A documentação do dbt é EXCELENTE. É uma das melhores que vai encontrar. Salve isso: docs.getdbt.com. Também: o curso gratuito em learn.getdbt.com dá certificado.'
          }
        },
        {
          id: 'l1-dbt-proyecto',
          title: { es: '🎯 Mini Proyecto dbt', en: '🎯 Mini dbt Project', pt: '🎯 Mini Projeto dbt' },
          description: {
            es: 'Vamos a crear un proyecto dbt completo con la estructura correcta.',
            en: 'Let\'s create a complete dbt project with the correct structure.',
            pt: 'Vamos criar um projeto dbt completo com a estrutura correta.'
          },
          steps: [
            { id: 'l1-dbt-p1', text: { es: 'Creé carpetas: staging/, intermediate/, marts/', en: 'Created folders: staging/, intermediate/, marts/', pt: 'Criei pastas: staging/, intermediate/, marts/' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-p2', text: { es: 'Tengo al menos 2 modelos en staging/', en: 'Have at least 2 models in staging/', pt: 'Tenho pelo menos 2 modelos em staging/' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-p3', text: { es: 'Tengo al menos 1 modelo en marts/ (métricas de negocio)', en: 'Have at least 1 model in marts/ (business metrics)', pt: 'Tenho pelo menos 1 modelo em marts/ (métricas de negócio)' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-p4', text: { es: 'Agregué schema.yml con tests y descripciones', en: 'Added schema.yml with tests and descriptions', pt: 'Adicionei schema.yml com testes e descrições' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-p5', text: { es: 'Subí mi proyecto dbt a GitHub', en: 'Uploaded my dbt project to GitHub', pt: 'Subi meu projeto dbt para o GitHub' }, type: 'task', checkbox: true },
            { id: 'l1-dbt-p6', text: { es: 'Completé el proyecto "Proyecto dbt Completo" de la plataforma', en: 'Completed "Complete dbt Project" from the platform', pt: 'Completei o projeto "Projeto dbt Completo" da plataforma' }, type: 'task', checkbox: true, resource: { type: 'project', label: { es: 'Ir al Proyecto', en: 'Go to Project', pt: 'Ir ao Projeto' }, projectId: 'p8-dbt-project' } },
          ],
          stopTitle: { es: '🏆🏆🏆 STACK TÉCNICO COMPLETO 🏆🏆🏆', en: '🏆🏆🏆 COMPLETE TECH STACK 🏆🏆🏆', pt: '🏆🏆🏆 STACK TÉCNICO COMPLETO 🏆🏆🏆' },
          stopContent: {
            es: `¡INCREÍBLE! Mirá tu stack completo:

✅ Python + Pandas (manejo de datos)
✅ SQL avanzado (Window Functions, CTEs)
✅ Git + GitHub (control de versiones)
✅ APIs + JSON (integración de datos)
✅ Docker + Linux (infraestructura)
✅ AWS S3 (cloud storage)
✅ Snowflake (data warehouse)
✅ dbt (transformaciones modernas)

Esto es EXACTAMENTE lo que piden las ofertas de Junior/Mid Data Engineer. Ahora solo falta una cosa: CONSEGUIR EL TRABAJO. Los siguientes 2 capítulos son sobre eso. La parte técnica ya la tenés. Ahora a usarla. 💪🎯`,
            en: `INCREDIBLE! Look at your complete stack:

✅ Python + Pandas (data handling)
✅ Advanced SQL (Window Functions, CTEs)
✅ Git + GitHub (version control)
✅ APIs + JSON (data integration)
✅ Docker + Linux (infrastructure)
✅ AWS S3 (cloud storage)
✅ Snowflake (data warehouse)
✅ dbt (modern transformations)

This is EXACTLY what Junior/Mid Data Engineer job postings ask for. Now only one thing is missing: GETTING THE JOB. The next 2 chapters are about that. You already have the technical part. Now let's use it. 💪🎯`,
            pt: `INCRÍVEL! Olha seu stack completo:

✅ Python + Pandas (manipulação de dados)
✅ SQL avançado (Window Functions, CTEs)
✅ Git + GitHub (controle de versões)
✅ APIs + JSON (integração de dados)
✅ Docker + Linux (infraestrutura)
✅ AWS S3 (cloud storage)
✅ Snowflake (data warehouse)
✅ dbt (transformações modernas)

Isso é EXATAMENTE o que as vagas de Junior/Mid Data Engineer pedem. Agora só falta uma coisa: CONSEGUIR O TRABALHO. Os próximos 2 capítulos são sobre isso. A parte técnica você já tem. Agora é usar. 💪🎯`
          }
        },
      ]
    },
    // ========== CAPÍTULO 13: BÚSQUEDA LABORAL ==========
    {
      id: 'l1-busqueda',
      title: { es: 'La Búsqueda de Trabajo', en: 'The Job Search', pt: 'A Busca de Emprego' },
      emoji: '🎯',
      sections: [
        {
          id: 'l1-busqueda-mensaje',
          title: { es: '💬 Mensaje de Ian', en: '💬 Message from Ian', pt: '💬 Mensagem do Ian' },
          description: {
            es: 'Llegó el momento de la verdad. Tenés las skills, tenés los proyectos. Ahora hay que salir a buscar. Te voy a ser honesto: vas a recibir rechazos. Muchos. Yo recibí más de 50 antes de mi primer laburo. Cada rechazo es data. Cada entrevista es práctica. No te desanimes. El que persevera, consigue.',
            en: 'The moment of truth has arrived. You have the skills, you have the projects. Now you have to go out and look. I\'ll be honest: you will get rejections. Many. I got more than 50 before my first job. Every rejection is data. Every interview is practice. Don\'t get discouraged. He who perseveres, succeeds.',
            pt: 'Chegou o momento da verdade. Você tem as skills, tem os projetos. Agora tem que sair para buscar. Vou ser honesto: você vai receber rejeições. Muitas. Eu recebi mais de 50 antes do meu primeiro trabalho. Cada rejeição é dado. Cada entrevista é prática. Não desanime. Quem persevera, consegue.'
          },
          steps: [
            { id: 'l1-bus-msg', text: { es: 'Entiendo que los rechazos son parte del proceso', en: 'I understand that rejections are part of the process', pt: 'Entendo que as rejeições são parte do processo' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l1-estrategia',
          title: { es: '📋 La Estrategia que Funciona', en: '📋 The Strategy that Works', pt: '📋 A Estratégia que Funciona' },
          description: {
            es: 'Te cuento mi estrategia. La usé yo, la usaron mis alumnos, funciona. Es simple pero requiere consistencia.',
            en: 'I\'ll tell you my strategy. I used it, my students used it, it works. It\'s simple but requires consistency.',
            pt: 'Vou te contar minha estratégia. Eu usei, meus alunos usaram, funciona. É simples mas requer consistência.'
          },
          steps: [
            { id: 'l1-est-1', text: { es: 'Armé CV de 1 página orientado a Data Engineering', en: 'Created 1-page CV oriented to Data Engineering', pt: 'Montei CV de 1 página orientado a Data Engineering' }, type: 'task', checkbox: true, resource: { type: 'external', label: { es: 'Guía de CV para DE', en: 'DE Resume Guide', pt: 'Guia de CV para DE' }, link: 'https://www.dataengineer.io/blog/data-engineer-resume-guide' } },
            { id: 'l1-est-2', text: { es: 'Optimicé LinkedIn con keywords (Data Engineer, ETL, SQL, Python, AWS)', en: 'Optimized LinkedIn with keywords (Data Engineer, ETL, SQL, Python, AWS)', pt: 'Otimizei LinkedIn com keywords (Data Engineer, ETL, SQL, Python, AWS)' }, type: 'task', checkbox: true },
            { id: 'l1-est-3', text: { es: 'Tengo 2-3 proyectos en GitHub con README claro', en: 'I have 2-3 projects on GitHub with clear README', pt: 'Tenho 2-3 projetos no GitHub com README claro' }, type: 'task', checkbox: true },
            { id: 'l1-est-4', text: { es: 'Busco DIARIAMENTE filtrando por últimas 24hs', en: 'I search DAILY filtering by last 24hs', pt: 'Busco DIARIAMENTE filtrando por últimas 24hs' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '⏸️ El truco de las 24 horas', en: '⏸️ The 24-hour trick', pt: '⏸️ O truque das 24 horas' },
          stopContent: {
            es: 'Las ofertas viejas tienen 500 postulantes. Las nuevas tienen 20. Matemática simple: si filtrás por "últimas 24 horas", competís contra 20 personas en vez de 500. Hacé esto todos los días. 5 minutos. Cambia todo.',
            en: 'Old offers have 500 applicants. New ones have 20. Simple math: if you filter by "last 24 hours", you compete against 20 people instead of 500. Do this every day. 5 minutes. Changes everything.',
            pt: 'As ofertas velhas têm 500 candidatos. As novas têm 20. Matemática simples: se você filtra por "últimas 24 horas", compete contra 20 pessoas em vez de 500. Faça isso todos os dias. 5 minutos. Muda tudo.'
          }
        },
        {
          id: 'l1-postulaciones',
          title: { es: '📊 Tracking de Postulaciones', en: '📊 Application Tracking', pt: '📊 Rastreamento de Candidaturas' },
          description: {
            es: 'Cada postulación te enseña algo. Las tecnologías que te faltan = tu lista de estudio para la próxima semana.',
            en: 'Every application teaches you something. The technologies you lack = your study list for next week.',
            pt: 'Cada candidatura te ensina algo. As tecnologias que te faltam = sua lista de estudo para a próxima semana.'
          },
          steps: [
            { id: 'l1-post-1', text: { es: 'Postulación 1', en: 'Application 1', pt: 'Candidatura 1' }, type: 'reflection', textInput: { es: 'Empresa: ... | Tecnologías que pedían: ... | Me faltaba: ...', en: 'Company: ... | Tech stack: ... | I lacked: ...', pt: 'Empresa: ... | Tecnologias que pediam: ... | Me faltava: ...' } },
            { id: 'l1-post-2', text: { es: 'Postulación 2', en: 'Application 2', pt: 'Candidatura 2' }, type: 'reflection', textInput: { es: 'Empresa: ... | Tecnologías que pedían: ... | Me faltaba: ...', en: 'Company: ... | Tech stack: ... | I lacked: ...', pt: 'Empresa: ... | Tecnologias que pediam: ... | Me faltava: ...' } },
            { id: 'l1-post-3', text: { es: 'Postulación 3', en: 'Application 3', pt: 'Candidatura 3' }, type: 'reflection', textInput: { es: 'Empresa: ... | Tecnologías que pedían: ... | Me faltaba: ...', en: 'Company: ... | Tech stack: ... | I lacked: ...', pt: 'Empresa: ... | Tecnologias que pediam: ... | Me faltava: ...' } },
            { id: 'l1-post-4', text: { es: 'Me postulé a al menos 10 posiciones', en: 'Applied to at least 10 positions', pt: 'Me candidatei a pelo menos 10 posições' }, type: 'task', checkbox: true },
            { id: 'l1-post-5', text: { es: 'Me postulé a al menos 20 posiciones', en: 'Applied to at least 20 positions', pt: 'Me candidatei a pelo menos 20 posições' }, type: 'task', checkbox: true },
            { id: 'l1-post-6', text: { es: 'Tecnología que más piden y no tengo', en: 'Most requested tech I don\'t have', pt: 'Tecnologia que mais pedem e não tenho' }, type: 'reflection', textInput: { es: 'Ej: Airflow - lo voy a aprender esta semana...', en: 'Ex: Airflow - I will learn it this week...', pt: 'Ex: Airflow - vou aprender esta semana...' } },
          ],
          stopTitle: { es: '⏸️ Empezá HOY', en: '⏸️ Start TODAY', pt: '⏸️ Comece HOJE' },
          stopContent: {
            es: 'No esperes a "estar listo". Nunca vas a estar 100% listo. Nadie lo está. El primer laburo no te va a pedir que sepas todo - te va a pedir que puedas aprender. Postulate a 10 posiciones esta semana. Ahora.',
            en: 'Don\'t wait to be "ready". You will never be 100% ready. No one is. The first job won\'t ask you to know everything - it will ask you to be able to learn. Apply to 10 positions this week. Now.',
            pt: 'Não espere "estar pronto". Nunca vai estar 100% pronto. Ninguém está. O primeiro trabalho não vai pedir que saiba tudo - vai pedir que possa aprender. Se candidate a 10 posições esta semana. Agora.'
          }
        },
      ]
    },
    // ========== CAPÍTULO 14: ENTREVISTAS RRHH ==========
    {
      id: 'l1-entrevistas',
      title: { es: 'Preparando Entrevistas', en: 'Preparing Interviews', pt: 'Preparando Entrevistas' },
      emoji: '🎤',
      sections: [
        {
          id: 'l1-ent-intro',
          title: { es: '💬 Mensaje de Ian sobre Entrevistas', en: '💬 Ian\'s Message on Interviews', pt: '💬 Mensagem do Ian sobre Entrevistas' },
          description: {
            es: 'Las entrevistas son un skill. Se entrena. Nadie nace sabiendo entrevistar. Yo fallé las primeras 10 entrevistas técnicas. Después empecé a pasar todas. ¿La diferencia? Práctica. Mucha práctica.',
            en: 'Interviews are a skill. It is trained. No one is born knowing how to interview. I failed my first 10 technical interviews. Then I started passing all of them. The difference? Practice. Lots of practice.',
            pt: 'As entrevistas são uma skill. Se treina. Ninguém nasce sabendo entrevistar. Eu falhei nas primeiras 10 entrevistas técnicas. Depois comecei a passar em todas. A diferença? Prática. Muita prática.'
          },
          steps: [
            { id: 'l1-ent-msg', text: { es: 'Entiendo que las entrevistas se practican como cualquier skill', en: 'I understand that interviews are practiced like any skill', pt: 'Entendo que as entrevistas se praticam como qualquer skill' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l1-rrhh',
          title: { es: '👔 Etapa 1: RRHH / Screening', en: '👔 Stage 1: HR / Screening', pt: '👔 Etapa 1: RH / Screening' },
          description: {
            es: 'La primera call suele ser con RRHH. No es técnica. Solo quieren ver que sos una persona normal que puede comunicarse.',
            en: 'The first call is usually with HR. It\'s not technical. They just want to see that you are a normal person who can communicate.',
            pt: 'A primeira call costuma ser com RH. Não é técnica. Só querem ver que você é uma pessoa normal que pode se comunicar.'
          },
          steps: [
            { id: 'l1-rrhh-1', text: { es: 'Investigué la empresa antes de la call (2 min en su web alcanza)', en: 'Researched the company before the call', pt: 'Pesquisei a empresa antes da call (2 min no site basta)' }, type: 'task', checkbox: true },
            { id: 'l1-rrhh-2', text: { es: 'Tengo claras las tecnologías que piden', en: 'I am clear about the technologies they ask for', pt: 'Tenho claro as tecnologias que pedem' }, type: 'task', checkbox: true },
            { id: 'l1-rrhh-3', text: { es: 'Preparé respuesta para "¿por qué Data Engineering?"', en: 'Prepared answer for "why Data Engineering?"', pt: 'Preparei resposta para "por que Data Engineering?"' }, type: 'task', checkbox: true },
            { id: 'l1-rrhh-4', text: { es: 'Preparé respuesta para "Contame sobre vos" (1-2 min)', en: 'Prepared answer for "Tell me about yourself"', pt: 'Preparei resposta para "Me conte sobre você" (1-2 min)' }, type: 'task', checkbox: true },
            { id: 'l1-rrhh-5', text: { es: 'Preparé respuesta para "¿Por qué esta empresa?"', en: 'Prepared answer for "Why this company?"', pt: 'Preparei resposta para "Por que esta empresa?"' }, type: 'task', checkbox: true },
            { id: 'l1-rrhh-6', text: { es: 'Sé mi rango salarial y puedo comunicarlo', en: 'I know my salary range and can communicate it', pt: 'Sei minha faixa salarial e posso comunicá-la' }, type: 'task', checkbox: true },
            { id: 'l1-rrhh-7', text: { es: 'Tuve mi primera entrevista de RRHH', en: 'Had my first HR interview', pt: 'Tive minha primeira entrevista de RH' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '📝 Template para "Contame sobre vos"', en: '📝 Template for "Tell me about yourself"', pt: '📝 Template para "Me conte sobre você"' },
          stopContent: {
            es: '"Soy [nombre], vengo de [background]. Me metí en Data Engineering porque [razón genuina]. Últimamente estuve trabajando en [proyecto/estudio]. Me interesa esta posición porque [algo específico de la empresa]." 1-2 minutos. Practicalo hasta que salga natural.',
            en: '"I\'m [name], coming from [background]. I got into Data Engineering because [genuine reason]. Lately I\'ve been working on [project/study]. I\'m interested in this position because [something specific about the company]." 1-2 minutes. Practice until it comes natural.',
            pt: '"Sou [nome], venho de [background]. Entrei em Data Engineering porque [razão genuína]. Ultimamente estive trabalhando em [projeto/estudo]. Me interessa esta posição porque [algo específico da empresa]." 1-2 minutos. Pratique até sair natural.'
          }
        },
        {
          id: 'l1-preguntas-comunes',
          title: { es: '❓ Preguntas Comunes (Prepará respuestas)', en: '❓ Common Questions (Prepare answers)', pt: '❓ Perguntas Comuns (Prepare respostas)' },
          description: {
            es: 'Estas preguntas aparecen en el 90% de las entrevistas. Tené respuestas preparadas.',
            en: 'These questions appear in 90% of interviews. Have answers prepared.',
            pt: 'Estas perguntas aparecem em 90% das entrevistas. Tenha respostas preparadas.'
          },
          steps: [
            { id: 'l1-preg-1', text: { es: '"¿Qué es Data Engineering para vos?"', en: '"What is Data Engineering to you?"', pt: '"O que é Data Engineering para você?"' }, type: 'reflection', textInput: { es: 'Mi respuesta: ...', en: 'My answer: ...', pt: 'Minha resposta: ...' } },
            { id: 'l1-preg-2', text: { es: '"¿Cuál es la diferencia entre Data Engineer y Data Scientist?"', en: '"Difference between Data Engineer and Data Scientist?"', pt: '"Qual a diferença entre Data Engineer e Data Scientist?"' }, type: 'reflection', textInput: { es: 'Mi respuesta: ...', en: 'My answer: ...', pt: 'Minha resposta: ...' } },
            { id: 'l1-preg-3', text: { es: '"Contame de un proyecto que hiciste"', en: '"Tell me about a project you did"', pt: '"Me conte sobre um projeto que você fez"' }, type: 'reflection', textInput: { es: 'Mi respuesta: ...', en: 'My answer: ...', pt: 'Minha resposta: ...' } },
            { id: 'l1-preg-4', text: { es: '"¿Qué tecnologías conocés?"', en: '"What technologies do you know?"', pt: '"Quais tecnologias você conhece?"' }, type: 'reflection', textInput: { es: 'Mi respuesta: ...', en: 'My answer: ...', pt: 'Minha resposta: ...' } },
            { id: 'l1-preg-5', text: { es: '"¿Por qué querés cambiar de carrera?" (si aplica)', en: '"Why do you want to change careers?" (if applies)', pt: '"Por que quer mudar de carreira?" (se aplica)' }, type: 'reflection', textInput: { es: 'Mi respuesta: ...', en: 'My answer: ...', pt: 'Minha resposta: ...' } },
            { id: 'l1-preg-6', text: { es: '"¿Dónde te ves en 5 años?"', en: '"Where do you see yourself in 5 years?"', pt: '"Onde você se vê em 5 anos?"' }, type: 'reflection', textInput: { es: 'Mi respuesta: ...', en: 'My answer: ...', pt: 'Minha resposta: ...' } },
          ]
        },
        {
          id: 'l1-tecnica',
          title: { es: '💻 Etapa 2: Técnica', en: '💻 Stage 2: Technical', pt: '💻 Etapa 2: Técnica' },
          description: {
            es: 'Acá es donde se define todo. Puede ser: A) Challenge para hacer en casa, B) Live coding (SQL/Python), C) Charla técnica sobre tu experiencia.',
            en: 'This is where everything is decided. It can be: A) Take-home challenge, B) Live coding (SQL/Python), C) Technical chat about your experience.',
            pt: 'Aqui é onde se define tudo. Pode ser: A) Challenge para fazer em casa, B) Live coding (SQL/Python), C) Conversa técnica sobre sua experiência.'
          },
          steps: [
            { id: 'l1-tec-1', text: { es: 'Practiqué live coding (ejercicios de la plataforma con timer de 20 min)', en: 'Practiced live coding (platform exercises with 20 min timer)', pt: 'Pratiquei live coding (exercícios da plataforma com timer de 20 min)' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Modo Entrevista', en: 'Interview Mode', pt: 'Modo Entrevista' }, link: '/members?tab=practica&mode=interview' } },
            { id: 'l1-tec-2', text: { es: 'Puedo explicar mis proyectos de GitHub en detalle', en: 'I can explain my GitHub projects in detail', pt: 'Posso explicar meus projetos do GitHub em detalhes' }, type: 'task', checkbox: true },
            { id: 'l1-tec-3', text: { es: 'Practiqué explicar mi razonamiento en voz alta mientras codifico', en: 'Practiced explaining my reasoning out loud while coding', pt: 'Pratiquei explicar meu raciocínio em voz alta enquanto programo' }, type: 'task', checkbox: true },
            { id: 'l1-tec-4', text: { es: 'Sé pedir clarificaciones antes de empezar a codear', en: 'I know how to ask for clarifications before coding', pt: 'Sei pedir esclarecimentos antes de começar a codar' }, type: 'task', checkbox: true },
            { id: 'l1-tec-5', text: { es: 'Tuve mi primera entrevista técnica', en: 'Had my first technical interview', pt: 'Tive minha primeira entrevista técnica' }, type: 'task', checkbox: true },
            { id: 'l1-tec-6', text: { es: 'Completé un challenge técnico', en: 'Completed a technical challenge', pt: 'Completei um challenge técnico' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '⏸️ Si fallás en live coding', en: '⏸️ If you fail in live coding', pt: '⏸️ Se falhar no live coding' },
          stopContent: {
            es: 'Volvé a los ejercicios de la plataforma. Hacé ejercicios con timer en Modo Entrevista. Practicá explicar tu razonamiento en voz alta mientras codeas. Esto se entrena. No hay excusas.',
            en: 'Go back to the platform exercises. Do exercises with timer in Interview Mode. Practice explaining your reasoning out loud while coding. This is trainable. No excuses.',
            pt: 'Volte para os exercícios da plataforma. Faça exercícios com timer em Modo Entrevista. Pratique explicar seu raciocínio em voz alta enquanto coda. Isso se treina. Não há desculpas.'
          }
        },
        {
          id: 'l1-live-coding',
          title: { es: '🎯 Preparación para Live Coding', en: '🎯 Live Coding Prep', pt: '🎯 Preparação para Live Coding' },
          description: {
            es: 'El live coding es estresante. La clave es practicar tanto que se vuelva automático.',
            en: 'Live coding is stressful. The key is to practice so much it becomes automatic.',
            pt: 'O live coding é estressante. A chave é praticar tanto que se torne automático.'
          },
          steps: [
            { id: 'l1-lc-1', text: { es: 'Completé 5 ejercicios de SQL con timer de 15 min', en: 'Completed 5 SQL exercises with 15 min timer', pt: 'Completei 5 exercícios de SQL com timer de 15 min' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'DataLemur', link: 'https://datalemur.com' } },
            { id: 'l1-lc-2', text: { es: 'Completé 5 ejercicios de Python con timer de 20 min', en: 'Completed 5 Python exercises with 20 min timer', pt: 'Completei 5 exercícios de Python com timer de 20 min' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'LeetCode Easy', link: 'https://leetcode.com/problemset/?difficulty=EASY' } },
            { id: 'l1-lc-3', text: { es: 'Practiqué con un amigo o en voz alta', en: 'Practiced with a friend or out loud', pt: 'Pratiquei com um amigo ou em voz alta' }, type: 'task', checkbox: true },
            { id: 'l1-lc-4', text: { es: 'Sé usar un IDE/editor sin mouse (atajos básicos)', en: 'I can use an IDE/editor without mouse (basic shortcuts)', pt: 'Sei usar um IDE/editor sem mouse (atalhos básicos)' }, type: 'task', checkbox: true },
            { id: 'l1-lc-5', text: { es: 'Tengo un "template mental" para empezar (ej: primero entender, después pseudocódigo)', en: 'I have a "mental template" to start (ex: understand first, then pseudocode)', pt: 'Tenho um "template mental" para começar (ex: primeiro entender, depois pseudocódigo)' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🧠 Framework para Live Coding', en: '🧠 Live Coding Framework', pt: '🧠 Framework para Live Coding' },
          stopContent: {
            es: '1) Leé el problema completo 2) Hacé preguntas clarificadoras 3) Pensá en voz alta el approach 4) Escribí pseudocódigo si es complejo 5) Codea 6) Testeá con ejemplos 7) Optimizá si hay tiempo. Memorizá esto.',
            en: '1) Read full problem 2) Ask clarifying questions 3) Think approach out loud 4) Write pseudocode if complex 5) Code 6) Test with examples 7) Optimize if time. Memorize this.',
            pt: '1) Leia o problema completo 2) Faça perguntas esclarecedoras 3) Pense em voz alta a abordagem 4) Escreva pseudocódigo se for complexo 5) Code 6) Teste com exemplos 7) Otimize se houver tempo. Memorize isso.'
          }
        },
        {
          id: 'l1-challenges',
          title: { es: '📦 Take-Home Challenges', en: '📦 Take-Home Challenges', pt: '📦 Take-Home Challenges' },
          description: {
            es: 'Muchas empresas te dan un challenge para hacer en casa (24-72hs). Estos son más realistas que live coding.',
            en: 'Many companies give you a take-home challenge (24-72hs). These are more realistic than live coding.',
            pt: 'Muitas empresas te dão um challenge para fazer em casa (24-72hs). Estes são mais realistas que live coding.'
          },
          steps: [
            { id: 'l1-ch-1', text: { es: 'Entiendo que el challenge es para ver cómo trabajo, no solo el resultado', en: 'I understand the challenge is to see HOW I work, not just the result', pt: 'Entendo que o challenge é para ver como trabalho, não só o resultado' }, type: 'task', checkbox: true },
            { id: 'l1-ch-2', text: { es: 'Siempre incluyo README explicando mis decisiones', en: 'I always include README explaining my decisions', pt: 'Sempre incluo README explicando minhas decisões' }, type: 'task', checkbox: true },
            { id: 'l1-ch-3', text: { es: 'Incluyo tests aunque no lo pidan', en: 'I include tests even if not asked', pt: 'Incluo testes mesmo que não peçam' }, type: 'task', checkbox: true },
            { id: 'l1-ch-4', text: { es: 'Incluyo documentación aunque no lo pidan', en: 'I include documentation even if not asked', pt: 'Incluo documentação mesmo que não peçam' }, type: 'task', checkbox: true },
            { id: 'l1-ch-5', text: { es: 'Entrego ANTES del deadline (muestra responsabilidad)', en: 'I deliver BEFORE deadline (shows responsibility)', pt: 'Entrego ANTES do deadline (mostra responsabilidade)' }, type: 'task', checkbox: true },
            { id: 'l1-ch-6', text: { es: 'Completé mi primer take-home challenge', en: 'Completed my first take-home challenge', pt: 'Completei meu primeiro take-home challenge' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '💡 Lo que diferencia un buen challenge', en: '💡 What differentiates a good challenge', pt: '💡 O que diferencia um bom challenge' },
          stopContent: {
            es: 'El código funcional es el mínimo. Lo que te diferencia: 1) README claro 2) Commits descriptivos 3) Tests 4) Manejo de errores 5) Código limpio y documentado. Esto muestra que pensás como profesional.',
            en: 'Functional code is the minimum. What differentiates you: 1) Clear README 2) Descriptive commits 3) Tests 4) Error handling 5) Clean and documented code. This shows you think like a professional.',
            pt: 'O código funcional é o mínimo. O que te diferencia: 1) README claro 2) Commits descritivos 3) Testes 4) Tratamento de erros 5) Código limpo e documentado. Isso mostra que pensa como profissional.'
          }
        },
        {
          id: 'l1-feedback',
          title: { es: '📝 Post-Entrevista: El Feedback es ORO', en: '📝 Post-Interview: Feedback is GOLD', pt: '📝 Pós-Entrevista: O Feedback é OURO' },
          description: {
            es: 'Después de CADA entrevista, anotá inmediatamente en qué fallaste. Este feedback es exactamente lo que tenés que estudiar. No lo desperdicies.',
            en: 'After EVERY interview, immediately note what you failed at. This feedback is exactly what you need to study. Don\'t waste it.',
            pt: 'Depois de CADA entrevista, anote imediatamente onde falhou. Este feedback é exatamente o que tem que estudar. Não desperdice.'
          },
          steps: [
            { id: 'l1-fb-1', text: { es: 'Última entrevista - Empresa', en: 'Last interview - Company', pt: 'Última entrevista - Empresa' }, type: 'reflection', textInput: { es: 'Nombre de la empresa...', en: 'Company name...', pt: 'Nome da empresa...' } },
            { id: 'l1-fb-2', text: { es: '¿En qué fallé?', en: 'What did I fail at?', pt: 'Onde falhei?' }, type: 'reflection', textInput: { es: 'Ej: No pude resolver la query con Window Functions...', en: 'Ex: Couldn\'t solve the query with Window Functions...', pt: 'Ex: Não consegui resolver a query com Window Functions...' } },
            { id: 'l1-fb-3', text: { es: '¿Qué pregunta no supe responder?', en: 'What question couldn\'t I answer?', pt: 'Que pergunta não soube responder?' }, type: 'reflection', textInput: { es: 'Ej: Me preguntaron sobre particionamiento y no sabía...', en: 'Ex: They asked about partitioning and I didn\'t know...', pt: 'Ex: Me perguntaram sobre particionamento e não sabia...' } },
            { id: 'l1-fb-4', text: { es: '¿Qué voy a estudiar esta semana por esto?', en: 'What will I study this week because of this?', pt: 'O que vou estudar esta semana por isso?' }, type: 'reflection', textInput: { es: 'Ej: Window Functions y particionamiento en Spark...', en: 'Ex: Window Functions and Spark partitioning...', pt: 'Ex: Window Functions e particionamento em Spark...' } },
            { id: 'l1-fb-5', text: { es: 'Tuve al menos 3 entrevistas técnicas', en: 'Had at least 3 technical interviews', pt: 'Tive pelo menos 3 entrevistas técnicas' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '⏸️ El Loop del Éxito', en: '⏸️ The Success Loop', pt: '⏸️ O Loop do Sucesso' },
          stopContent: {
            es: 'Ver Job Descriptions → Identificar qué te falta → Estudiar eso → Aplicar → Entrevistar → Anotar feedback → Repetir. Hasta que entres. Y vas a entrar. Lo vi pasar 150+ veces.',
            en: 'See Job Descriptions → Identify what you lack → Study that → Apply → Interview → Note feedback → Repeat. Until you get in. And you will. I saw it happen 150+ times.',
            pt: 'Ver Job Descriptions → Identificar o que te falta → Estudar isso → Aplicar → Entrevistar → Anotar feedback → Repetir. Até que entre. E vai entrar. Vi isso acontecer 150+ vezes.'
          }
        },
        {
          id: 'l1-cultural',
          title: { es: '🤝 Etapa 3: Fit Cultural', en: '🤝 Stage 3: Cultural Fit', pt: '🤝 Etapa 3: Fit Cultural' },
          description: {
            es: 'Si llegaste acá, técnicamente ya pasaste. Esta etapa es para ver si encajás con el equipo. Sé vos mismo.',
            en: 'If you got here, technically you passed. This stage is to see if you fit with the team. Be yourself.',
            pt: 'Se chegou aqui, tecnicamente já passou. Esta etapa é para ver se encaixa com a equipe. Seja você mesmo.'
          },
          steps: [
            { id: 'l1-cult-1', text: { es: 'Tuve entrevista de fit cultural', en: 'Had cultural fit interview', pt: 'Tive entrevista de fit cultural' }, type: 'task', checkbox: true },
            { id: 'l1-cult-2', text: { es: '🎉 CONSEGUÍ MI PRIMER LABURO EN DATA ENGINEERING 🎉', en: '🎉 I GOT MY FIRST DATA ENGINEERING JOB 🎉', pt: '🎉 CONSEGUI MEU PRIMEIRO EMPREGO EM DATA ENGINEERING 🎉' }, type: 'task', checkbox: true },
          ]
        },
      ]
    },
    // ========== CAPÍTULO 15: SYSTEM DESIGN INTERVIEWS ==========
    {
      id: 'l1-interviews',
      title: { es: 'System Design Interviews', en: 'System Design Interviews', pt: 'System Design Interviews' },
      emoji: '🏗️',
      sections: [
        {
          id: 'l1-sd-intro',
          title: { es: '🎯 ¿Qué es System Design?', en: '🎯 What is System Design?', pt: '🎯 O que é System Design?' },
          description: {
            es: 'Las entrevistas de System Design son el filtro más difícil para roles Mid/Senior. No se trata de memorizar - se trata de pensar en voz alta, hacer las preguntas correctas, y demostrar que podés diseñar sistemas robustos. Este es el skill que te diferencia.',
            en: 'System Design interviews are the toughest filter for Mid/Senior roles. It\'s not about memorizing - it\'s about thinking out loud, asking the right questions, and showing you can design robust systems. This is the skill that sets you apart.',
            pt: 'As entrevistas de System Design são o filtro mais difícil para roles Mid/Senior. Não se trata de memorizar - se trata de pensar em voz alta, fazer as perguntas certas, e demonstrar que pode projetar sistemas robustos. Esta é a skill que te diferencia.'
          },
          steps: [
            { 
              id: 'l1-sd-1', 
              text: { es: 'Entiendo que System Design NO es memorizar arquitecturas', en: 'I understand System Design is NOT about memorizing architectures', pt: 'Entendo que System Design NÃO é memorizar arquiteturas' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `El error más común es pensar que System Design es memorizar: "Kafka para streaming, Snowflake para analytics". 

NO. System Design es un PROCESO:
1. Entender el problema (hacer preguntas)
2. Definir requisitos (qué necesita hacer vs qué sería lindo que haga)
3. Diseñar la solución (empezando simple, agregando complejidad)
4. Discutir trade-offs (por qué X y no Y)
5. Identificar posibles problemas

El entrevistador quiere ver CÓMO PENSÁS, no qué memorizaste.`,
                en: `The most common mistake is thinking System Design is memorizing: "Kafka for streaming, Snowflake for analytics".

NO. System Design is a PROCESS:
1. Understand the problem (ask questions)
2. Define requirements (what it needs vs nice to have)
3. Design the solution (start simple, add complexity)
4. Discuss trade-offs (why X and not Y)
5. Identify potential problems

The interviewer wants to see HOW YOU THINK, not what you memorized.`,
                pt: `O erro mais comum é pensar que System Design é memorizar: "Kafka para streaming, Snowflake para analytics".

NÃO. System Design é um PROCESSO:
1. Entender o problema (fazer perguntas)
2. Definir requisitos (o que precisa vs seria legal)
3. Projetar a solução (começar simples, adicionar complexidade)
4. Discutir trade-offs (por que X e não Y)
5. Identificar possíveis problemas

O entrevistador quer ver COMO VOCÊ PENSA, não o que memorizou.`
              }
            },
            { 
              id: 'l1-sd-2', 
              text: { es: 'Conozco la estructura de una entrevista de System Design', en: 'I know the structure of a System Design interview', pt: 'Conheço a estrutura de uma entrevista de System Design' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Una entrevista típica de 45-60 minutos se divide así:

⏱️ Minutos 0-5: Entender el problema
- Escuchá el problema
- Tomá notas
- NO empieces a diseñar todavía

⏱️ Minutos 5-10: Preguntas clarificadoras
- ¿Cuántos usuarios/datos?
- ¿Qué latencia es aceptable?
- ¿Qué presupuesto/equipo hay?
- ¿Qué es más importante: consistencia o disponibilidad?

⏱️ Minutos 10-35: Diseño
- Empezá con un diagrama alto nivel
- Agregá componentes explicando el POR QUÉ
- Dibujá flujo de datos

⏱️ Minutos 35-45: Deep dive y trade-offs
- El entrevistador preguntará sobre decisiones específicas
- Discutí alternativas y por qué elegiste X
- Hablá de cómo escalaría

💡 Tip: Usá el 40% del tiempo en preguntas y diseño inicial, 60% en detalles.`,
                en: `A typical 45-60 minute interview is divided like this:

⏱️ Minutes 0-5: Understand the problem
- Listen to the problem
- Take notes
- DON'T start designing yet

⏱️ Minutes 5-10: Clarifying questions
- How many users/data?
- What latency is acceptable?
- What budget/team is there?
- What's more important: consistency or availability?

⏱️ Minutes 10-35: Design
- Start with a high-level diagram
- Add components explaining WHY
- Draw data flow

⏱️ Minutes 35-45: Deep dive and trade-offs
- Interviewer will ask about specific decisions
- Discuss alternatives and why you chose X
- Talk about how it would scale

💡 Tip: Use 40% of time on questions and initial design, 60% on details.`,
                pt: `Uma entrevista típica de 45-60 minutos é dividida assim:

⏱️ Minutos 0-5: Entender o problema
- Ouça o problema
- Tome notas
- NÃO comece a projetar ainda

⏱️ Minutos 5-10: Perguntas esclarecedoras
- Quantos usuários/dados?
- Que latência é aceitável?
- Que orçamento/equipe há?
- O que é mais importante: consistência ou disponibilidade?

⏱️ Minutos 10-35: Design
- Comece com um diagrama de alto nível
- Adicione componentes explicando o POR QUÊ
- Desenhe fluxo de dados

⏱️ Minutos 35-45: Deep dive e trade-offs
- O entrevistador perguntará sobre decisões específicas
- Discuta alternativas e por que escolheu X
- Fale sobre como escalaria

💡 Dica: Use 40% do tempo em perguntas e design inicial, 60% em detalhes.`
              }
            },
            { 
              id: 'l1-sd-3', 
              text: { es: 'Sé qué preguntas clarificadoras hacer siempre', en: 'I know what clarifying questions to always ask', pt: 'Sei que perguntas esclarecedoras fazer sempre' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Estas preguntas SIEMPRE hay que hacer. Memorizalas:

📊 VOLUMEN
- ¿Cuántos usuarios/requests por segundo?
- ¿Cuántos datos se generan por día?
- ¿Cuánto histórico hay que guardar?

⏱️ LATENCIA
- ¿Los datos pueden tener delay? ¿Cuánto?
- ¿Necesitan real-time o batch es suficiente?
- ¿Cuál es el SLA esperado?

🎯 CASOS DE USO
- ¿Quién consume estos datos?
- ¿Qué decisiones se toman con ellos?
- ¿Qué pasa si fallan?

💰 RESTRICCIONES
- ¿Qué presupuesto hay?
- ¿Cuántas personas van a mantener esto?
- ¿Hay tecnologías que ya usan?

Un candidato que pregunta esto antes de diseñar ya está en el top 20%.`,
                en: `These questions you ALWAYS need to ask. Memorize them:

📊 VOLUME
- How many users/requests per second?
- How much data is generated per day?
- How much history needs to be stored?

⏱️ LATENCY
- Can data have delay? How much?
- Need real-time or is batch enough?
- What's the expected SLA?

🎯 USE CASES
- Who consumes this data?
- What decisions are made with it?
- What happens if they fail?

💰 CONSTRAINTS
- What budget is there?
- How many people will maintain this?
- Are there technologies already in use?

A candidate who asks this before designing is already in the top 20%.`,
                pt: `Estas perguntas SEMPRE tem que fazer. Memorize-as:

📊 VOLUME
- Quantos usuários/requests por segundo?
- Quantos dados são gerados por dia?
- Quanto histórico precisa guardar?

⏱️ LATÊNCIA
- Os dados podem ter atraso? Quanto?
- Precisa real-time ou batch é suficiente?
- Qual é o SLA esperado?

🎯 CASOS DE USO
- Quem consome esses dados?
- Que decisões são tomadas com eles?
- O que acontece se falharem?

💰 RESTRIÇÕES
- Que orçamento há?
- Quantas pessoas vão manter isso?
- Há tecnologias que já usam?

Um candidato que pergunta isso antes de projetar já está no top 20%.`
              }
            },
          ],
          stopTitle: { es: '🧠 El Framework Mental', en: '🧠 The Mental Framework', pt: '🧠 O Framework Mental' },
          stopContent: {
            es: 'SIEMPRE: 1) Repetí el problema para confirmar 2) Preguntá sobre volumen, latencia y restricciones 3) Definí requisitos funcionales vs no-funcionales 4) Dibujá mientras hablás 5) Mencioná trade-offs sin que te pregunten. Este framework te pone arriba del 80% de candidatos.',
            en: 'ALWAYS: 1) Repeat the problem to confirm 2) Ask about volume, latency and constraints 3) Define functional vs non-functional requirements 4) Draw while talking 5) Mention trade-offs without being asked. This framework puts you above 80% of candidates.',
            pt: 'SEMPRE: 1) Repita o problema para confirmar 2) Pergunte sobre volume, latência e restrições 3) Defina requisitos funcionais vs não-funcionais 4) Desenhe enquanto fala 5) Mencione trade-offs sem que perguntem. Este framework te coloca acima de 80% dos candidatos.'
          }
        },
        {
          id: 'l1-sd-practice',
          title: { es: '🏋️ Práctica: System Design Interviews', en: '🏋️ Practice: System Design Interviews', pt: '🏋️ Prática: System Design Interviews' },
          description: {
            es: 'Tenemos entrevistas completas con problemas reales, preguntas clarificadoras, soluciones paso a paso, y tips de entrevistadores. Practica con timer para simular la presión real.',
            en: 'We have complete interviews with real problems, clarifying questions, step-by-step solutions, and interviewer tips. Practice with timer to simulate real pressure.',
            pt: 'Temos entrevistas completas com problemas reais, perguntas esclarecedoras, soluções passo a passo, e dicas de entrevistadores. Pratique com timer para simular a pressão real.'
          },
          steps: [
            { 
              id: 'l1-sd-p1', 
              text: { es: '✅ Completé la entrevista #1: Pipeline E-commerce (Junior)', en: '✅ Completed interview #1: E-commerce Pipeline (Junior)', pt: '✅ Completei a entrevista #1: Pipeline E-commerce (Junior)' }, 
              type: 'task', 
              checkbox: true,
              resource: { type: 'practice', label: { es: 'Ir a System Design', en: 'Go to System Design', pt: 'Ir para System Design' }, link: '/members?tab=interviews' }
            },
            { 
              id: 'l1-sd-p2', 
              text: { es: '✅ Completé la entrevista #2: Detección de Fraude Real-time (Mid)', en: '✅ Completed interview #2: Real-time Fraud Detection (Mid)', pt: '✅ Completei a entrevista #2: Detecção de Fraude Real-time (Mid)' }, 
              type: 'task', 
              checkbox: true,
              resource: { type: 'practice', label: { es: 'Ir a System Design', en: 'Go to System Design', pt: 'Ir para System Design' }, link: '/members?tab=interviews' }
            },
            { 
              id: 'l1-sd-p3', 
              text: { es: '✅ Completé la entrevista #3: Migración Data Lake (Senior)', en: '✅ Completed interview #3: Data Lake Migration (Senior)', pt: '✅ Completei a entrevista #3: Migração Data Lake (Senior)' }, 
              type: 'task', 
              checkbox: true,
              resource: { type: 'practice', label: { es: 'Ir a System Design', en: 'Go to System Design', pt: 'Ir para System Design' }, link: '/members?tab=interviews' }
            },
            { 
              id: 'l1-sd-p4', 
              text: { es: 'Practiqué al menos una con timer de 45 min', en: 'Practiced at least one with 45 min timer', pt: 'Pratiquei pelo menos uma com timer de 45 min' }, 
              type: 'task', 
              checkbox: true 
            },
            { 
              id: 'l1-sd-p5', 
              text: { es: 'Expliqué una solución en voz alta (a un amigo o grabándome)', en: 'Explained a solution out loud (to a friend or recording)', pt: 'Expliquei uma solução em voz alta (para um amigo ou me gravando)' }, 
              type: 'task', 
              checkbox: true 
            },
          ],
          stopTitle: { es: '🎯 La clave: Práctica deliberada', en: '🎯 The key: Deliberate practice', pt: '🎯 A chave: Prática deliberada' },
          stopContent: {
            es: 'No alcanza con leer las soluciones. Tenés que EXPLICAR en voz alta. Grabarte. Escucharte. Mejorar. Las entrevistas de System Design son como presentaciones - necesitan práctica hablada, no solo lectura.',
            en: 'It\'s not enough to read the solutions. You have to EXPLAIN out loud. Record yourself. Listen. Improve. System Design interviews are like presentations - they need spoken practice, not just reading.',
            pt: 'Não basta ler as soluções. Você tem que EXPLICAR em voz alta. Se gravar. Ouvir. Melhorar. As entrevistas de System Design são como apresentações - precisam de prática falada, não só leitura.'
          }
        },
        {
          id: 'l1-sd-patterns',
          title: { es: '📐 Patrones Comunes en Data Engineering', en: '📐 Common Patterns in Data Engineering', pt: '📐 Padrões Comuns em Data Engineering' },
          description: {
            es: 'Estos son los "building blocks" que vas a combinar en cualquier diseño. No los memorices - entiende CUÁNDO usarlos.',
            en: 'These are the "building blocks" you\'ll combine in any design. Don\'t memorize them - understand WHEN to use them.',
            pt: 'Estes são os "building blocks" que vai combinar em qualquer design. Não os memorize - entenda QUANDO usá-los.'
          },
          steps: [
            { 
              id: 'l1-sd-pat1', 
              text: { es: 'Entiendo cuándo usar Batch vs Streaming', en: 'I understand when to use Batch vs Streaming', pt: 'Entendo quando usar Batch vs Streaming' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `📦 BATCH (cada X tiempo):
- Cuando el delay de horas es aceptable
- Dashboards que se actualizan 1x/día
- Reportes mensuales
- ETL clásico
- Más simple y barato

⚡ STREAMING (tiempo real):
- Cuando necesitás reaccionar en segundos
- Detección de fraude
- Alertas en tiempo real
- Personalización instantánea
- Más complejo y caro

💡 Regla: Si el negocio NO necesita real-time, no uses real-time. El 80% de los casos se resuelven con batch bien hecho.`,
                en: `📦 BATCH (every X time):
- When hours of delay is acceptable
- Dashboards updated 1x/day
- Monthly reports
- Classic ETL
- Simpler and cheaper

⚡ STREAMING (real-time):
- When you need to react in seconds
- Fraud detection
- Real-time alerts
- Instant personalization
- More complex and expensive

💡 Rule: If the business doesn't NEED real-time, don't use real-time. 80% of cases are solved with well-done batch.`,
                pt: `📦 BATCH (a cada X tempo):
- Quando o atraso de horas é aceitável
- Dashboards atualizados 1x/dia
- Relatórios mensais
- ETL clássico
- Mais simples e barato

⚡ STREAMING (tempo real):
- Quando precisa reagir em segundos
- Detecção de fraude
- Alertas em tempo real
- Personalização instantânea
- Mais complexo e caro

💡 Regra: Se o negócio NÃO precisa de real-time, não use real-time. 80% dos casos se resolvem com batch bem feito.`
              }
            },
            { 
              id: 'l1-sd-pat2', 
              text: { es: 'Conozco el patrón Lambda vs Kappa', en: 'I know the Lambda vs Kappa pattern', pt: 'Conheço o padrão Lambda vs Kappa' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `🔷 LAMBDA Architecture:
- Dos pipelines: batch + streaming
- Batch para precisión, streaming para velocidad
- Combina ambos resultados
- Más complejo de mantener (código duplicado)
- Bueno cuando necesitás AMBOS

🔶 KAPPA Architecture:
- Un solo pipeline: streaming
- Todo es un stream (incluso batch es "stream de eventos pasados")
- Más simple de mantener
- Replay desde Kafka si algo falla
- Bueno cuando streaming alcanza

💡 Trend actual: Kappa está ganando porque las herramientas de streaming mejoraron mucho (Flink, Spark Structured Streaming).`,
                en: `🔷 LAMBDA Architecture:
- Two pipelines: batch + streaming
- Batch for precision, streaming for speed
- Combines both results
- More complex to maintain (duplicate code)
- Good when you need BOTH

🔶 KAPPA Architecture:
- One pipeline: streaming
- Everything is a stream (even batch is "stream of past events")
- Simpler to maintain
- Replay from Kafka if something fails
- Good when streaming is enough

💡 Current trend: Kappa is winning because streaming tools improved a lot (Flink, Spark Structured Streaming).`,
                pt: `🔷 LAMBDA Architecture:
- Dois pipelines: batch + streaming
- Batch para precisão, streaming para velocidade
- Combina ambos resultados
- Mais complexo de manter (código duplicado)
- Bom quando precisa de AMBOS

🔶 KAPPA Architecture:
- Um só pipeline: streaming
- Tudo é um stream (até batch é "stream de eventos passados")
- Mais simples de manter
- Replay do Kafka se algo falhar
- Bom quando streaming basta

💡 Tendência atual: Kappa está ganhando porque as ferramentas de streaming melhoraram muito (Flink, Spark Structured Streaming).`
              }
            },
            { 
              id: 'l1-sd-pat3', 
              text: { es: 'Entiendo Data Lake vs Data Warehouse vs Data Lakehouse', en: 'I understand Data Lake vs Data Warehouse vs Data Lakehouse', pt: 'Entendo Data Lake vs Data Warehouse vs Data Lakehouse' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `🏊 DATA LAKE (S3, GCS, ADLS):
- Storage barato para CUALQUIER dato (raw)
- Schema-on-read (definís estructura al leer)
- Flexible pero puede volverse "data swamp"
- Bueno para ML, exploración, archivo

🏢 DATA WAREHOUSE (Snowflake, BigQuery, Redshift):
- Datos estructurados y optimizados para queries
- Schema-on-write (estructura definida al escribir)
- Performance excelente para analytics
- Más caro por TB

🏠 DATA LAKEHOUSE (Databricks, Delta Lake):
- Lo mejor de ambos mundos
- Storage barato (S3) + ACID transactions
- Schema evolution
- Performance comparable a warehouse

💡 Tendencia 2024: Lakehouse está ganando. Empresas migran de Warehouse puro a Lakehouse.`,
                en: `🏊 DATA LAKE (S3, GCS, ADLS):
- Cheap storage for ANY data (raw)
- Schema-on-read (define structure when reading)
- Flexible but can become "data swamp"
- Good for ML, exploration, archiving

🏢 DATA WAREHOUSE (Snowflake, BigQuery, Redshift):
- Structured data optimized for queries
- Schema-on-write (structure defined when writing)
- Excellent analytics performance
- More expensive per TB

🏠 DATA LAKEHOUSE (Databricks, Delta Lake):
- Best of both worlds
- Cheap storage (S3) + ACID transactions
- Schema evolution
- Performance comparable to warehouse

💡 2024 trend: Lakehouse is winning. Companies migrate from pure Warehouse to Lakehouse.`,
                pt: `🏊 DATA LAKE (S3, GCS, ADLS):
- Storage barato para QUALQUER dado (raw)
- Schema-on-read (define estrutura ao ler)
- Flexível mas pode virar "data swamp"
- Bom para ML, exploração, arquivo

🏢 DATA WAREHOUSE (Snowflake, BigQuery, Redshift):
- Dados estruturados e otimizados para queries
- Schema-on-write (estrutura definida ao escrever)
- Performance excelente para analytics
- Mais caro por TB

🏠 DATA LAKEHOUSE (Databricks, Delta Lake):
- O melhor dos dois mundos
- Storage barato (S3) + ACID transactions
- Schema evolution
- Performance comparável a warehouse

💡 Tendência 2024: Lakehouse está ganhando. Empresas migram de Warehouse puro para Lakehouse.`
              }
            },
            { 
              id: 'l1-sd-pat4', 
              text: { es: 'Conozco el Medallion Architecture (Bronze/Silver/Gold)', en: 'I know the Medallion Architecture (Bronze/Silver/Gold)', pt: 'Conheço a Medallion Architecture (Bronze/Silver/Gold)' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `El estándar para organizar un Data Lakehouse:

🥉 BRONZE (Raw):
- Datos exactamente como vienen de la fuente
- Sin transformaciones
- Preservar historial completo
- Ej: JSON crudo de APIs, CSVs tal cual

🥈 SILVER (Cleaned):
- Datos validados y limpiados
- Deduplicados
- Tipos de datos correctos
- Schema consistente
- Ej: Tablas de hechos y dimensiones limpias

🥇 GOLD (Business):
- Agregaciones y métricas de negocio
- Listo para dashboards y reportes
- Optimizado para consultas
- Ej: revenue_mensual, usuarios_activos_diarios

💡 Por qué funciona: Si algo falla en Gold, podés reconstruir desde Silver. Si hay bug en Silver, tenés Bronze intacto.`,
                en: `The standard for organizing a Data Lakehouse:

🥉 BRONZE (Raw):
- Data exactly as it comes from source
- No transformations
- Preserve complete history
- Ex: Raw JSON from APIs, CSVs as-is

🥈 SILVER (Cleaned):
- Validated and cleaned data
- Deduplicated
- Correct data types
- Consistent schema
- Ex: Clean fact and dimension tables

🥇 GOLD (Business):
- Business aggregations and metrics
- Ready for dashboards and reports
- Query optimized
- Ex: monthly_revenue, daily_active_users

💡 Why it works: If something fails in Gold, you can rebuild from Silver. If there's a bug in Silver, you have Bronze intact.`,
                pt: `O padrão para organizar um Data Lakehouse:

🥉 BRONZE (Raw):
- Dados exatamente como vêm da fonte
- Sem transformações
- Preservar histórico completo
- Ex: JSON cru de APIs, CSVs como estão

🥈 SILVER (Cleaned):
- Dados validados e limpos
- Deduplicados
- Tipos de dados corretos
- Schema consistente
- Ex: Tabelas de fatos e dimensões limpas

🥇 GOLD (Business):
- Agregações e métricas de negócio
- Pronto para dashboards e relatórios
- Otimizado para consultas
- Ex: receita_mensal, usuarios_ativos_diarios

💡 Por que funciona: Se algo falha em Gold, pode reconstruir de Silver. Se há bug em Silver, tem Bronze intacto.`
              }
            },
          ],
          stopTitle: { es: '🧩 Combinar patrones', en: '🧩 Combining patterns', pt: '🧩 Combinar padrões' },
          stopContent: {
            es: 'En una entrevista real, vas a combinar estos patrones. Ej: "Para este problema usaría un Lakehouse con Medallion Architecture, procesamiento batch diario con Spark, y Snowflake como serving layer para los dashboards". Practica explicando combinaciones.',
            en: 'In a real interview, you\'ll combine these patterns. Ex: "For this problem I would use a Lakehouse with Medallion Architecture, daily batch processing with Spark, and Snowflake as serving layer for dashboards". Practice explaining combinations.',
            pt: 'Em uma entrevista real, vai combinar estes padrões. Ex: "Para este problema usaria um Lakehouse com Medallion Architecture, processamento batch diário com Spark, e Snowflake como serving layer para os dashboards". Pratique explicando combinações.'
          }
        },
        {
          id: 'l1-sd-final',
          title: { es: '🏆 Checklist Final', en: '🏆 Final Checklist', pt: '🏆 Checklist Final' },
          description: {
            es: 'Antes de tu próxima entrevista de System Design, asegurate de poder marcar todo esto:',
            en: 'Before your next System Design interview, make sure you can check all of this:',
            pt: 'Antes da sua próxima entrevista de System Design, certifique-se de poder marcar tudo isso:'
          },
          steps: [
            { id: 'l1-sd-f1', text: { es: '✅ Sé hacer preguntas clarificadoras (volumen, latencia, restricciones)', en: '✅ I know how to ask clarifying questions (volume, latency, constraints)', pt: '✅ Sei fazer perguntas esclarecedoras (volume, latência, restrições)' }, type: 'task', checkbox: true },
            { id: 'l1-sd-f2', text: { es: '✅ Puedo dibujar un diagrama de arquitectura mientras explico', en: '✅ I can draw an architecture diagram while explaining', pt: '✅ Posso desenhar um diagrama de arquitetura enquanto explico' }, type: 'task', checkbox: true },
            { id: 'l1-sd-f3', text: { es: '✅ Sé cuándo usar batch vs streaming', en: '✅ I know when to use batch vs streaming', pt: '✅ Sei quando usar batch vs streaming' }, type: 'task', checkbox: true },
            { id: 'l1-sd-f4', text: { es: '✅ Conozco las diferencias entre Data Lake, Warehouse y Lakehouse', en: '✅ I know the differences between Data Lake, Warehouse and Lakehouse', pt: '✅ Conheço as diferenças entre Data Lake, Warehouse e Lakehouse' }, type: 'task', checkbox: true },
            { id: 'l1-sd-f5', text: { es: '✅ Puedo discutir trade-offs (ej: Kafka vs Kinesis, Snowflake vs BigQuery)', en: '✅ I can discuss trade-offs (e.g.: Kafka vs Kinesis, Snowflake vs BigQuery)', pt: '✅ Posso discutir trade-offs (ex: Kafka vs Kinesis, Snowflake vs BigQuery)' }, type: 'task', checkbox: true },
            { id: 'l1-sd-f6', text: { es: '✅ Completé al menos 2 entrevistas de práctica en la plataforma', en: '✅ Completed at least 2 practice interviews on the platform', pt: '✅ Completei pelo menos 2 entrevistas de prática na plataforma' }, type: 'task', checkbox: true },
            { id: 'l1-sd-f7', text: { es: '✅ Practiqué explicando en voz alta (grabándome o con alguien)', en: '✅ Practiced explaining out loud (recording or with someone)', pt: '✅ Pratiquei explicando em voz alta (me gravando ou com alguém)' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🎉 ¡Listo para System Design!', en: '🎉 Ready for System Design!', pt: '🎉 Pronto para System Design!' },
          stopContent: {
            es: 'Si marcaste todo, estás en el top 10% de candidatos para System Design. La mayoría de la gente no practica esto - solo lee. Vos practicaste. Ahora andá y demuéstrales lo que sabés.',
            en: 'If you checked everything, you\'re in the top 10% of candidates for System Design. Most people don\'t practice this - they just read. You practiced. Now go and show them what you know.',
            pt: 'Se marcou tudo, está no top 10% dos candidatos para System Design. A maioria das pessoas não pratica isso - só lê. Você praticou. Agora vá e mostre-lhes o que sabe.'
          }
        },
        {
          id: 'l1-mock-interview',
          title: { es: '🎤 Mock Interview - Prueba Final', en: '🎤 Mock Interview - Final Test', pt: '🎤 Mock Interview - Prova Final' },
          description: {
            es: 'Antes de considerar completo el Level 1, completá una Mock Interview de 45 minutos. Esta es tu prueba de fuego que simula una entrevista real con timer, presión y scorecard.',
            en: 'Before considering Level 1 complete, do a 45-minute Mock Interview. This is your trial by fire that simulates a real interview with timer, pressure and scorecard.',
            pt: 'Antes de considerar completo o Level 1, complete uma Mock Interview de 45 minutos. Esta é sua prova de fogo que simula uma entrevista real com timer, pressão e scorecard.'
          },
          steps: [
            { id: 'l1-mock-1', text: { es: '🎯 Completé la Mock Interview de 45 min en la plataforma', en: '🎯 Completed the 45-minute Mock Interview on the platform', pt: '🎯 Completei a Mock Interview de 45 min na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: '🎤 Ir a Mock Interview', en: '🎤 Go to Mock Interview', pt: '🎤 Ir para Mock Interview' }, link: '/members?tab=interviews' } },
            { id: 'l1-mock-2', text: { es: 'Mi resultado fue al menos LEAN HIRE', en: 'My result was at least LEAN HIRE', pt: 'Meu resultado foi pelo menos LEAN HIRE' }, type: 'task', checkbox: true },
            { id: 'l1-mock-3', text: { es: 'Revisé el feedback del scorecard y trabajé en mis áreas débiles', en: 'Reviewed scorecard feedback and worked on my weak areas', pt: 'Revisei o feedback do scorecard e trabalhei em minhas áreas fracas' }, type: 'task', checkbox: true },
            { id: 'l1-mock-4', text: { es: 'Me grabé respondiendo para analizar mi comunicación', en: 'Recorded myself answering to analyze my communication', pt: 'Me gravei respondendo para analisar minha comunicação' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🏆 El checkpoint que te diferencia', en: '🏆 The checkpoint that sets you apart', pt: '🏆 O checkpoint que te diferencia' },
          stopContent: {
            es: 'La Mock Interview separa a los que solo leyeron de los que realmente están listos. Obtener LEAN HIRE o mejor significa que estás preparado para entrevistas reales en posiciones Junior. Si no lo lograste, repetí hasta lograrlo - cada intento te hace mejor.',
            en: 'The Mock Interview separates those who just read from those who are actually ready. Getting LEAN HIRE or better means you\'re prepared for real interviews in Junior positions. If you didn\'t get it, repeat until you do - each attempt makes you better.',
            pt: 'A Mock Interview separa quem só leu de quem está realmente pronto. Obter LEAN HIRE ou melhor significa que está preparado para entrevistas reais em posições Junior. Se não conseguiu, repita até conseguir - cada tentativa te faz melhor.'
          }
        }
      ]
    }
  ],
  checklist: [
    { es: '✅ 20 ejercicios Easy en LeetCode (Python)', en: '✅ 20 Easy exercises on LeetCode (Python)', pt: '✅ 20 exercícios Easy no LeetCode (Python)' },
    { es: '✅ TODOS los Easy de DataLemur (SQL)', en: '✅ ALL DataLemur Easy (SQL)', pt: '✅ TODOS os Easy do DataLemur (SQL)' },
    { es: '✅ 10 Medium de DataLemur (SQL)', en: '✅ 10 DataLemur Medium (SQL)', pt: '✅ 10 Medium do DataLemur (SQL)' },
    { es: '✅ 4+ proyectos completados y en GitHub', en: '✅ 4+ projects completed and on GitHub', pt: '✅ 4+ projetos completados e no GitHub' },
    { es: '✅ Cada proyecto tiene README profesional', en: '✅ Each project has a professional README', pt: '✅ Cada projeto tem README profissional' },
    { es: '✅ Vi el bootcamp O leí Fundamentals of Data Engineering', en: '✅ Watched bootcamp OR read Fundamentals of Data Engineering', pt: '✅ Vi o bootcamp OU li Fundamentals of Data Engineering' },
    { es: '✅ Tengo cuenta de AWS y subí algo a S3', en: '✅ Have AWS account and uploaded to S3', pt: '✅ Tenho conta na AWS e subi algo para o S3' },
    { es: '✅ Tengo cuenta de Snowflake y cargué un dataset', en: '✅ Have Snowflake account and loaded a dataset', pt: '✅ Tenho conta no Snowflake e carreguei um dataset' },
    { es: '✅ Completé dbt Fundamentals', en: '✅ Completed dbt Fundamentals', pt: '✅ Completei dbt Fundamentals' },
    { es: '✅ Sé usar Git/GitHub (branches, commits, PRs)', en: '✅ I know Git/GitHub (branches, commits, PRs)', pt: '✅ Sei usar Git/GitHub (branches, commits, PRs)' },
    { es: '✅ Tengo Docker instalado y dockericé un proyecto', en: '✅ Have Docker installed and dockerized a project', pt: '✅ Tenho Docker instalado e dockerizei um projeto' },
    { es: '✅ Me muevo cómodo en la terminal (Linux basics)', en: '✅ Comfortable in terminal (Linux basics)', pt: '✅ Me movo confortável no terminal (Linux basics)' },
    { es: '✅ Me postulé a al menos 20 posiciones', en: '✅ Applied to at least 20 positions', pt: '✅ Me candidatei a pelo menos 20 posições' },
    { es: '✅ Tuve al menos 3 entrevistas técnicas', en: '✅ Had at least 3 technical interviews', pt: '✅ Tive pelo menos 3 entrevistas técnicas' },
    { es: '✅ Completé al menos 1 take-home challenge', en: '✅ Completed at least 1 take-home challenge', pt: '✅ Completei pelo menos 1 take-home challenge' },
    { es: '✅ Completé al menos 2 System Design Interviews de práctica', en: '✅ Completed at least 2 practice System Design Interviews', pt: '✅ Completei pelo menos 2 System Design Interviews de prática' },
    { es: '🎉 CONSEGUÍ MI PRIMER LABURO', en: '🎉 I GOT MY FIRST JOB', pt: '🎉 CONSEGUI MEU PRIMEIRO EMPREGO' },
  ],
  resources: [
    {
      title: { es: '📚 Libros Esenciales', en: '📚 Essential Books', pt: '📚 Livros Essenciais' },
      items: [
        { es: '"Fundamentals of Data Engineering" - Joe Reis ⭐ (EL libro)', en: '"Fundamentals of Data Engineering" - Joe Reis ⭐ (THE book)', pt: '"Fundamentals of Data Engineering" - Joe Reis ⭐ (O livro)' },
        { es: '"Learning SQL" - Alan Beaulieu (si necesitás reforzar SQL)', en: '"Learning SQL" - Alan Beaulieu (if you need to reinforce SQL)', pt: '"Learning SQL" - Alan Beaulieu (se precisa reforçar SQL)' },
        { es: '"Python Crash Course" - Eric Matthes (si sos nuevo en Python)', en: '"Python Crash Course" - Eric Matthes (if you are new to Python)', pt: '"Python Crash Course" - Eric Matthes (se é novo em Python)' },
        { es: '"The Missing Semester of Your CS Education" - MIT (gratis online)', en: '"The Missing Semester of Your CS Education" - MIT (free online)', pt: '"The Missing Semester of Your CS Education" - MIT (grátis online)' },
      ]
    },
    {
      title: { es: '💻 Plataformas de Práctica', en: '💻 Practice Platforms', pt: '💻 Plataformas de Prática' },
      items: [
        { es: 'DataLemur (SQL) - datalemur.com ⭐', en: 'DataLemur (SQL) - datalemur.com ⭐', pt: 'DataLemur (SQL) - datalemur.com ⭐' },
        { es: 'LeetCode (Python) - leetcode.com', en: 'LeetCode (Python) - leetcode.com', pt: 'LeetCode (Python) - leetcode.com' },
        { es: 'StrataScratch (más SQL) - stratascratch.com', en: 'StrataScratch (more SQL) - stratascratch.com', pt: 'StrataScratch (mais SQL) - stratascratch.com' },
        { es: 'HackerRank (SQL + Python) - hackerrank.com', en: 'HackerRank (SQL + Python) - hackerrank.com', pt: 'HackerRank (SQL + Python) - hackerrank.com' },
        { es: 'Exercism (Python) - exercism.org', en: 'Exercism (Python) - exercism.org', pt: 'Exercism (Python) - exercism.org' },
      ]
    },
    {
      title: { es: '🎓 Cursos Gratuitos', en: '🎓 Free Courses', pt: '🎓 Cursos Gratuitos' },
      items: [
        { es: 'Bootcamp de Fundamentos (grabaciones en esta plataforma)', en: 'Fundamentals Bootcamp (recordings on this platform)', pt: 'Bootcamp de Fundamentos (gravações nesta plataforma)' },
        { es: 'dbt Learn - learn.getdbt.com (gratis)', en: 'dbt Learn - learn.getdbt.com (free)', pt: 'dbt Learn - learn.getdbt.com (grátis)' },
        { es: 'AWS Cloud Practitioner - aws.amazon.com/training', en: 'AWS Cloud Practitioner - aws.amazon.com/training', pt: 'AWS Cloud Practitioner - aws.amazon.com/training' },
        { es: 'Docker Getting Started - docker.com/get-started', en: 'Docker Getting Started - docker.com/get-started', pt: 'Docker Getting Started - docker.com/get-started' },
        { es: 'Git Branching Game - learngitbranching.js.org', en: 'Git Branching Game - learngitbranching.js.org', pt: 'Git Branching Game - learngitbranching.js.org' },
      ]
    },
    {
      title: { es: '🛠️ Herramientas que Necesitás', en: '🛠️ Tools You Need', pt: '🛠️ Ferramentas que Você Precisa' },
      items: [
        { es: 'VS Code (editor de código)', en: 'VS Code (code editor)', pt: 'VS Code (editor de código)' },
        { es: 'Docker Desktop', en: 'Docker Desktop', pt: 'Docker Desktop' },
        { es: 'Git + GitHub account', en: 'Git + GitHub account', pt: 'Git + GitHub account' },
        { es: 'Terminal (iTerm2 en Mac, Windows Terminal en Windows)', en: 'Terminal (iTerm2 on Mac, Windows Terminal on Windows)', pt: 'Terminal (iTerm2 no Mac, Windows Terminal no Windows)' },
        { es: 'DBeaver (cliente SQL gratuito)', en: 'DBeaver (free SQL client)', pt: 'DBeaver (cliente SQL gratuito)' },
      ]
    }
  ]
};


