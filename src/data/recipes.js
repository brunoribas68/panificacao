const imageBase = `${import.meta.env.BASE_URL}images/breads/`;

export const recipes = [
    {
        id: 'pao-frances',
        name: 'Pão Francês',
        image: `${imageBase}Pao-Frances.png`,
        breadWeight: 70,
        ingredients: {
            farinha: 100,
            sal: 2,
            reforcador: 1,
            fermento: 1.2,
            agua: 58,
        },
        instructions: [
            'Misture farinha, sal e reforçador.',
            'Adicione fermento e água.',
            'Sove até atingir o ponto de véu.',
            'Deixe a massa descansar por 20 minutos.',
            'Divida em porções de 70g.',
            'Modele os pães e faça o corte superior.',
            'Deixe fermentar até crescer.',
            'Asse em forno pré-aquecido a 200°C com vapor inicial.'
        ],
    },

    {
        id: 'pao-caseiro',
        name: 'Pão Caseiro',
        image: `${imageBase}Pao-Caseiro.png`,
        breadWeight: 650,
        ingredients: {
            farinha: 100,
            sal: 1.8,
            acucar: 6,
            fermento: 1.5,
            gordura: 3,
            agua: [50,54],
        },
        instructions: [
            'Misture farinha, sal, açúcar e fermento.',
            'Adicione água e gordura aos poucos.',
            'Sove até obter massa lisa e elástica.',
            'Deixe a massa descansar por 20 minutos.',
            'Modele em formato de pão.',
            'Coloque na forma e deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C até dourar.'
        ],
    },

    {
        id: 'pao-de-forma',
        name: 'Pão de Forma',
        image: `${imageBase}Pao-de-Forma.png`,
        breadWeight: 500,
        ingredients: {
            farinha: 100,
            sal: 2,
            acucar: 8,
            leitePo: 4,
            fermento: 1.6,
            gordura: 4,
            agua: 56,
        },
        instructions: [
            'Misture farinha, sal, açúcar e leite em pó.',
            'Adicione fermento, água e gordura.',
            'Sove bem até obter massa lisa.',
            'Deixe descansar por 30 minutos.',
            'Modele e coloque em forma untada.',
            'Deixe fermentar até atingir a borda da forma.',
            'Asse em forno pré-aquecido a 180°C.'
        ],
    },

    {
        id: 'pao-de-hamburguer',
        name: 'Pão de Hambúrguer',
        image: `${imageBase}Pao-de-Hamburguer.png`,
        breadWeight: 90,
        ingredients: {
            farinha: 100,
            sal: 2,
            acucar: 8,
            leitePo: 4,
            fermento: 1.6,
            gordura: 5,
            agua: 53,
        },
        instructions: [
            'Misture farinha, sal, açúcar e leite em pó.',
            'Adicione fermento, água e gordura.',
            'Sove até desenvolver o glúten.',
            'Deixe descansar por 20 minutos.',
            'Divida em porções de 90g.',
            'Boleie e achate levemente.',
            'Deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C até dourar.'
        ],
    },

    {
        id: 'pao-de-hot-dog',
        name: 'Pão de Hot Dog',
        image: `${imageBase}Pao-de-Hot-Dog.png`,
        breadWeight: 55,
        ingredients: {
            farinha: 100,
            sal: 1.8,
            acucar: 7,
            leitePo: 4,
            fermento: 1.5,
            gordura: 5,
            agua: 55,
        },
        instructions: [
            'Misture farinha, sal, açúcar e leite em pó.',
            'Adicione fermento, água e gordura.',
            'Sove até obter estrutura elástica.',
            'Deixe descansar por 20 minutos.',
            'Divida em porções de 55g.',
            'Modele em formato alongado.',
            'Deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C.'
        ],
    },

    {
        id: 'pao-de-leite',
        name: 'Pão de Leite',
        image: `${imageBase}Pao-de-Leite.png`,
        breadWeight: 50,
        ingredients: {
            farinha: 100,
            sal: 1.6,
            acucar: 10,
            leitePo: 4,
            fermento: 1.5,
            gordura: 4,
            agua: 52,
        },
        instructions: [
            'Misture farinha, sal, açúcar e leite em pó.',
            'Adicione fermento, água e gordura.',
            'Sove até massa macia e sedosa.',
            'Deixe descansar por 20 minutos.',
            'Divida em porções de 50g.',
            'Modele os pães.',
            'Deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C.'
        ],
    },

    {
        id: 'pao-sovado',
        name: 'Pão Sovado',
        image: `${imageBase}Pao-Sovado.png`,
        breadWeight: 65,
        ingredients: {
            farinha: 100,
            sal: 2,
            acucar: 5,
            fermento: 1.2,
            gordura: 3.5,
            agua: 51,
        },
        instructions: [
            'Misture todos os ingredientes.',
            'Sove até obter uma massa firme.',
            'Passe a massa no cilindro ou rolo aproximadamente 40 vezes.',
            'Deixe a massa descansar por 20 minutos.',
            'Divida em porções de 65g.',
            'Modele os pães.',
            'Deixe fermentar até dobrar de volume.',
            'Asse em forno pré-aquecido a 180°C por cerca de 40 minutos.'
        ],
    },

    {
        id: 'pao-vienense',
        name: 'Pão Vienense',
        image: `${imageBase}Pao-Viennense.png`,
        breadWeight: 75,
        ingredients: {
            farinha: 100,
            sal: 1.9,
            acucar: 9,
            fermento: 1.4,
            gordura: 4,
            agua: 54,
        },
        instructions: [
            'Misture farinha, sal, açúcar e fermento.',
            'Adicione água e gordura.',
            'Sove até obter massa lisa.',
            'Deixe descansar por 20 minutos.',
            'Divida em porções de 75g.',
            'Modele os pães.',
            'Deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C.'
        ],
    },

    {
        id: 'pao-sirio',
        name: 'Pão Sírio',
        image: `${imageBase}Pao-Sirio.png`,
        breadWeight: 65,
        ingredients: {
            farinha: 100,
            sal: 2,
            acucar: 2,
            fermento: 1.4,
            gordura: 2,
            agua: 60,
        },
        instructions: [
            'Misture farinha, sal, açúcar e fermento.',
            'Adicione água e gordura.',
            'Sove até massa lisa.',
            'Deixe descansar por 20 minutos.',
            'Divida em porções e abra discos finos.',
            'Deixe descansar rapidamente.',
            'Asse em forno bem quente (250–300°C) até inflar.'
        ],
    },

    {
        id: 'pao-bola',
        name: 'Pão Bola',
        image: `${imageBase}Pao-Bola.png`,
        breadWeight: 80,
        ingredients: {
            farinha: 100,
            sal: 1.9,
            acucar: 6,
            fermento: 1.4,
            gordura: 3,
            agua: 55,
        },
        instructions: [
            'Misture farinha, sal, açúcar e fermento.',
            'Adicione água e gordura.',
            'Sove até ponto de véu.',
            'Deixe descansar por 20 minutos.',
            'Divida em peças de 80g.',
            'Boleie os pães.',
            'Deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C.'
        ],
    },

    {
        id: 'pao-manteiga',
        name: 'Pão Manteiga',
        image: `${imageBase}Pao-Manteiga.png`,
        breadWeight: 70,
        ingredients: {
            farinha: 100,
            sal: 1.8,
            acucar: 8,
            fermento: 1.4,
            manteiga: 6,
            agua: 53,
        },
        instructions: [
            'Misture farinha, sal, açúcar e fermento.',
            'Adicione água e manteiga.',
            'Sove até massa macia e brilhante.',
            'Deixe descansar por 25 minutos.',
            'Divida e modele os pães.',
            'Deixe fermentar.',
            'Asse em forno pré-aquecido a 180°C.'
        ],
    },
];