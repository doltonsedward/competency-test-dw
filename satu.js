function countItem(item, qty) {
    let price
    let discount 
    let totalPrice 
    switch (item) {
        case 'A':
            price = 4550

            if (qty > 13) discount = qty * 231

            totalPrice = price * qty - discount
            price *= qty
            console.log(`- Total harga barang: ${price}`)
            console.log(`- Potongan: ${discount}`)
            console.log(`- Total yang harus dibayar: ${totalPrice}`)
            break
        case 'B':
            price = 5330

            if (qty > 7) discount = price * (23/100)

            totalPrice = price * qty - discount
            price *= qty
            console.log(`- Total harga barang: ${price}`)
            console.log(`- Potongan: ${discount}`)
            console.log(`- Total yang harus dibayar: ${totalPrice}`)
            break
        case 'C':
            price = 8653

            totalPrice = price * qty
            price *= qty
            console.log(`- Total harga barang: ${price}`)
            console.log(`- Potongan: Tidak ada potongan untuk barang ini`)
            console.log(`- Total yang harus dibayar: ${totalPrice}`)
            break
        default:
            `Maaf kita tidak mempunyai barang tersebut`;
    }
    
}

countItem('A', 14)