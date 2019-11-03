class Knapsack {
    
    /*
        abordagem bottom-up
        começamos pelo caso base: zero itens com zero valor
        e começamos a encher a mochila

        i - linhas de itens ou objetos
        j - colunas de capacidade ou peso da mochila
        amount - quantidade de itens (amount+1)
        capacity - capacidade (capacity+1)
        tabela - [amount+1][capacity+1]
    */

    /**
     * Step 1
     * - É criado um array bidimensional (tabela) de n+1 linhas e w+1 colunas
     * - O número de linhas (i) representa o conjunto de todos os itens i-1.
     * - O número de colunas (j) representa a capacidade de peso da mochila, ou seja, representam as unidades de peso.     
     */

     /**
      * Step 2 - Caso base
      * - Na linha 0, quando não temos itens para escolher, o valor máximo que pode ser armazenado em qualquer mochila
      *  deve ser 0.
      * - Na coluna 0, para uma mochila que pode conter 0 unidades de peso, o valor máximo que pode ser armazenado em 0 
      * (assumimos que não há itens valiosos e sem peso).
      */

      /**
       * Step 3
       * - Precisamos comparar o valor máximo que podemos obter com ou sem o item i.
       * - O valor máximo que é obtido sem o item i pode ser encontrado na posição [i-1][j].
       * - O valor máxmo que podemos obter com os itens 1,2,3...i deve ser o mesmo valor 
       * máximo que podemos obter com os itens 1,2,3...i-1.
       * - Obter o valor máximo do item i: Comparar o peso do item i com a capadidade da mochila.
       * - Se o peso do item i for maior que a capacidade da mochila, não podemos incluir. 
       * Assim, o valor máximo será o valor da linha de cima [i-1], na mesma coluna[j].
       *         
       */

       /**
        * Step 4
        * - Se o item i pesa menos que a capacidade da mochila, podemos incluir.
        * - Na linha i e na coluna j, escolheríamos o valor máximo que podemos obter 
        * sem o item i ou o valor máximo que podemos obter com o item i, o que for maior.
        * 
        */

        /**
         * Step 5
         * Uma vez preenchida a tabela, a solução final pode ser encontrada na última linha da última coluna, 
         * que representa o valor máximo obtido com todos os itens e a capacidade total da mochila.
         */

    calculate(items, backpackCapacity) {
        const amount = items.length
        const capacity = backpackCapacity
        let table = []

        // Popular o Caso Base
        for(let i = 0; i < amount+1; i++) {
            table[i]=[]
            for(let j = 0; j < capacity+1; j++) {
                table[i][j]=0
            }
        }

        for(let i = 0; i < amount+1; i++) { 
            let object = items[i-1]
            for (let j = 0; j < capacity+1; j++) {                 
                if(i === 0 || j === 0) { 
                    table[i][j] = 0                    
                } else if(object.weight <= j) {
                    let excluded = table[i-1][j]
                    let included = object.value + table[i-1][j-object.weight]                    
                    table[i][j] = Math.max(included, excluded)
                } else {                    
                    table[i][j] = table[i-1][j] 
                }

            }
        }

        // for (let i = 0; i <= n+1; i++) {
        //     for (let j = 0; j <= w+1; j++) {
        //         console.log(`${table[i][j]}`)                
        //     }            
        // }

        return table[amount][capacity]
    }
}

const capacity = 10
const items = [
    { weight: 5, value: 10 },
    { weight: 4, value: 40 },
    { weight: 6, value: 30 },
    { weight: 3, value: 50 }      
]

const knapsack = new Knapsack()
console.log('Valor máximo preenchido na mochila: ', knapsack.calculate(items, capacity))