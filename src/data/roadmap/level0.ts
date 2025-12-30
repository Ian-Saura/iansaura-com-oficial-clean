/* eslint-disable no-useless-escape */
import { RoadmapLevel } from '../../types/members';

export const level0: RoadmapLevel = {
  level: 0,
  title: {
    es: 'Fundamentos',
    en: 'Fundamentals',
    pt: 'Fundamentos'
  },
  subtitle: {
    es: 'Para quienes nunca programaron',
    en: 'For those who have never coded',
    pt: 'Para quem nunca programou'
  },
  description: {
    es: 'Si nunca programaste, este nivel es para vos. No importa si tenés 15 o 50 años. En 2-3 semanas vas a entender qué es programar, escribir tu primer código, y tener las bases para una carrera en tecnología. Es 100% gratis.',
    en: 'If you have never coded, this level is for you. It doesn\'t matter if you are 15 or 50 years old. In 2-3 weeks you will understand what coding is, write your first code, and have the foundations for a career in technology. It\'s 100% free.',
    pt: 'Se você nunca programou, este nível é para você. Não importa se tem 15 ou 50 anos. Em 2-3 semanas você vai entender o que é programar, escrever seu primeiro código e ter as bases para uma carreira em tecnologia. É 100% grátis.'
  },
  badge: {
    es: '🌱 Semilla',
    en: '🌱 Seed',
    pt: '🌱 Semente'
  },
  color: 'teal',
  phases: [
    // ========== FASE 1: ¿QUÉ ES PROGRAMAR? ==========
    {
      id: 'l0-intro',
      title: { es: '¿Qué es Programar?', en: 'What is Coding?', pt: 'O que é Programar?' },
      emoji: '🤔',
      sections: [
        {
          id: 'l0-intro-bienvenida',
          title: { es: '👋 ¡Hola! Bienvenido/a', en: '👋 Hello! Welcome', pt: '👋 Olá! Bem-vindo/a' },
          description: {
            es: 'Soy Ian Saura y voy a enseñarte a programar desde cero. No necesitás saber nada - solo ganas de aprender. En unas semanas vas a poder crear cosas que hoy parecen magia.',
            en: 'I\'m Ian Saura and I\'m going to teach you how to code from scratch. You don\'t need to know anything - just a desire to learn. In a few weeks you will be able to create things that seem like magic today.',
            pt: 'Sou Ian Saura e vou te ensinar a programar do zero. Não precisa saber nada - apenas vontade de aprender. Em algumas semanas você vai poder criar coisas que hoje parecem mágica.'
          },
          steps: [
            { id: 'l0-i-1', text: { es: 'Leí la bienvenida y estoy listo/a para empezar', en: 'I read the welcome message and I\'m ready to start', pt: 'Li as boas-vindas e estou pronto/a para começar' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-intro-que-es',
          title: { es: '💡 ¿Qué es programar?', en: '💡 What is coding?', pt: '💡 O que é programar?' },
          description: {
            es: 'Programar es darle instrucciones a una computadora para que haga algo. Es como escribir una receta de cocina: le decís paso a paso qué tiene que hacer, y la computadora lo ejecuta. La diferencia es que la computadora hace EXACTAMENTE lo que le decís, ni más ni menos.',
            en: 'Coding is giving instructions to a computer to do something. It\'s like writing a cooking recipe: you tell it step by step what to do, and the computer executes it. The difference is that the computer does EXACTLY what you tell it, no more, no less.',
            pt: 'Programar é dar instruções a um computador para que ele faça algo. É como escrever uma receita de culinária: você diz passo a passo o que ele tem que fazer, e o computador executa. A diferença é que o computador faz EXATAMENTE o que você diz, nem mais nem menos.'
          },
          steps: [
            { id: 'l0-i-2', text: { es: 'Entiendo que programar es escribir instrucciones para la computadora', en: 'I understand that coding is writing instructions for the computer', pt: 'Entendo que programar é escrever instruções para o computador' }, type: 'task', checkbox: true },
            { id: 'l0-i-3', text: { es: 'Entiendo que la computadora hace exactamente lo que le digo (si me equivoco, ella también)', en: 'I understand that the computer does exactly what I tell it (if I make a mistake, it does too)', pt: 'Entendo que o computador faz exatamente o que eu digo (se eu erro, ele também erra)' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-intro-ejemplos',
          title: { es: '🎮 Ejemplos de programas que usás todos los días', en: '🎮 Examples of programs you use every day', pt: '🎮 Exemplos de programas que você usa todos os dias' },
          description: {
            es: 'Instagram, TikTok, Spotify, WhatsApp, los videojuegos... TODO eso es código escrito por programadores. Alguien escribió las instrucciones para que funcionen. Y vos vas a aprender a hacer lo mismo.',
            en: 'Instagram, TikTok, Spotify, WhatsApp, video games... ALL of that is code written by programmers. Someone wrote the instructions for them to work. And you are going to learn to do the same.',
            pt: 'Instagram, TikTok, Spotify, WhatsApp, videogames... TUDO isso é código escrito por programadores. Alguém escreveu as instruções para que funcionem. E você vai aprender a fazer o mesmo.'
          },
          steps: [
            { id: 'l0-i-4', text: { es: 'Pensé en 3 apps que uso y ahora sé que alguien las programó', en: 'I thought of 3 apps I use and now I know someone coded them', pt: 'Pensei em 3 apps que uso e agora sei que alguém os programou' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-intro-data',
          title: { es: '📊 ¿Qué es Data Engineering?', en: '📊 What is Data Engineering?', pt: '📊 O que é Data Engineering?' },
          description: {
            es: 'Un Data Engineer es alguien que trabaja con DATOS. ¿Sabés esos gráficos que ves en las noticias? ¿O cuando Spotify te recomienda canciones? Atrás hay un Data Engineer que organizó y procesó millones de datos para que eso funcione. Es uno de los trabajos mejor pagados en tecnología ($3,000-$7,000 USD/mes trabajando remoto).',
            en: 'A Data Engineer is someone who works with DATA. You know those charts you see in the news? Or when Spotify recommends songs? Behind that there is a Data Engineer who organized and processed millions of data points for that to work. It is one of the best paid jobs in tech ($3,000-$7,000 USD/mo working remotely).',
            pt: 'Um Data Engineer é alguém que trabalha com DADOS. Sabe esses gráficos que você vê nas notícias? Ou quando o Spotify te recomenda músicas? Atrás disso tem um Data Engineer que organizou e processou milhões de dados para que isso funcione. É um dos trabalhos mais bem pagos em tecnologia ($3.000-$7.000 USD/mês trabalhando remoto).'
          },
          steps: [
            { id: 'l0-i-5', text: { es: 'Entiendo que un Data Engineer trabaja organizando y procesando datos', en: 'I understand that a Data Engineer works organizing and processing data', pt: 'Entendo que um Data Engineer trabalha organizando e processando dados' }, type: 'task', checkbox: true },
            { id: 'l0-i-6', text: { es: 'Sé que es un trabajo bien pago y puedo trabajar desde casa', en: 'I know it\'s a well-paid job and I can work from home', pt: 'Sei que é um trabalho bem pago e posso trabalhar de casa' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-intro-herramientas',
          title: { es: '🛠️ ¿Qué vamos a aprender?', en: '🛠️ What are we going to learn?', pt: '🛠️ O que vamos aprender?' },
          description: {
            es: 'Vamos a aprender 2 herramientas fundamentales: Python (un lenguaje de programación fácil de aprender) y SQL (el lenguaje para trabajar con datos). Con estas dos cosas, ya podés empezar a trabajar en tecnología.',
            en: 'We are going to learn 2 fundamental tools: Python (an easy-to-learn programming language) and SQL (the language for working with data). With these two things, you can already start working in tech.',
            pt: 'Vamos aprender 2 ferramentas fundamentais: Python (uma linguagem de programação fácil de aprender) e SQL (a linguagem para trabalhar com dados). Com essas duas coisas, você já pode começar a trabalhar em tecnologia.'
          },
          steps: [
            { id: 'l0-i-7', text: { es: 'Sé que voy a aprender Python y SQL', en: 'I know I\'m going to learn Python and SQL', pt: 'Sei que vou aprender Python e SQL' }, type: 'task', checkbox: true },
            { id: 'l0-i-8', text: { es: '¡Estoy listo/a para empezar! 🚀', en: 'I\'m ready to start! 🚀', pt: 'Estou pronto/a para começar! 🚀' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 1.5: TU COMPUTADORA Y LA TERMINAL ==========
    {
      id: 'l0-terminal',
      title: { es: 'Tu Computadora y la Terminal', en: 'Your Computer and Terminal', pt: 'Seu Computador e o Terminal' },
      emoji: '💻',
      sections: [
        {
          id: 'l0-term-intro',
          title: { es: '📂 Archivos y Carpetas - Lo Básico', en: '📂 Files and Folders - The Basics', pt: '📂 Arquivos e Pastas - O Básico' },
          description: {
            es: 'Antes de programar, necesitás entender cómo tu computadora organiza las cosas. Es como una biblioteca gigante: hay estantes (carpetas) y libros (archivos). Vamos a aprender a moverte por ella.',
            en: 'Before coding, you need to understand how your computer organizes things. It\'s like a giant library: there are shelves (folders) and books (files). Let\'s learn how to navigate through it.',
            pt: 'Antes de programar, você precisa entender como seu computador organiza as coisas. É como uma biblioteca gigante: há prateleiras (pastas) e livros (arquivos). Vamos aprender a navegar por ela.'
          },
          steps: [
            { 
              id: 'l0-term-1', 
              text: { es: 'Entiendo que un ARCHIVO es cualquier cosa guardada (foto, documento, código)', en: 'I understand that a FILE is anything saved (photo, document, code)', pt: 'Entendo que um ARQUIVO é qualquer coisa salva (foto, documento, código)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Un archivo es cualquier cosa que guardás en tu computadora:
                
📄 documento.txt → Un archivo de texto
🖼️ foto.jpg → Una imagen
🎵 cancion.mp3 → Una canción
🐍 mi_codigo.py → Un archivo de Python (tu código!)

💡 La "extensión" (.txt, .py, .jpg) le dice a la computadora qué tipo de archivo es.`,
                en: `A file is anything you save on your computer:
                
📄 document.txt → A text file
🖼️ photo.jpg → An image
🎵 song.mp3 → A song
🐍 my_code.py → A Python file (your code!)

💡 The "extension" (.txt, .py, .jpg) tells the computer what type of file it is.`,
                pt: `Um arquivo é qualquer coisa que você salva no seu computador:
                
📄 documento.txt → Um arquivo de texto
🖼️ foto.jpg → Uma imagem
🎵 musica.mp3 → Uma música
🐍 meu_codigo.py → Um arquivo Python (seu código!)

💡 A "extensão" (.txt, .py, .jpg) diz ao computador que tipo de arquivo é.`
              }
            },
            { 
              id: 'l0-term-2', 
              text: { es: 'Entiendo que una CARPETA es un contenedor que guarda archivos (y otras carpetas)', en: 'I understand that a FOLDER is a container that stores files (and other folders)', pt: 'Entendo que uma PASTA é um recipiente que guarda arquivos (e outras pastas)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Una carpeta (o "directorio") es como una caja donde guardás cosas:

📁 Documentos/
   ├── 📄 curriculum.pdf
   ├── 📄 notas.txt
   └── 📁 Trabajo/
       └── 📄 reporte.xlsx

💡 Las carpetas pueden estar DENTRO de otras carpetas. Es como cajas dentro de cajas.`,
                en: `A folder (or "directory") is like a box where you store things:

📁 Documents/
   ├── 📄 resume.pdf
   ├── 📄 notes.txt
   └── 📁 Work/
       └── 📄 report.xlsx

💡 Folders can be INSIDE other folders. It's like boxes inside boxes.`,
                pt: `Uma pasta (ou "diretório") é como uma caixa onde você guarda coisas:

📁 Documentos/
   ├── 📄 curriculo.pdf
   ├── 📄 notas.txt
   └── 📁 Trabalho/
       └── 📄 relatorio.xlsx

💡 As pastas podem estar DENTRO de outras pastas. É como caixas dentro de caixas.`
              }
            },
          ]
        },
        {
          id: 'l0-term-rutas',
          title: { es: '🗺️ Rutas - La Dirección de un Archivo', en: '🗺️ Paths - The Address of a File', pt: '🗺️ Caminhos - O Endereço de um Arquivo' },
          description: {
            es: 'Cuando le pedís a la computadora que abra un archivo, tenés que decirle DÓNDE está. Es como dar una dirección: "el archivo está en la carpeta Documentos, dentro de Trabajo, se llama reporte.xlsx".',
            en: 'When you ask the computer to open a file, you have to tell it WHERE it is. It\'s like giving an address: "the file is in the Documents folder, inside Work, called report.xlsx".',
            pt: 'Quando você pede ao computador para abrir um arquivo, você tem que dizer ONDE ele está. É como dar um endereço: "o arquivo está na pasta Documentos, dentro de Trabalho, se chama relatorio.xlsx".'
          },
          steps: [
            { 
              id: 'l0-term-3', 
              text: { es: 'Entiendo qué es una RUTA ABSOLUTA (la dirección completa desde el inicio)', en: 'I understand what an ABSOLUTE PATH is (the complete address from the start)', pt: 'Entendo o que é um CAMINHO ABSOLUTO (o endereço completo desde o início)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Una RUTA ABSOLUTA es la dirección COMPLETA de un archivo, desde la raíz de tu computadora:

🪟 Windows:
C:\\Users\\Juan\\Documents\\mi_codigo.py

🍎 Mac/Linux:
/Users/Juan/Documents/mi_codigo.py

💡 Es como decir la dirección completa de tu casa:
"Argentina, Buenos Aires, Calle Corrientes 1234, Piso 5, Depto B"

✅ Siempre funciona, no importa dónde estés.`,
                en: `An ABSOLUTE PATH is the COMPLETE address of a file, from the root of your computer:

🪟 Windows:
C:\\Users\\John\\Documents\\my_code.py

🍎 Mac/Linux:
/Users/John/Documents/my_code.py

💡 It's like giving the complete address of your house:
"USA, New York, 5th Avenue 1234, Floor 5, Apt B"

✅ Always works, no matter where you are.`,
                pt: `Um CAMINHO ABSOLUTO é o endereço COMPLETO de um arquivo, desde a raiz do seu computador:

🪟 Windows:
C:\\Users\\Joao\\Documentos\\meu_codigo.py

🍎 Mac/Linux:
/Users/Joao/Documentos/meu_codigo.py

💡 É como dar o endereço completo da sua casa:
"Brasil, São Paulo, Rua Augusta 1234, Andar 5, Apto B"

✅ Sempre funciona, não importa onde você esteja.`
              }
            },
            { 
              id: 'l0-term-4', 
              text: { es: 'Entiendo qué es una RUTA RELATIVA (la dirección desde donde estoy)', en: 'I understand what a RELATIVE PATH is (the address from where I am)', pt: 'Entendo o que é um CAMINHO RELATIVO (o endereço de onde estou)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Una RUTA RELATIVA es la dirección DESDE DONDE ESTÁS ahora:

Si estás en /Users/Juan/Documents/ y querés abrir mi_codigo.py:
→ ./mi_codigo.py   (el archivo está AQUÍ)
→ mi_codigo.py     (también funciona)

Si querés subir una carpeta:
→ ../              (subir un nivel)
→ ../otra_carpeta/ (subir y entrar a otra)

💡 Es como decir "al lado de la panadería" en vez de la dirección completa.

Símbolos clave:
.   = carpeta actual (donde estoy)
..  = carpeta padre (un nivel arriba)
/   = separador de carpetas`,
                en: `A RELATIVE PATH is the address FROM WHERE YOU ARE now:

If you're in /Users/John/Documents/ and want to open my_code.py:
→ ./my_code.py   (the file is HERE)
→ my_code.py     (also works)

If you want to go up a folder:
→ ../              (go up one level)
→ ../other_folder/ (go up and enter another)

💡 It's like saying "next to the bakery" instead of the full address.

Key symbols:
.   = current folder (where I am)
..  = parent folder (one level up)
/   = folder separator`,
                pt: `Um CAMINHO RELATIVO é o endereço DE ONDE VOCÊ ESTÁ agora:

Se você está em /Users/Joao/Documentos/ e quer abrir meu_codigo.py:
→ ./meu_codigo.py   (o arquivo está AQUI)
→ meu_codigo.py     (também funciona)

Se você quer subir uma pasta:
→ ../              (subir um nível)
→ ../outra_pasta/  (subir e entrar em outra)

💡 É como dizer "ao lado da padaria" em vez do endereço completo.

Símbolos chave:
.   = pasta atual (onde estou)
..  = pasta pai (um nível acima)
/   = separador de pastas`
              }
            },
          ]
        },
        {
          id: 'l0-term-terminal',
          title: { es: '⌨️ La Terminal - Tu Control Remoto', en: '⌨️ The Terminal - Your Remote Control', pt: '⌨️ O Terminal - Seu Controle Remoto' },
          description: {
            es: 'La terminal es una forma de hablarle a tu computadora escribiendo comandos. Parece de película de hackers, pero es súper útil. No te preocupes, por ahora solo necesitás saber 3 comandos básicos.',
            en: 'The terminal is a way to talk to your computer by typing commands. It looks like a hacker movie, but it\'s super useful. Don\'t worry, for now you only need to know 3 basic commands.',
            pt: 'O terminal é uma forma de falar com seu computador digitando comandos. Parece filme de hacker, mas é super útil. Não se preocupe, por enquanto você só precisa saber 3 comandos básicos.'
          },
          steps: [
            { 
              id: 'l0-term-5', 
              text: { es: 'Sé cómo abrir la Terminal en mi computadora', en: 'I know how to open the Terminal on my computer', pt: 'Sei como abrir o Terminal no meu computador' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `🪟 Windows:
1. Apretá Windows + R
2. Escribí "cmd" y Enter
(O buscá "Terminal" o "PowerShell" en el menú inicio)

🍎 Mac:
1. Apretá Cmd + Espacio
2. Escribí "Terminal" y Enter

🐧 Linux:
1. Apretá Ctrl + Alt + T

💡 ¡No tengas miedo! La terminal no muerde. Es solo texto.`,
                en: `🪟 Windows:
1. Press Windows + R
2. Type "cmd" and Enter
(Or search "Terminal" or "PowerShell" in start menu)

🍎 Mac:
1. Press Cmd + Space
2. Type "Terminal" and Enter

🐧 Linux:
1. Press Ctrl + Alt + T

💡 Don't be afraid! The terminal doesn't bite. It's just text.`,
                pt: `🪟 Windows:
1. Aperte Windows + R
2. Digite "cmd" e Enter
(Ou procure "Terminal" ou "PowerShell" no menu iniciar)

🍎 Mac:
1. Aperte Cmd + Espaço
2. Digite "Terminal" e Enter

🐧 Linux:
1. Aperte Ctrl + Alt + T

💡 Não tenha medo! O terminal não morde. É só texto.`
              }
            },
            { 
              id: 'l0-term-6', 
              text: { es: 'Probé el comando pwd (o cd en Windows) - me dice DÓNDE ESTOY', en: 'I tried the pwd command (or cd on Windows) - tells me WHERE I AM', pt: 'Testei o comando pwd (ou cd no Windows) - me diz ONDE ESTOU' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `pwd = "print working directory" = "mostrar carpeta actual"

Mac/Linux:
$ pwd
/Users/Juan/Documents

Windows (escribí solo "cd" sin nada más):
> cd
C:\\Users\\Juan\\Documents

💡 Este comando te dice en qué carpeta estás parado.
Es tu GPS dentro de la computadora.`,
                en: `pwd = "print working directory" = "show current folder"

Mac/Linux:
$ pwd
/Users/John/Documents

Windows (just type "cd" with nothing else):
> cd
C:\\Users\\John\\Documents

💡 This command tells you which folder you're in.
It's your GPS inside the computer.`,
                pt: `pwd = "print working directory" = "mostrar pasta atual"

Mac/Linux:
$ pwd
/Users/Joao/Documentos

Windows (digite só "cd" sem mais nada):
> cd
C:\\Users\\Joao\\Documentos

💡 Este comando diz em qual pasta você está.
É seu GPS dentro do computador.`
              }
            },
            { 
              id: 'l0-term-7', 
              text: { es: 'Probé el comando ls (o dir en Windows) - me muestra QUÉ HAY AQUÍ', en: 'I tried the ls command (or dir on Windows) - shows me WHAT IS HERE', pt: 'Testei o comando ls (ou dir no Windows) - me mostra O QUE TEM AQUI' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `ls = "list" = "listar contenido"

Mac/Linux:
$ ls
Documents  Downloads  Desktop  mi_codigo.py

Windows (usá "dir"):
> dir
Documents  Downloads  Desktop  mi_codigo.py

💡 Te muestra todos los archivos y carpetas que hay donde estás parado.`,
                en: `ls = "list" = "list contents"

Mac/Linux:
$ ls
Documents  Downloads  Desktop  my_code.py

Windows (use "dir"):
> dir
Documents  Downloads  Desktop  my_code.py

💡 Shows you all the files and folders where you're standing.`,
                pt: `ls = "list" = "listar conteúdo"

Mac/Linux:
$ ls
Documentos  Downloads  Desktop  meu_codigo.py

Windows (use "dir"):
> dir
Documentos  Downloads  Desktop  meu_codigo.py

💡 Te mostra todos os arquivos e pastas onde você está.`
              }
            },
            { 
              id: 'l0-term-8', 
              text: { es: 'Probé el comando cd [carpeta] - me permite MOVERME a otra carpeta', en: 'I tried the cd [folder] command - lets me MOVE to another folder', pt: 'Testei o comando cd [pasta] - me permite MOVER para outra pasta' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `cd = "change directory" = "cambiar de carpeta"

Ejemplos:
$ cd Documents      → Entrar a Documents
$ cd ..             → Subir un nivel (carpeta padre)
$ cd ~              → Ir a mi carpeta home
$ cd /              → Ir a la raíz del sistema

Windows es igual:
> cd Documents
> cd ..

💡 Combiná con ls para ver dónde estás y qué hay:
$ pwd           → ¿Dónde estoy?
$ ls            → ¿Qué hay aquí?
$ cd carpeta    → Moverme
$ ls            → ¿Qué hay ahora?`,
                en: `cd = "change directory" = "change folder"

Examples:
$ cd Documents      → Enter Documents
$ cd ..             → Go up one level (parent folder)
$ cd ~              → Go to my home folder
$ cd /              → Go to system root

Windows is the same:
> cd Documents
> cd ..

💡 Combine with ls to see where you are and what's there:
$ pwd           → Where am I?
$ ls            → What's here?
$ cd folder     → Move
$ ls            → What's here now?`,
                pt: `cd = "change directory" = "mudar de pasta"

Exemplos:
$ cd Documentos     → Entrar em Documentos
$ cd ..             → Subir um nível (pasta pai)
$ cd ~              → Ir para minha pasta home
$ cd /              → Ir para a raiz do sistema

Windows é igual:
> cd Documentos
> cd ..

💡 Combine com ls para ver onde está e o que tem:
$ pwd           → Onde estou?
$ ls            → O que tem aqui?
$ cd pasta      → Mover
$ ls            → O que tem agora?`
              }
            },
          ],
          stopTitle: { es: '🎉 ¡Ya sabés lo básico!', en: '🎉 You know the basics!', pt: '🎉 Você já sabe o básico!' },
          stopContent: {
            es: 'Con estos 3 comandos (pwd, ls, cd) ya podés moverte por tu computadora como un/a pro. Esto te va a servir MUCHO cuando empieces a programar. No te preocupes por memorizar todo - con la práctica sale solo.',
            en: 'With these 3 commands (pwd, ls, cd) you can now navigate your computer like a pro. This will help you A LOT when you start coding. Don\'t worry about memorizing everything - practice makes perfect.',
            pt: 'Com esses 3 comandos (pwd, ls, cd) você já pode navegar pelo seu computador como um/a pro. Isso vai te ajudar MUITO quando começar a programar. Não se preocupe em memorizar tudo - com a prática sai sozinho.'
          }
        }
      ]
    },
    // ========== FASE 2: TU PRIMER CÓDIGO EN PYTHON ==========
    {
      id: 'l0-python-inicio',
      title: { es: 'Tu Primer Código', en: 'Your First Code', pt: 'Seu Primeiro Código' },
      emoji: '🐍',
      sections: [
        {
          id: 'l0-py-setup',
          title: { es: '1️⃣ Preparar tu "cocina" de programación', en: '1️⃣ Preparing your coding "kitchen"', pt: '1️⃣ Preparar sua "cozinha" de programação' },
          description: {
            es: 'Antes de cocinar, necesitás una cocina. Para programar, vamos a usar Google Colab - es GRATIS, funciona en el navegador, y no tenés que instalar nada. Solo necesitás una cuenta de Google (la misma de YouTube o Gmail).',
            en: 'Before cooking, you need a kitchen. To code, we are going to use Google Colab - it\'s FREE, works in the browser, and you don\'t have to install anything. You only need a Google account (the same as YouTube or Gmail).',
            pt: 'Antes de cozinhar, você precisa de uma cozinha. Para programar, vamos usar o Google Colab - é GRÁTIS, funciona no navegador e você não precisa instalar nada. Só precisa de uma conta do Google (a mesma do YouTube ou Gmail).'
          },
          steps: [
            { id: 'l0-py-1', text: { es: 'Tengo una cuenta de Google (Gmail, YouTube, etc)', en: 'I have a Google account (Gmail, YouTube, etc)', pt: 'Tenho uma conta do Google (Gmail, YouTube, etc)' }, type: 'task', checkbox: true },
            { 
              id: 'l0-py-2', 
              text: { es: 'Abrí Google Colab en el navegador', en: 'I opened Google Colab in the browser', pt: 'Abri o Google Colab no navegador' },
              type: 'task', 
              checkbox: true, 
              resource: { type: 'external', label: { es: 'Abrir Google Colab', en: 'Open Google Colab', pt: 'Abrir Google Colab' }, link: 'https://colab.research.google.com/' },
              explanation: {
                es: `Google Colab es como un "Word para programar" gratuito de Google.

✅ Ventajas:
- No instalás nada
- Funciona en el navegador
- Guarda automático en tu Google Drive
- Podés compartir como un documento

💡 Si te pide iniciar sesión, usá tu cuenta de Gmail.`,
                en: `Google Colab is like a free "Word for coding" from Google.

✅ Advantages:
- You don't install anything
- Works in the browser
- Automatically saves to your Google Drive
- You can share it like a document

💡 If it asks you to sign in, use your Gmail account.`,
                pt: `O Google Colab é como um "Word para programar" gratuito do Google.

✅ Vantagens:
- Você não instala nada
- Funciona no navegador
- Salva automaticamente no seu Google Drive
- Você pode compartilhar como um documento

💡 Se pedir para fazer login, use sua conta do Gmail.`
              }
            },
            { 
              id: 'l0-py-3', 
              text: { es: 'Hice clic en "Nuevo notebook" (o "New notebook" si está en inglés)', en: 'I clicked on "New notebook"', pt: 'Cliquei em "Novo notebook" (ou "New notebook")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Un "notebook" es un documento donde escribís código.

Tiene "celdas" donde escribís y ejecutás código.
Cada celda se ejecuta por separado.

💡 Si no ves el botón, andá a Archivo → Nuevo notebook`,
                en: `A "notebook" is a document where you write code.

It has "cells" where you write and execute code.
Each cell is executed separately.

💡 If you don't see the button, go to File → New notebook`,
                pt: `Um "notebook" é um documento onde você escreve código.

Tem "células" onde você escreve e executa código.
Cada célula é executada separadamente.

💡 Se não vir o botão, vá em Arquivo → Novo notebook`
              }
            },
          ]
        },
        {
          id: 'l0-py-hola',
          title: { es: '2️⃣ ¡Tu primer programa! "Hola Mundo"', en: '2️⃣ Your first program! "Hello World"', pt: '2️⃣ Seu primeiro programa! "Olá Mundo"' },
          description: {
            es: 'Tradición: el primer programa de todo programador es hacer que la computadora diga "Hola Mundo". Podés hacerlo en Google Colab o directamente acá en la plataforma 👇',
            en: 'Tradition: every programmer\'s first program is to make the computer say "Hello World". You can do it in Google Colab or directly here on the platform 👇',
            pt: 'Tradição: o primeiro programa de todo programador é fazer o computador dizer "Olá Mundo". Você pode fazer no Google Colab ou diretamente aqui na plataforma 👇'
          },
          steps: [
            { 
              id: 'l0-py-4', 
              text: { es: 'Escribí exactamente esto en la celda: print("Hola Mundo")', en: 'Write exactly this in the cell: print("Hello World")', pt: 'Escreva exatamente isso na célula: print("Olá Mundo")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `print() es una FUNCIÓN - le dice a Python "mostrá esto".
Las comillas " " indican que es TEXTO.

💡 Tiene que ser exacto:
✅ print("Hola Mundo")
❌ Print("Hola Mundo")  ← P mayúscula no funciona
❌ print(Hola Mundo)    ← Sin comillas no funciona`,
                en: `print() is a FUNCTION - it tells Python "show this".
The quotes " " indicate it is TEXT.

💡 It must be exact:
✅ print("Hello World")
❌ Print("Hello World")  ← Uppercase P doesn't work
❌ print(Hello World)    ← Without quotes doesn't work`,
                pt: `print() é uma FUNÇÃO - diz ao Python "mostre isso".
As aspas " " indicam que é TEXTO.

💡 Tem que ser exato:
✅ print("Olá Mundo")
❌ Print("Olá Mundo")  ← P maiúsculo não funciona
❌ print(Olá Mundo)    ← Sem aspas não funciona`
              }
            },
            { id: 'l0-py-5', text: { es: 'Apreté el botón ▶️ (o Ctrl+Enter)', en: 'Pressed the ▶️ button (or Ctrl+Enter)', pt: 'Apertei o botão ▶️ (ou Ctrl+Enter)' }, type: 'task', checkbox: true },
            { id: 'l0-py-6', text: { es: '✅ Vi que abajo de la celda apareció: Hola Mundo', en: '✅ Saw that below the cell appeared: Hello World', pt: '✅ Vi que abaixo da célula apareceu: Olá Mundo' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🎉 ¡FELICITACIONES!', en: '🎉 CONGRATULATIONS!', pt: '🎉 PARABÉNS!' },
          stopContent: {
            es: '¡Acabás de escribir tu primer programa! print() es una instrucción que le dice a Python: "mostrá esto en pantalla". Lo que está entre comillas es el texto que querés mostrar. Probá cambiar "Hola Mundo" por tu nombre y ejecutá de nuevo.',
            en: 'You just wrote your first program! print() is an instruction that tells Python: "show this on screen". What is between quotes is the text you want to show. Try changing "Hello World" to your name and run it again.',
            pt: 'Você acabou de escrever seu primeiro programa! print() é uma instrução que diz ao Python: "mostre isso na tela". O que está entre aspas é o texto que você quer mostrar. Tente mudar "Olá Mundo" para seu nome e execute novamente.'
          }
        },
        {
          id: 'l0-py-print-practica',
          title: { es: '3️⃣ Practicá con print()', en: '3️⃣ Practice with print()', pt: '3️⃣ Pratique com print()' },
          description: {
            es: 'Vamos a practicar más. Cada vez que querés mostrar algo en pantalla, usás print(). Podés usar Colab o la sección de práctica de la plataforma 👇',
            en: 'Let\'s practice more. Every time you want to show something on screen, you use print(). You can use Colab or the practice section of the platform 👇',
            pt: 'Vamos praticar mais. Sempre que você quiser mostrar algo na tela, use print(). Você pode usar o Colab ou a seção de prática da plataforma 👇'
          },
          steps: [
            { 
              id: 'l0-py-7', 
              text: { es: 'Escribí: print("Me llamo [tu nombre]") → Debería mostrar tu nombre', en: 'Write: print("My name is [your name]") → Should show your name', pt: 'Escreva: print("Meu nome é [seu nome]") → Deve mostrar seu nome' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Reemplazá [tu nombre] por tu nombre real:
print("Me llamo Juan")

💡 Las comillas tienen que estar al inicio y al final del texto.`,
                en: `Replace [your name] with your real name:
print("My name is John")

💡 The quotes must be at the beginning and end of the text.`,
                pt: `Substitua [seu nome] pelo seu nome real:
print("Meu nome é João")

💡 As aspas devem estar no início e no final do texto.`
              }
            },
            { 
              id: 'l0-py-8', 
              text: { es: 'Escribí: print("Tengo [tu edad] años") → Debería mostrar tu edad', en: 'Write: print("I am [your age] years old") → Should show your age', pt: 'Escreva: print("Tenho [sua idade] anos") → Deve mostrar sua idade' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Ejemplo: print("Tengo 25 años")

💡 El número va DENTRO de las comillas porque es parte del texto.`,
                en: `Example: print("I am 25 years old")

💡 The number goes INSIDE the quotes because it is part of the text.`,
                pt: `Exemplo: print("Tenho 25 anos")

💡 O número vai DENTRO das aspas porque é parte do texto.`
              }
            },
            { 
              id: 'l0-py-9', 
              text: { es: 'Escribí: print("🎮 Me gusta programar") → ¡Sí, los emojis funcionan!', en: 'Write: print("🎮 I like coding") → Yes, emojis work!', pt: 'Escreva: print("🎮 Eu gosto de programar") → Sim, emojis funcionam!' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Python soporta emojis y caracteres especiales.

Para insertar emojis en Windows: Win + .
En Mac: Ctrl + Cmd + Espacio`,
                en: `Python supports emojis and special characters.

To insert emojis on Windows: Win + .
On Mac: Ctrl + Cmd + Space`,
                pt: `Python suporta emojis e caracteres especiais.

Para inserir emojis no Windows: Win + .
No Mac: Ctrl + Cmd + Espaço`
              }
            },
            { 
              id: 'l0-py-10', 
              text: { es: 'Escribí: print(2 + 2) → Debería mostrar: 4 (Python hace matemáticas)', en: 'Write: print(2 + 2) → Should show: 4 (Python does math)', pt: 'Escreva: print(2 + 2) → Deve mostrar: 4 (Python faz matemática)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `¡Sin comillas! Cuando NO usás comillas, Python interpreta como número/operación.

print("2 + 2") → muestra el TEXTO "2 + 2"
print(2 + 2)   → CALCULA y muestra 4`,
                en: `No quotes! When you DON'T use quotes, Python interprets it as a number/operation.

print("2 + 2") → shows the TEXT "2 + 2"
print(2 + 2)   → CALCULATES and shows 4`,
                pt: `Sem aspas! Quando NÃO usa aspas, Python interpreta como número/operação.

print("2 + 2") → mostra o TEXTO "2 + 2"
print(2 + 2)   → CALCULA e mostra 4`
              }
            },
          ]
        }
      ]
    },
    // ========== FASE 3: VARIABLES - CAJAS PARA GUARDAR COSAS ==========
    {
      id: 'l0-python-variables',
      title: { es: 'Variables: Cajas para Guardar', en: 'Variables: Boxes to Store', pt: 'Variáveis: Caixas para Guardar' },
      emoji: '📦',
      sections: [
        {
          id: 'l0-var-explicacion',
          title: { es: '4️⃣ ¿Qué es una variable?', en: '4️⃣ What is a variable?', pt: '4️⃣ O que é uma variável?' },
          description: {
            es: 'Una VARIABLE es como una caja con una etiqueta. Guardás algo adentro (un número, un texto, lo que quieras) y le ponés un nombre para acordarte qué hay. Después podés usar ese nombre para acceder a lo que guardaste.',
            en: 'A VARIABLE is like a box with a label. You store something inside (a number, text, whatever you want) and give it a name to remember what\'s there. Then you can use that name to access what you stored.',
            pt: 'Uma VARIÁVEL é como uma caixa com uma etiqueta. Você guarda algo dentro (um número, um texto, o que quiser) e dá um nome para lembrar o que tem lá. Depois você pode usar esse nome para acessar o que guardou.'
          },
          steps: [
            { id: 'l0-var-1', text: { es: 'Entiendo que una variable es como una caja con etiqueta donde guardo cosas', en: 'I understand that a variable is like a labeled box where I store things', pt: 'Entendo que uma variável é como uma caixa com etiqueta onde guardo coisas' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-var-texto',
          title: { es: '5️⃣ Guardar texto en una variable', en: '5️⃣ Store text in a variable', pt: '5️⃣ Guardar texto em uma variável' },
          description: {
            es: 'Vamos a crear una "caja" llamada `nombre` y guardar tu nombre adentro. En Python, para guardar texto usamos comillas.',
            en: 'Let\'s create a "box" called `name` and store your name inside. In Python, to store text we use quotes.',
            pt: 'Vamos criar uma "caixa" chamada `nome` e guardar seu nome dentro. Em Python, para guardar texto usamos aspas.'
          },
          steps: [
            { 
              id: 'l0-var-2', 
              text: { es: 'Escribí: nombre = "[tu nombre]" (con tu nombre real)', en: 'Write: name = "[your name]" (with your real name)', pt: 'Escreva: nome = "[seu nome]" (com seu nome real)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `El = no significa "igual", significa "GUARDAR".

nombre = "Juan"
Leelo como: "Guardá 'Juan' en la caja llamada 'nombre'"

💡 El nombre de la variable puede ser lo que quieras, pero:
- Sin espacios (usa guión bajo: mi_nombre)
- Sin empezar con número
- Sin caracteres especiales (@, #, etc.)`,
                en: `The = does not mean "equal", it means "STORE".

name = "John"
Read it as: "Store 'John' in the box called 'name'"

💡 The variable name can be whatever you want, but:
- No spaces (use underscore: my_name)
- Not starting with number
- No special characters (@, #, etc.)`,
                pt: `O = não significa "igual", significa "GUARDAR".

nome = "João"
Leia como: "Guarde 'João' na caixa chamada 'nome'"

💡 O nome da variável pode ser o que você quiser, mas:
- Sem espaços (use underline: meu_nome)
- Sem começar com número
- Sem caracteres especiais (@, #, etc.)`
              }
            },
            { 
              id: 'l0-var-3', 
              text: { es: 'Escribí: print(nombre) → Debería mostrar tu nombre', en: 'Write: print(name) → Should show your name', pt: 'Escreva: print(nome) → Deve mostrar seu nome' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Notá: SIN comillas alrededor de nombre.

print("nombre") → muestra la palabra "nombre"
print(nombre)   → muestra el CONTENIDO de la variable

💡 Con comillas = texto literal. Sin comillas = variable.`,
                en: `Note: NO quotes around name.

print("name") → shows the word "name"
print(name)   → shows the CONTENT of the variable

💡 With quotes = literal text. Without quotes = variable.`,
                pt: `Note: SEM aspas ao redor de nome.

print("nome") → mostra a palavra "nome"
print(nome)   → mostra o CONTEÚDO da variável

💡 Com aspas = texto literal. Sem aspas = variável.`
              }
            },
            { id: 'l0-var-4', text: { es: '✅ ¡Guardé mi nombre en una variable y lo mostré!', en: '✅ I stored my name in a variable and showed it!', pt: '✅ Guardei meu nome em uma variável e mostrei!' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '💡 ¿Qué pasó?', en: '💡 What happened?', pt: '💡 O que aconteceu?' },
          stopContent: {
            es: 'Cuando escribiste nombre = "Juan", creaste una caja llamada "nombre" y guardaste "Juan" adentro. Cuando escribiste print(nombre), Python buscó la caja "nombre", vio qué había adentro, y lo mostró. Notá que NO usamos comillas en print(nombre) porque queremos el CONTENIDO de la caja, no la palabra "nombre".',
            en: 'When you wrote name = "John", you created a box called "name" and stored "John" inside. When you wrote print(name), Python looked for the box "name", saw what was inside, and showed it. Note that we did NOT use quotes in print(name) because we want the CONTENT of the box, not the word "name".',
            pt: 'Quando você escreveu nome = "João", criou uma caixa chamada "nome" e guardou "João" dentro. Quando escreveu print(nome), Python procurou a caixa "nome", viu o que tinha dentro e mostrou. Note que NÃO usamos aspas em print(nome) porque queremos o CONTEÚDO da caixa, não a palavra "nome".'
          }
        },
        {
          id: 'l0-var-numeros',
          title: { es: '6️⃣ Guardar números en variables', en: '6️⃣ Store numbers in variables', pt: '6️⃣ Guardar números em variáveis' },
          description: {
            es: 'También podemos guardar números. Los números van SIN comillas (las comillas son solo para texto).',
            en: 'We can also store numbers. Numbers go WITHOUT quotes (quotes are only for text).',
            pt: 'Também podemos guardar números. Os números vão SEM aspas (as aspas são só para texto).'
          },
          steps: [
            { id: 'l0-var-5', text: { es: 'Escribí: edad = [tu edad] (sin comillas, ej: edad = 16)', en: 'Write: age = [your age] (no quotes, ex: age = 16)', pt: 'Escreva: idade = [sua idade] (sem aspas, ex: idade = 16)' }, type: 'task', checkbox: true },
            { id: 'l0-var-6', text: { es: 'Escribí: print(edad) → Debería mostrar tu edad', en: 'Write: print(age) → Should show your age', pt: 'Escreva: print(idade) → Deve mostrar sua idade' }, type: 'task', checkbox: true },
            { id: 'l0-var-7', text: { es: 'Escribí: edad_en_10_anios = edad + 10', en: 'Write: age_in_10_years = age + 10', pt: 'Escreva: idade_em_10_anos = idade + 10' }, type: 'task', checkbox: true },
            { id: 'l0-var-8', text: { es: 'Escribí: print(edad_en_10_anios) → Debería mostrar tu edad + 10', en: 'Write: print(age_in_10_years) → Should show your age + 10', pt: 'Escreva: print(idade_em_10_anos) → Deve mostrar sua idade + 10' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🧮 ¡Python hace matemáticas!', en: '🧮 Python does math!', pt: '🧮 Python faz matemática!' },
          stopContent: {
            es: 'Podés sumar (+), restar (-), multiplicar (*), y dividir (/). Probá: print(10 * 5) o print(100 / 4). Python es tu calculadora más potente.',
            en: 'You can add (+), subtract (-), multiply (*), and divide (/). Try: print(10 * 5) or print(100 / 4). Python is your most powerful calculator.',
            pt: 'Você pode somar (+), subtrair (-), multiplicar (*), e dividir (/). Tente: print(10 * 5) ou print(100 / 4). Python é sua calculadora mais potente.'
          }
        },
        {
          id: 'l0-var-juntar',
          title: { es: '7️⃣ Usar varias variables juntas', en: '7️⃣ Use multiple variables together', pt: '7️⃣ Usar várias variáveis juntas' },
          description: {
            es: 'Ahora vamos a combinar variables para hacer algo más útil.',
            en: 'Now let\'s combine variables to do something more useful.',
            pt: 'Agora vamos combinar variáveis para fazer algo mais útil.'
          },
          steps: [
            { id: 'l0-var-9', text: { es: 'Escribí: nombre = "[tu nombre]"', en: 'Write: name = "[your name]"', pt: 'Escreva: nome = "[seu nome]"' }, type: 'task', checkbox: true },
            { id: 'l0-var-10', text: { es: 'Escribí: edad = [tu edad]', en: 'Write: age = [your age]', pt: 'Escreva: idade = [sua idade]' }, type: 'task', checkbox: true },
            { id: 'l0-var-11', text: { es: 'Escribí: print(f"Hola, soy {nombre} y tengo {edad} años")', en: 'Write: print(f"Hello, I am {name} and I am {age} years old")', pt: 'Escreva: print(f"Olá, sou {nome} e tenho {idade} anos")' }, type: 'task', checkbox: true },
            { id: 'l0-var-12', text: { es: '✅ Vi mi nombre y edad en una oración', en: '✅ Saw my name and age in a sentence', pt: '✅ Vi meu nome e idade em uma frase' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🔤 ¿Qué es esa f"..."?', en: '🔤 What is that f"..."?', pt: '🔤 O que é esse f"..."?' },
          stopContent: {
            es: 'La f antes de las comillas significa "formato". Te permite poner variables DENTRO del texto usando {llaves}. Es super útil para crear mensajes personalizados. Ejemplo: f"El resultado es {2+2}" muestra "El resultado es 4".',
            en: 'The f before quotes means "format". It allows you to put variables INSIDE the text using {curly braces}. It\'s super useful for creating custom messages. Example: f"The result is {2+2}" shows "The result is 4".',
            pt: 'O f antes das aspas significa "formato". Permite colocar variáveis DENTRO do texto usando {chaves}. É super útil para criar mensagens personalizadas. Exemplo: f"O resultado é {2+2}" mostra "O resultado é 4".'
          }
        }
      ]
    },
    // ========== FASE 4: LISTAS - GUARDAR MUCHAS COSAS ==========
    {
      id: 'l0-python-listas',
      title: { es: 'Listas: Guardar Muchas Cosas', en: 'Lists: Store Many Things', pt: 'Listas: Guardar Muitas Coisas' },
      emoji: '📝',
      sections: [
        {
          id: 'l0-list-explicacion',
          title: { es: '8️⃣ ¿Qué es una lista?', en: '8️⃣ What is a list?', pt: '8️⃣ O que é uma lista?' },
          description: {
            es: 'Una LISTA es como una caja que puede guardar VARIAS cosas a la vez, en orden. Pensá en la lista de compras del supermercado: tiene varios items, uno después del otro.',
            en: 'A LIST is like a box that can store MANY things at once, in order. Think of a grocery shopping list: it has several items, one after another.',
            pt: 'Uma LISTA é como uma caixa que pode guardar VÁRIAS coisas de uma vez, em ordem. Pense na lista de compras do supermercado: tem vários itens, um depois do outro.'
          },
          steps: [
            { id: 'l0-list-1', text: { es: 'Entiendo que una lista guarda varias cosas en orden', en: 'I understand that a list stores multiple things in order', pt: 'Entendo que uma lista guarda várias coisas em ordem' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-list-crear',
          title: { es: '9️⃣ Crear tu primera lista', en: '9️⃣ Create your first list', pt: '9️⃣ Criar sua primeira lista' },
          description: {
            es: 'Para crear una lista usamos corchetes [ ] y separamos los elementos con comas.',
            en: 'To create a list we use brackets [ ] and separate elements with commas.',
            pt: 'Para criar uma lista usamos colchetes [ ] e separamos os elementos com vírgulas.'
          },
          steps: [
            { 
              id: 'l0-list-2', 
              text: { es: 'Escribí: frutas = ["manzana", "banana", "naranja"]', en: 'Write: fruits = ["apple", "banana", "orange"]', pt: 'Escreva: frutas = ["maçã", "banana", "laranja"]' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Una lista usa corchetes [ ] y comas para separar elementos.

["manzana", "banana", "naranja"]
   ↑          ↑          ↑
elemento 0  elemento 1  elemento 2`,
                en: `A list uses brackets [ ] and commas to separate elements.

["apple", "banana", "orange"]
   ↑          ↑          ↑
element 0  element 1  element 2`,
                pt: `Uma lista usa colchetes [ ] e vírgulas para separar elementos.

["maçã", "banana", "laranja"]
   ↑          ↑          ↑
elemento 0  elemento 1  elemento 2`
              }
            },
            { 
              id: 'l0-list-3', 
              text: { es: 'Escribí: print(frutas) → Debería mostrar las 3 frutas', en: 'Write: print(fruits) → Should show the 3 fruits', pt: 'Escreva: print(frutas) → Deve mostrar as 3 frutas' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Muestra toda la lista completa:
['manzana', 'banana', 'naranja']`,
                en: `Shows the entire list:
['apple', 'banana', 'orange']`,
                pt: `Mostra toda a lista completa:
['maçã', 'banana', 'laranja']`
              }
            },
            { 
              id: 'l0-list-4', 
              text: { es: 'Escribí: print(frutas[0]) → Debería mostrar: manzana', en: 'Write: print(fruits[0]) → Should show: apple', pt: 'Escreva: print(frutas[0]) → Deve mostrar: maçã' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `El [0] accede al PRIMER elemento.

⚠️ En programación contamos desde 0, no desde 1.
frutas[0] = primer elemento = "manzana"`,
                en: `The [0] accesses the FIRST element.

⚠️ In programming we count from 0, not from 1.
fruits[0] = first element = "apple"`,
                pt: `O [0] acessa o PRIMEIRO elemento.

⚠️ Em programação contamos a partir de 0, não de 1.
frutas[0] = primeiro elemento = "maçã"`
              }
            },
            { 
              id: 'l0-list-5', 
              text: { es: 'Escribí: print(frutas[1]) → Debería mostrar: banana', en: 'Write: print(fruits[1]) → Should show: banana', pt: 'Escreva: print(frutas[1]) → Deve mostrar: banana' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `frutas[1] = segundo elemento = "banana"
frutas[2] = tercer elemento = "naranja"

💡 Si ponés un número que no existe (ej: frutas[10]), da error.`,
                en: `fruits[1] = second element = "banana"
fruits[2] = third element = "orange"

💡 If you put a number that doesn't exist (ex: fruits[10]), it gives an error.`,
                pt: `frutas[1] = segundo elemento = "banana"
frutas[2] = terceiro elemento = "laranja"

💡 Se colocar um número que não existe (ex: frutas[10]), dá erro.`
              }
            },
          ],
          stopTitle: { es: '🔢 ¿Por qué [0] es manzana y no [1]?', en: '🔢 Why is [0] apple and not [1]?', pt: '🔢 Por que [0] é maçã e não [1]?' },
          stopContent: {
            es: 'En programación, empezamos a contar desde 0, no desde 1. Es raro al principio, pero te vas a acostumbrar. Entonces: frutas[0] = manzana, frutas[1] = banana, frutas[2] = naranja.',
            en: 'In programming, we start counting from 0, not from 1. It\'s weird at first, but you\'ll get used to it. So: fruits[0] = apple, fruits[1] = banana, fruits[2] = orange.',
            pt: 'Em programação, começamos a contar do 0, não do 1. É estranho no começo, mas você vai se acostumar. Então: frutas[0] = maçã, frutas[1] = banana, frutas[2] = laranja.'
          }
        },
        {
          id: 'l0-list-numeros',
          title: { es: '🔟 Listas de números', en: '🔟 Lists of numbers', pt: '🔟 Listas de números' },
          description: {
            es: 'Las listas también pueden guardar números. ¡Y Python puede hacer operaciones con ellas! Probá en la plataforma 👇',
            en: 'Lists can also store numbers. And Python can perform operations with them! Try on the platform 👇',
            pt: 'As listas também podem guardar números. E Python pode fazer operações com elas! Tente na plataforma 👇'
          },
          steps: [
            { 
              id: 'l0-list-6', 
              text: { es: 'Escribí: notas = [8, 9, 7, 10, 6]', en: 'Write: grades = [8, 9, 7, 10, 6]', pt: 'Escreva: notas = [8, 9, 7, 10, 6]' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Los números van SIN comillas.

[8, 9, 7, 10, 6] ← correcto (números)
["8", "9", "7"] ← esto serían TEXTOS, no números`,
                en: `Numbers go WITHOUT quotes.

[8, 9, 7, 10, 6] ← correct (numbers)
["8", "9", "7"] ← these would be TEXT, not numbers`,
                pt: `Os números vão SEM aspas.

[8, 9, 7, 10, 6] ← correto (números)
["8", "9", "7"] ← isso seriam TEXTOS, não números`
              }
            },
            { 
              id: 'l0-list-7', 
              text: { es: 'Escribí: print(sum(notas)) → Debería mostrar la suma: 40', en: 'Write: print(sum(grades)) → Should show sum: 40', pt: 'Escreva: print(sum(notas)) → Deve mostrar a soma: 40' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `sum() es una función que Python ya tiene.

sum([8, 9, 7, 10, 6]) = 8 + 9 + 7 + 10 + 6 = 40

💡 Solo funciona con listas de números.`,
                en: `sum() is a function that Python already has.

sum([8, 9, 7, 10, 6]) = 8 + 9 + 7 + 10 + 6 = 40

💡 Only works with lists of numbers.`,
                pt: `sum() é uma função que Python já tem.

sum([8, 9, 7, 10, 6]) = 8 + 9 + 7 + 10 + 6 = 40

💡 Só funciona com listas de números.`
              }
            },
            { 
              id: 'l0-list-8', 
              text: { es: 'Escribí: print(len(notas)) → Debería mostrar cuántas notas hay: 5', en: 'Write: print(len(grades)) → Should show count: 5', pt: 'Escreva: print(len(notas)) → Deve mostrar quantas notas existem: 5' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `len() = length = longitud = cuántos elementos tiene.

len([8, 9, 7, 10, 6]) = 5 (hay 5 notas)

💡 Funciona con cualquier lista, no solo números.`,
                en: `len() = length = how many elements it has.

len([8, 9, 7, 10, 6]) = 5 (there are 5 grades)

💡 Works with any list, not just numbers.`,
                pt: `len() = length = comprimento = quantos elementos tem.

len([8, 9, 7, 10, 6]) = 5 (existem 5 notas)

💡 Funciona com qualquer lista, não apenas números.`
              }
            },
            { 
              id: 'l0-list-9', 
              text: { es: 'Escribí: promedio = sum(notas) / len(notas)', en: 'Write: average = sum(grades) / len(grades)', pt: 'Escreva: media = sum(notas) / len(notas)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Promedio = suma total ÷ cantidad de elementos

sum(notas) = 40
len(notas) = 5
40 / 5 = 8.0

💡 El .0 indica que es un número decimal (float).`,
                en: `Average = total sum ÷ number of elements

sum(grades) = 40
len(grades) = 5
40 / 5 = 8.0

💡 The .0 indicates it's a decimal number (float).`,
                pt: `Média = soma total ÷ quantidade de elementos

sum(notas) = 40
len(notas) = 5
40 / 5 = 8.0

💡 O .0 indica que é um número decimal (float).`
              }
            },
            { 
              id: 'l0-list-10', 
              text: { es: 'Escribí: print(f"Mi promedio es: {promedio}") → Debería mostrar: 8.0', en: 'Write: print(f"My average is: {average}") → Should show: 8.0', pt: 'Escreva: print(f"Minha média é: {media}") → Deve mostrar: 8.0' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `f"..." te permite meter variables dentro del texto.

f"Mi promedio es: {promedio}"
                    ↑
        Esto se reemplaza por el valor de promedio (8.0)`,
                en: `f"..." allows you to put variables inside the text.

f"My average is: {average}"
                    ↑
        This is replaced by the value of average (8.0)`,
                pt: `f"..." permite colocar variáveis dentro do texto.

f"Minha média é: {media}"
                    ↑
        Isso é substituído pelo valor da média (8.0)`
              }
            },
          ],
          stopTitle: { es: '📊 ¡Acabás de hacer análisis de datos!', en: '📊 You just did data analysis!', pt: '📊 Você acabou de fazer análise de dados!' },
          stopContent: {
            es: 'Lo que hiciste (calcular el promedio de una lista de números) es EXACTAMENTE lo que hace un Data Engineer, pero con millones de datos. Acabás de dar tu primer paso.',
            en: 'What you did (calculating the average of a list of numbers) is EXACTLY what a Data Engineer does, but with millions of data points. You just took your first step.',
            pt: 'O que você fez (calcular a média de uma lista de números) é EXATAMENTE o que faz um Data Engineer, mas com milhões de dados. Você acabou de dar seu primeiro passo.'
          }
        }
      ]
    },
    // ========== FASE 5: DECISIONES CON IF/ELSE ==========
    {
      id: 'l0-python-if',
      title: { es: 'Decisiones: Si pasa esto, hacé aquello', en: 'Decisions: If this happens, do that', pt: 'Decisões: Se acontecer isso, faça aquilo' },
      emoji: '🚦',
      sections: [
        {
          id: 'l0-if-explicacion',
          title: { es: '1️⃣1️⃣ Tomar decisiones en código', en: '1️⃣1️⃣ Making decisions in code', pt: '1️⃣1️⃣ Tomar decisões em código' },
          description: {
            es: 'A veces queremos que el programa haga cosas diferentes según la situación. Por ejemplo: "SI el usuario es mayor de edad, dejalo entrar. SI NO, mostrá un mensaje de error." Para esto usamos if (si) y else (si no).',
            en: 'Sometimes we want the program to do different things depending on the situation. For example: "IF the user is an adult, let them in. ELSE, show an error message." For this we use if and else.',
            pt: 'Às vezes queremos que o programa faça coisas diferentes dependendo da situação. Por exemplo: "SE o usuário for maior de idade, deixe entrar. SENÃO, mostre uma mensagem de erro." Para isso usamos if (se) e else (senão).'
          },
          steps: [
            { id: 'l0-if-1', text: { es: 'Entiendo que if sirve para tomar decisiones', en: 'I understand that if is used to make decisions', pt: 'Entendo que if serve para tomar decisões' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-if-basico',
          title: { es: '1️⃣2️⃣ Tu primer if', en: '1️⃣2️⃣ Your first if', pt: '1️⃣2️⃣ Seu primeiro if' },
          description: {
            es: 'Vamos a hacer un programa que diga si alguien es mayor de edad.',
            en: 'Let\'s make a program that says if someone is an adult.',
            pt: 'Vamos fazer um programa que diga se alguém é maior de idade.'
          },
          steps: [
            { 
              id: 'l0-if-2', 
              text: { es: 'Escribí: edad = 16', en: 'Write: age = 16', pt: 'Escreva: idade = 16' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Guardamos 16 en la variable edad.
Después vamos a comparar si es >= 18.`,
                en: `We store 16 in the age variable.
Then we will compare if it is >= 18.`,
                pt: `Guardamos 16 na variável idade.
Depois vamos comparar se é >= 18.`
              }
            },
            { 
              id: 'l0-if-3', 
              text: { es: 'Escribí: if edad >= 18:', en: 'Write: if age >= 18:', pt: 'Escreva: if idade >= 18:' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `if = "si"
>= = "mayor o igual"

"Si edad es mayor o igual a 18:"

⚠️ Los dos puntos : al final son OBLIGATORIOS.`,
                en: `if = "if"
>= = "greater or equal"

"If age is greater or equal to 18:"

⚠️ The colon : at the end is MANDATORY.`,
                pt: `if = "se"
>= = "maior ou igual"

"Se idade for maior ou igual a 18:"

⚠️ Os dois pontos : no final são OBRIGATÓRIOS.`
              }
            },
            { 
              id: 'l0-if-4', 
              text: { es: 'En la siguiente línea (con 4 espacios al inicio): print("Sos mayor de edad")', en: 'In the next line (with 4 spaces at the start): print("You are an adult")', pt: 'Na linha seguinte (com 4 espaços no início): print("Você é maior de idade")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Los 4 espacios indican que esta línea está "adentro" del if.

    print("Sos mayor de edad")
^^^^
Estos espacios son OBLIGATORIOS en Python.

💡 Colab los pone automático cuando apretás Enter después de :`,
                en: `The 4 spaces indicate that this line is "inside" the if.

    print("You are an adult")
^^^^
These spaces are MANDATORY in Python.

💡 Colab puts them automatically when you press Enter after :`,
                pt: `Os 4 espaços indicam que esta linha está "dentro" do if.

    print("Você é maior de idade")
^^^^
Estes espaços são OBRIGATÓRIOS em Python.

💡 O Colab coloca automaticamente quando você aperta Enter depois de :`
              }
            },
            { 
              id: 'l0-if-5', 
              text: { es: 'En la siguiente línea (sin espacios): else:', en: 'In the next line (no spaces): else:', pt: 'Na linha seguinte (sem espaços): else:' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `else = "si no"

Se ejecuta cuando la condición del if es FALSA.

⚠️ else va al mismo nivel que if (sin espacios adelante).`,
                en: `else = "else"

Runs when the if condition is FALSE.

⚠️ else goes at the same level as if (no spaces in front).`,
                pt: `else = "senão"

Executa quando a condição do if é FALSA.

⚠️ else vai no mesmo nível que if (sem espaços na frente).`
              }
            },
            { 
              id: 'l0-if-6', 
              text: { es: 'En la siguiente línea (con 4 espacios): print("Sos menor de edad")', en: 'In the next line (with 4 spaces): print("You are a minor")', pt: 'Na linha seguinte (com 4 espaços): print("Você é menor de idade")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Esto se ejecuta cuando edad < 18.

Estructura completa:
if edad >= 18:
    print("Mayor")  ← si es verdadero
else:
    print("Menor")  ← si es falso`,
                en: `This runs when age < 18.

Full structure:
if age >= 18:
    print("Adult")  ← if true
else:
    print("Minor")  ← if false`,
                pt: `Isso executa quando idade < 18.

Estrutura completa:
if idade >= 18:
    print("Maior")  ← se for verdadeiro
else:
    print("Menor")  ← se for falso`
              }
            },
            { id: 'l0-if-7', text: { es: 'Ejecutá y verificá que dice "Sos menor de edad"', en: 'Run and verify it says "You are a minor"', pt: 'Execute e verifique que diz "Você é menor de idade"' }, type: 'task', checkbox: true },
            { id: 'l0-if-8', text: { es: 'Cambiá edad = 16 por edad = 20 y ejecutá de nuevo', en: 'Change age = 16 to age = 20 and run again', pt: 'Mude idade = 16 para idade = 20 e execute novamente' }, type: 'task', checkbox: true },
            { id: 'l0-if-9', text: { es: '✅ Ahora dice "Sos mayor de edad"', en: '✅ Now it says "You are an adult"', pt: '✅ Agora diz "Você é maior de idade"' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '⚠️ ¡IMPORTANTE! Los espacios importan', en: '⚠️ IMPORTANT! Spaces matter', pt: '⚠️ IMPORTANTE! Os espaços importam' },
          stopContent: {
            es: 'En Python, los espacios al inicio de la línea (llamados "indentación") son OBLIGATORIOS. Todo lo que va "adentro" del if tiene que tener 4 espacios. Si no los ponés, Python te da error. Google Colab los pone automáticamente cuando apretás Enter después de los dos puntos (:).',
            en: 'In Python, spaces at the beginning of the line (called "indentation") are MANDATORY. Everything "inside" the if must have 4 spaces. If you don\'t put them, Python gives you an error. Google Colab puts them automatically when you press Enter after the colon (:).',
            pt: 'Em Python, os espaços no início da linha (chamados "identação") são OBRIGATÓRIOS. Tudo o que vai "dentro" do if tem que ter 4 espaços. Se você não colocar, o Python dá erro. O Google Colab coloca automaticamente quando você aperta Enter depois dos dois pontos (:).'
          }
        },
        {
          id: 'l0-if-comparaciones',
          title: { es: '1️⃣3️⃣ Formas de comparar', en: '1️⃣3️⃣ Ways to compare', pt: '1️⃣3️⃣ Formas de comparar' },
          description: {
            es: 'Podés comparar de varias formas:',
            en: 'You can compare in several ways:',
            pt: 'Você pode comparar de várias formas:'
          },
          steps: [
            { id: 'l0-if-10', text: { es: 'Entiendo: == significa "es igual a" (ej: nota == 10)', en: 'I understand: == means "is equal to" (ex: grade == 10)', pt: 'Entendo: == significa "é igual a" (ex: nota == 10)' }, type: 'task', checkbox: true },
            { id: 'l0-if-11', text: { es: 'Entiendo: != significa "es diferente a" (ej: color != "rojo")', en: 'I understand: != means "is different from" (ex: color != "red")', pt: 'Entendo: != significa "é diferente de" (ex: cor != "vermelho")' }, type: 'task', checkbox: true },
            { id: 'l0-if-12', text: { es: 'Entiendo: > significa "mayor que" (ej: edad > 18)', en: 'I understand: > means "greater than" (ex: age > 18)', pt: 'Entendo: > significa "maior que" (ex: idade > 18)' }, type: 'task', checkbox: true },
            { id: 'l0-if-13', text: { es: 'Entiendo: < significa "menor que" (ej: precio < 100)', en: 'I understand: < means "less than" (ex: price < 100)', pt: 'Entendo: < significa "menor que" (ex: preco < 100)' }, type: 'task', checkbox: true },
            { id: 'l0-if-14', text: { es: 'Entiendo: >= significa "mayor o igual" (ej: nota >= 6)', en: 'I understand: >= means "greater or equal" (ex: grade >= 6)', pt: 'Entendo: >= significa "maior ou igual" (ex: nota >= 6)' }, type: 'task', checkbox: true },
            { id: 'l0-if-15', text: { es: 'Entiendo: <= significa "menor o igual" (ej: edad <= 12)', en: 'I understand: <= means "less or equal" (ex: age <= 12)', pt: 'Entendo: <= significa "menor ou igual" (ex: idade <= 12)' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '⚠️ Cuidado: = vs ==', en: '⚠️ Warning: = vs ==', pt: '⚠️ Cuidado: = vs ==' },
          stopContent: {
            es: 'Un solo = es para GUARDAR (nombre = "Juan"). Dos == es para COMPARAR (if nombre == "Juan"). Es un error muy común confundirlos.',
            en: 'A single = is to STORE (name = "John"). Two == is to COMPARE (if name == "John"). It is a very common mistake to confuse them.',
            pt: 'Um único = é para GUARDAR (nome = "João"). Dois == é para COMPARAR (if nome == "João"). É um erro muito comum confundi-los.'
          }
        }
      ]
    },
    // ========== FASE 6: REPETIR CON FOR ==========
    {
      id: 'l0-python-for',
      title: { es: 'Repetir Acciones', en: 'Repeat Actions', pt: 'Repetir Ações' },
      emoji: '🔄',
      sections: [
        {
          id: 'l0-for-explicacion',
          title: { es: '1️⃣4️⃣ Hacer algo muchas veces', en: '1️⃣4️⃣ Do something many times', pt: '1️⃣4️⃣ Fazer algo muitas vezes' },
          description: {
            es: 'A veces queremos repetir una acción. Por ejemplo: "para CADA alumno en la lista, mostrá su nombre". Para esto usamos for (para cada).',
            en: 'Sometimes we want to repeat an action. For example: "for EACH student in the list, show their name". For this we use for.',
            pt: 'Às vezes queremos repetir uma ação. Por exemplo: "para CADA aluno na lista, mostre seu nome". Para isso usamos for (para cada).'
          },
          steps: [
            { id: 'l0-for-1', text: { es: 'Entiendo que for sirve para repetir acciones', en: 'I understand that for is used to repeat actions', pt: 'Entendo que for serve para repetir ações' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-for-basico',
          title: { es: '1️⃣5️⃣ Tu primer for', en: '1️⃣5️⃣ Your first for', pt: '1️⃣5️⃣ Seu primeiro for' },
          description: {
            es: 'Vamos a recorrer una lista y mostrar cada elemento.',
            en: 'Let\'s iterate through a list and show each element.',
            pt: 'Vamos percorrer uma lista e mostrar cada elemento.'
          },
          steps: [
            { 
              id: 'l0-for-2', 
              text: { es: 'Escribí: amigos = ["Ana", "Pedro", "María", "Lucas"]', en: 'Write: friends = ["Ana", "Pedro", "Maria", "Lucas"]', pt: 'Escreva: amigos = ["Ana", "Pedro", "Maria", "Lucas"]' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Lista de 4 amigos para recorrer.`,
                en: `List of 4 friends to iterate through.`,
                pt: `Lista de 4 amigos para percorrer.`
              }
            },
            { 
              id: 'l0-for-3', 
              text: { es: 'Escribí: for amigo in amigos:', en: 'Write: for friend in friends:', pt: 'Escreva: for amigo in amigos:' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `for X in LISTA = "para cada X en la LISTA"

"Para cada amigo en la lista amigos:"

Cada vuelta:
- Vuelta 1: amigo = "Ana"
- Vuelta 2: amigo = "Pedro"
- Vuelta 3: amigo = "María"
- Vuelta 4: amigo = "Lucas"`,
                en: `for X in LIST = "for each X in the LIST"

"For each friend in the friends list:"

Each loop:
- Loop 1: friend = "Ana"
- Loop 2: friend = "Pedro"
- Loop 3: friend = "Maria"
- Loop 4: friend = "Lucas"`,
                pt: `for X in LISTA = "para cada X na LISTA"

"Para cada amigo na lista amigos:"

Cada volta:
- Volta 1: amigo = "Ana"
- Volta 2: amigo = "Pedro"
- Volta 3: amigo = "Maria"
- Volta 4: amigo = "Lucas"`
              }
            },
            { 
              id: 'l0-for-4', 
              text: { es: 'En la siguiente línea (4 espacios): print(f"Hola {amigo}!")', en: 'In the next line (4 spaces): print(f"Hello {friend}!")', pt: 'Na linha seguinte (4 espaços): print(f"Olá {amigo}!")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Esto se ejecuta 4 veces (una por cada elemento).

Resultado:
Hola Ana!
Hola Pedro!
Hola María!
Hola Lucas!`,
                en: `This runs 4 times (once for each element).

Result:
Hello Ana!
Hello Pedro!
Hello Maria!
Hello Lucas!`,
                pt: `Isso executa 4 vezes (uma para cada elemento).

Resultado:
Olá Ana!
Olá Pedro!
Olá Maria!
Olá Lucas!`
              }
            },
            { id: 'l0-for-5', text: { es: '✅ Ejecutá y verificá que saluda a cada amigo', en: '✅ Run and verify it greets each friend', pt: '✅ Execute e verifique que cumprimenta cada amigo' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🔄 ¿Qué pasó?', en: '🔄 What happened?', pt: '🔄 O que aconteceu?' },
          stopContent: {
            es: 'El for recorre la lista elemento por elemento. En cada vuelta, la variable "amigo" toma el valor del siguiente elemento. Primera vuelta: amigo = "Ana". Segunda vuelta: amigo = "Pedro". Y así hasta terminar la lista.',
            en: 'The for loop goes through the list element by element. In each loop, the variable "friend" takes the value of the next element. First loop: friend = "Ana". Second loop: friend = "Pedro". And so on until the list ends.',
            pt: 'O for percorre a lista elemento por elemento. Em cada volta, a variável "amigo" pega o valor do próximo elemento. Primeira volta: amigo = "Ana". Segunda volta: amigo = "Pedro". E assim até terminar a lista.'
          }
        },
        {
          id: 'l0-for-numeros',
          title: { es: '1️⃣6️⃣ Repetir un número específico de veces', en: '1️⃣6️⃣ Repeat a specific number of times', pt: '1️⃣6️⃣ Repetir um número específico de vezes' },
          description: {
            es: 'Podés repetir algo X veces usando range().',
            en: 'You can repeat something X times using range().',
            pt: 'Você pode repetir algo X vezes usando range().'
          },
          steps: [
            { id: 'l0-for-6', text: { es: 'Escribí: for i in range(5):', en: 'Write: for i in range(5):', pt: 'Escreva: for i in range(5):' }, type: 'task', checkbox: true },
            { id: 'l0-for-7', text: { es: 'En la siguiente línea (4 espacios): print(f"Esta es la vuelta número {i}")', en: 'In the next line (4 spaces): print(f"This is loop number {i}")', pt: 'Na linha seguinte (4 espaços): print(f"Esta é a volta número {i}")' }, type: 'task', checkbox: true },
            { id: 'l0-for-8', text: { es: '✅ Verificá que muestra vueltas del 0 al 4 (5 vueltas en total)', en: '✅ Verify it shows loops from 0 to 4 (5 loops in total)', pt: '✅ Verifique que mostra voltas de 0 a 4 (5 voltas no total)' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🔢 range(5) genera: 0, 1, 2, 3, 4', en: '🔢 range(5) generates: 0, 1, 2, 3, 4', pt: '🔢 range(5) gera: 0, 1, 2, 3, 4' },
          stopContent: {
            es: 'range(5) genera 5 números, pero empezando desde 0. Si querés del 1 al 5, usá range(1, 6).',
            en: 'range(5) generates 5 numbers, but starting from 0. If you want 1 to 5, use range(1, 6).',
            pt: 'range(5) gera 5 números, mas começando do 0. Se você quer de 1 a 5, use range(1, 6).'
          }
        }
      ]
    },
    // ========== FASE 7: FUNCIONES - CREAR TUS PROPIOS COMANDOS ==========
    {
      id: 'l0-python-funciones',
      title: { es: 'Funciones: Tus Propios Comandos', en: 'Functions: Your Own Commands', pt: 'Funções: Seus Próprios Comandos' },
      emoji: '🎰',
      sections: [
        {
          id: 'l0-func-explicacion',
          title: { es: '1️⃣7️⃣ ¿Qué es una función?', en: '1️⃣7️⃣ What is a function?', pt: '1️⃣7️⃣ O que é uma função?' },
          description: {
            es: 'Una FUNCIÓN es como crear tu propio comando. En vez de escribir el mismo código 10 veces, lo metés en una función y la llamás cuando la necesités. print() es una función que alguien creó para nosotros. Ahora vos vas a crear las tuyas.',
            en: 'A FUNCTION is like creating your own command. Instead of writing the same code 10 times, you put it in a function and call it when you need it. print() is a function someone created for us. Now you are going to create yours.',
            pt: 'Uma FUNÇÃO é como criar seu próprio comando. Em vez de escrever o mesmo código 10 vezes, você o coloca em uma função e a chama quando precisar. print() é uma função que alguém criou para nós. Agora você vai criar as suas.'
          },
          steps: [
            { id: 'l0-func-1', text: { es: 'Entiendo que una función es código reutilizable con un nombre', en: 'I understand that a function is reusable code with a name', pt: 'Entendo que uma função é código reutilizável com um nome' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-func-crear',
          title: { es: '1️⃣8️⃣ Crear tu primera función', en: '1️⃣8️⃣ Create your first function', pt: '1️⃣8️⃣ Criar sua primeira função' },
          description: {
            es: 'Vamos a crear una función que salude a cualquier persona.',
            en: 'Let\'s create a function that greets anyone.',
            pt: 'Vamos criar uma função que cumprimente qualquer pessoa.'
          },
          steps: [
            { 
              id: 'l0-func-2', 
              text: { es: 'Escribí: def saludar(nombre):', en: 'Write: def greet(name):', pt: 'Escreva: def saudar(nome):' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `def = "definir" una función
saludar = nombre de tu función
(nombre) = parámetro (dato que recibe)

Es como crear tu propio comando personalizado.`,
                en: `def = "define" a function
greet = name of your function
(name) = parameter (data it receives)

It's like creating your own custom command.`,
                pt: `def = "definir" uma função
saudar = nome da sua função
(nome) = parâmetro (dado que recebe)

É como criar seu próprio comando personalizado.`
              }
            },
            { 
              id: 'l0-func-3', 
              text: { es: '    print(f"Hola {nombre}, bienvenido/a!")', en: '    print(f"Hello {name}, welcome!")', pt: '    print(f"Olá {nome}, bem-vindo/a!")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Esto va CON 4 espacios (está "adentro" de la función).

{nombre} se reemplaza por lo que le pases al llamarla.`,
                en: `This goes WITH 4 spaces (it is "inside" the function).

{name} is replaced by what you pass when calling it.`,
                pt: `Isso vai COM 4 espaços (está "dentro" da função).

{nome} é substituído pelo que você passar ao chamá-la.`
              }
            },
            { 
              id: 'l0-func-4', 
              text: { es: 'Ahora usá tu función: saludar("María")', en: 'Now use your function: greet("Maria")', pt: 'Agora use sua função: saudar("Maria")' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Llamar a la función = ejecutarla.

saludar("María")
        ↑
Este valor reemplaza al parámetro 'nombre'.`,
                en: `Calling the function = executing it.

greet("Maria")
        ↑
This value replaces the 'name' parameter.`,
                pt: `Chamar a função = executá-la.

saudar("Maria")
        ↑
Este valor substitui o parâmetro 'nome'.`
              }
            },
            { id: 'l0-func-5', text: { es: '✅ Debería mostrar: Hola María, bienvenido/a!', en: '✅ Should show: Hello Maria, welcome!', pt: '✅ Deve mostrar: Olá Maria, bem-vindo/a!' }, type: 'task', checkbox: true },
            { id: 'l0-func-6', text: { es: 'Probá con otros nombres: saludar("Pedro"), saludar("Ana")', en: 'Try with other names: greet("Peter"), greet("Ana")', pt: 'Tente com outros nomes: saudar("Pedro"), saudar("Ana")' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '💡 ¿Qué pasó?', en: '💡 What happened?', pt: '💡 O que aconteceu?' },
          stopContent: {
            es: 'def significa "definir". saludar es el nombre que le pusiste. nombre es el "parámetro" - es como un hueco que se llena cuando llamás la función. Cuando escribiste saludar("María"), Python reemplazó nombre por "María".',
            en: 'def means "define". greet is the name you gave it. name is the "parameter" - it\'s like a slot that gets filled when you call the function. When you wrote greet("Maria"), Python replaced name with "Maria".',
            pt: 'def significa "definir". saudar é o nome que você deu. nome é o "parâmetro" - é como um espaço que é preenchido quando você chama a função. Quando você escreveu saudar("Maria"), Python substituiu nome por "Maria".'
          }
        },
        {
          id: 'l0-func-return',
          title: { es: '1️⃣9️⃣ Funciones que devuelven resultados', en: '1️⃣9️⃣ Functions that return results', pt: '1️⃣9️⃣ Funções que retornam resultados' },
          description: {
            es: 'Las funciones también pueden DEVOLVER un resultado con return. Es como una máquina: le das algo, y te da algo de vuelta.',
            en: 'Functions can also RETURN a result with return. It\'s like a machine: you give it something, and it gives you something back.',
            pt: 'As funções também podem RETORNAR um resultado com return. É como uma máquina: você dá algo, e ela te dá algo de volta.'
          },
          steps: [
            { id: 'l0-func-7', text: { es: 'Escribí: def calcular_doble(numero):', en: 'Write: def calculate_double(number):', pt: 'Escreva: def calcular_dobro(numero):' }, type: 'task', checkbox: true },
            { id: 'l0-func-8', text: { es: '    return numero * 2', en: '    return number * 2', pt: '    return numero * 2' }, type: 'task', checkbox: true },
            { id: 'l0-func-9', text: { es: 'Probá: resultado = calcular_doble(5)', en: 'Try: result = calculate_double(5)', pt: 'Tente: resultado = calcular_dobro(5)' }, type: 'task', checkbox: true },
            { id: 'l0-func-10', text: { es: 'Escribí: print(resultado) → Debería mostrar: 10', en: 'Write: print(result) → Should show: 10', pt: 'Escreva: print(resultado) → Deve mostrar: 10' }, type: 'task', checkbox: true },
            { id: 'l0-func-11', text: { es: 'Probá: print(calcular_doble(7)) → Debería mostrar: 14', en: 'Try: print(calculate_double(7)) → Should show: 14', pt: 'Tente: print(calcular_dobro(7)) → Deve mostrar: 14' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🔄 print() vs return', en: '🔄 print() vs return', pt: '🔄 print() vs return' },
          stopContent: {
            es: 'print() MUESTRA algo en pantalla pero no lo guarda. return DEVUELVE un valor que podés guardar en una variable. En programación profesional, usamos return casi siempre.',
            en: 'print() SHOWS something on screen but doesn\'t save it. return GIVES BACK a value that you can store in a variable. In professional programming, we use return almost always.',
            pt: 'print() MOSTRA algo na tela mas não salva. return DEVOLVE um valor que você pode guardar em uma variável. Em programação profissional, usamos return quase sempre.'
          }
        },
        {
          id: 'l0-func-practica',
          title: { es: '🎯 Ejercicio: Crear una función útil', en: '🎯 Exercise: Create a useful function', pt: '🎯 Exercício: Criar uma função útil' },
          description: {
            es: 'Creá una función que calcule si alguien aprobó.',
            en: 'Create a function that calculates if someone passed.',
            pt: 'Crie uma função que calcule se alguém passou.'
          },
          steps: [
            { id: 'l0-func-12', text: { es: 'Escribí: def aprobo(nota):', en: 'Write: def passed(grade):', pt: 'Escreva: def passou(nota):' }, type: 'task', checkbox: true },
            { id: 'l0-func-13', text: { es: '    if nota >= 6:', en: '    if grade >= 6:', pt: '    if nota >= 6:' }, type: 'task', checkbox: true },
            { id: 'l0-func-14', text: { es: '        return "✅ Aprobó"', en: '        return "✅ Passed"', pt: '        return "✅ Passou"' }, type: 'task', checkbox: true },
            { id: 'l0-func-15', text: { es: '    else:', en: '    else:', pt: '    else:' }, type: 'task', checkbox: true },
            { id: 'l0-func-16', text: { es: '        return "❌ Desaprobó"', en: '        return "❌ Failed"', pt: '        return "❌ Reprovou"' }, type: 'task', checkbox: true },
            { id: 'l0-func-17', text: { es: 'Probá: print(aprobo(8)) → Debería mostrar: ✅ Aprobó', en: 'Try: print(passed(8)) → Should show: ✅ Passed', pt: 'Tente: print(passou(8)) → Deve mostrar: ✅ Passou' }, type: 'task', checkbox: true },
            { id: 'l0-func-18', text: { es: 'Probá: print(aprobo(4)) → Debería mostrar: ❌ Desaprobó', en: 'Try: print(passed(4)) → Should show: ❌ Failed', pt: 'Tente: print(passou(4)) → Deve mostrar: ❌ Reprovou' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 8: DICCIONARIOS - DATOS CON NOMBRE ==========
    {
      id: 'l0-python-diccionarios',
      title: { es: 'Diccionarios: Datos Organizados', en: 'Dictionaries: Organized Data', pt: 'Dicionários: Dados Organizados' },
      emoji: '📖',
      sections: [
        {
          id: 'l0-dict-explicacion',
          title: { es: '2️⃣0️⃣ ¿Qué es un diccionario?', en: '2️⃣0️⃣ What is a dictionary?', pt: '2️⃣0️⃣ O que é um dicionário?' },
          description: {
            es: 'Un DICCIONARIO guarda datos con NOMBRES (llamados "claves"). Pensá en una ficha de alumno: tiene "nombre", "edad", "curso". Podés acceder a cada dato por su nombre. Es MUY importante porque así se organizan los datos en el mundo real (JSON).',
            en: 'A DICTIONARY stores data with NAMES (called "keys"). Think of a student record: it has "name", "age", "grade". You can access each piece of data by its name. It is VERY important because this is how data is organized in the real world (JSON).',
            pt: 'Um DICIONÁRIO guarda dados com NOMES (chamados "chaves"). Pense em uma ficha de aluno: tem "nome", "idade", "curso". Você pode acessar cada dado pelo seu nome. É MUITO importante porque é assim que os dados são organizados no mundo real (JSON).'
          },
          steps: [
            { id: 'l0-dict-1', text: { es: 'Entiendo que un diccionario guarda datos con nombres/claves', en: 'I understand that a dictionary stores data with names/keys', pt: 'Entendo que um dicionário guarda dados com nomes/chaves' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-dict-crear',
          title: { es: '2️⃣1️⃣ Crear tu primer diccionario', en: '2️⃣1️⃣ Create your first dictionary', pt: '2️⃣1️⃣ Criar seu primeiro dicionário' },
          description: {
            es: 'Los diccionarios usan llaves { } y cada dato tiene clave: valor.',
            en: 'Dictionaries use curly braces { } and each piece of data has key: value.',
            pt: 'Os dicionários usam chaves { } e cada dado tem chave: valor.'
          },
          steps: [
            { id: 'l0-dict-2', text: { es: 'Escribí: alumno = {"nombre": "Ana", "edad": 16, "curso": "4to A"}', en: 'Write: student = {"name": "Ana", "age": 16, "grade": "10th"}', pt: 'Escreva: aluno = {"nome": "Ana", "idade": 16, "curso": "4º A"}' }, type: 'task', checkbox: true },
            { id: 'l0-dict-3', text: { es: 'Escribí: print(alumno) → Muestra todo el diccionario', en: 'Write: print(student) → Shows the entire dictionary', pt: 'Escreva: print(aluno) → Mostra todo o dicionário' }, type: 'task', checkbox: true },
            { id: 'l0-dict-4', text: { es: 'Escribí: print(alumno["nombre"]) → Debería mostrar: Ana', en: 'Write: print(student["name"]) → Should show: Ana', pt: 'Escreva: print(aluno["nome"]) → Deve mostrar: Ana' }, type: 'task', checkbox: true },
            { id: 'l0-dict-5', text: { es: 'Escribí: print(alumno["edad"]) → Debería mostrar: 16', en: 'Write: print(student["age"]) → Should show: 16', pt: 'Escreva: print(aluno["idade"]) → Deve mostrar: 16' }, type: 'task', checkbox: true },
            { id: 'l0-dict-6', text: { es: '✅ Entiendo que accedo a los datos con ["nombre_de_la_clave"]', en: '✅ I understand I access data with ["key_name"]', pt: '✅ Entendo que acesso os dados com ["nome_da_chave"]' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🔑 Lista vs Diccionario', en: '🔑 List vs Dictionary', pt: '🔑 Lista vs Dicionário' },
          stopContent: {
            es: 'Lista: accedés por posición (frutas[0]). Diccionario: accedés por nombre (alumno["edad"]). Los diccionarios son más claros cuando tenés datos con significado.',
            en: 'List: access by position (fruits[0]). Dictionary: access by name (student["age"]). Dictionaries are clearer when you have data with meaning.',
            pt: 'Lista: você acessa por posição (frutas[0]). Dicionário: você acessa por nome (aluno["idade"]). Dicionários são mais claros quando você tem dados com significado.'
          }
        },
        {
          id: 'l0-dict-modificar',
          title: { es: '2️⃣2️⃣ Modificar y agregar datos', en: '2️⃣2️⃣ Modify and add data', pt: '2️⃣2️⃣ Modificar e adicionar dados' },
          description: {
            es: 'Podés cambiar valores y agregar datos nuevos.',
            en: 'You can change values and add new data.',
            pt: 'Você pode mudar valores e adicionar novos dados.'
          },
          steps: [
            { id: 'l0-dict-7', text: { es: 'Escribí: alumno["edad"] = 17  # Cambió de cumpleaños', en: 'Write: student["age"] = 17  # Birthday changed', pt: 'Escreva: aluno["idade"] = 17  # Mudou de aniversário' }, type: 'task', checkbox: true },
            { id: 'l0-dict-8', text: { es: 'Escribí: print(alumno["edad"]) → Ahora muestra: 17', en: 'Write: print(student["age"]) → Now shows: 17', pt: 'Escreva: print(aluno["idade"]) → Agora mostra: 17' }, type: 'task', checkbox: true },
            { id: 'l0-dict-9', text: { es: 'Escribí: alumno["email"] = "ana@escuela.com"  # Dato nuevo', en: 'Write: student["email"] = "ana@school.com"  # New data', pt: 'Escreva: aluno["email"] = "ana@escola.com"  # Dado novo' }, type: 'task', checkbox: true },
            { id: 'l0-dict-10', text: { es: 'Escribí: print(alumno) → Ahora tiene 4 datos', en: 'Write: print(student) → Now has 4 items', pt: 'Escreva: print(aluno) → Agora tem 4 dados' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-dict-lista',
          title: { es: '2️⃣3️⃣ Lista de diccionarios (muy común)', en: '2️⃣3️⃣ List of dictionaries (very common)', pt: '2️⃣3️⃣ Lista de dicionários (muito comum)' },
          description: {
            es: 'En el mundo real, tenés MUCHOS alumnos, no solo uno. Una lista de diccionarios es perfect para esto.',
            en: 'In the real world, you have MANY students, not just one. A list of dictionaries is perfect for this.',
            pt: 'No mundo real, você tem MUITOS alunos, não apenas um. Uma lista de dicionários é perfeita para isso.'
          },
          steps: [
            { id: 'l0-dict-11', text: { es: 'Escribí: alumnos = [', en: 'Write: students = [', pt: 'Escreva: alunos = [' }, type: 'task', checkbox: true },
            { id: 'l0-dict-12', text: { es: '    {"nombre": "Ana", "nota": 8},', en: '    {"name": "Ana", "grade": 8},', pt: '    {"nome": "Ana", "nota": 8},' }, type: 'task', checkbox: true },
            { id: 'l0-dict-13', text: { es: '    {"nombre": "Pedro", "nota": 6},', en: '    {"name": "Pedro", "grade": 6},', pt: '    {"nome": "Pedro", "nota": 6},' }, type: 'task', checkbox: true },
            { id: 'l0-dict-14', text: { es: '    {"nombre": "María", "nota": 9}', en: '    {"name": "Maria", "grade": 9}', pt: '    {"nome": "Maria", "nota": 9}' }, type: 'task', checkbox: true },
            { id: 'l0-dict-15', text: { es: ']', en: ']', pt: ']' }, type: 'task', checkbox: true },
            { id: 'l0-dict-16', text: { es: 'Escribí: print(alumnos[0]["nombre"]) → Muestra: Ana', en: 'Write: print(students[0]["name"]) → Shows: Ana', pt: 'Escreva: print(alunos[0]["nome"]) → Mostra: Ana' }, type: 'task', checkbox: true },
            { id: 'l0-dict-17', text: { es: 'Escribí: for alumno in alumnos:', en: 'Write: for student in students:', pt: 'Escreva: for aluno in alunos:' }, type: 'task', checkbox: true },
            { id: 'l0-dict-18', text: { es: '    print(f"{alumno[\"nombre\"]}: {alumno[\"nota\"]}")', en: '    print(f"{student[\"name\"]}: {student[\"grade\"]}")', pt: '    print(f"{aluno[\"nome\"]}: {aluno[\"nota\"]}")' }, type: 'task', checkbox: true },
            { id: 'l0-dict-19', text: { es: '✅ Vi el nombre y nota de cada alumno', en: '✅ I saw the name and grade of each student', pt: '✅ Vi o nome e nota de cada aluno' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🌐 ¿Por qué es importante?', en: '🌐 Why is it important?', pt: '🌐 Por que é importante?' },
          stopContent: {
            es: 'Así vienen los datos del mundo real. Cuando bajás datos de una API (Instagram, Spotify, etc), vienen como lista de diccionarios. Si entendés esto, ya podés trabajar con datos reales.',
            en: 'This is how real-world data comes. When you download data from an API (Instagram, Spotify, etc), it comes as a list of dictionaries. If you understand this, you can already work with real data.',
            pt: 'É assim que vêm os dados do mundo real. Quando você baixa dados de uma API (Instagram, Spotify, etc), eles vêm como lista de dicionários. Se você entende isso, já pode trabalhar com dados reais.'
          }
        }
      ]
    },
    // ========== FASE 9: MINI-PROYECTO PYTHON ==========
    {
      id: 'l0-python-proyecto',
      title: { es: '🏆 Mini-Proyecto Python', en: '🏆 Python Mini-Project', pt: '🏆 Mini-Projeto Python' },
      emoji: '🎯',
      sections: [
        {
          id: 'l0-proyecto-python',
          title: { es: '🎮 Proyecto: Calculadora de Promedios', en: '🎮 Project: Grade Calculator', pt: '🎮 Projeto: Calculadora de Médias' },
          description: {
            es: 'Vamos a crear un programa que calcule el promedio de notas y diga si aprobaste o no. Este programa combina TODO lo que aprendiste.',
            en: 'Let\'s create a program that calculates the average of grades and says if you passed or not. This program combines EVERYTHING you learned.',
            pt: 'Vamos criar um programa que calcule a média de notas e diga se você passou ou não. Este programa combina TUDO o que você aprendeu.'
          },
          steps: [
            { id: 'l0-proy-1', text: { es: 'Creá una celda nueva', en: 'Create a new cell', pt: 'Crie uma nova célula' }, type: 'task', checkbox: true },
            { id: 'l0-proy-2', text: { es: 'Escribí: notas = [7, 8, 6, 9, 5]  # Ponés tus notas reales', en: 'Write: grades = [7, 8, 6, 9, 5]  # Put your real grades', pt: 'Escreva: notas = [7, 8, 6, 9, 5]  # Coloque suas notas reais' }, type: 'task', checkbox: true },
            { id: 'l0-proy-3', text: { es: 'Escribí: nombre = "[tu nombre]"', en: 'Write: name = "[your name]"', pt: 'Escreva: nome = "[seu nome]"' }, type: 'task', checkbox: true },
            { id: 'l0-proy-4', text: { es: 'Escribí: promedio = sum(notas) / len(notas)', en: 'Write: average = sum(grades) / len(grades)', pt: 'Escreva: media = sum(notas) / len(notas)' }, type: 'task', checkbox: true },
            { id: 'l0-proy-5', text: { es: 'Escribí: print(f"📊 Reporte de notas de {nombre}")', en: 'Write: print(f"📊 Grade report for {name}")', pt: 'Escreva: print(f"📊 Relatório de notas de {nome}")' }, type: 'task', checkbox: true },
            { id: 'l0-proy-6', text: { es: 'Escribí: print(f"Notas: {notas}")', en: 'Write: print(f"Grades: {grades}")', pt: 'Escreva: print(f"Notas: {notas}")' }, type: 'task', checkbox: true },
            { id: 'l0-proy-7', text: { es: 'Escribí: print(f"Promedio: {promedio}")', en: 'Write: print(f"Average: {average}")', pt: 'Escreva: print(f"Média: {media}")' }, type: 'task', checkbox: true },
            { id: 'l0-proy-8', text: { es: 'Escribí: if promedio >= 6:', en: 'Write: if average >= 6:', pt: 'Escreva: if media >= 6:' }, type: 'task', checkbox: true },
            { id: 'l0-proy-9', text: { es: '    print("✅ ¡Aprobaste! Felicitaciones")', en: '    print("✅ You passed! Congratulations")', pt: '    print("✅ Passou! Parabéns")' }, type: 'task', checkbox: true },
            { id: 'l0-proy-10', text: { es: 'Escribí: else:', en: 'Write: else:', pt: 'Escreva: else:' }, type: 'task', checkbox: true },
            { id: 'l0-proy-11', text: { es: '    print("❌ Tenés que recuperar")', en: '    print("❌ You need to retake")', pt: '    print("❌ Tem que recuperar")' }, type: 'task', checkbox: true },
            { id: 'l0-proy-12', text: { es: '✅ Ejecuté y vi mi reporte de notas completo', en: '✅ Ran it and saw my full grade report', pt: '✅ Executei e vi meu relatório de notas completo' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🎉 ¡INCREÍBLE! Creaste tu primer programa útil', en: '🎉 AMAZING! You created your first useful program', pt: '🎉 INCRÍVEL! Você criou seu primeiro programa útil' },
          stopContent: {
            es: 'Este programa tiene: variables, listas, operaciones matemáticas, f-strings, y if/else. Acabás de combinar todo lo que aprendiste en algo que funciona. ¡Sos programador/a!',
            en: 'This program has: variables, lists, math operations, f-strings, and if/else. You just combined everything you learned into something that works. You are a programmer!',
            pt: 'Este programa tem: variáveis, listas, operações matemáticas, f-strings, e if/else. Você acabou de combinar tudo o que aprendeu em algo que funciona. Você é programador/a!'
          }
        },
        {
          id: 'l0-py-ejercicios',
          title: { es: '💪 Practicá en la plataforma', en: '💪 Practice on the platform', pt: '💪 Pratique na plataforma' },
          description: {
            es: 'Ahora que sabés lo básico, practica con ejercicios interactivos.',
            en: 'Now that you know the basics, practice with interactive exercises.',
            pt: 'Agora que você sabe o básico, pratique com exercícios interativos.'
          },
          steps: [
            { id: 'l0-pyej-1', text: { es: '✅ Completé 3 ejercicios Python Easy', en: '✅ Completed 3 Python Easy exercises', pt: '✅ Completei 3 exercícios Python Easy' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios Python', en: 'Python Exercises', pt: 'Exercícios Python' }, link: '/members?tab=practica&category=python&difficulty=easy' } },
            { id: 'l0-pyej-2', text: { es: '🏆 Completé 5 ejercicios Python Easy', en: '🏆 Completed 5 Python Easy exercises', pt: '🏆 Completei 5 exercícios Python Easy' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 10: INTRO A SQL (Antes Fase 8) ==========
    {
      id: 'l0-sql-intro',
      title: { es: 'SQL: El Lenguaje de los Datos', en: 'SQL: The Language of Data', pt: 'SQL: A Linguagem dos Dados' },
      emoji: '🗄️',
      sections: [
        {
          id: 'l0-sql-que-es',
          title: { es: '1️⃣7️⃣ ¿Qué es SQL?', en: '1️⃣7️⃣ What is SQL?', pt: '1️⃣7️⃣ O que é SQL?' },
          description: {
            es: 'SQL (se pronuncia "ese-cu-ele" o "siquel") es el lenguaje para trabajar con datos. Imaginá que tenés una planilla de Excel gigante con millones de filas. SQL te permite hacer preguntas: "¿Cuántos usuarios tenemos de Argentina?" "¿Cuál fue el producto más vendido en enero?" "¿Quiénes son los 10 clientes que más compraron?"',
            en: 'SQL (pronounced "ess-que-el" or "sequel") is the language for working with data. Imagine you have a giant Excel sheet with millions of rows. SQL allows you to ask questions: "How many users do we have from Argentina?" "What was the best-selling product in January?" "Who are the top 10 customers?"',
            pt: 'SQL (se pronuncia "esse-quê-ele" ou "siquel") é a linguagem para trabalhar com dados. Imagine que você tem uma planilha do Excel gigante com milhões de linhas. SQL permite fazer perguntas: "Quantos usuários temos da Argentina?" "Qual foi o produto mais vendido em janeiro?" "Quem são os 10 clientes que mais compraram?"'
          },
          steps: [
            { 
              id: 'l0-sql-1', 
              text: { es: 'Entiendo que SQL sirve para hacer preguntas sobre datos', en: 'I understand that SQL is used to ask questions about data', pt: 'Entendo que SQL serve para fazer perguntas sobre dados' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `SQL = "Structured Query Language" (lenguaje de consultas).

En lugar de hacer clic en filtros de Excel, ESCRIBÍS la pregunta:
"Dame todos los clientes de Argentina que compraron en enero"

Se escribe así:
SELECT * FROM clientes 
WHERE pais = 'Argentina' 
AND mes_compra = 1`,
                en: `SQL = "Structured Query Language".

Instead of clicking filters in Excel, you WRITE the question:
"Give me all customers from Argentina who bought in January"

It is written like this:
SELECT * FROM customers 
WHERE country = 'Argentina' 
AND purchase_month = 1`,
                pt: `SQL = "Structured Query Language" (linguagem de consulta estruturada).

Em vez de clicar em filtros do Excel, você ESCREVE a pergunta:
"Me dê todos os clientes da Argentina que compraram em janeiro"

Escreve-se assim:
SELECT * FROM clientes 
WHERE pais = 'Argentina' 
AND mes_compra = 1`
              }
            },
            { 
              id: 'l0-sql-2', 
              text: { es: 'Entiendo que es como Excel pero para millones de datos', en: 'I understand it\'s like Excel but for millions of data points', pt: 'Entendo que é como Excel mas para milhões de dados' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Excel se traba con más de ~100,000 filas.
SQL maneja MILLONES de filas sin problema.

Por eso las empresas guardan datos en "bases de datos" (donde se usa SQL) y no en Excel.`,
                en: `Excel crashes with more than ~100,000 rows.
SQL handles MILLIONS of rows without problem.

That's why companies store data in "databases" (where SQL is used) and not in Excel.`,
                pt: `Excel trava com mais de ~100.000 linhas.
SQL lida com MILHÕES de linhas sem problema.

Por isso as empresas guardam dados em "bancos de dados" (onde se usa SQL) e não no Excel.`
              }
            },
          ]
        },
        {
          id: 'l0-sql-tablas',
          title: { es: '1️⃣8️⃣ ¿Qué es una tabla?', en: '1️⃣8️⃣ What is a table?', pt: '1️⃣8️⃣ O que é uma tabela?' },
          description: {
            es: 'Una TABLA es como una hoja de Excel: tiene COLUMNAS (nombre, edad, email) y FILAS (cada persona es una fila). Ejemplo de tabla "alumnos":\n\n| id | nombre | edad | curso |\n|----|--------|------|-------|\n| 1  | Ana    | 16   | 4to A |\n| 2  | Pedro  | 15   | 3ro B |\n| 3  | María  | 17   | 5to A |',
            en: 'A TABLE is like an Excel sheet: it has COLUMNS (name, age, email) and ROWS (each person is a row). Example of "students" table:\n\n| id | name   | age  | grade |\n|----|--------|------|-------|\n| 1  | Ana    | 16   | 10th  |\n| 2  | Pedro  | 15   | 9th   |\n| 3  | Maria  | 17   | 11th  |',
            pt: 'Uma TABELA é como uma planilha do Excel: tem COLUNAS (nome, idade, email) e LINHAS (cada pessoa é uma linha). Exemplo de tabela "alunos":\n\n| id | nome   | idade| curso |\n|----|--------|------|-------|\n| 1  | Ana    | 16   | 4º A  |\n| 2  | Pedro  | 15   | 3º B  |\n| 3  | Maria  | 17   | 5º A  |'
          },
          steps: [
            { id: 'l0-sql-3', text: { es: 'Entiendo que una tabla tiene columnas (como nombre, edad)', en: 'I understand that a table has columns (like name, age)', pt: 'Entendo que uma tabela tem colunas (como nome, idade)' }, type: 'task', checkbox: true },
            { id: 'l0-sql-4', text: { es: 'Entiendo que cada fila es un "registro" (una persona, un producto, etc)', en: 'I understand that each row is a "record" (a person, a product, etc)', pt: 'Entendo que cada linha é um "registro" (uma pessoa, um produto, etc)' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 11: PRIMEROS COMANDOS SQL ==========
    {
      id: 'l0-sql-comandos',
      title: { es: 'Tus Primeros Comandos SQL', en: 'Your First SQL Commands', pt: 'Seus Primeiros Comandos SQL' },
      emoji: '⌨️',
      sections: [
        {
          id: 'l0-sql-select',
          title: { es: '1️⃣9️⃣ SELECT: Elegir qué ver', en: '1️⃣9️⃣ SELECT: Choose what to see', pt: '1️⃣9️⃣ SELECT: Escolher o que ver' },
          description: {
            es: 'SELECT es el comando más importante. Le dice a SQL: "quiero ver estas columnas". Es como elegir qué columnas de Excel querés ver.',
            en: 'SELECT is the most important command. It tells SQL: "I want to see these columns". It\'s like choosing which Excel columns you want to see.',
            pt: 'SELECT é o comando mais importante. Diz ao SQL: "quero ver estas colunas". É como escolher quais colunas do Excel você quer ver.'
          },
          steps: [
            { id: 'l0-sql-5', text: { es: 'Entiendo que SELECT elige qué columnas mostrar', en: 'I understand that SELECT chooses which columns to show', pt: 'Entendo que SELECT escolhe quais colunas mostrar' }, type: 'task', checkbox: true },
            { id: 'l0-sql-6', text: { es: 'Ejemplo: SELECT nombre, edad significa "mostrame nombre y edad"', en: 'Example: SELECT name, age means "show me name and age"', pt: 'Exemplo: SELECT nome, idade significa "mostre-me nome e idade"' }, type: 'task', checkbox: true },
            { id: 'l0-sql-7', text: { es: 'Ejemplo: SELECT * significa "mostrame TODO"', en: 'Example: SELECT * means "show me EVERYTHING"', pt: 'Exemplo: SELECT * significa "mostre-me TUDO"' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-sql-from',
          title: { es: '2️⃣0️⃣ FROM: De qué tabla', en: '2️⃣0️⃣ FROM: From which table', pt: '2️⃣0️⃣ FROM: De qual tabela' },
          description: {
            es: 'FROM le dice a SQL de QUÉ tabla querés los datos. Es como decir "de la hoja Alumnos".',
            en: 'FROM tells SQL from WHICH table you want the data. It\'s like saying "from the Students sheet".',
            pt: 'FROM diz ao SQL de QUAL tabela você quer os dados. É como dizer "da planilha Alunos".'
          },
          steps: [
            { id: 'l0-sql-8', text: { es: 'Entiendo que FROM indica la tabla', en: 'I understand that FROM indicates the table', pt: 'Entendo que FROM indica a tabela' }, type: 'task', checkbox: true },
            { id: 'l0-sql-9', text: { es: 'Ejemplo completo: SELECT nombre, edad FROM alumnos', en: 'Full example: SELECT name, age FROM students', pt: 'Exemplo completo: SELECT nome, idade FROM alunos' }, type: 'task', checkbox: true },
            { id: 'l0-sql-10', text: { es: 'Esto significa: "De la tabla alumnos, mostrame nombre y edad"', en: 'This means: "From the students table, show me name and age"', pt: 'Isso significa: "Da tabela alunos, mostre-me nome e idade"' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-sql-where',
          title: { es: '2️⃣1️⃣ WHERE: Filtrar resultados', en: '2️⃣1️⃣ WHERE: Filter results', pt: '2️⃣1️⃣ WHERE: Filtrar resultados' },
          description: {
            es: 'WHERE filtra los datos. Es como el filtro de Excel: "solo los que cumplan esta condición".',
            en: 'WHERE filters the data. It\'s like the Excel filter: "only those that meet this condition".',
            pt: 'WHERE filtra os dados. É como o filtro do Excel: "apenas os que cumprem esta condição".'
          },
          steps: [
            { 
              id: 'l0-sql-11', 
              text: { es: 'Entiendo que WHERE filtra filas', en: 'I understand that WHERE filters rows', pt: 'Entendo que WHERE filtra linhas' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `WHERE = "donde se cumpla esta condición"

Operadores de comparación:
= igual
!= o <> diferente
> mayor que
< menor que
>= mayor o igual
<= menor o igual`,
                en: `WHERE = "where this condition is met"

Comparison operators:
= equal
!= or <> different
> greater than
< less than
>= greater or equal
<= less or equal`,
                pt: `WHERE = "onde se cumpra esta condição"

Operadores de comparação:
= igual
!= ou <> diferente
> maior que
< menor que
>= maior ou igual
<= menor ou igual`
              }
            },
            { id: 'l0-sql-12', text: { es: 'Ejemplo: SELECT * FROM alumnos WHERE edad >= 16', en: 'Example: SELECT * FROM students WHERE age >= 16', pt: 'Exemplo: SELECT * FROM alunos WHERE idade >= 16' }, type: 'task', checkbox: true },
            { id: 'l0-sql-13', text: { es: 'Esto significa: "Solo alumnos de 16 años o más"', en: 'This means: "Only students 16 years or older"', pt: 'Isso significa: "Apenas alunos de 16 anos ou mais"' }, type: 'task', checkbox: true },
            { id: 'l0-sql-14', text: { es: 'Ejemplo: SELECT nombre FROM alumnos WHERE curso = "4to A"', en: 'Example: SELECT name FROM students WHERE grade = "10th"', pt: 'Exemplo: SELECT nome FROM alunos WHERE curso = "4º A"' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-sql-order',
          title: { es: '2️⃣2️⃣ ORDER BY: Ordenar resultados', en: '2️⃣2️⃣ ORDER BY: Sort results', pt: '2️⃣2️⃣ ORDER BY: Ordenar resultados' },
          description: {
            es: 'ORDER BY ordena los resultados. Podés ordenar de menor a mayor (ASC) o de mayor a menor (DESC).',
            en: 'ORDER BY sorts the results. You can sort ascending (ASC) or descending (DESC).',
            pt: 'ORDER BY ordena os resultados. Você pode ordenar do menor para o maior (ASC) ou do maior para o menor (DESC).'
          },
          steps: [
            { id: 'l0-sql-15', text: { es: 'Entiendo que ORDER BY ordena los resultados', en: 'I understand that ORDER BY sorts the results', pt: 'Entendo que ORDER BY ordena os resultados' }, type: 'task', checkbox: true },
            { id: 'l0-sql-16', text: { es: 'Ejemplo: SELECT * FROM alumnos ORDER BY edad', en: 'Example: SELECT * FROM students ORDER BY age', pt: 'Exemplo: SELECT * FROM alunos ORDER BY idade' }, type: 'task', checkbox: true },
            { id: 'l0-sql-17', text: { es: 'Ejemplo: SELECT * FROM alumnos ORDER BY nombre DESC (Z a A)', en: 'Example: SELECT * FROM students ORDER BY name DESC (Z to A)', pt: 'Exemplo: SELECT * FROM alunos ORDER BY nome DESC (Z a A)' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 12: SQL AVANZADO - GROUP BY ==========
    {
      id: 'l0-sql-groupby',
      title: { es: 'SQL: Agrupar y Contar', en: 'SQL: Group and Count', pt: 'SQL: Agrupar e Contar' },
      emoji: '📊',
      sections: [
        {
          id: 'l0-sql-group-explicacion',
          title: { es: '2️⃣5️⃣ GROUP BY: Agrupar datos', en: '2️⃣5️⃣ GROUP BY: Group data', pt: '2️⃣5️⃣ GROUP BY: Agrupar dados' },
          description: {
            es: 'GROUP BY es SUPER poderoso. Te permite responder preguntas como: "¿Cuántos alumnos hay por curso?" "¿Cuál es el promedio de ventas por mes?" Agrupa filas que tienen el mismo valor y podés contar, sumar, promediar.',
            en: 'GROUP BY is SUPER powerful. It allows you to answer questions like: "How many students are there per grade?" "What is the average sales per month?" It groups rows that have the same value and you can count, sum, average.',
            pt: 'GROUP BY é SUPER poderoso. Permite responder perguntas como: "Quantos alunos há por curso?" "Qual é a média de vendas por mês?" Agrupa linhas que têm o mesmo valor e você pode contar, somar, calcular a média.'
          },
          steps: [
            { id: 'l0-grp-1', text: { es: 'Entiendo que GROUP BY agrupa filas con valores iguales', en: 'I understand that GROUP BY groups rows with equal values', pt: 'Entendo que GROUP BY agrupa linhas com valores iguais' }, type: 'task', checkbox: true },
            { id: 'l0-grp-2', text: { es: 'Ejemplo: SELECT curso, COUNT(*) FROM alumnos GROUP BY curso', en: 'Example: SELECT grade, COUNT(*) FROM students GROUP BY grade', pt: 'Exemplo: SELECT curso, COUNT(*) FROM alunos GROUP BY curso' }, type: 'task', checkbox: true },
            { id: 'l0-grp-3', text: { es: 'Esto cuenta cuántos alumnos hay en cada curso', en: 'This counts how many students are in each grade', pt: 'Isso conta quantos alunos há em cada curso' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🧮 Funciones de agregación', en: '🧮 Aggregation functions', pt: '🧮 Funções de agregação' },
          stopContent: {
            es: 'Con GROUP BY podés usar: COUNT(*) = contar filas, SUM(columna) = sumar, AVG(columna) = promedio, MAX(columna) = máximo, MIN(columna) = mínimo. Estas son las herramientas básicas de análisis de datos.',
            en: 'With GROUP BY you can use: COUNT(*) = count rows, SUM(column) = sum, AVG(column) = average, MAX(column) = maximum, MIN(column) = minimum. These are the basic data analysis tools.',
            pt: 'Com GROUP BY você pode usar: COUNT(*) = contar linhas, SUM(coluna) = somar, AVG(coluna) = média, MAX(coluna) = máximo, MIN(coluna) = mínimo. Estas são as ferramentas básicas de análise de dados.'
          }
        },
        {
          id: 'l0-sql-group-ejemplos',
          title: { es: '2️⃣6️⃣ Ejemplos de GROUP BY', en: '2️⃣6️⃣ GROUP BY Examples', pt: '2️⃣6️⃣ Exemplos de GROUP BY' },
          description: {
            es: 'Mirá estos ejemplos con una tabla de ventas:',
            en: 'Look at these examples with a sales table:',
            pt: 'Veja estes exemplos com uma tabela de vendas:'
          },
          steps: [
            { id: 'l0-grp-4', text: { es: 'Ventas por producto: SELECT producto, SUM(monto) FROM ventas GROUP BY producto', en: 'Sales by product: SELECT product, SUM(amount) FROM sales GROUP BY product', pt: 'Vendas por produto: SELECT produto, SUM(valor) FROM vendas GROUP BY produto' }, type: 'task', checkbox: true },
            { id: 'l0-grp-5', text: { es: 'Promedio por categoría: SELECT categoria, AVG(precio) FROM productos GROUP BY categoria', en: 'Average by category: SELECT category, AVG(price) FROM products GROUP BY category', pt: 'Média por categoria: SELECT categoria, AVG(preco) FROM produtos GROUP BY categoria' }, type: 'task', checkbox: true },
            { id: 'l0-grp-6', text: { es: 'Cantidad por país: SELECT pais, COUNT(*) FROM clientes GROUP BY pais', en: 'Count by country: SELECT country, COUNT(*) FROM customers GROUP BY country', pt: 'Quantidade por país: SELECT pais, COUNT(*) FROM clientes GROUP BY pais' }, type: 'task', checkbox: true },
            { id: 'l0-grp-7', text: { es: '✅ Entiendo que GROUP BY + función de agregación = resúmenes de datos', en: '✅ I understand that GROUP BY + aggregation function = data summaries', pt: '✅ Entendo que GROUP BY + função de agregação = resumos de dados' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 13: SQL JOINs BÁSICO ==========
    {
      id: 'l0-sql-joins',
      title: { es: 'SQL: Combinar Tablas', en: 'SQL: Joining Tables', pt: 'SQL: Combinar Tabelas' },
      emoji: '🔗',
      sections: [
        {
          id: 'l0-join-explicacion',
          title: { es: '2️⃣7️⃣ ¿Qué es un JOIN?', en: '2️⃣7️⃣ What is a JOIN?', pt: '2️⃣7️⃣ O que é um JOIN?' },
          description: {
            es: 'En el mundo real, los datos están en VARIAS tablas. Por ejemplo: una tabla de "pedidos" y otra de "clientes". JOIN te permite COMBINAR tablas para ver datos relacionados. Es como unir dos hojas de Excel por un dato en común.',
            en: 'In the real world, data is in SEVERAL tables. For example: an "orders" table and a "customers" table. JOIN allows you to COMBINE tables to see related data. It\'s like joining two Excel sheets by a common data point.',
            pt: 'No mundo real, os dados estão em VÁRIAS tabelas. Por exemplo: uma tabela de "pedidos" e outra de "clientes". JOIN permite COMBINAR tabelas para ver dados relacionados. É como unir duas planilhas do Excel por um dado em comum.'
          },
          steps: [
            { id: 'l0-join-1', text: { es: 'Entiendo que JOIN combina datos de dos o más tablas', en: 'I understand that JOIN combines data from two or more tables', pt: 'Entendo que JOIN combina dados de duas ou mais tabelas' }, type: 'task', checkbox: true },
            { id: 'l0-join-2', text: { es: 'Entiendo que las tablas se unen por una columna en común (ej: cliente_id)', en: 'I understand that tables are joined by a common column (ex: customer_id)', pt: 'Entendo que as tabelas se unem por uma coluna em comum (ex: cliente_id)' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-join-ejemplo',
          title: { es: '2️⃣8️⃣ Ejemplo de JOIN', en: '2️⃣8️⃣ JOIN Example', pt: '2️⃣8️⃣ Exemplo de JOIN' },
          description: {
            es: 'Imaginá dos tablas:\n\n**Tabla pedidos:** id, producto, cliente_id, monto\n**Tabla clientes:** id, nombre, email\n\nQueremos ver el nombre del cliente con cada pedido:',
            en: 'Imagine two tables:\n\n**orders table:** id, product, customer_id, amount\n**customers table:** id, name, email\n\nWe want to see the customer\'s name with each order:',
            pt: 'Imagine duas tabelas:\n\n**Tabela pedidos:** id, produto, cliente_id, valor\n**Tabela clientes:** id, nome, email\n\nQueremos ver o nome do cliente com cada pedido:'
          },
          steps: [
            { id: 'l0-join-3', text: { es: 'Query: SELECT pedidos.producto, clientes.nombre FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id', en: 'Query: SELECT orders.product, customers.name FROM orders JOIN customers ON orders.customer_id = customers.id', pt: 'Query: SELECT pedidos.produto, clientes.nome FROM pedidos JOIN clientes ON pedidos.cliente_id = clientes.id' }, type: 'task', checkbox: true },
            { id: 'l0-join-4', text: { es: 'Esto une pedidos con clientes donde el cliente_id coincide con el id', en: 'This joins orders with customers where customer_id matches id', pt: 'Isso une pedidos com clientes onde o cliente_id coincide com o id' }, type: 'task', checkbox: true },
            { id: 'l0-join-5', text: { es: '✅ Entiendo que ON dice cómo se relacionan las tablas', en: '✅ I understand that ON says how the tables are related', pt: '✅ Entendo que ON diz como as tabelas se relacionam' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '💡 ¿Por qué separar datos en tablas?', en: '💡 Why separate data into tables?', pt: '💡 Por que separar dados em tabelas?' },
          stopContent: {
            es: 'Si el cliente "María" tiene 100 pedidos, no queremos escribir "María" 100 veces. Guardamos "María" UNA vez en la tabla clientes, y en pedidos solo guardamos su ID. Esto evita duplicados y errores. Se llama "normalización".',
            en: 'If customer "Maria" has 100 orders, we don\'t want to write "Maria" 100 times. We store "Maria" ONCE in the customers table, and in orders we only store her ID. This avoids duplicates and errors. It\'s called "normalization".',
            pt: 'Se o cliente "Maria" tem 100 pedidos, não queremos escrever "Maria" 100 vezes. Guardamos "Maria" UMA vez na tabela clientes, e em pedidos apenas guardamos seu ID. Isso evita duplicatas e erros. Chama-se "normalização".'
          }
        }
      ]
    },
    // ========== FASE 14: PRACTICAR SQL ==========
    {
      id: 'l0-sql-practica',
      title: { es: 'Practicar SQL', en: 'Practice SQL', pt: 'Praticar SQL' },
      emoji: '💪',
      sections: [
        {
          id: 'l0-sql-query-completa',
          title: { es: '2️⃣9️⃣ Tu primera query completa', en: '2️⃣9️⃣ Your first complete query', pt: '2️⃣9️⃣ Sua primeira query completa' },
          description: {
            es: 'Vamos a armar una query que combine todo. Imaginá que tenés una tabla "productos" con: id, nombre, precio, categoria.',
            en: 'Let\'s build a query that combines everything. Imagine you have a "products" table with: id, name, price, category.',
            pt: 'Vamos montar uma query que combine tudo. Imagine que você tem uma tabela "produtos" com: id, nome, preco, categoria.'
          },
          steps: [
            { id: 'l0-sql-18', text: { es: 'Entiendo esta query: SELECT nombre, precio FROM productos WHERE precio < 1000 ORDER BY precio DESC', en: 'I understand this query: SELECT name, price FROM products WHERE price < 1000 ORDER BY price DESC', pt: 'Entendo esta query: SELECT nome, preco FROM produtos WHERE preco < 1000 ORDER BY preco DESC' }, type: 'task', checkbox: true },
            { id: 'l0-sql-19', text: { es: 'La query dice: "De productos, mostrame nombre y precio, solo los menores a $1000, ordenados de más caro a más barato"', en: 'The query says: "From products, show me name and price, only those under $1000, sorted from most expensive to cheapest"', pt: 'A query diz: "De produtos, mostre-me nome e preco, apenas os menores que $1000, ordenados do mais caro para o mais barato"' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🎯 El orden SIEMPRE es:', en: '🎯 The order is ALWAYS:', pt: '🎯 A ordem é SEMPRE:' },
          stopContent: {
            es: 'SELECT (qué columnas) → FROM (de qué tabla) → JOIN (si combinás tablas) → WHERE (filtros) → GROUP BY (agrupaciones) → ORDER BY (orden). Siempre en ese orden.',
            en: 'SELECT (which columns) → FROM (which table) → JOIN (if combining tables) → WHERE (filters) → GROUP BY (grouping) → ORDER BY (order). Always in that order.',
            pt: 'SELECT (quais colunas) → FROM (de qual tabela) → JOIN (se combinar tabelas) → WHERE (filtros) → GROUP BY (agrupamentos) → ORDER BY (ordem). Sempre nessa ordem.'
          }
        },
        {
          id: 'l0-sql-ejercicios',
          title: { es: '💪 Practicá SQL en la plataforma', en: '💪 Practice SQL on the platform', pt: '💪 Pratique SQL na plataforma' },
          description: {
            es: 'Ahora practica con ejercicios interactivos donde podés escribir SQL de verdad.',
            en: 'Now practice with interactive exercises where you can write real SQL.',
            pt: 'Agora pratique com exercícios interativos onde você pode escrever SQL de verdade.'
          },
          steps: [
            { id: 'l0-sqlej-1', text: { es: '✅ Completé 5 ejercicios SQL Easy', en: '✅ Completed 5 SQL Easy exercises', pt: '✅ Completei 5 exercícios SQL Easy' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: { es: 'Ejercicios SQL', en: 'SQL Exercises', pt: 'Exercícios SQL' }, link: '/members?tab=practica&category=sql&difficulty=easy' } },
            { id: 'l0-sqlej-2', text: { es: '🏆 Completé 10 ejercicios SQL Easy', en: '🏆 Completed 10 SQL Easy exercises', pt: '🏆 Completei 10 exercícios SQL Easy' }, type: 'task', checkbox: true },
          ]
        }
      ]
    },
    // ========== FASE 15: GIT Y GITHUB BÁSICO ==========
    {
      id: 'l0-git',
      title: { es: 'Git: Guardar tu Código', en: 'Git: Save Your Code', pt: 'Git: Guardar Seu Código' },
      emoji: '📦',
      sections: [
        {
          id: 'l0-git-explicacion',
          title: { es: '3️⃣0️⃣ ¿Qué es Git y GitHub?', en: '3️⃣0️⃣ What is Git and GitHub?', pt: '3️⃣0️⃣ O que é Git e GitHub?' },
          description: {
            es: 'GIT es como "Control+Z" para programadores, pero mucho más poderoso. Te permite guardar versiones de tu código y volver atrás si algo se rompe. GITHUB es una página donde guardas tu código online (como Google Drive pero para código). Los empleadores miran tu GitHub para ver qué hiciste.',
            en: 'GIT is like "Control+Z" for programmers, but much more powerful. It allows you to save versions of your code and go back if something breaks. GITHUB is a site where you save your code online (like Google Drive but for code). Employers look at your GitHub to see what you did.',
            pt: 'GIT é como "Control+Z" para programadores, mas muito mais poderoso. Permite guardar versões do seu código e voltar atrás se algo quebrar. GITHUB é um site onde você guarda seu código online (como Google Drive mas para código). Os empregadores olham seu GitHub para ver o que você fez.'
          },
          steps: [
            { id: 'l0-git-1', text: { es: 'Entiendo que Git guarda versiones de mi código', en: 'I understand that Git saves versions of my code', pt: 'Entendo que Git guarda versões do meu código' }, type: 'task', checkbox: true },
            { id: 'l0-git-2', text: { es: 'Entiendo que GitHub es donde comparto mi código con el mundo', en: 'I understand that GitHub is where I share my code with the world', pt: 'Entendo que GitHub é onde compartilho meu código com o mundo' }, type: 'task', checkbox: true },
          ]
        },
        {
          id: 'l0-git-cuenta',
          title: { es: '3️⃣1️⃣ Crear tu cuenta de GitHub', en: '3️⃣1️⃣ Create your GitHub account', pt: '3️⃣1️⃣ Criar sua conta no GitHub' },
          description: {
            es: 'Creá tu cuenta - es gratis y es tu "portfolio" de programador.',
            en: 'Create your account - it\'s free and it\'s your programmer "portfolio".',
            pt: 'Crie sua conta - é grátis e é seu "portfólio" de programador.'
          },
          steps: [
            { id: 'l0-git-3', text: { es: 'Entré a github.com', en: 'Entered github.com', pt: 'Entrei no github.com' }, type: 'task', checkbox: true, resource: { type: 'external', label: { es: 'Ir a GitHub', en: 'Go to GitHub', pt: 'Ir para o GitHub' }, link: 'https://github.com/' } },
            { id: 'l0-git-4', text: { es: 'Creé una cuenta con mi email', en: 'Created an account with my email', pt: 'Criei uma conta com meu email' }, type: 'task', checkbox: true },
            { id: 'l0-git-5', text: { es: 'Elegí un nombre de usuario profesional (ej: tu nombre, no "gamer123")', en: 'Chose a professional username (ex: your name, not "gamer123")', pt: 'Escolhi um nome de usuário profissional (ex: seu nome, não "gamer123")' }, type: 'task', checkbox: true },
            { id: 'l0-git-6', text: { es: '✅ Tengo mi cuenta de GitHub creada', en: '✅ I have my GitHub account created', pt: '✅ Tenho minha conta do GitHub criada' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '💡 Tu GitHub es tu CV', en: '💡 Your GitHub is your Resume', pt: '💡 Seu GitHub é seu CV' },
          stopContent: {
            es: 'Cuando busques trabajo, los reclutadores van a googlear tu nombre y ver tu GitHub. Si tiene proyectos, es un punto a favor ENORME. Vas a subir todos los proyectos que hagas en el Nivel 1.',
            en: 'When you look for a job, recruiters will google your name and see your GitHub. If it has projects, it\'s a HUGE plus. You are going to upload all the projects you do in Level 1.',
            pt: 'Quando procurar emprego, os recrutadores vão pesquisar seu nome e ver seu GitHub. Se tiver projetos, é um ponto a favor ENORME. Você vai subir todos os projetos que fizer no Nível 1.'
          }
        },
        {
          id: 'l0-git-repo',
          title: { es: '3️⃣2️⃣ Crear tu primer repositorio', en: '3️⃣2️⃣ Create your first repository', pt: '3️⃣2️⃣ Criar seu primeiro repositório' },
          description: {
            es: 'Un REPOSITORIO es una carpeta donde guardás un proyecto. Vamos a crear uno.',
            en: 'A REPOSITORY is a folder where you save a project. Let\'s create one.',
            pt: 'Um REPOSITÓRIO é uma pasta onde você guarda um projeto. Vamos criar um.'
          },
          steps: [
            { id: 'l0-git-7', text: { es: 'En GitHub, hice clic en el botón verde "New" (nuevo repositorio)', en: 'On GitHub, I clicked the green "New" button', pt: 'No GitHub, cliquei no botão verde "New" (novo repositório)' }, type: 'task', checkbox: true },
            { id: 'l0-git-8', text: { es: 'Le puse nombre: "mi-primer-proyecto-python"', en: 'Named it: "my-first-python-project"', pt: 'Dei o nome: "meu-primeiro-projeto-python"' }, type: 'task', checkbox: true },
            { id: 'l0-git-9', text: { es: 'Marqué "Add a README file"', en: 'Checked "Add a README file"', pt: 'Marquei "Add a README file"' }, type: 'task', checkbox: true },
            { id: 'l0-git-10', text: { es: 'Hice clic en "Create repository"', en: 'Clicked "Create repository"', pt: 'Cliquei em "Create repository"' }, type: 'task', checkbox: true },
            { id: 'l0-git-11', text: { es: '✅ ¡Creé mi primer repositorio!', en: '✅ Created my first repository!', pt: '✅ Criei meu primeiro repositório!' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🎉 ¡Ya tenés GitHub!', en: '🎉 You already have GitHub!', pt: '🎉 Você já tem GitHub!' },
          stopContent: {
            es: 'En el Nivel 1 vas a aprender a subir tu código a estos repositorios usando Git desde tu computadora. Por ahora, con tener la cuenta creada alcanza.',
            en: 'In Level 1 you will learn to upload your code to these repositories using Git from your computer. For now, having the account created is enough.',
            pt: 'No Nível 1 você vai aprender a subir seu código para esses repositórios usando Git do seu computador. Por enquanto, ter a conta criada é suficiente.'
          }
        }
      ]
    },
    // ========== FASE 16: PREPARÁNDOTE PARA EL MUNDO REAL ==========
    {
      id: 'l0-prep-real',
      title: { es: 'Preparándote para el Mundo Real', en: 'Preparing for the Real World', pt: 'Preparando-se para o Mundo Real' },
      emoji: '🌍',
      sections: [
        {
          id: 'l0-prep-diferencia',
          title: { es: '🎓 La diferencia entre aprender y trabajar', en: '🎓 The difference between learning and working', pt: '🎓 A diferença entre aprender e trabalhar' },
          description: {
            es: 'Hasta ahora usaste Google Colab - perfecto para aprender. Pero en el trabajo real, los Data Engineers usan su propia computadora con herramientas instaladas. No te asustes - es más fácil de lo que parece.',
            en: 'Until now you used Google Colab - perfect for learning. But in real work, Data Engineers use their own computer with installed tools. Don\'t be scared - it\'s easier than it seems.',
            pt: 'Até agora você usou Google Colab - perfeito para aprender. Mas no trabalho real, Data Engineers usam seu próprio computador com ferramentas instaladas. Não se assuste - é mais fácil do que parece.'
          },
          steps: [
            { 
              id: 'l0-prep-1', 
              text: { es: 'Entiendo que Colab fue para aprender, pero el trabajo real es diferente', en: 'I understand Colab was for learning, but real work is different', pt: 'Entendo que Colab foi para aprender, mas o trabalho real é diferente' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `En el trabajo real vas a:

💻 Usar tu propia computadora
- Con Python instalado
- Con un editor de código (VS Code)
- Ejecutando scripts desde la terminal

📁 Trabajar con archivos locales
- CSVs, JSONs, bases de datos
- Organizar carpetas de proyectos
- Guardar y versionar tu código con Git

🔧 Usar herramientas profesionales
- Pandas para procesar datos
- SQL para consultar bases de datos
- Docker para empaquetar código
- Git para colaborar con otros

💡 Todo esto lo vas a aprender en el Nivel 1, paso a paso.`,
                en: `In real work you will:

💻 Use your own computer
- With Python installed
- With a code editor (VS Code)
- Running scripts from terminal

📁 Work with local files
- CSVs, JSONs, databases
- Organize project folders
- Save and version your code with Git

🔧 Use professional tools
- Pandas to process data
- SQL to query databases
- Docker to package code
- Git to collaborate with others

💡 All this you'll learn in Level 1, step by step.`,
                pt: `No trabalho real você vai:

💻 Usar seu próprio computador
- Com Python instalado
- Com um editor de código (VS Code)
- Executando scripts pelo terminal

📁 Trabalhar com arquivos locais
- CSVs, JSONs, bancos de dados
- Organizar pastas de projetos
- Salvar e versionar seu código com Git

🔧 Usar ferramentas profissionais
- Pandas para processar dados
- SQL para consultar bancos de dados
- Docker para empacotar código
- Git para colaborar com outros

💡 Tudo isso você vai aprender no Nível 1, passo a passo.`
              }
            },
          ]
        },
        {
          id: 'l0-prep-herramientas',
          title: { es: '🛠️ Las herramientas que vas a usar', en: '🛠️ The tools you will use', pt: '🛠️ As ferramentas que você vai usar' },
          description: {
            es: 'Acá te presento las herramientas que vas a aprender en el Nivel 1. No tenés que instalarlas ahora - solo conocerlas.',
            en: 'Here I introduce you to the tools you will learn in Level 1. You don\'t have to install them now - just know them.',
            pt: 'Aqui te apresento as ferramentas que você vai aprender no Nível 1. Não precisa instalar agora - só conhecer.'
          },
          steps: [
            { 
              id: 'l0-prep-2', 
              text: { es: 'Conozco qué es VS Code (editor de código profesional)', en: 'I know what VS Code is (professional code editor)', pt: 'Conheço o que é VS Code (editor de código profissional)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `VS Code (Visual Studio Code) es el editor de código más usado en el mundo.

Es como Word, pero para escribir código:
- Te muestra colores según el tipo de código
- Te avisa si hay errores
- Te sugiere código mientras escribís
- Tiene terminal integrada

💡 Es GRATIS y lo hace Microsoft.
Lo vas a instalar en el Capítulo 2 del Nivel 1.`,
                en: `VS Code (Visual Studio Code) is the most used code editor in the world.

It's like Word, but for writing code:
- Shows colors according to code type
- Warns you about errors
- Suggests code as you type
- Has integrated terminal

💡 It's FREE and made by Microsoft.
You'll install it in Chapter 2 of Level 1.`,
                pt: `VS Code (Visual Studio Code) é o editor de código mais usado no mundo.

É como Word, mas para escrever código:
- Mostra cores de acordo com o tipo de código
- Te avisa se há erros
- Sugere código enquanto você escreve
- Tem terminal integrado

💡 É GRÁTIS e é feito pela Microsoft.
Você vai instalar no Capítulo 2 do Nível 1.`
              }
            },
            { 
              id: 'l0-prep-3', 
              text: { es: 'Conozco qué es Pandas (la librería más importante para datos)', en: 'I know what Pandas is (the most important library for data)', pt: 'Conheço o que é Pandas (a biblioteca mais importante para dados)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Pandas es como Excel pero dentro de Python.

Te permite:
- Cargar archivos CSV, Excel, JSON
- Filtrar y limpiar datos
- Hacer cálculos y agregaciones
- Combinar tablas (como JOIN en SQL)

Ejemplo:
import pandas as pd
df = pd.read_csv("ventas.csv")
df[df["precio"] > 100]  # Filtrar

💡 Es LA herramienta que todo Data Engineer usa.
La vas a aprender en los Capítulos 3-4 del Nivel 1.`,
                en: `Pandas is like Excel but inside Python.

It lets you:
- Load CSV, Excel, JSON files
- Filter and clean data
- Do calculations and aggregations
- Combine tables (like JOIN in SQL)

Example:
import pandas as pd
df = pd.read_csv("sales.csv")
df[df["price"] > 100]  # Filter

💡 It's THE tool every Data Engineer uses.
You'll learn it in Chapters 3-4 of Level 1.`,
                pt: `Pandas é como Excel mas dentro do Python.

Permite:
- Carregar arquivos CSV, Excel, JSON
- Filtrar e limpar dados
- Fazer cálculos e agregações
- Combinar tabelas (como JOIN em SQL)

Exemplo:
import pandas as pd
df = pd.read_csv("vendas.csv")
df[df["preco"] > 100]  # Filtrar

💡 É A ferramenta que todo Data Engineer usa.
Você vai aprender nos Capítulos 3-4 do Nível 1.`
              }
            },
            { 
              id: 'l0-prep-4', 
              text: { es: 'Conozco qué es Docker (para empaquetar código)', en: 'I know what Docker is (for packaging code)', pt: 'Conheço o que é Docker (para empacotar código)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Docker es como una "caja" donde metés tu código y todo lo que necesita para funcionar.

Problema que resuelve:
"En mi computadora funciona, pero en la del servidor no"

Con Docker:
- Empaquetás tu código + dependencias
- Funciona igual en cualquier computadora
- Es el estándar en todas las empresas

💡 Lo vas a aprender en el Capítulo 9 del Nivel 1.
No es tan difícil como parece.`,
                en: `Docker is like a "box" where you put your code and everything it needs to work.

Problem it solves:
"It works on my computer, but not on the server"

With Docker:
- You package your code + dependencies
- Works the same on any computer
- It's the standard in all companies

💡 You'll learn it in Chapter 9 of Level 1.
It's not as hard as it seems.`,
                pt: `Docker é como uma "caixa" onde você coloca seu código e tudo o que ele precisa para funcionar.

Problema que resolve:
"Na minha máquina funciona, mas no servidor não"

Com Docker:
- Você empacota seu código + dependências
- Funciona igual em qualquer computador
- É o padrão em todas as empresas

💡 Você vai aprender no Capítulo 9 do Nível 1.
Não é tão difícil quanto parece.`
              }
            },
            { 
              id: 'l0-prep-5', 
              text: { es: 'Conozco qué son las APIs (para obtener datos de internet)', en: 'I know what APIs are (to get data from the internet)', pt: 'Conheço o que são APIs (para obter dados da internet)' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Una API es una forma de pedirle datos a un servicio de internet.

Ejemplos:
- API del clima → Te da temperatura, humedad
- API de Twitter → Te da tweets
- API de finanzas → Te da precios de acciones

En Python:
import requests
response = requests.get("https://api.clima.com/buenos-aires")
data = response.json()
print(data["temperatura"])  # 25°C

💡 Lo vas a aprender en el Capítulo 8 del Nivel 1.`,
                en: `An API is a way to request data from an internet service.

Examples:
- Weather API → Gives you temperature, humidity
- Twitter API → Gives you tweets
- Finance API → Gives you stock prices

In Python:
import requests
response = requests.get("https://api.weather.com/new-york")
data = response.json()
print(data["temperature"])  # 75°F

💡 You'll learn it in Chapter 8 of Level 1.`,
                pt: `Uma API é uma forma de pedir dados a um serviço de internet.

Exemplos:
- API do clima → Te dá temperatura, umidade
- API do Twitter → Te dá tweets
- API de finanças → Te dá preços de ações

Em Python:
import requests
response = requests.get("https://api.clima.com/sao-paulo")
data = response.json()
print(data["temperatura"])  # 25°C

💡 Você vai aprender no Capítulo 8 do Nível 1.`
              }
            },
          ]
        },
        {
          id: 'l0-prep-checklist',
          title: { es: '✅ Checklist: ¿Estoy listo para el Nivel 1?', en: '✅ Checklist: Am I ready for Level 1?', pt: '✅ Checklist: Estou pronto para o Nível 1?' },
          description: {
            es: 'Antes de pasar al Nivel 1, asegurate de que podés hacer estas cosas sin ayuda. Si algo no te sale, volvé a la fase correspondiente y practicá más.',
            en: 'Before moving to Level 1, make sure you can do these things without help. If something doesn\'t work, go back to the corresponding phase and practice more.',
            pt: 'Antes de passar para o Nível 1, certifique-se de que consegue fazer essas coisas sem ajuda. Se algo não sair, volte para a fase correspondente e pratique mais.'
          },
          steps: [
            { 
              id: 'l0-check-1', 
              text: { es: '🐍 Puedo escribir un programa Python con variables, if/else y for', en: '🐍 I can write a Python program with variables, if/else and for', pt: '🐍 Consigo escrever um programa Python com variáveis, if/else e for' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Deberías poder escribir algo así sin mirar ejemplos:

nombre = input("¿Cómo te llamás? ")
edad = int(input("¿Cuántos años tenés? "))

if edad >= 18:
    print(f"Hola {nombre}, sos mayor de edad")
else:
    print(f"Hola {nombre}, sos menor de edad")

for i in range(3):
    print(f"Línea {i+1}")

Si no podés, volvé a las Fases 3-6.`,
                en: `You should be able to write something like this without looking at examples:

name = input("What's your name? ")
age = int(input("How old are you? "))

if age >= 18:
    print(f"Hello {name}, you are an adult")
else:
    print(f"Hello {name}, you are a minor")

for i in range(3):
    print(f"Line {i+1}")

If you can't, go back to Phases 3-6.`,
                pt: `Você deveria conseguir escrever algo assim sem olhar exemplos:

nome = input("Qual é seu nome? ")
idade = int(input("Quantos anos você tem? "))

if idade >= 18:
    print(f"Olá {nome}, você é maior de idade")
else:
    print(f"Olá {nome}, você é menor de idade")

for i in range(3):
    print(f"Linha {i+1}")

Se não conseguir, volte para as Fases 3-6.`
              }
            },
            { 
              id: 'l0-check-2', 
              text: { es: '📝 Puedo crear una función que reciba parámetros y devuelva algo', en: '📝 I can create a function that takes parameters and returns something', pt: '📝 Consigo criar uma função que receba parâmetros e retorne algo' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Deberías poder escribir:

def calcular_promedio(numeros):
    suma = 0
    for n in numeros:
        suma += n
    promedio = suma / len(numeros)
    return promedio

notas = [7, 8, 6, 9]
resultado = calcular_promedio(notas)
print(f"El promedio es: {resultado}")

Si no podés, volvé a la Fase 7.`,
                en: `You should be able to write:

def calculate_average(numbers):
    total = 0
    for n in numbers:
        total += n
    average = total / len(numbers)
    return average

grades = [7, 8, 6, 9]
result = calculate_average(grades)
print(f"The average is: {result}")

If you can't, go back to Phase 7.`,
                pt: `Você deveria conseguir escrever:

def calcular_media(numeros):
    soma = 0
    for n in numeros:
        soma += n
    media = soma / len(numeros)
    return media

notas = [7, 8, 6, 9]
resultado = calcular_media(notas)
print(f"A média é: {resultado}")

Se não conseguir, volte para a Fase 7.`
              }
            },
            { 
              id: 'l0-check-3', 
              text: { es: '📊 Puedo escribir una consulta SQL con SELECT, WHERE, ORDER BY', en: '📊 I can write an SQL query with SELECT, WHERE, ORDER BY', pt: '📊 Consigo escrever uma consulta SQL com SELECT, WHERE, ORDER BY' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Deberías poder escribir:

SELECT nombre, precio
FROM productos
WHERE precio > 100
ORDER BY precio DESC

Y entender qué hace cada parte.
Si no podés, volvé a las Fases 10-11.`,
                en: `You should be able to write:

SELECT name, price
FROM products
WHERE price > 100
ORDER BY price DESC

And understand what each part does.
If you can't, go back to Phases 10-11.`,
                pt: `Você deveria conseguir escrever:

SELECT nome, preco
FROM produtos
WHERE preco > 100
ORDER BY preco DESC

E entender o que cada parte faz.
Se não conseguir, volte para as Fases 10-11.`
              }
            },
            { 
              id: 'l0-check-4', 
              text: { es: '🔗 Puedo escribir un JOIN para combinar dos tablas', en: '🔗 I can write a JOIN to combine two tables', pt: '🔗 Consigo escrever um JOIN para combinar duas tabelas' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Deberías poder escribir:

SELECT clientes.nombre, ordenes.total
FROM clientes
JOIN ordenes ON clientes.id = ordenes.cliente_id
WHERE ordenes.total > 500

Si no podés, volvé a la Fase 13.`,
                en: `You should be able to write:

SELECT customers.name, orders.total
FROM customers
JOIN orders ON customers.id = orders.customer_id
WHERE orders.total > 500

If you can't, go back to Phase 13.`,
                pt: `Você deveria conseguir escrever:

SELECT clientes.nome, pedidos.total
FROM clientes
JOIN pedidos ON clientes.id = pedidos.cliente_id
WHERE pedidos.total > 500

Se não conseguir, volte para a Fase 13.`
              }
            },
            { 
              id: 'l0-check-5', 
              text: { es: '💻 Sé usar la terminal: pwd, ls, cd', en: '💻 I know how to use the terminal: pwd, ls, cd', pt: '💻 Sei usar o terminal: pwd, ls, cd' },
              type: 'task', 
              checkbox: true,
              explanation: {
                es: `Deberías saber:

pwd → Ver dónde estoy
ls  → Ver qué archivos hay
cd carpeta → Entrar a una carpeta
cd .. → Subir un nivel

Si no podés, volvé a la Fase 1.5 (Terminal).`,
                en: `You should know:

pwd → See where I am
ls  → See what files are there
cd folder → Enter a folder
cd .. → Go up one level

If you can't, go back to Phase 1.5 (Terminal).`,
                pt: `Você deveria saber:

pwd → Ver onde estou
ls  → Ver quais arquivos tem
cd pasta → Entrar em uma pasta
cd .. → Subir um nível

Se não conseguir, volte para a Fase 1.5 (Terminal).`
              }
            },
            { 
              id: 'l0-check-6', 
              text: { es: '📦 Tengo cuenta de GitHub creada', en: '📦 I have a GitHub account created', pt: '📦 Tenho conta no GitHub criada' },
              type: 'task', 
              checkbox: true
            },
          ],
          stopTitle: { es: '🎯 ¿Pasaste el checklist?', en: '🎯 Did you pass the checklist?', pt: '🎯 Passou no checklist?' },
          stopContent: {
            es: 'Si marcaste todos los puntos, estás 100% listo para el Nivel 1. Si te falta algo, no te preocupes - volvé atrás y practicá. Es mejor ir seguro que rápido.',
            en: 'If you checked all points, you are 100% ready for Level 1. If you\'re missing something, don\'t worry - go back and practice. It\'s better to go steady than fast.',
            pt: 'Se você marcou todos os pontos, está 100% pronto para o Nível 1. Se falta algo, não se preocupe - volte e pratique. É melhor ir com calma do que rápido.'
          }
        }
      ]
    },
    // ========== FASE 17: CIERRE Y SIGUIENTE PASO ==========
    {
      id: 'l0-final',
      title: { es: '¡Lo Lograste!', en: 'You Did It!', pt: 'Você Conseguiu!' },
      emoji: '🏆',
      sections: [
        {
          id: 'l0-resumen',
          title: { es: '🎉 Resumen: ¡Mirá todo lo que aprendiste!', en: '🎉 Summary: Look at everything you learned!', pt: '🎉 Resumo: Olha tudo o que você aprendeu!' },
          description: {
            es: 'Empezaste sin saber nada de programación. Ahora sabés:',
            en: 'You started knowing nothing about coding. Now you know:',
            pt: 'Você começou sem saber nada de programação. Agora você sabe:'
          },
          steps: [
            { id: 'l0-fin-1', text: { es: '✅ Qué es programar y qué es Data Engineering', en: '✅ What is coding and what is Data Engineering', pt: '✅ O que é programar e o que é Data Engineering' }, type: 'task', checkbox: true },
            { id: 'l0-fin-2', text: { es: '✅ Variables, listas, if/else, for en Python', en: '✅ Variables, lists, if/else, for in Python', pt: '✅ Variáveis, listas, if/else, for em Python' }, type: 'task', checkbox: true },
            { id: 'l0-fin-3', text: { es: '✅ Crear tus propias funciones', en: '✅ Creating your own functions', pt: '✅ Criar suas próprias funções' }, type: 'task', checkbox: true },
            { id: 'l0-fin-4', text: { es: '✅ Usar diccionarios (como vienen los datos reales)', en: '✅ Using dictionaries (how real data comes)', pt: '✅ Usar dicionários (como vêm os dados reais)' }, type: 'task', checkbox: true },
            { id: 'l0-fin-5', text: { es: '✅ SQL: SELECT, FROM, WHERE, ORDER BY', en: '✅ SQL: SELECT, FROM, WHERE, ORDER BY', pt: '✅ SQL: SELECT, FROM, WHERE, ORDER BY' }, type: 'task', checkbox: true },
            { id: 'l0-fin-6', text: { es: '✅ SQL: GROUP BY para agrupar y contar', en: '✅ SQL: GROUP BY to group and count', pt: '✅ SQL: GROUP BY para agrupar e contar' }, type: 'task', checkbox: true },
            { id: 'l0-fin-7', text: { es: '✅ SQL: JOIN para combinar tablas', en: '✅ SQL: JOIN to combine tables', pt: '✅ SQL: JOIN para combinar tabelas' }, type: 'task', checkbox: true },
            { id: 'l0-fin-8', text: { es: '✅ Tener una cuenta de GitHub', en: '✅ Having a GitHub account', pt: '✅ Ter uma conta no GitHub' }, type: 'task', checkbox: true },
            { id: 'l0-fin-9', text: { es: '✅ ¡Crear programas que funcionan!', en: '✅ Creating working programs!', pt: '✅ Criar programas que funcionam!' }, type: 'task', checkbox: true },
          ],
          stopTitle: { es: '🌟 ¡FELICITACIONES!', en: '🌟 CONGRATULATIONS!', pt: '🌟 PARABÉNS!' },
          stopContent: {
            es: 'Esto que aprendiste es el fundamento de TODA la programación. No importa si después estudiás web, apps, videojuegos o datos - todo usa esto. Ya sos parte del mundo tech.',
            en: 'What you learned is the foundation of ALL programming. It doesn\'t matter if you study web, apps, video games or data later - everything uses this. You are already part of the tech world.',
            pt: 'Isso que você aprendeu é o fundamento de TODA a programação. Não importa se depois você estuda web, apps, videogames ou dados - tudo usa isso. Você já faz parte do mundo tech.'
          }
        },
        {
          id: 'l0-siguiente',
          title: { es: '🚀 ¿Qué sigue?', en: '🚀 What\'s next?', pt: '🚀 O que vem a seguir?' },
          description: {
            es: 'El Nivel 1 te enseña a conseguir tu primer trabajo como Data Engineer. Vas a aprender herramientas profesionales, hacer proyectos para tu portfolio, y prepararte para entrevistas. Miles de personas consiguieron trabajo con este método.',
            en: 'Level 1 teaches you how to get your first job as a Data Engineer. You will learn professional tools, do projects for your portfolio, and prepare for interviews. Thousands of people got jobs with this method.',
            pt: 'O Nível 1 te ensina a conseguir seu primeiro trabalho como Data Engineer. Você vai aprender ferramentas profissionais, fazer projetos para seu portfólio e se preparar para entrevistas. Milhares de pessoas conseguiram trabalho com este método.'
          },
          steps: [
            { id: 'l0-fin-9', text: { es: 'Completé TODOS los ejercicios de Python Easy', en: 'Completed ALL Python Easy exercises', pt: 'Completei TODOS os exercícios Python Easy' }, type: 'task', checkbox: true },
            { id: 'l0-fin-10', text: { es: 'Completé TODOS los ejercicios de SQL Easy', en: 'Completed ALL SQL Easy exercises', pt: 'Completei TODOS os exercícios SQL Easy' }, type: 'task', checkbox: true },
            { id: 'l0-fin-11', text: { es: '🚀 Estoy listo/a para el Nivel 1', en: '🚀 I\'m ready for Level 1', pt: '🚀 Estou pronto/a para o Nível 1' }, type: 'task', checkbox: true },
          ]
        }
      ]
    }
  ],
  checklist: [
    { es: '✅ Entiendo qué es programar y qué es Data Engineering', en: '✅ I understand what coding and Data Engineering are', pt: '✅ Entendo o que é programar e o que é Data Engineering' },
    { es: '✅ Sé usar Google Colab', en: '✅ I know how to use Google Colab', pt: '✅ Sei usar o Google Colab' },
    { es: '✅ Python: variables, listas, if/else, for, funciones, diccionarios', en: '✅ Python: variables, lists, if/else, for, functions, dictionaries', pt: '✅ Python: variáveis, listas, if/else, for, funções, dicionários' },
    { es: '✅ Creé programas que funcionan (Calculadora de Promedios)', en: '✅ I created working programs (Grade Calculator)', pt: '✅ Criei programas que funcionam (Calculadora de Médias)' },
    { es: '✅ SQL: SELECT, FROM, WHERE, ORDER BY, GROUP BY, JOIN', en: '✅ SQL: SELECT, FROM, WHERE, ORDER BY, GROUP BY, JOIN', pt: '✅ SQL: SELECT, FROM, WHERE, ORDER BY, GROUP BY, JOIN' },
    { es: '✅ Tengo cuenta de GitHub', en: '✅ I have a GitHub account', pt: '✅ Tenho conta no GitHub' },
    { es: '✅ Completé los ejercicios de la plataforma', en: '✅ I completed the platform exercises', pt: '✅ Completei os exercícios da plataforma' },
  ],
  resources: [
    {
      title: { es: '📚 Recursos Gratuitos para seguir aprendiendo', en: '📚 Free Resources to Keep Learning', pt: '📚 Recursos Gratuitos para continuar aprendendo' },
      items: [
        { es: 'Google Colab: colab.research.google.com (tu "cocina" de código)', en: 'Google Colab: colab.research.google.com (your coding "kitchen")', pt: 'Google Colab: colab.research.google.com (sua "cozinha" de código)' },
        { es: 'W3Schools Python: w3schools.com/python (tutoriales con ejemplos)', en: 'W3Schools Python: w3schools.com/python (tutorials with examples)', pt: 'W3Schools Python: w3schools.com/python (tutoriais com exemplos)' },
        { es: 'W3Schools SQL: w3schools.com/sql (tutoriales con ejemplos)', en: 'W3Schools SQL: w3schools.com/sql (tutorials with examples)', pt: 'W3Schools SQL: w3schools.com/sql (tutoriais com exemplos)' },
        { es: 'freeCodeCamp español: youtube.com/@faborito (videos en español)', en: 'freeCodeCamp: freecodecamp.org', pt: 'freeCodeCamp português: youtube.com/freecodecamp (vídeos em português)' },
      ]
    },
    {
      title: { es: '💡 Tips para seguir practicando', en: '💡 Tips to Keep Practicing', pt: '💡 Dicas para continuar praticando' },
      items: [
        { es: 'Hacé los ejercicios de la plataforma todos los días (aunque sean 15 min)', en: 'Do the platform exercises every day (even if it\'s 15 min)', pt: 'Faça os exercícios da plataforma todos os dias (mesmo que sejam 15 min)' },
        { es: 'Si te trabás, preguntá en el Discord - todos empezamos igual', en: 'If you get stuck, ask in Discord - we all started the same', pt: 'Se travar, pergunte no Discord - todos começamos igual' },
        { es: 'Intentá modificar los ejemplos - ¿qué pasa si cambio esto?', en: 'Try modifying the examples - what happens if I change this?', pt: 'Tente modificar os exemplos - o que acontece se eu mudar isso?' },
        { es: 'La práctica hace al maestro - nadie nace sabiendo', en: 'Practice makes perfect - no one is born knowing', pt: 'A prática leva à perfeição - ninguém nasce sabendo' },
      ]
    }
  ]
};
