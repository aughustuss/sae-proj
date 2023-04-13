debugger
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const help = document.querySelector('#help');
let btnhelp = document.getElementById('btn-help');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'Nos laços while e repeat-until, as sentenças serão executadas pelo menos uma vez.',
        choice1: 'Verdadeiro',
        choice2: 'Falso',
        answer: 2,
        help: 'No procedimento de repetição while, o teste para entrar no laço é feito no iníco do processo. '
    },
    {
        question:"Em um programa de computador, pode se considerar variáveis todas aquelas que começam com letras e números.",
        choice1: "Verdadeiro",
        choice2: "Falso",
        answer: 2,
        help: "As variaveis possuem certas restrições na sua criação, de uma pesquisada sobre depois."
    },
    {
        question: "Durante a execução de um programa, o conteúdo de uma variável pode mudar ao longo do tempo, no entanto ela só pode armazenar um valor por vez",
        choice1: "Verdadeiro",
        choice2: "Falso",
        answer: 1,
        help: "Para variavel conseguir armazenar mais valores ela tem que possuir um vetor."
    },
    {
        question: "Considerando a sequencia lógica: 3, A, 5, C, 8, E, 12, G,…, o décimo e o décimo terceiro termos da sequência, considerando o alfabeto de 26 letras, são, respectivamente:",
        choice1: "I ; 30",
        choice2: " K ; 23",
        answer: 1,
        help: " Observe somente os números e depois somente as letras que você vai conseguir achar um padrão."
    },
    {
        question: "Sobre o conjunto númerico, a expressão ( ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ) é: ",
        choice1: "Verdadeira",
        choice2: "Falsa",
        answer: 1,
        help: "Um conjunto menor contem no seu conjunto maior apenas se seus elementos fizerem parte desse conjunto maior."
    },
    {
        question: "Organograma é o mesmo que fluxograma e pode ser definido como um tipo de diagrama que representa a estrutura funcional de uma organização.",
        choice1: "Sim, é a mesma coisa ",
        choice2: "Não, é bem diferente ",
        answer: 2,
        help: "A definição de Organograma, como diz o enunciado, está correta. Ao comparar essa definição com o que você conhece sobre fluxograma dá pra dizer que é a mesma coisa? Dá uma pensadinha ai."
    },
    {
        question: "Em um fluxograma, as caixas de decisão são como “caixas pretas”, uma vez que não se tem clareza da ação que será executada. ",
        choice1: "Verdadeiro",
        choice2: "Falso",
        answer: 2,
        help: "Lembre-se que o processo decisório no fluxograma representa um losango(figura geométrica similar a uma pipa). Agora dá uma associada com o conceito de caixa preta que foi citado." 
    },
    {
        question: "Na frase “Laura estuda engenharia e Fernanda não estuda medicina”. A negação da sentença é: Laura não estuda engenharia ou Fernanda estuda medicina.",
        choice1: "Verdadeira",
        choice2: "Falso",
        answer: 1,
        help: "Essa ta fácil, lembre-se que ao negar a sentença, o operador logico “e” vira “ou”."
    },
    {
        question: "A negação da seguinte proposição composta: “Se estudo atentamente então serei nomeado em concurso público” é:",
        choice1: "Se não estudo atentamente, então não serei nomeado em concurso público.",
        choice2: "Eu estudo atentamente, mas não serei nomeado em concurso publico.",
        answer: 2,
        help: "Lembre-se da regra do condicional ao negar uma sentença no qual o condicional é substituído por outro operador lógico. Qualquer duvida só visitar a página de ajuda que temos aqui no site sobre a matéria."
    },
    {
        question: 'O XML tem um padrão de API que é usada para desenvolver uma interface de aplicativos em dispositivos computacionais em servidores HTTP e HTTPS.',
        choice1: 'Verdadeiro',
        choice2: 'Falso',
        answer: 2,
        help: 'O nome XML lembra o HTML, não?'
    },
    {
        question: 'Na linguagem C a variável do tipo "char" permite guardar em sua memória apenas 1 carectere e caso deseje guardar mais caracteres você deve:',
        choice1: 'Criar um vetor de tipo "char"',
        choice2: 'Criar varias variaveis do tipo "char" para cada caractere',
        answer: 1,
        help: 'A linguagem C não possui o tipo string como as outra linguagens, porem ela possui um metodo bem semelhante ao tipo string.'
    },
    {
        question: 'Se negar a proposição “Se a maré estiver baixa, então irei a praia”  ficara: A maré estava baixa e não fui a praia?',
        choice1: 'Correto',
        choice2: 'Incorreto',
        answer: 1,
        help: 'A condição para eu ir a praia depende da maré estar baixa. Relembre sempre da regra do condicional ao negar esses tipo de preposição.'
    },
    {
        question: 'Qual é a quantidade maxima de valores distintos que se pode representar em 1 byte ? ',
        choice1: '256 valores',
        choice2: '257 valores',
        answer: 2,
        help: '1 byte = 8 bits e em cada bit pode se alternar entre valores 0 e 1 para representar um valor, Pesquise um pouco sobre o Dia do Programador caso não saiba fazer a conta. Só mais um aviso, essa questão possue uma pegadinha.'
    },
    {
        question: 'Em resumo geral, as proposições compostas por bicondicionais (que contém os conectivos se e somente se) só serão verdadeiras quando todas as proposições forem verdadeiras?',
        choice1: 'Não, pois poderiam ser todas verdadeiras ou falsas.',
        choice2: 'Sim, pois somente se ambas forem verdadeiras',
        answer: 1,
        help: 'bicondicional é composta por duas condicionais: (p→q) e outra no sentido contrário (q→p).'
    },
    {
        question: 'De acordo com a ordem que aqui está exemplificada ~, ∧, ∨, →, ↔ é correto dizer que são elas respectivamente:',
        choice1: 'negação, disjunção, conjunção, bicondicional, condicional',
        choice2: 'negação, conjunção, disjunção, condicional, bicondicional.',
        answer: 2,
        help: 'Dividir para conquistar comece separando as que você lembra e vá associando os símbolos.'
    },
    {
        question: "Analise as expressões (P∧Q)'= P'∨Q' e (P∨Q)'= P'∧Q’. A partir da análise pode se afirmar que estão corretas as expressões?",
        choice1: ' Sim, pois a negação foi feita de forma correta',
        choice2: 'Não, pois a negação feita esta incorreta.',
        answer: 1,
        help: 'Pesquise um pouco depois sobre as leis de DeMorgan caso não esteje conseguindo resolver essa questão.'
    },
    {
        question: 'Para ser contratado um bolsista que esta fazendo estagio precisa ter 2 critérios , ele tem que ter a bolsa menor ou igual a R$:350,00 ou maior igual a R$:500.00, o segundo critério é que o estagiário precisa ter mais que 2 anos de trabalho na empresa , Sabendo disso a expressão lógica que leva em consideração todas essas afirmações são: ',
        choice1: '((bolsa<=350,00)||(bolsa >=500,00))&&(tempo>2)',
        choice2: '((bolsa <=350,00)&&(bolsa >=500,00))&&(tempo>=2)',
        answer: 1,
        help: 'Essa é uma expressão logica em Liguagem C, em que ||= ∨  &&= ∧'
    },
    {
        question: 'Em um avião há 4 romanos e 1 inglês, qual é o nome da aeromoça ?',
        choice1: 'Ivone',
        choice2: 'Leticia',
        answer: 1,
        help: '4 em romanos =IV 1 em inglês=one. So pra descontrair'
    },
    {
        question: 'Um grupo de 87 amigos se encontram em um parque, 51 possuem saldo para se divertirem e 41 possuem vale crédito, porém 5 outros amigos não possuem nada.O número de pessoas desse grupo que pode pagar para se divertir é ?',
        choice1: '82',
        choice2: '92',
        answer: 1,
        help: 'Vá com calma e use muito bem a lógica, lembrando que alguns amigos possuem ao mesmo tempo vale crédito e saldo.'
    },
    {
        question: 'Em um programa pode se usar functions e procedures, Porem o unico que pode me retornar valores para o código principal são as: ',
        choice1: 'Procedures',
        choice2: 'Functions',
        answer: 2,
        help: 'Procedures são a mesma coisa que procedimentos e funtions são a mesma coisa que funções.'
    },
]

const SCORE_POINTS = 2
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('salvar.html')
    }

    questionCounter++
    progressText.innerText = `Questão ${questionCounter} de ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question
    help.innerText = `AJUDA VAI AQUI`

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

btnhelp.addEventListener('click', e => {
    help.innerText = currentQuestion.help
});

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()