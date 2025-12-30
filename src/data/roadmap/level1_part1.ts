import { RoadmapLevel } from '../../types/members';

export const level1_part1: Partial<RoadmapLevel> = {
  level: 1,
  title: {
    es: 'Conseguir tu Primer Trabajo',
    en: 'Get Your First Job',
    pt: 'Conseguir seu Primeiro Emprego'
  },
  subtitle: {
    es: 'De cero a tu primera oferta',
    en: 'From zero to your first offer',
    pt: 'Do zero à sua primeira oferta'
  },
  description: {
    es: 'Mirá, te voy a ser directo: conseguir tu primer laburo en Data Engineering es un proceso. No hay magia. Pero si seguís este roadmap al pie de la letra, en 3-6 meses tenés laburo. Lo vi pasar con más de 150 personas. Vamos.',
    en: 'Look, I\'m going to be direct: getting your first job in Data Engineering is a process. There is no magic. But if you follow this roadmap to the letter, in 3-6 months you\'ll have a job. I saw it happen with more than 150 people. Let\'s go.',
    pt: 'Olha, vou ser direto: conseguir seu primeiro trabalho em Data Engineering é um processo. Não tem mágica. Mas se você seguir este roadmap ao pé da letra, em 3-6 meses você tem trabalho. Vi isso acontecer com mais de 150 pessoas. Vamos lá.'
  },
  badge: {
    es: '🌱 Novato',
    en: '🌱 Novice',
    pt: '🌱 Novato'
  },
  color: 'emerald',
  phases: [
    // ========== CAPÍTULO 1: ANTES DE ARRANCAR ==========
    {
      id: 'l1-intro',
      title: { es: 'Antes de Arrancar', en: 'Before Starting', pt: 'Antes de Começar' },
      emoji: '🎯',
      sections: [
        {
          id: 'l1-intro-mensaje',
          title: { es: '💬 Mensaje de Ian', en: '💬 Message from Ian', pt: '💬 Mensagem do Ian' },
          description: {
            es: 'Si estás acá es porque querés entrar al mundo de Data Engineering. Excelente decisión. Pero seamos honestos: no es fácil. Vas a estudiar, practicar, frustrarte, y seguir adelante. Los que lo logran son los que no abandonan. Yo estuve exactamente donde vos estás ahora. Y si yo pude, vos también podés. Arrancamos.',
            en: 'If you are here it is because you want to enter the world of Data Engineering. Excellent decision. But let\'s be honest: it\'s not easy. You are going to study, practice, get frustrated, and keep going. Those who succeed are those who don\'t quit. I was exactly where you are now. And if I could, you can too. Let\'s start.',
            pt: 'Se você está aqui é porque quer entrar no mundo de Data Engineering. Excelente decisão. Mas sejamos honestos: não é fácil. Você vai estudar, praticar, se frustrar e seguir em frente. Os que conseguem são os que não desistem. Eu estive exatamente onde você está agora. E se eu pude, você também pode. Vamos começar.'
          },
          steps: [
            { id: 'l1-i-msg', text: { es: 'Leí el mensaje y estoy comprometido con este proceso', en: 'I read the message and I am committed to this process', pt: 'Li a mensagem e estou comprometido com este processo' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l1-intro-situacion',
          title: { es: 'Tu punto de partida', en: 'Your starting point', pt: 'Seu ponto de partida' },
          description: {
            es: 'Antes de arrancar, necesito que seas honesto con vos mismo. Agarrá papel y lapicera (o Notion, o lo que uses) y respondé esto. Guardalo. En 3 meses lo vas a mirar y no vas a creer cuánto avanzaste.',
            en: 'Before starting, I need you to be honest with yourself. Grab paper and pen (or Notion, or whatever you use) and answer this. Save it. In 3 months you will look at it and you won\'t believe how much you advanced.',
            pt: 'Antes de começar, preciso que seja honesto com você mesmo. Pegue papel e caneta (ou Notion, ou o que usar) e responda isso. Guarde. Em 3 meses você vai olhar e não vai acreditar no quanto avançou.'
          },
          steps: [
            { id: 'l1-i-1', text: { es: '¿Cuál es tu nivel actual de Python? (1 = nunca lo usé, 10 = experto)', en: 'What is your current Python level? (1 = never used, 10 = expert)', pt: 'Qual é o seu nível atual de Python? (1 = nunca usei, 10 = especialista)' }, type: 'reflection', textInput: { es: 'Ej: 4 - sé lo básico pero me cuesta...', en: 'Ex: 4 - I know the basics but I struggle...', pt: 'Ex: 4 - sei o básico mas tenho dificuldade...' } },
            { id: 'l1-i-2', text: { es: '¿Cuál es tu nivel actual de SQL? (1 = nunca lo usé, 10 = experto)', en: 'What is your current SQL level? (1 = never used, 10 = expert)', pt: 'Qual é o seu nível atual de SQL? (1 = nunca usei, 10 = especialista)' }, type: 'reflection', textInput: { es: 'Ej: 2 - hice algún SELECT pero nada más...', en: 'Ex: 2 - I did some SELECT but nothing else...', pt: 'Ex: 2 - fiz algum SELECT mas nada mais...' } },
            { id: 'l1-i-3', text: { es: '¿Tengo experiencia laboral en datos? (cualquier cosa cuenta)', en: 'Do I have work experience in data? (anything counts)', pt: 'Tenho experiência profissional em dados? (qualquer coisa conta)' }, type: 'reflection', textInput: { es: 'Ej: Hice reportes en Excel en mi laburo anterior...', en: 'Ex: I did Excel reports in my previous job...', pt: 'Ex: Fiz relatórios no Excel no meu trabalho anterior...' } },
            { id: 'l1-i-4', text: { es: '¿En cuánto tiempo quiero conseguir laburo?', en: 'How soon do I want to get a job?', pt: 'Em quanto tempo quero conseguir emprego?' }, type: 'reflection', textInput: { es: 'Ej: 4 meses...', en: 'Ex: 4 months...', pt: 'Ex: 4 meses...' } },
            { id: 'l1-i-5', text: { es: '¿Cuántas horas por semana puedo dedicar REALMENTE?', en: 'How many hours per week can I REALLY dedicate?', pt: 'Quantas horas por semana posso dedicar REALMENTE?' }, type: 'reflection', textInput: { es: 'Ej: 10-15 horas (sé realista)...', en: 'Ex: 10-15 hours (be realistic)...', pt: 'Ex: 10-15 horas (seja realista)...' } },
          ]
        }
      ]
    },
    // ========== CAPÍTULO 2: SETUP - DE COLAB A TU COMPUTADORA ==========
    {
      id: 'l1-setup',
      title: { es: 'Setup: De Colab a tu Computadora', en: 'Setup: From Colab to Your Computer', pt: 'Setup: Do Colab para seu Computador' },
      emoji: '💻',
      sections: [
        {
          id: 'l1-setup-intro',
          title: { es: '🎯 Por qué trabajar en tu computadora', en: '🎯 Why work on your computer', pt: '🎯 Por que trabalhar no seu computador' },
          description: {
            es: 'Google Colab está genial para aprender, pero en el trabajo real vas a usar tu computadora. Vamos a configurar todo para que puedas programar como un profesional.',
            en: 'Google Colab is great for learning, but in real work you\'ll use your computer. Let\'s set up everything so you can code like a professional.',
            pt: 'Google Colab é ótimo para aprender, mas no trabalho real você vai usar seu computador. Vamos configurar tudo para que você possa programar como um profissional.'
          },
          steps: [
            { 
              id: 'l1-set-1', 
              text: { es: 'Entiendo que Colab es para aprender, pero necesito Python local para trabajar', en: 'I understand Colab is for learning, but I need local Python for work', pt: 'Entendo que Colab é para aprender, mas preciso de Python local para trabalhar' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `¿Por qué local vs Colab?

🌐 Google Colab:
✅ Gratis, sin instalar nada
✅ Perfecto para aprender
❌ Necesita internet
❌ Se desconecta después de un rato
❌ No podés automatizar tareas

💻 Python Local:
✅ Funciona sin internet
✅ Podés crear scripts que corren solos
✅ Así trabajan las empresas
✅ Control total de tu entorno`,
                en: `Why local vs Colab?

🌐 Google Colab:
✅ Free, no installation
✅ Perfect for learning
❌ Needs internet
❌ Disconnects after a while
❌ Can't automate tasks

💻 Local Python:
✅ Works offline
✅ Can create scripts that run alone
✅ How companies work
✅ Full control of your environment`,
                pt: `Por que local vs Colab?

🌐 Google Colab:
✅ Grátis, sem instalar nada
✅ Perfeito para aprender
❌ Precisa de internet
❌ Desconecta depois de um tempo
❌ Não pode automatizar tarefas

💻 Python Local:
✅ Funciona sem internet
✅ Pode criar scripts que rodam sozinhos
✅ Como as empresas trabalham
✅ Controle total do seu ambiente`
              }
            },
          ]
        },
        {
          id: 'l1-setup-python',
          title: { es: '🐍 Instalar Python', en: '🐍 Install Python', pt: '🐍 Instalar Python' },
          description: {
            es: 'Lo primero es tener Python instalado en tu computadora. Es gratis y fácil.',
            en: 'First thing is having Python installed on your computer. It\'s free and easy.',
            pt: 'Primeiro é ter Python instalado no seu computador. É grátis e fácil.'
          },
          steps: [
            { 
              id: 'l1-set-2', 
              text: { es: 'Descargué e instalé Python desde python.org', en: 'Downloaded and installed Python from python.org', pt: 'Baixei e instalei Python de python.org' },
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'Descargar Python', en: 'Download Python', pt: 'Baixar Python' }, link: 'https://www.python.org/downloads/' },
              explanation: {
                es: `Pasos:
1. Andá a python.org/downloads
2. Descargá la versión más reciente (3.11 o superior)
3. Ejecutá el instalador

⚠️ IMPORTANTE en Windows:
Marcá la casilla "Add Python to PATH" antes de instalar.
Si no lo hacés, la terminal no va a encontrar Python.

Verificá que funcionó:
Abrí la terminal y escribí:
python --version
→ Debería mostrar: Python 3.11.x`,
                en: `Steps:
1. Go to python.org/downloads
2. Download the latest version (3.11 or higher)
3. Run the installer

⚠️ IMPORTANT on Windows:
Check the box "Add Python to PATH" before installing.
If you don't, terminal won't find Python.

Verify it worked:
Open terminal and type:
python --version
→ Should show: Python 3.11.x`,
                pt: `Passos:
1. Vá em python.org/downloads
2. Baixe a versão mais recente (3.11 ou superior)
3. Execute o instalador

⚠️ IMPORTANTE no Windows:
Marque a caixa "Add Python to PATH" antes de instalar.
Se não fizer, o terminal não vai encontrar Python.

Verifique que funcionou:
Abra o terminal e digite:
python --version
→ Deve mostrar: Python 3.11.x`
              }
            },
            { 
              id: 'l1-set-3', 
              text: { es: 'Verifiqué que Python funciona: python --version', en: 'Verified Python works: python --version', pt: 'Verifiquei que Python funciona: python --version' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Abrí tu terminal:
- Windows: Buscá "cmd" o "PowerShell"
- Mac: Buscá "Terminal"
- Linux: Ctrl + Alt + T

Escribí:
python --version

Si dice "Python 3.x.x" → ¡Funciona! 🎉

Si dice "command not found":
- Windows: Reinstalá marcando "Add to PATH"
- Mac: Probá con python3 --version`,
                en: `Open your terminal:
- Windows: Search "cmd" or "PowerShell"
- Mac: Search "Terminal"
- Linux: Ctrl + Alt + T

Type:
python --version

If it says "Python 3.x.x" → It works! 🎉

If it says "command not found":
- Windows: Reinstall checking "Add to PATH"
- Mac: Try python3 --version`,
                pt: `Abra seu terminal:
- Windows: Procure "cmd" ou "PowerShell"
- Mac: Procure "Terminal"
- Linux: Ctrl + Alt + T

Digite:
python --version

Se disser "Python 3.x.x" → Funciona! 🎉

Se disser "command not found":
- Windows: Reinstale marcando "Add to PATH"
- Mac: Tente python3 --version`
              }
            },
          ]
        },
        {
          id: 'l1-setup-vscode',
          title: { es: '📝 Instalar VS Code (tu editor)', en: '📝 Install VS Code (your editor)', pt: '📝 Instalar VS Code (seu editor)' },
          description: {
            es: 'VS Code es el editor más usado por programadores. Es gratis, potente, y tiene miles de extensiones útiles.',
            en: 'VS Code is the most used editor by programmers. It\'s free, powerful, and has thousands of useful extensions.',
            pt: 'VS Code é o editor mais usado por programadores. É grátis, potente e tem milhares de extensões úteis.'
          },
          steps: [
            { 
              id: 'l1-set-4', 
              text: { es: 'Descargué e instalé VS Code', en: 'Downloaded and installed VS Code', pt: 'Baixei e instalei VS Code' },
              type: 'task', 
              checkbox: true,
              resource: { type: 'external', label: { es: 'Descargar VS Code', en: 'Download VS Code', pt: 'Baixar VS Code' }, link: 'https://code.visualstudio.com/' },
              explanation: {
                es: `VS Code es como Word, pero para código.

Pasos:
1. Andá a code.visualstudio.com
2. Descargá para tu sistema operativo
3. Instalá con las opciones por defecto

💡 Tip: También instalá la extensión "Python" de Microsoft
(la vas a ver cuando abras VS Code)`,
                en: `VS Code is like Word, but for code.

Steps:
1. Go to code.visualstudio.com
2. Download for your operating system
3. Install with default options

💡 Tip: Also install the "Python" extension from Microsoft
(you'll see it when you open VS Code)`,
                pt: `VS Code é como Word, mas para código.

Passos:
1. Vá em code.visualstudio.com
2. Baixe para seu sistema operacional
3. Instale com as opções padrão

💡 Dica: Também instale a extensão "Python" da Microsoft
(você vai ver quando abrir VS Code)`
              }
            },
            { 
              id: 'l1-set-5', 
              text: { es: 'Instalé la extensión de Python en VS Code', en: 'Installed Python extension in VS Code', pt: 'Instalei a extensão de Python no VS Code' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `La extensión de Python te da:
- Colores en el código (syntax highlighting)
- Autocompletado inteligente
- Detección de errores
- Botón para ejecutar código

Para instalar:
1. Abrí VS Code
2. Apretá Ctrl+Shift+X (o Cmd+Shift+X en Mac)
3. Buscá "Python"
4. Instalá la de Microsoft (tiene millones de descargas)`,
                en: `Python extension gives you:
- Code colors (syntax highlighting)
- Smart autocomplete
- Error detection
- Button to run code

To install:
1. Open VS Code
2. Press Ctrl+Shift+X (or Cmd+Shift+X on Mac)
3. Search "Python"
4. Install the Microsoft one (has millions of downloads)`,
                pt: `A extensão de Python te dá:
- Cores no código (syntax highlighting)
- Autocomplete inteligente
- Detecção de erros
- Botão para executar código

Para instalar:
1. Abra VS Code
2. Aperte Ctrl+Shift+X (ou Cmd+Shift+X no Mac)
3. Procure "Python"
4. Instale a da Microsoft (tem milhões de downloads)`
              }
            },
          ]
        },
        {
          id: 'l1-setup-pip',
          title: { es: '📦 Instalar Pandas (pip)', en: '📦 Install Pandas (pip)', pt: '📦 Instalar Pandas (pip)' },
          description: {
            es: 'pip es el instalador de paquetes de Python. Con él vas a instalar Pandas y todas las librerías que necesites.',
            en: 'pip is Python\'s package installer. With it you\'ll install Pandas and all the libraries you need.',
            pt: 'pip é o instalador de pacotes do Python. Com ele você vai instalar Pandas e todas as bibliotecas que precisar.'
          },
          steps: [
            { 
              id: 'l1-set-6', 
              text: { es: 'Entiendo qué es pip: el "app store" de Python', en: 'I understand what pip is: Python\'s "app store"', pt: 'Entendo o que é pip: a "app store" do Python' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `pip = "Package Installer for Python"

Es como una tienda de apps, pero para Python.
Hay miles de librerías gratis que podés instalar.

Ejemplos:
pip install pandas    → Librería para datos
pip install requests  → Librería para APIs
pip install numpy     → Librería matemática

pip viene incluido cuando instalás Python.`,
                en: `pip = "Package Installer for Python"

It's like an app store, but for Python.
There are thousands of free libraries you can install.

Examples:
pip install pandas    → Data library
pip install requests  → API library
pip install numpy     → Math library

pip comes included when you install Python.`,
                pt: `pip = "Package Installer for Python"

É como uma loja de apps, mas para Python.
Há milhares de bibliotecas grátis que você pode instalar.

Exemplos:
pip install pandas    → Biblioteca para dados
pip install requests  → Biblioteca para APIs
pip install numpy     → Biblioteca matemática

pip já vem incluído quando você instala Python.`
              }
            },
            { 
              id: 'l1-set-7', 
              text: { es: 'Instalé Pandas: pip install pandas', en: 'Installed Pandas: pip install pandas', pt: 'Instalei Pandas: pip install pandas' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `En tu terminal escribí:

pip install pandas

Vas a ver que descarga varios paquetes.
Cuando termine, verificá que funcionó:

python -c "import pandas; print(pandas.__version__)"

Debería mostrar algo como: 2.1.0

❌ Si dice "pip not found":
- Windows: Reinstalá Python con "Add to PATH"
- Mac/Linux: Probá pip3 install pandas`,
                en: `In your terminal type:

pip install pandas

You'll see it downloads several packages.
When done, verify it worked:

python -c "import pandas; print(pandas.__version__)"

Should show something like: 2.1.0

❌ If it says "pip not found":
- Windows: Reinstall Python with "Add to PATH"
- Mac/Linux: Try pip3 install pandas`,
                pt: `No seu terminal digite:

pip install pandas

Você vai ver que baixa vários pacotes.
Quando terminar, verifique que funcionou:

python -c "import pandas; print(pandas.__version__)"

Deve mostrar algo como: 2.1.0

❌ Se disser "pip not found":
- Windows: Reinstale Python com "Add to PATH"
- Mac/Linux: Tente pip3 install pandas`
              }
            },
          ]
        },
        {
          id: 'l1-setup-primer-script',
          title: { es: '🚀 Tu primer script .py', en: '🚀 Your first .py script', pt: '🚀 Seu primeiro script .py' },
          description: {
            es: 'Vamos a crear y ejecutar tu primer archivo de Python real.',
            en: 'Let\'s create and run your first real Python file.',
            pt: 'Vamos criar e executar seu primeiro arquivo Python real.'
          },
          steps: [
            { 
              id: 'l1-set-8', 
              text: { es: 'Creé una carpeta para mis proyectos', en: 'Created a folder for my projects', pt: 'Criei uma pasta para meus projetos' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Elegí un lugar fácil de encontrar:

Windows: C:\\Users\\TuNombre\\proyectos-python
Mac: /Users/TuNombre/proyectos-python
Linux: /home/TuNombre/proyectos-python

Podés crearla desde la terminal:
mkdir proyectos-python
cd proyectos-python

O simplemente desde el explorador de archivos.`,
                en: `Choose an easy to find location:

Windows: C:\\Users\\YourName\\python-projects
Mac: /Users/YourName/python-projects
Linux: /home/YourName/python-projects

You can create it from terminal:
mkdir python-projects
cd python-projects

Or simply from file explorer.`,
                pt: `Escolha um lugar fácil de encontrar:

Windows: C:\\Users\\SeuNome\\projetos-python
Mac: /Users/SeuNome/projetos-python
Linux: /home/SeuNome/projetos-python

Pode criar pelo terminal:
mkdir projetos-python
cd projetos-python

Ou simplesmente pelo explorador de arquivos.`
              }
            },
            { 
              id: 'l1-set-9', 
              text: { es: 'Creé mi primer archivo: hola.py', en: 'Created my first file: hola.py', pt: 'Criei meu primeiro arquivo: ola.py' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `1. Abrí VS Code
2. File → Open Folder → tu carpeta de proyectos
3. Click derecho en el panel izquierdo → New File
4. Nombralo: hola.py

Escribí este código:
print("¡Hola desde mi computadora!")
print("Python está funcionando 🎉")

5. Guardá con Ctrl+S (o Cmd+S)`,
                en: `1. Open VS Code
2. File → Open Folder → your projects folder
3. Right click on left panel → New File
4. Name it: hello.py

Write this code:
print("Hello from my computer!")
print("Python is working 🎉")

5. Save with Ctrl+S (or Cmd+S)`,
                pt: `1. Abra VS Code
2. File → Open Folder → sua pasta de projetos
3. Click direito no painel esquerdo → New File
4. Nomeie: ola.py

Escreva este código:
print("Olá do meu computador!")
print("Python está funcionando 🎉")

5. Salve com Ctrl+S (ou Cmd+S)`
              }
            },
            { 
              id: 'l1-set-10', 
              text: { es: 'Ejecuté mi script desde la terminal: python hola.py', en: 'Ran my script from terminal: python hello.py', pt: 'Executei meu script pelo terminal: python ola.py' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Abrí la terminal en VS Code: Terminal → New Terminal
(o Ctrl + ñ en Windows, Ctrl + \` en Mac)

Asegurate de estar en la carpeta correcta:
pwd   # Mac/Linux
cd    # Windows

Ejecutá:
python hola.py

Deberías ver:
¡Hola desde mi computadora!
Python está funcionando 🎉

🎉 ¡FELICITACIONES! Ya podés programar localmente.`,
                en: `Open terminal in VS Code: Terminal → New Terminal
(or Ctrl + \` on Windows/Mac)

Make sure you're in the correct folder:
pwd   # Mac/Linux
cd    # Windows

Run:
python hello.py

You should see:
Hello from my computer!
Python is working 🎉

🎉 CONGRATULATIONS! You can now code locally.`,
                pt: `Abra o terminal no VS Code: Terminal → New Terminal
(ou Ctrl + \` no Windows/Mac)

Certifique-se de estar na pasta correta:
pwd   # Mac/Linux
cd    # Windows

Execute:
python ola.py

Deve ver:
Olá do meu computador!
Python está funcionando 🎉

🎉 PARABÉNS! Você já pode programar localmente.`
              }
            },
          ],
          stopTitle: { es: '🎉 ¡Setup completo!', en: '🎉 Setup complete!', pt: '🎉 Setup completo!' },
          stopContent: {
            es: 'Ya tenés Python, VS Code, pip y Pandas instalados. Estás listo para trabajar como un profesional. En el siguiente capítulo vamos a aprender Pandas a fondo.',
            en: 'You now have Python, VS Code, pip and Pandas installed. You\'re ready to work like a professional. In the next chapter we\'ll learn Pandas in depth.',
            pt: 'Você já tem Python, VS Code, pip e Pandas instalados. Está pronto para trabalhar como um profissional. No próximo capítulo vamos aprender Pandas a fundo.'
          }
        }
      ]
    },
    // ========== CAPÍTULO 3: PYTHON + PANDAS BÁSICO ==========
    {
      id: 'l1-python',
      title: { es: 'Python + Pandas Básico', en: 'Python + Basic Pandas', pt: 'Python + Pandas Básico' },
      emoji: '🐼',
      sections: [
        {
          id: 'l1-pandas-intro',
          title: { es: '🐼 ¿Qué es Pandas?', en: '🐼 What is Pandas?', pt: '🐼 O que é Pandas?' },
          description: {
            es: 'Pandas es LA librería para trabajar con datos en Python. Si Excel es una bicicleta, Pandas es un auto de F1. Vamos a aprenderlo desde cero.',
            en: 'Pandas is THE library for working with data in Python. If Excel is a bicycle, Pandas is an F1 car. Let\'s learn it from scratch.',
            pt: 'Pandas é A biblioteca para trabalhar com dados em Python. Se Excel é uma bicicleta, Pandas é um carro de F1. Vamos aprender do zero.'
          },
          steps: [
            { 
              id: 'l1-py-0', 
              text: { es: 'Si soy principiante: completé un curso básico de Python (ver recurso)', en: 'If I am a beginner: completed a basic Python course (see resource)', pt: 'Se sou iniciante: completei um curso básico de Python (ver recurso)' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: '🎓 Curso Python Gratis (freeCodeCamp)', en: '🎓 Free Python Course (freeCodeCamp)', pt: '🎓 Curso Python Grátis (freeCodeCamp)' }, link: 'https://www.freecodecamp.org/espanol/learn/scientific-computing-with-python/' },
              explanation: {
                es: `Si nunca programaste, necesitás unas 20-40 horas para aprender lo básico de Python.

Opciones recomendadas:
1. freeCodeCamp (gratis, en español)
2. "Python Crash Course" de Eric Matthes (libro)
3. El Nivel 0 de esta plataforma

💡 No necesitás ser experto. Con lo básico ya podés empezar.`,
                en: `If you have never coded, you need about 20-40 hours to learn the basics of Python.

Recommended options:
1. freeCodeCamp (free)
2. "Python Crash Course" by Eric Matthes (book)
3. Level 0 of this platform

💡 You don't need to be an expert. With the basics you can start.`,
                pt: `Se nunca programou, precisa de umas 20-40 horas para aprender o básico de Python.

Opções recomendadas:
1. freeCodeCamp (grátis)
2. "Python Crash Course" de Eric Matthes (livro)
3. O Nível 0 desta plataforma

💡 Não precisa ser especialista. Com o básico já pode começar.`
              }
            },
            { 
              id: 'l1-py-1', 
              text: { es: 'Puedo abrir un CSV con pandas.read_csv() y ver qué tiene', en: 'I can open a CSV with pandas.read_csv() and see what it has', pt: 'Consigo abrir um CSV com pandas.read_csv() e ver o que tem' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Tutorial: Pandas en 10 min', en: 'Tutorial: Pandas in 10 min', pt: 'Tutorial: Pandas em 10 min' }, link: 'https://pandas.pydata.org/docs/user_guide/10min.html' },
              explanation: {
                es: `Pandas es LA librería para trabajar con datos en Python.

import pandas as pd
df = pd.read_csv("datos.csv")
df.head()     # Ver primeras 5 filas
df.info()     # Ver tipos de datos
df.describe() # Estadísticas básicas

💡 df = "DataFrame" = tabla de datos`,
                en: `Pandas is THE library for working with data in Python.

import pandas as pd
df = pd.read_csv("data.csv")
df.head()     # See first 5 rows
df.info()     # See data types
df.describe() # Basic statistics

💡 df = "DataFrame" = data table`,
                pt: `Pandas é A biblioteca para trabalhar com dados em Python.

import pandas as pd
df = pd.read_csv("dados.csv")
df.head()     # Ver primeiras 5 linhas
df.info()     # Ver tipos de dados
df.describe() # Estatísticas básicas

💡 df = "DataFrame" = tabela de dados`
              }
            },
            { 
              id: 'l1-py-2', 
              text: { es: 'Puedo escribir una función que reciba parámetros y devuelva algo', en: 'I can write a function that receives parameters and returns something', pt: 'Consigo escrever uma função que receba parâmetros e retorne algo' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Funciones en Python', en: 'Functions in Python', pt: 'Funções em Python' }, link: 'https://realpython.com/defining-your-own-python-function/' },
              explanation: {
                es: `def calcular_total(precio, cantidad):
    total = precio * cantidad
    return total

resultado = calcular_total(100, 5)
# resultado = 500

💡 return devuelve el valor para usarlo después.`,
                en: `def calculate_total(price, quantity):
    total = price * quantity
    return total

result = calculate_total(100, 5)
# result = 500

💡 return returns the value to use it later.`,
                pt: `def calcular_total(preco, quantidade):
    total = preco * quantidade
    return total

resultado = calcular_total(100, 5)
# resultado = 500

💡 return devolve o valor para usar depois.`
              }
            },
            { 
              id: 'l1-py-3', 
              text: { es: 'Entiendo for loops y list comprehensions', en: 'I understand for loops and list comprehensions', pt: 'Entendo for loops e list comprehensions' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'List Comprehensions', en: 'List Comprehensions', pt: 'List Comprehensions' }, link: 'https://realpython.com/list-comprehension-python/' },
              explanation: {
                es: `For loop tradicional:
numeros = []
for x in range(5):
    numeros.append(x * 2)

List comprehension (más pythónico):
numeros = [x * 2 for x in range(5)]

Ambos dan: [0, 2, 4, 6, 8]
💡 Las comprehensions son más concisas y rápidas.`,
                en: `Traditional For loop:
numbers = []
for x in range(5):
    numbers.append(x * 2)

List comprehension (more pythonic):
numbers = [x * 2 for x in range(5)]

Both give: [0, 2, 4, 6, 8]
💡 Comprehensions are more concise and faster.`,
                pt: `For loop tradicional:
numeros = []
for x in range(5):
    numeros.append(x * 2)

List comprehension (mais pythônico):
numeros = [x * 2 for x in range(5)]

Ambos dão: [0, 2, 4, 6, 8]
💡 As comprehensions são mais concisas e rápidas.`
              }
            },
            { 
              id: 'l1-py-4', 
              text: { es: 'Sé usar diccionarios (muy importante para JSON)', en: 'I know how to use dictionaries (very important for JSON)', pt: 'Sei usar dicionários (muito importante para JSON)' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Diccionarios', en: 'Dictionaries', pt: 'Dicionários' }, link: 'https://realpython.com/python-dicts/' },
              explanation: {
                es: `Los diccionarios guardan datos con claves:

persona = {
    "nombre": "Ana",
    "edad": 25,
    "ciudad": "Buenos Aires"
}

persona["nombre"]  # "Ana"
persona["edad"]    # 25

💡 JSON (el formato de datos más común) es básicamente un diccionario.`,
                en: `Dictionaries store data with keys:

person = {
    "name": "Ana",
    "age": 25,
    "city": "Buenos Aires"
}

person["name"]  # "Ana"
person["age"]    # 25

💡 JSON (the most common data format) is basically a dictionary.`,
                pt: `Os dicionários guardam dados com chaves:

pessoa = {
    "nome": "Ana",
    "idade": 25,
    "cidade": "Buenos Aires"
}

pessoa["nome"]  # "Ana"
pessoa["idade"]    # 25

💡 JSON (o formato de dados mais comum) é basicamente um dicionário.`
              }
            },
          ],
          stopTitle: { es: '⏸️ Momento de práctica', en: '⏸️ Practice Time', pt: '⏸️ Momento de Prática' },
          stopContent: {
            es: 'Si nunca programaste: hacé el curso gratuito de freeCodeCamp o el libro "Python Crash Course" de Eric Matthes. Si ya sabés algo: completá los 20 ejercicios Easy de Python de nuestra plataforma.',
            en: 'If you have never coded: take the free freeCodeCamp course or Eric Matthes\' "Python Crash Course" book. If you already know something: complete the 20 Easy Python exercises on our platform.',
            pt: 'Se nunca programou: faça o curso gratuito do freeCodeCamp ou o livro "Python Crash Course" de Eric Matthes. Se já sabe algo: complete os 20 exercícios Easy de Python da nossa plataforma.'
          }
        },
        {
          id: 'l1-python-practica',
          title: { es: '🎯 Práctica: Python', en: '🎯 Practice: Python', pt: '🎯 Prática: Python' },
          description: {
            es: 'Acá es donde la mayoría abandona. No seas esa persona. Completá los ejercicios de la plataforma en bloques de 5 para ver tu progreso.',
            en: 'This is where most people quit. Don\'t be that person. Complete the platform exercises in blocks of 5 to see your progress.',
            pt: 'Aqui é onde a maioria desiste. Não seja essa pessoa. Complete os exercícios da plataforma em blocos de 5 para ver seu progresso.'
          },
          steps: [
            { id: 'l1-pyp-1a', text: { es: '✅ Python Easy: Ejercicios 1-5 completados', en: '✅ Python Easy: Exercises 1-5 completed', pt: '✅ Python Easy: Exercícios 1-5 completados' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Python Easy', en: 'Python Easy Exercises', pt: 'Exercícios Python Easy' }, link: '/members?tab=practica&category=python&difficulty=easy' } },
            { id: 'l1-pyp-1b', text: { es: '✅ Python Easy: Ejercicios 6-10 completados', en: '✅ Python Easy: Exercises 6-10 completed', pt: '✅ Python Easy: Exercícios 6-10 completados' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Python Easy', en: 'Python Easy Exercises', pt: 'Exercícios Python Easy' }, link: '/members?tab=practica&category=python&difficulty=easy' } },
            { id: 'l1-pyp-1c', text: { es: '✅ Python Easy: Ejercicios 11-15 completados', en: '✅ Python Easy: Exercises 11-15 completed', pt: '✅ Python Easy: Exercícios 11-15 completados' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Python Easy', en: 'Python Easy Exercises', pt: 'Exercícios Python Easy' }, link: '/members?tab=practica&category=python&difficulty=easy' } },
            { id: 'l1-pyp-1d', text: { es: '🏆 Python Easy: Ejercicios 16-20 completados', en: '🏆 Python Easy: Exercises 16-20 completed', pt: '🏆 Python Easy: Exercícios 16-20 completados' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Python Easy', en: 'Python Easy Exercises', pt: 'Exercícios Python Easy' }, link: '/members?tab=practica&category=python&difficulty=easy' } },
            { id: 'l1-pyp-0b', text: { es: '🏋️ Completé ejercicios de Pandas', en: '🏋️ Completed Pandas exercises', pt: '🏋️ Completei exercícios de Pandas' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Pandas', en: 'Pandas Exercises', pt: 'Exercícios Pandas' }, link: '/members?tab=practica&category=python&subcategory=pandas' } },
          ]
        },
        {
          id: 'l1-python-proyecto',
          title: { es: '🛠️ Proyecto: Tu primer ETL', en: '🛠️ Project: Your first ETL', pt: '🛠️ Projeto: Seu primeiro ETL' },
          description: {
            es: 'Teoría sin práctica no sirve. Hacé este proyecto para consolidar lo que aprendiste.',
            en: 'Theory without practice is useless. Do this project to consolidate what you learned.',
            pt: 'Teoria sem prática não serve. Faça este projeto para consolidar o que aprendeu.'
          },
          steps: [
            { id: 'l1-pypr-1', text: { es: 'Completé el proyecto "ETL Simple con Python"', en: 'Completed "Simple ETL with Python" project', pt: 'Completei o projeto "ETL Simples com Python"' }, type: 'task', checkbox: true, resource: { type: 'project', label: { es: 'Ir al Proyecto', en: 'Go to Project', pt: 'Ir para o Projeto' }, projectId: 'p1-etl-python' } },
            { id: 'l1-pypr-2', text: { es: 'Lo subí a mi GitHub', en: 'Uploaded it to my GitHub', pt: 'Subi para o meu GitHub' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🎉 ¡CHECKPOINT! Completaste Python + Pandas', en: '🎉 CHECKPOINT! You completed Python + Pandas', pt: '🎉 CHECKPOINT! Você completou Python + Pandas' },
          stopContent: {
            es: '¡Pará un segundo! Si llegaste hasta acá, ya sabés más Python que el 80% de los que empiezan. Tenés: funciones, loops, diccionarios, Pandas básico, y UN PROYECTO EN GITHUB. Eso es más de lo que muchos tienen después de meses. Ahora viene SQL - el otro 50% del trabajo. Seguí así. 💪',
            en: 'Stop for a second! If you made it here, you already know more Python than 80% of beginners. You have: functions, loops, dictionaries, basic Pandas, and A PROJECT ON GITHUB. That\'s more than many have after months. Now comes SQL - the other 50% of the job. Keep going. 💪',
            pt: 'Para um segundo! Se você chegou até aqui, já sabe mais Python que 80% dos que começam. Você tem: funções, loops, dicionários, Pandas básico, e UM PROJETO NO GITHUB. Isso é mais do que muitos têm depois de meses. Agora vem SQL - os outros 50% do trabalho. Continue assim. 💪'
          }
        }
      ]
    },
    // ========== CAPÍTULO 4: PANDAS AVANZADO ==========
    {
      id: 'l1-pandas-adv',
      title: { es: 'Pandas Avanzado', en: 'Advanced Pandas', pt: 'Pandas Avançado' },
      emoji: '🐼',
      sections: [
        {
          id: 'l1-padv-filter',
          title: { es: '🔍 Filtrar y Seleccionar Datos', en: '🔍 Filter and Select Data', pt: '🔍 Filtrar e Selecionar Dados' },
          description: {
            es: 'Lo más común en Data Engineering: filtrar filas que cumplan condiciones y seleccionar columnas específicas.',
            en: 'The most common thing in Data Engineering: filter rows that meet conditions and select specific columns.',
            pt: 'O mais comum em Data Engineering: filtrar linhas que atendam condições e selecionar colunas específicas.'
          },
          steps: [
            { 
              id: 'l1-padv-1', 
              text: { es: 'Sé seleccionar columnas: df["columna"] y df[["col1", "col2"]]', en: 'I know how to select columns: df["column"] and df[["col1", "col2"]]', pt: 'Sei selecionar colunas: df["coluna"] e df[["col1", "col2"]]' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Una columna → devuelve Serie
df["nombre"]

# Varias columnas → devuelve DataFrame
df[["nombre", "edad", "ciudad"]]

# Tip: Con doble corchete siempre obtenés DataFrame
df[["nombre"]]  # DataFrame de 1 columna`,
                en: `# One column → returns Series
df["name"]

# Multiple columns → returns DataFrame
df[["name", "age", "city"]]

# Tip: With double brackets you always get DataFrame
df[["name"]]  # DataFrame with 1 column`,
                pt: `# Uma coluna → retorna Series
df["nome"]

# Várias colunas → retorna DataFrame
df[["nome", "idade", "cidade"]]

# Dica: Com colchetes duplos você sempre obtém DataFrame
df[["nome"]]  # DataFrame de 1 coluna`
              }
            },
            { 
              id: 'l1-padv-2', 
              text: { es: 'Sé filtrar filas: df[df["precio"] > 100]', en: 'I know how to filter rows: df[df["price"] > 100]', pt: 'Sei filtrar linhas: df[df["preco"] > 100]' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Filtro simple
df[df["precio"] > 100]

# Múltiples condiciones (AND)
df[(df["precio"] > 100) & (df["stock"] > 0)]

# Múltiples condiciones (OR)
df[(df["categoria"] == "A") | (df["categoria"] == "B")]

# Filtrar por lista de valores
df[df["pais"].isin(["Argentina", "Chile", "Uruguay"])]

# Filtrar por texto que contiene
df[df["nombre"].str.contains("Juan")]`,
                en: `# Simple filter
df[df["price"] > 100]

# Multiple conditions (AND)
df[(df["price"] > 100) & (df["stock"] > 0)]

# Multiple conditions (OR)
df[(df["category"] == "A") | (df["category"] == "B")]

# Filter by list of values
df[df["country"].isin(["USA", "UK", "Canada"])]

# Filter by text containing
df[df["name"].str.contains("John")]`,
                pt: `# Filtro simples
df[df["preco"] > 100]

# Múltiplas condições (AND)
df[(df["preco"] > 100) & (df["estoque"] > 0)]

# Múltiplas condições (OR)
df[(df["categoria"] == "A") | (df["categoria"] == "B")]

# Filtrar por lista de valores
df[df["pais"].isin(["Brasil", "Argentina", "Chile"])]

# Filtrar por texto que contém
df[df["nome"].str.contains("João")]`
              }
            },
          ]
        },
        {
          id: 'l1-padv-nulls',
          title: { es: '🕳️ Manejar Valores Nulos', en: '🕳️ Handle Null Values', pt: '🕳️ Lidar com Valores Nulos' },
          description: {
            es: 'Los datos del mundo real SIEMPRE tienen nulos. Saber manejarlos es fundamental.',
            en: 'Real world data ALWAYS has nulls. Knowing how to handle them is fundamental.',
            pt: 'Dados do mundo real SEMPRE têm nulos. Saber lidar com eles é fundamental.'
          },
          steps: [
            { 
              id: 'l1-padv-3', 
              text: { es: 'Sé detectar nulos: isnull(), notnull()', en: 'I know how to detect nulls: isnull(), notnull()', pt: 'Sei detectar nulos: isnull(), notnull()' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Ver cuántos nulos hay por columna
df.isnull().sum()

# Ver porcentaje de nulos
df.isnull().sum() / len(df) * 100

# Filtrar filas con nulos en una columna
df[df["email"].isnull()]

# Filtrar filas SIN nulos
df[df["email"].notnull()]`,
                en: `# See how many nulls per column
df.isnull().sum()

# See percentage of nulls
df.isnull().sum() / len(df) * 100

# Filter rows with nulls in a column
df[df["email"].isnull()]

# Filter rows WITHOUT nulls
df[df["email"].notnull()]`,
                pt: `# Ver quantos nulos há por coluna
df.isnull().sum()

# Ver porcentagem de nulos
df.isnull().sum() / len(df) * 100

# Filtrar linhas com nulos em uma coluna
df[df["email"].isnull()]

# Filtrar linhas SEM nulos
df[df["email"].notnull()]`
              }
            },
            { 
              id: 'l1-padv-4', 
              text: { es: 'Sé eliminar o rellenar nulos: dropna(), fillna()', en: 'I know how to drop or fill nulls: dropna(), fillna()', pt: 'Sei eliminar ou preencher nulos: dropna(), fillna()' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Eliminar filas con CUALQUIER nulo
df.dropna()

# Eliminar filas con nulo en columnas específicas
df.dropna(subset=["email", "telefono"])

# Rellenar nulos con un valor fijo
df["precio"].fillna(0)

# Rellenar con el promedio
df["precio"].fillna(df["precio"].mean())

# Rellenar con el valor anterior (forward fill)
df["precio"].fillna(method="ffill")

💡 IMPORTANTE: Documentá siempre POR QUÉ elegiste cada estrategia`,
                en: `# Drop rows with ANY null
df.dropna()

# Drop rows with null in specific columns
df.dropna(subset=["email", "phone"])

# Fill nulls with a fixed value
df["price"].fillna(0)

# Fill with mean
df["price"].fillna(df["price"].mean())

# Fill with previous value (forward fill)
df["price"].fillna(method="ffill")

💡 IMPORTANT: Always document WHY you chose each strategy`,
                pt: `# Eliminar linhas com QUALQUER nulo
df.dropna()

# Eliminar linhas com nulo em colunas específicas
df.dropna(subset=["email", "telefone"])

# Preencher nulos com um valor fixo
df["preco"].fillna(0)

# Preencher com a média
df["preco"].fillna(df["preco"].mean())

# Preencher com o valor anterior (forward fill)
df["preco"].fillna(method="ffill")

💡 IMPORTANTE: Documente sempre POR QUE escolheu cada estratégia`
              }
            },
          ]
        },
        {
          id: 'l1-padv-groupby',
          title: { es: '📊 Agrupar Datos (groupby)', en: '📊 Group Data (groupby)', pt: '📊 Agrupar Dados (groupby)' },
          description: {
            es: 'groupby es como hacer una tabla dinámica en Excel, pero con código. Es SUPER usado en Data Engineering.',
            en: 'groupby is like making a pivot table in Excel, but with code. It is SUPER used in Data Engineering.',
            pt: 'groupby é como fazer uma tabela dinâmica no Excel, mas com código. É SUPER usado em Data Engineering.'
          },
          steps: [
            { 
              id: 'l1-padv-5', 
              text: { es: 'Sé agrupar y agregar: groupby().sum(), .mean(), .count()', en: 'I know how to group and aggregate: groupby().sum(), .mean(), .count()', pt: 'Sei agrupar e agregar: groupby().sum(), .mean(), .count()' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Total de ventas por categoría
df.groupby("categoria")["ventas"].sum()

# Promedio de precio por país
df.groupby("pais")["precio"].mean()

# Contar clientes por ciudad
df.groupby("ciudad")["cliente_id"].count()

# Múltiples agregaciones
df.groupby("categoria").agg({
    "ventas": "sum",
    "precio": "mean",
    "producto_id": "count"
})`,
                en: `# Total sales by category
df.groupby("category")["sales"].sum()

# Average price by country
df.groupby("country")["price"].mean()

# Count customers by city
df.groupby("city")["customer_id"].count()

# Multiple aggregations
df.groupby("category").agg({
    "sales": "sum",
    "price": "mean",
    "product_id": "count"
})`,
                pt: `# Total de vendas por categoria
df.groupby("categoria")["vendas"].sum()

# Média de preço por país
df.groupby("pais")["preco"].mean()

# Contar clientes por cidade
df.groupby("cidade")["cliente_id"].count()

# Múltiplas agregações
df.groupby("categoria").agg({
    "vendas": "sum",
    "preco": "mean",
    "produto_id": "count"
})`
              }
            },
          ]
        },
        {
          id: 'l1-padv-merge',
          title: { es: '🔗 Combinar DataFrames (merge)', en: '🔗 Combine DataFrames (merge)', pt: '🔗 Combinar DataFrames (merge)' },
          description: {
            es: 'merge es el equivalente a JOIN en SQL. Une dos DataFrames por una columna común.',
            en: 'merge is the equivalent of JOIN in SQL. It joins two DataFrames by a common column.',
            pt: 'merge é o equivalente a JOIN em SQL. Une dois DataFrames por uma coluna comum.'
          },
          steps: [
            { 
              id: 'l1-padv-6', 
              text: { es: 'Sé combinar DataFrames: merge() con diferentes tipos de joins', en: 'I know how to combine DataFrames: merge() with different join types', pt: 'Sei combinar DataFrames: merge() com diferentes tipos de joins' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Merge básico (inner join por defecto)
df_resultado = pd.merge(df_ordenes, df_clientes, on="cliente_id")

# Left join - mantener todas las órdenes
df_resultado = pd.merge(df_ordenes, df_clientes, on="cliente_id", how="left")

# Cuando las columnas tienen nombres diferentes
df_resultado = pd.merge(
    df_ordenes, 
    df_clientes, 
    left_on="customer_id", 
    right_on="id"
)

💡 Es igual que SQL:
- how="inner" → INNER JOIN
- how="left"  → LEFT JOIN
- how="right" → RIGHT JOIN
- how="outer" → FULL OUTER JOIN`,
                en: `# Basic merge (inner join by default)
df_result = pd.merge(df_orders, df_customers, on="customer_id")

# Left join - keep all orders
df_result = pd.merge(df_orders, df_customers, on="customer_id", how="left")

# When columns have different names
df_result = pd.merge(
    df_orders, 
    df_customers, 
    left_on="customer_id", 
    right_on="id"
)

💡 Same as SQL:
- how="inner" → INNER JOIN
- how="left"  → LEFT JOIN
- how="right" → RIGHT JOIN
- how="outer" → FULL OUTER JOIN`,
                pt: `# Merge básico (inner join por padrão)
df_resultado = pd.merge(df_pedidos, df_clientes, on="cliente_id")

# Left join - manter todos os pedidos
df_resultado = pd.merge(df_pedidos, df_clientes, on="cliente_id", how="left")

# Quando as colunas têm nomes diferentes
df_resultado = pd.merge(
    df_pedidos, 
    df_clientes, 
    left_on="customer_id", 
    right_on="id"
)

💡 Igual ao SQL:
- how="inner" → INNER JOIN
- how="left"  → LEFT JOIN
- how="right" → RIGHT JOIN
- how="outer" → FULL OUTER JOIN`
              }
            },
          ]
        },
        {
          id: 'l1-padv-practica',
          title: { es: '🎯 Práctica Pandas', en: '🎯 Pandas Practice', pt: '🎯 Prática Pandas' },
          description: {
            es: 'Ahora que sabés Pandas, es hora de practicar. Completá los ejercicios de la plataforma.',
            en: 'Now that you know Pandas, it\'s time to practice. Complete the platform exercises.',
            pt: 'Agora que sabe Pandas, é hora de praticar. Complete os exercícios da plataforma.'
          },
          steps: [
            { id: 'l1-padv-ex1', text: { es: '✅ Completé 10 ejercicios de Pandas en la plataforma', en: '✅ Completed 10 Pandas exercises on the platform', pt: '✅ Completei 10 exercícios de Pandas na plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Pandas', en: 'Pandas Exercises', pt: 'Exercícios Pandas' }, link: '/members?tab=practica&category=python&subcategory=pandas' } },
            { id: 'l1-padv-pr1', text: { es: '🛠️ Completé el Proyecto ETL con Python', en: '🛠️ Completed ETL Project with Python', pt: '🛠️ Completei o Projeto ETL com Python' }, type: 'task', checkbox: true, resource: { type: 'project', label: { es: 'Proyecto ETL', en: 'ETL Project', pt: 'Projeto ETL' }, projectId: 'p1-etl-python' } },
          ],
          stopTitle: { es: '🎉 ¡Pandas dominado!', en: '🎉 Pandas mastered!', pt: '🎉 Pandas dominado!' },
          stopContent: {
            es: 'Ya sabés lo esencial de Pandas. Con esto podés hacer el 80% del trabajo de limpieza de datos. Ahora vamos con SQL.',
            en: 'You now know the essentials of Pandas. With this you can do 80% of data cleaning work. Now let\'s go with SQL.',
            pt: 'Você já sabe o essencial de Pandas. Com isso pode fazer 80% do trabalho de limpeza de dados. Agora vamos com SQL.'
          }
        }
      ]
    },
    // ========== CAPÍTULO 5: SQL FUNDAMENTOS ==========
    {
      id: 'l1-sql',
      title: { es: 'SQL: El 80% de tu Laburo', en: 'SQL: 80% of Your Job', pt: 'SQL: 80% do Seu Trabalho' },
      emoji: '🗃️',
      sections: [
        {
          id: 'l1-sql-intro',
          title: { es: '💬 Sobre SQL', en: '💬 About SQL', pt: '💬 Sobre SQL' },
          description: {
            es: 'Te lo digo sin vueltas: SQL es el 80% de lo que vas a hacer como Data Engineer. Si hay UNA sola cosa que tenés que dominar, es esta. No me importa si sabés Spark o Airflow - si no sabés SQL, no conseguís laburo.',
            en: 'I\'ll tell you straight: SQL is 80% of what you\'ll do as a Data Engineer. If there is ONE thing you have to master, it\'s this. I don\'t care if you know Spark or Airflow - if you don\'t know SQL, you won\'t get a job.',
            pt: 'Vou te dizer sem rodeios: SQL é 80% do que você vai fazer como Data Engineer. Se existe UMA única coisa que você tem que dominar, é esta. Não me importa se você sabe Spark ou Airflow - se não sabe SQL, não consegue trabalho.'
          },
          steps: [
            { id: 'l1-sql-msg', text: { es: 'Entiendo que SQL es fundamental', en: 'I understand that SQL is fundamental', pt: 'Entendo que SQL é fundamental' }, type: 'task', checkbox: true },
            { 
              id: 'l1-sql-donde', 
              text: { es: 'Sé dónde practicar SQL (ver opciones)', en: 'I know where to practice SQL (see options)', pt: 'Sei onde praticar SQL (ver opções)' }, 
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `¿Dónde practicar SQL?

1️⃣ En esta plataforma (recomendado)
→ Pestaña "Práctica" → SQL
→ Ejercicios con datos reales, sin instalar nada

2️⃣ SQLite Online (gratis, sin instalar)
→ sqliteonline.com
→ Podés crear tablas y hacer queries en el navegador

3️⃣ PostgreSQL local (para proyectos serios)
→ postgresql.org/download
→ O más fácil: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

4️⃣ DBeaver (cliente de base de datos gratuito)
→ dbeaver.io
→ Se conecta a cualquier base de datos con interfaz visual

💡 Para empezar: usá nuestra plataforma o SQLite Online.
Cuando hagas proyectos, vas a usar PostgreSQL o Snowflake.`,
                en: `Where to practice SQL?

1️⃣ On this platform (recommended)
→ "Practice" tab → SQL
→ Exercises with real data, no installation

2️⃣ SQLite Online (free, no install)
→ sqliteonline.com
→ You can create tables and run queries in browser

3️⃣ Local PostgreSQL (for serious projects)
→ postgresql.org/download
→ Or easier: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

4️⃣ DBeaver (free database client)
→ dbeaver.io
→ Connects to any database with visual interface

💡 To start: use our platform or SQLite Online.
When doing projects, you'll use PostgreSQL or Snowflake.`,
                pt: `Onde praticar SQL?

1️⃣ Nesta plataforma (recomendado)
→ Aba "Prática" → SQL
→ Exercícios com dados reais, sem instalar nada

2️⃣ SQLite Online (grátis, sem instalar)
→ sqliteonline.com
→ Pode criar tabelas e fazer queries no navegador

3️⃣ PostgreSQL local (para projetos sérios)
→ postgresql.org/download
→ Ou mais fácil: docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=password postgres

4️⃣ DBeaver (cliente de banco de dados gratuito)
→ dbeaver.io
→ Se conecta a qualquer banco de dados com interface visual

💡 Para começar: use nossa plataforma ou SQLite Online.
Quando fizer projetos, vai usar PostgreSQL ou Snowflake.`
              }
            },
          ]
        },
        {
          id: 'l1-sql-basico',
          title: { es: '📖 Aprendiendo SQL', en: '📖 Learning SQL', pt: '📖 Aprendendo SQL' },
          description: {
            es: 'Te lo digo sin vueltas: SQL es el 80% de lo que vas a hacer como Data Engineer. Si hay UNA sola cosa que tenés que dominar, es esta. No me importa si sabés Spark o Airflow - si no sabés SQL, no conseguís laburo.',
            en: 'I\'ll tell you straight: SQL is 80% of what you\'ll do as a Data Engineer. If there is ONE thing you have to master, it\'s this. I don\'t care if you know Spark or Airflow - if you don\'t know SQL, you won\'t get a job.',
            pt: 'Vou te dizer sem rodeios: SQL é 80% do que você vai fazer como Data Engineer. Se existe UMA única coisa que você tem que dominar, é esta. Não me importa se você sabe Spark ou Airflow - se não sabe SQL, não consegue trabalho.'
          },
          steps: [
            { 
              id: 'l1-sql-1', 
              text: { es: 'Domino JOINs (INNER, LEFT, RIGHT) - puedo combinar tablas sin pensar', en: 'I master JOINs (INNER, LEFT, RIGHT) - I can combine tables without thinking', pt: 'Domino JOINs (INNER, LEFT, RIGHT) - posso combinar tabelas sem pensar' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Guía visual de JOINs', en: 'Visual JOINs Guide', pt: 'Guia visual de JOINs' }, link: 'https://www.w3schools.com/sql/sql_join.asp' },
              explanation: {
                es: `Los JOINs combinan filas de dos o más tablas basándose en una columna relacionada.

🔵 INNER JOIN: Solo filas que coinciden en AMBAS tablas
SELECT * FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id
→ Si un pedido no tiene cliente, o un cliente no tiene pedidos, NO aparecen

⬅️ LEFT JOIN: TODAS las filas de la tabla izquierda + coincidencias de la derecha
SELECT * FROM clientes LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id
→ Todos los clientes aparecen, aunque no tengan pedidos (pedidos será NULL)

➡️ RIGHT JOIN: Igual pero al revés (todas de la derecha)

🔄 FULL OUTER JOIN: TODAS las filas de ambas tablas

💡 Tip: LEFT JOIN es el más usado en Data Engineering porque queremos mantener todos los registros de una tabla principal.`,
                en: `JOINs combine rows from two or more tables based on a related column.

🔵 INNER JOIN: Only rows that match in BOTH tables
SELECT * FROM orders INNER JOIN customers ON orders.customer_id = customers.id
→ If an order has no customer, or a customer has no orders, they DO NOT appear

⬅️ LEFT JOIN: ALL rows from the left table + matches from the right
SELECT * FROM customers LEFT JOIN orders ON customers.id = orders.customer_id
→ All customers appear, even if they have no orders (orders will be NULL)

➡️ RIGHT JOIN: Same but reversed (all from the right)

🔄 FULL OUTER JOIN: ALL rows from both tables

💡 Tip: LEFT JOIN is the most used in Data Engineering because we want to keep all records from a main table.`,
                pt: `Os JOINs combinam linhas de duas ou mais tabelas com base em uma coluna relacionada.

🔵 INNER JOIN: Apenas linhas que coincidem em AMBAS as tabelas
SELECT * FROM pedidos INNER JOIN clientes ON pedidos.cliente_id = clientes.id
→ Se um pedido não tem cliente, ou um cliente não tem pedidos, NÃO aparecem

⬅️ LEFT JOIN: TODAS as linhas da tabela esquerda + coincidências da direita
SELECT * FROM clientes LEFT JOIN pedidos ON clientes.id = pedidos.cliente_id
→ Todos os clientes aparecem, mesmo que não tenham pedidos (pedidos será NULL)

➡️ RIGHT JOIN: Igual mas ao contrário (todas da direita)

🔄 FULL OUTER JOIN: TODAS as linhas de ambas as tabelas

💡 Dica: LEFT JOIN é o mais usado em Data Engineering porque queremos manter todos os registros de uma tabela principal.`
              }
            },
            // ... (Rest of SQL basic steps)
          ]
        }
      ]
    },
    // ========== CAPÍTULO 6: SQL AVANZADO ==========
    {
      id: 'l1-sql-adv',
      title: { es: 'SQL Avanzado', en: 'Advanced SQL', pt: 'SQL Avançado' },
      emoji: '🚀',
      sections: [
        {
          id: 'l1-sqladv-window',
          title: { es: '🪟 Window Functions', en: '🪟 Window Functions', pt: '🪟 Window Functions' },
          description: {
            es: 'Las Window Functions son lo que separa a un junior de un mid-level. Te permiten hacer cálculos sobre grupos SIN colapsar las filas.',
            en: 'Window Functions are what separates a junior from a mid-level. They allow you to do calculations over groups WITHOUT collapsing rows.',
            pt: 'Window Functions são o que separa um junior de um mid-level. Permitem fazer cálculos sobre grupos SEM colapsar as linhas.'
          },
          steps: [
            { 
              id: 'l1-sqladv-1', 
              text: { es: 'Entiendo la diferencia entre GROUP BY y Window Functions', en: 'I understand the difference between GROUP BY and Window Functions', pt: 'Entendo a diferença entre GROUP BY e Window Functions' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `GROUP BY: Colapsa filas (1 fila por grupo)
SELECT categoria, SUM(ventas)
FROM productos GROUP BY categoria
→ Resultado: 1 fila por categoría

WINDOW FUNCTION: Mantiene todas las filas
SELECT nombre, categoria, ventas,
       SUM(ventas) OVER (PARTITION BY categoria) as total_categoria
FROM productos
→ Resultado: Todas las filas + columna con total

💡 Window = puedo ver el detalle Y el resumen al mismo tiempo`,
                en: `GROUP BY: Collapses rows (1 row per group)
SELECT category, SUM(sales)
FROM products GROUP BY category
→ Result: 1 row per category

WINDOW FUNCTION: Keeps all rows
SELECT name, category, sales,
       SUM(sales) OVER (PARTITION BY category) as category_total
FROM products
→ Result: All rows + column with total

💡 Window = I can see detail AND summary at the same time`,
                pt: `GROUP BY: Colapsa linhas (1 linha por grupo)
SELECT categoria, SUM(vendas)
FROM produtos GROUP BY categoria
→ Resultado: 1 linha por categoria

WINDOW FUNCTION: Mantém todas as linhas
SELECT nome, categoria, vendas,
       SUM(vendas) OVER (PARTITION BY categoria) as total_categoria
FROM produtos
→ Resultado: Todas as linhas + coluna com total

💡 Window = posso ver o detalhe E o resumo ao mesmo tempo`
              }
            },
            { 
              id: 'l1-sqladv-2', 
              text: { es: 'Sé usar ROW_NUMBER, RANK y DENSE_RANK', en: 'I know how to use ROW_NUMBER, RANK and DENSE_RANK', pt: 'Sei usar ROW_NUMBER, RANK e DENSE_RANK' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `-- Numerar filas (útil para "top N por grupo")
SELECT nombre, categoria, ventas,
       ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY ventas DESC) as ranking
FROM productos

ROW_NUMBER: 1, 2, 3, 4, 5 (siempre únicos)
RANK:       1, 2, 2, 4, 5 (empates saltan números)
DENSE_RANK: 1, 2, 2, 3, 4 (empates NO saltan)

💡 Caso de uso típico: "Dame el producto más vendido de cada categoría"
WHERE ranking = 1`,
                en: `-- Number rows (useful for "top N per group")
SELECT name, category, sales,
       ROW_NUMBER() OVER (PARTITION BY category ORDER BY sales DESC) as ranking
FROM products

ROW_NUMBER: 1, 2, 3, 4, 5 (always unique)
RANK:       1, 2, 2, 4, 5 (ties skip numbers)
DENSE_RANK: 1, 2, 2, 3, 4 (ties DON'T skip)

💡 Typical use case: "Give me the best selling product in each category"
WHERE ranking = 1`,
                pt: `-- Numerar linhas (útil para "top N por grupo")
SELECT nome, categoria, vendas,
       ROW_NUMBER() OVER (PARTITION BY categoria ORDER BY vendas DESC) as ranking
FROM produtos

ROW_NUMBER: 1, 2, 3, 4, 5 (sempre únicos)
RANK:       1, 2, 2, 4, 5 (empates pulam números)
DENSE_RANK: 1, 2, 2, 3, 4 (empates NÃO pulam)

💡 Caso de uso típico: "Me dê o produto mais vendido de cada categoria"
WHERE ranking = 1`
              }
            },
            { 
              id: 'l1-sqladv-3', 
              text: { es: 'Sé usar LAG y LEAD para comparar con filas anteriores/siguientes', en: 'I know how to use LAG and LEAD to compare with previous/next rows', pt: 'Sei usar LAG e LEAD para comparar com linhas anteriores/seguintes' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `-- Comparar con el mes anterior
SELECT mes, ventas,
       LAG(ventas) OVER (ORDER BY mes) as ventas_mes_anterior,
       ventas - LAG(ventas) OVER (ORDER BY mes) as diferencia
FROM ventas_mensuales

LAG(col, N): Valor de N filas ANTES
LEAD(col, N): Valor de N filas DESPUÉS

💡 Caso de uso: "¿Cuánto crecieron las ventas vs mes anterior?"`,
                en: `-- Compare with previous month
SELECT month, sales,
       LAG(sales) OVER (ORDER BY month) as previous_month_sales,
       sales - LAG(sales) OVER (ORDER BY month) as difference
FROM monthly_sales

LAG(col, N): Value from N rows BEFORE
LEAD(col, N): Value from N rows AFTER

💡 Use case: "How much did sales grow vs previous month?"`,
                pt: `-- Comparar com o mês anterior
SELECT mes, vendas,
       LAG(vendas) OVER (ORDER BY mes) as vendas_mes_anterior,
       vendas - LAG(vendas) OVER (ORDER BY mes) as diferenca
FROM vendas_mensais

LAG(col, N): Valor de N linhas ANTES
LEAD(col, N): Valor de N linhas DEPOIS

💡 Caso de uso: "Quanto cresceram as vendas vs mês anterior?"`
              }
            },
          ]
        },
        {
          id: 'l1-sqladv-cte',
          title: { es: '📝 CTEs (Common Table Expressions)', en: '📝 CTEs (Common Table Expressions)', pt: '📝 CTEs (Common Table Expressions)' },
          description: {
            es: 'Los CTEs son "subconsultas con nombre". Hacen tu código más legible y reutilizable.',
            en: 'CTEs are "named subqueries". They make your code more readable and reusable.',
            pt: 'CTEs são "subqueries com nome". Tornam seu código mais legível e reutilizável.'
          },
          steps: [
            { 
              id: 'l1-sqladv-4', 
              text: { es: 'Sé escribir y usar CTEs con WITH', en: 'I know how to write and use CTEs with WITH', pt: 'Sei escrever e usar CTEs com WITH' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `WITH ventas_por_cliente AS (
    SELECT cliente_id, SUM(total) as total_gastado
    FROM ordenes
    GROUP BY cliente_id
),
clientes_vip AS (
    SELECT cliente_id, total_gastado
    FROM ventas_por_cliente
    WHERE total_gastado > 10000
)
SELECT c.nombre, v.total_gastado
FROM clientes c
JOIN clientes_vip v ON c.id = v.cliente_id

💡 Ventajas:
- Código más legible (paso a paso)
- Reutilizable (podés usar el CTE varias veces)
- Más fácil de debuggear`,
                en: `WITH sales_per_customer AS (
    SELECT customer_id, SUM(total) as total_spent
    FROM orders
    GROUP BY customer_id
),
vip_customers AS (
    SELECT customer_id, total_spent
    FROM sales_per_customer
    WHERE total_spent > 10000
)
SELECT c.name, v.total_spent
FROM customers c
JOIN vip_customers v ON c.id = v.customer_id

💡 Benefits:
- More readable code (step by step)
- Reusable (can use CTE multiple times)
- Easier to debug`,
                pt: `WITH vendas_por_cliente AS (
    SELECT cliente_id, SUM(total) as total_gasto
    FROM pedidos
    GROUP BY cliente_id
),
clientes_vip AS (
    SELECT cliente_id, total_gasto
    FROM vendas_por_cliente
    WHERE total_gasto > 10000
)
SELECT c.nome, v.total_gasto
FROM clientes c
JOIN clientes_vip v ON c.id = v.cliente_id

💡 Vantagens:
- Código mais legível (passo a passo)
- Reutilizável (pode usar o CTE várias vezes)
- Mais fácil de debugar`
              }
            },
          ]
        },
        {
          id: 'l1-sqladv-practica',
          title: { es: '🎯 Práctica SQL Avanzado', en: '🎯 Advanced SQL Practice', pt: '🎯 Prática SQL Avançado' },
          description: {
            es: 'Practica hasta que Window Functions y CTEs sean naturales.',
            en: 'Practice until Window Functions and CTEs feel natural.',
            pt: 'Pratique até Window Functions e CTEs serem naturais.'
          },
          steps: [
            { id: 'l1-sqladv-ex1', text: { es: '✅ Completé ejercicios de SQL Medium', en: '✅ Completed SQL Medium exercises', pt: '✅ Completei exercícios de SQL Medium' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'SQL Medium', en: 'SQL Medium', pt: 'SQL Medium' }, link: '/members?tab=practica&category=sql&difficulty=medium' } },
            { id: 'l1-sqladv-pr', text: { es: '🛠️ Completé el Proyecto SQL Logs', en: '🛠️ Completed SQL Logs Project', pt: '🛠️ Completei o Projeto SQL Logs' }, type: 'task', checkbox: true, resource: { type: 'project', label: { es: 'Proyecto SQL', en: 'SQL Project', pt: 'Projeto SQL' }, projectId: 'p2-sql-logs' } },
          ],
          stopTitle: { es: '🏆 NIVEL DESBLOQUEADO: SQL Intermedio', en: '🏆 LEVEL UNLOCKED: Intermediate SQL', pt: '🏆 NÍVEL DESBLOQUEADO: SQL Intermediário' },
          stopContent: {
            es: '¡Wow! Si dominás Window Functions y CTEs, estás en el TOP 20% de candidatos a Data Engineer. En serio. La mayoría solo sabe SELECT y JOIN. Vos ya podés hacer análisis complejos que impresionan en entrevistas. Ahora viene Git - la herramienta que todo equipo tech usa. Ya tenés el 60% del stack técnico necesario. 🚀',
            en: 'Wow! If you master Window Functions and CTEs, you\'re in the TOP 20% of Data Engineer candidates. Seriously. Most only know SELECT and JOIN. You can already do complex analyses that impress in interviews. Now comes Git - the tool every tech team uses. You already have 60% of the required tech stack. 🚀',
            pt: 'Uau! Se você domina Window Functions e CTEs, está no TOP 20% de candidatos a Data Engineer. Sério. A maioria só sabe SELECT e JOIN. Você já pode fazer análises complexas que impressionam em entrevistas. Agora vem Git - a ferramenta que todo time tech usa. Você já tem 60% do stack técnico necessário. 🚀'
          }
        }
      ]
    },
    // ========== CAPÍTULO 7: GIT Y GITHUB ==========
    {
      id: 'l1-git',
      title: { es: 'Git y GitHub Profesional', en: 'Professional Git and GitHub', pt: 'Git e GitHub Profissional' },
      emoji: '🌿',
      sections: [
        {
          id: 'l1-git-porque',
          title: { es: '💡 Por qué Git es obligatorio', en: '💡 Why Git is mandatory', pt: '💡 Por que Git é obrigatório' },
          description: {
            es: 'Git aparece en el 100% de las ofertas de trabajo. No es opcional. Acá vamos más profundo que en el Nivel 0.',
            en: 'Git appears in 100% of job offers. It\'s not optional. Here we go deeper than Level 0.',
            pt: 'Git aparece em 100% das ofertas de trabalho. Não é opcional. Aqui vamos mais fundo que no Nível 0.'
          },
          steps: [
            { 
              id: 'l1-git-1', 
              text: { es: 'Entiendo el flujo: add → commit → push', en: 'I understand the flow: add → commit → push', pt: 'Entendo o fluxo: add → commit → push' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `1. MODIFICÁS archivos (trabajás normal)

2. git add archivo.py
   → Preparás los cambios para guardar

3. git commit -m "Agregué función de limpieza"
   → Guardás una "foto" de tu código

4. git push origin main
   → Subís a GitHub (backup + compartir)

💡 Commit frecuente = menos problemas
Hacé commits chicos, con mensajes claros.`,
                en: `1. MODIFY files (work normally)

2. git add file.py
   → Stage changes to save

3. git commit -m "Added cleaning function"
   → Save a "snapshot" of your code

4. git push origin main
   → Upload to GitHub (backup + share)

💡 Frequent commits = less problems
Make small commits, with clear messages.`,
                pt: `1. MODIFICA arquivos (trabalha normal)

2. git add arquivo.py
   → Prepara as mudanças para salvar

3. git commit -m "Adicionei função de limpeza"
   → Salva uma "foto" do seu código

4. git push origin main
   → Sobe para GitHub (backup + compartilhar)

💡 Commit frequente = menos problemas
Faça commits pequenos, com mensagens claras.`
              }
            },
            { 
              id: 'l1-git-2', 
              text: { es: 'Sé crear y usar branches', en: 'I know how to create and use branches', pt: 'Sei criar e usar branches' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Ver en qué branch estoy
git branch

# Crear nueva branch y moverme a ella
git checkout -b feature/nueva-funcionalidad

# Cambiar entre branches
git checkout main
git checkout feature/nueva-funcionalidad

# Subir branch a GitHub
git push -u origin feature/nueva-funcionalidad

💡 Regla de oro: NUNCA trabajes directo en main
Siempre creá una branch para cambios nuevos.`,
                en: `# See which branch I'm on
git branch

# Create new branch and switch to it
git checkout -b feature/new-functionality

# Switch between branches
git checkout main
git checkout feature/new-functionality

# Push branch to GitHub
git push -u origin feature/new-functionality

💡 Golden rule: NEVER work directly on main
Always create a branch for new changes.`,
                pt: `# Ver em qual branch estou
git branch

# Criar nova branch e ir para ela
git checkout -b feature/nova-funcionalidade

# Trocar entre branches
git checkout main
git checkout feature/nova-funcionalidade

# Subir branch para GitHub
git push -u origin feature/nova-funcionalidade

💡 Regra de ouro: NUNCA trabalhe direto na main
Sempre crie uma branch para mudanças novas.`
              }
            },
            { 
              id: 'l1-git-3', 
              text: { es: 'Sé hacer merge y resolver conflictos básicos', en: 'I know how to merge and resolve basic conflicts', pt: 'Sei fazer merge e resolver conflitos básicos' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `# Mergear una branch a main
git checkout main
git merge feature/nueva-funcionalidad

# Si hay CONFLICTO:
# Git te marca dónde están los problemas:
<<<<<<< HEAD
código de main
=======
código de tu branch
>>>>>>> feature/nueva-funcionalidad

# Elegí qué código querés, borrá los marcadores,
# y hacé commit.

💡 VS Code te ayuda mucho con conflictos
Tiene botones para elegir qué versión usar.`,
                en: `# Merge a branch to main
git checkout main
git merge feature/new-functionality

# If there's a CONFLICT:
# Git marks where the problems are:
<<<<<<< HEAD
main's code
=======
your branch's code
>>>>>>> feature/new-functionality

# Choose which code you want, delete markers,
# and commit.

💡 VS Code helps a lot with conflicts
Has buttons to choose which version to use.`,
                pt: `# Fazer merge de uma branch para main
git checkout main
git merge feature/nova-funcionalidade

# Se houver CONFLITO:
# Git marca onde estão os problemas:
<<<<<<< HEAD
código da main
=======
código da sua branch
>>>>>>> feature/nova-funcionalidade

# Escolha qual código quer, delete os marcadores,
# e faça commit.

💡 VS Code ajuda muito com conflitos
Tem botões para escolher qual versão usar.`
              }
            },
          ]
        },
        {
          id: 'l1-git-github',
          title: { es: '🐙 GitHub para tu Portfolio', en: '🐙 GitHub for your Portfolio', pt: '🐙 GitHub para seu Portfolio' },
          description: {
            es: 'Tu GitHub ES tu CV técnico. Los recruiters lo miran.',
            en: 'Your GitHub IS your technical CV. Recruiters look at it.',
            pt: 'Seu GitHub É seu CV técnico. Recrutadores olham.'
          },
          steps: [
            { 
              id: 'l1-git-4', 
              text: { es: 'Tengo al menos 3 proyectos con README claro en GitHub', en: 'I have at least 3 projects with clear README on GitHub', pt: 'Tenho pelo menos 3 projetos com README claro no GitHub' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Un buen README tiene:

# Nombre del Proyecto
Descripción en 1-2 oraciones.

## Qué hace
Explicá el problema que resuelve.

## Tecnologías
- Python 3.9
- Pandas
- PostgreSQL

## Cómo ejecutarlo
\`\`\`bash
pip install -r requirements.txt
python main.py
\`\`\`

## Capturas/Resultados
Agregá imágenes si podés.

💡 Un README malo = proyecto invisible`,
                en: `A good README has:

# Project Name
Description in 1-2 sentences.

## What it does
Explain the problem it solves.

## Technologies
- Python 3.9
- Pandas
- PostgreSQL

## How to run it
\`\`\`bash
pip install -r requirements.txt
python main.py
\`\`\`

## Screenshots/Results
Add images if you can.

💡 A bad README = invisible project`,
                pt: `Um bom README tem:

# Nome do Projeto
Descrição em 1-2 frases.

## O que faz
Explique o problema que resolve.

## Tecnologias
- Python 3.9
- Pandas
- PostgreSQL

## Como executar
\`\`\`bash
pip install -r requirements.txt
python main.py
\`\`\`

## Capturas/Resultados
Adicione imagens se puder.

💡 Um README ruim = projeto invisível`
              }
            },
          ]
        }
      ]
    },
    // ========== CAPÍTULO 8: APIs Y JSON ==========
    {
      id: 'l1-apis',
      title: { es: 'APIs y JSON', en: 'APIs and JSON', pt: 'APIs e JSON' },
      emoji: '🔌',
      sections: [
        {
          id: 'l1-apis-que',
          title: { es: '🤔 ¿Qué es una API?', en: '🤔 What is an API?', pt: '🤔 O que é uma API?' },
          description: {
            es: 'Una API es como un mozo en un restaurant: vos le pedís lo que querés, él va a la cocina, y te trae la comida. No necesitás saber cocinar.',
            en: 'An API is like a waiter in a restaurant: you tell them what you want, they go to the kitchen, and bring you the food. You don\'t need to know how to cook.',
            pt: 'Uma API é como um garçom em um restaurante: você diz o que quer, ele vai para a cozinha e traz a comida. Você não precisa saber cozinhar.'
          },
          steps: [
            { 
              id: 'l1-api-1', 
              text: { es: 'Entiendo qué es una API y para qué sirve', en: 'I understand what an API is and what it\'s for', pt: 'Entendo o que é uma API e para que serve' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `API = Application Programming Interface

En Data Engineering usamos APIs para:
- Obtener datos de servicios (Twitter, clima, finanzas)
- Enviar datos a otros sistemas
- Automatizar procesos

Ejemplo real:
1. Hacés un pedido: "Dame el clima de Buenos Aires"
2. La API procesa tu pedido
3. Te devuelve: {"temp": 25, "humidity": 60}

💡 El 90% de los datos que vas a procesar vienen de APIs`,
                en: `API = Application Programming Interface

In Data Engineering we use APIs to:
- Get data from services (Twitter, weather, finance)
- Send data to other systems
- Automate processes

Real example:
1. You make a request: "Give me weather for New York"
2. The API processes your request
3. Returns: {"temp": 75, "humidity": 60}

💡 90% of data you'll process comes from APIs`,
                pt: `API = Application Programming Interface

Em Data Engineering usamos APIs para:
- Obter dados de serviços (Twitter, clima, finanças)
- Enviar dados para outros sistemas
- Automatizar processos

Exemplo real:
1. Você faz um pedido: "Me dê o clima de São Paulo"
2. A API processa seu pedido
3. Retorna: {"temp": 25, "humidity": 60}

💡 90% dos dados que você vai processar vêm de APIs`
              }
            },
            { 
              id: 'l1-api-2', 
              text: { es: 'Sé hacer requests con Python (librería requests)', en: 'I know how to make requests with Python (requests library)', pt: 'Sei fazer requests com Python (biblioteca requests)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `import requests

# GET: Obtener datos
response = requests.get("https://api.example.com/users")
data = response.json()  # Convertir a diccionario

# Con parámetros
response = requests.get(
    "https://api.example.com/users",
    params={"country": "Argentina", "limit": 100}
)

# Verificar si funcionó
if response.status_code == 200:
    print("¡Éxito!")
else:
    print(f"Error: {response.status_code}")

# Instalar: pip install requests`,
                en: `import requests

# GET: Fetch data
response = requests.get("https://api.example.com/users")
data = response.json()  # Convert to dictionary

# With parameters
response = requests.get(
    "https://api.example.com/users",
    params={"country": "USA", "limit": 100}
)

# Check if it worked
if response.status_code == 200:
    print("Success!")
else:
    print(f"Error: {response.status_code}")

# Install: pip install requests`,
                pt: `import requests

# GET: Obter dados
response = requests.get("https://api.example.com/users")
data = response.json()  # Converter para dicionário

# Com parâmetros
response = requests.get(
    "https://api.example.com/users",
    params={"country": "Brasil", "limit": 100}
)

# Verificar se funcionou
if response.status_code == 200:
    print("Sucesso!")
else:
    print(f"Erro: {response.status_code}")

# Instalar: pip install requests`
              }
            },
          ]
        },
        {
          id: 'l1-apis-json',
          title: { es: '📄 Trabajar con JSON', en: '📄 Working with JSON', pt: '📄 Trabalhar com JSON' },
          description: {
            es: 'JSON es EL formato de datos de internet. Si entendés diccionarios de Python, ya sabés JSON.',
            en: 'JSON is THE data format of the internet. If you understand Python dictionaries, you already know JSON.',
            pt: 'JSON é O formato de dados da internet. Se você entende dicionários Python, já sabe JSON.'
          },
          steps: [
            { 
              id: 'l1-api-3', 
              text: { es: 'Sé leer y escribir archivos JSON en Python', en: 'I know how to read and write JSON files in Python', pt: 'Sei ler e escrever arquivos JSON em Python' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `import json

# LEER JSON desde archivo
with open("datos.json", "r") as f:
    data = json.load(f)

# ESCRIBIR JSON a archivo
with open("salida.json", "w") as f:
    json.dump(data, f, indent=2)

# String JSON → Diccionario
data = json.loads('{"nombre": "Ana", "edad": 25}')

# Diccionario → String JSON
texto = json.dumps(data, indent=2)

💡 JSON es básicamente un diccionario de Python guardado como texto`,
                en: `import json

# READ JSON from file
with open("data.json", "r") as f:
    data = json.load(f)

# WRITE JSON to file
with open("output.json", "w") as f:
    json.dump(data, f, indent=2)

# JSON string → Dictionary
data = json.loads('{"name": "Ana", "age": 25}')

# Dictionary → JSON string
text = json.dumps(data, indent=2)

💡 JSON is basically a Python dictionary saved as text`,
                pt: `import json

# LER JSON de arquivo
with open("dados.json", "r") as f:
    data = json.load(f)

# ESCREVER JSON para arquivo
with open("saida.json", "w") as f:
    json.dump(data, f, indent=2)

# String JSON → Dicionário
data = json.loads('{"nome": "Ana", "idade": 25}')

# Dicionário → String JSON
texto = json.dumps(data, indent=2)

💡 JSON é basicamente um dicionário Python salvo como texto`
              }
            },
          ]
        },
        {
          id: 'l1-apis-practica',
          title: { es: '🎯 Práctica APIs', en: '🎯 APIs Practice', pt: '🎯 Prática APIs' },
          description: {
            es: 'Practicá consumiendo APIs reales y gratuitas.',
            en: 'Practice consuming real and free APIs.',
            pt: 'Pratique consumindo APIs reais e gratuitas.'
          },
          steps: [
            { id: 'l1-api-ex1', text: { es: '✅ Hice un request a una API pública y mostré los datos', en: '✅ Made a request to a public API and displayed the data', pt: '✅ Fiz um request para uma API pública e mostrei os dados' }, type: 'task', checkbox: true, resource: { type: 'external', label: { es: 'APIs Públicas Gratis', en: 'Free Public APIs', pt: 'APIs Públicas Grátis' }, link: 'https://github.com/public-apis/public-apis' } },
            { id: 'l1-api-pr', text: { es: '🛠️ Completé el Proyecto API Pipeline', en: '🛠️ Completed API Pipeline Project', pt: '🛠️ Completei o Projeto API Pipeline' }, type: 'task', checkbox: true, resource: { type: 'project', label: { es: 'Proyecto API', en: 'API Project', pt: 'Projeto API' }, projectId: 'p3-api-pipeline' } },
          ],
          stopTitle: { es: '🔥 HALFWAY POINT: Ya tenés las bases fundamentales', en: '🔥 HALFWAY POINT: You have the fundamentals', pt: '🔥 HALFWAY POINT: Você já tem os fundamentos' },
          stopContent: {
            es: '¡Mirá todo lo que lograste! Python + Pandas + SQL + Git + APIs. Con esto ya podrías aplicar a posiciones Junior de Data Analyst. Pero nosotros apuntamos más alto: Data Engineer. Los próximos capítulos son Docker, AWS, Snowflake y dbt - las herramientas que te separan de un Analyst y te ponen en el camino de Engineer. ¡Vamos por ese 80% restante! 🚀',
            en: 'Look at everything you achieved! Python + Pandas + SQL + Git + APIs. With this you could already apply to Junior Data Analyst positions. But we aim higher: Data Engineer. The next chapters are Docker, AWS, Snowflake and dbt - the tools that separate you from an Analyst and put you on the Engineer path. Let\'s go for that remaining 80%! 🚀',
            pt: 'Olha tudo o que você conquistou! Python + Pandas + SQL + Git + APIs. Com isso você já poderia se candidatar a posições Junior de Data Analyst. Mas nós miramos mais alto: Data Engineer. Os próximos capítulos são Docker, AWS, Snowflake e dbt - as ferramentas que te separam de um Analyst e te colocam no caminho de Engineer. Vamos por esses 80% restantes! 🚀'
          }
        }
      ]
    }
    // Capítulos 9, 10, 11 están en level1_part2.ts
  ]
};


