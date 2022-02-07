
function calculator(str) {

    str = str.replace(/ /g, '')
    let operator = str.match(/[+-/*]/gi)
    let operands =str.replace(/[^\d\IVXLCDMZ]/g, ',')
    let sign = operator ? operator[0] : null;
    const arrOperands = operands.split(',').filter(el => el !== '')
    const digits = {C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};


    function roman2arabic(str){
        if (!/^[IVXLCDMZ]+$/i.test(str)) throw new Error('некорректный ввод числа: ' + str)
        return str.toUpperCase().split('').reduce(function(r,v,i,arr){
          const [ a, b, c ] = [ digits[arr[i]], digits[arr[i+1]], digits[arr[i+2]]];
          if (b && c && a <= b && b < c)
            throw new Error('некорректный ввод числа: ' + str);
          return b > a ? r - a : r + a;
        }, 0)
      }
    function arabic2roman(num){
        if (!/^\-?\d+$/.test(num+'')) throw new Error('некорректный ввод числа: ' + num)
        if (num < 1) return '';
        let result = '';
        for (let key in digits)
          while ( num >= digits[key] ) {
            result += key;
            num -= digits[key];
          }
        return result;
      }

    if(arrOperands.length <= 1)
        throw new Error('строка не является математической операцией')
    if(arrOperands.length>=3)
        throw new Error('формат математической операции не удовлетворяет заданию - два операнда и один оператор (+, -, /, *)')
    if(sign === null)
        throw new Error('нужно ввести один из операторов (+, -, /, *)')
    
    if(/^[IVXLCDMZ]+$/i.test(arrOperands[0])){
        if(!/^[IVXLCDMZ]+$/i.test(arrOperands[1]))
            throw new Error('используются одновременно разные системы счисления')
        
        let a = roman2arabic(arrOperands[0])
        let b = roman2arabic(arrOperands[1])
        if(a > 10 || b > 10 || a <= 0 || b <=0){
             throw new Error('Операнды должны лежать в диапазоне от 1 до 10')
        }
           
        
        let mathExpression =  a + sign + b
       
        if(Math.floor(eval(mathExpression))>=0){
            return arabic2roman(Math.floor(eval(mathExpression)))
        }else{
            return ''
        }
    }

    if(/^\-?\d+$/.test(arrOperands[0]+'')){
        if(!/^\-?\d+$/.test(arrOperands[1]+''))
            throw new Error('используются одновременно разные системы счисления')
        let a = arrOperands[0]
        let b = arrOperands[1]
        if(a > 10 || b > 10 || a <= 0 || b <=0){
            throw new Error('Операнды должны лежать в диапазоне от 1 до 10')
       }
        let mathExpression =  a + sign + b
     
        return String(Math.floor(eval(mathExpression)))
    }
   
   
}

calculator('5/0')