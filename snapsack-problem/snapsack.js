class Knapsack {
    
    /*
        abordagem bottom-up
        começamos pelo caso base: zero itens com zero valor
        e começamos a encher a mochila

        // i - linhas de itens
        // j - colunas de capacidade da mochila
        // amount - quantidade de itens  
        // capacity - capacidade 
    */

    calculate(items, capacity) {
        let amount = items.length
        let cache = []

        for(let g = 0; g < amount+1; g++) {
            cache[g] = []
            for(let h = 0; h < capacity+1; h++) {
                cache[g][h] = 0
            }
        }

        for(let i = 0; i < amount+1; i++) { // representa os itens
            let item = items[i-1]
            for (let j = 0; j < capacity+1; j++) { // representa a capacidade da mochila                 
                if(i === 0 || j === 0) { //condição inicial
                    cache[i][j] = 0
                    // ainda dá para tentar inserir o item na mochila
                    // Se o peso do item é menor ou igual do que o valor (j)
                } else if(item.weight <= j) {
                    let included = item.value + cache[i-1][j-item.weight]
                    let excluded = cache[i-1][j]
                    cache[i][j] = Math.max(included, excluded)
                } else {
                    cache[i][j] = cache[i-1][j] // mochila já está cheia
                }

            }
        }

        // for (let i = 0; i <= amount+1; i++) {
        //     for (let j = 0; j <= capacity+1; j++) {
        //         console.log(`${cache[i][j]}`)                
        //     }            
        // }

        return cache[amount][capacity]
    }
}

const capacity = 10
const items = [
    { weight: 2, value: 3 },
    { weight: 3, value: 6 },
    { weight: 6, value: 9 }   
]

const knapsack = new Knapsack()
console.log('Valor máximo preenchido na mochila: ', knapsack.calculate(items, capacity))