function bubbleSort(arr) {
    // for (let i = 0; i < arr.length; i++) {
        
    // }
    let i = 0

    while (i < arr.length) {
        for (let j = 0; j < (arr.length - i); j++) {
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j]
                arr[j] = arr[j + 1]
                arr[j + 1] = temp
            }
        }
    }

    console.log(arr);
}

const array = [20,12,35,11,17,9,58,23,69,21]
bubbleSort(array)