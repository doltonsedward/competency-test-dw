function drawImage(n) {
    if (n % 2 === 0) {
        alert('You must use odd number')
        return
    } 

    let str = ''
    for (let i = 0; i < n; i++) {
        let rest = Math.floor(n / 2)
        for (let j = 0; j < n; j++) {
            if (
                j === 0 && i === 0 || j === n - 1 && i === 0 ||
                j === 0 && i === n - 1 || j === n - 1 && i === n - 1 ||
                j === rest || i === rest 
                ) {
                if (j === rest && i === rest) {
                    str += '#'
                } else {
                    str += '*'
                }
            } else {
                str += '#'
            }
        }

        str += '\n'
    }

    console.log(str)
}

drawImage(5)