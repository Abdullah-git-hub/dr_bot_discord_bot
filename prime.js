function checkPrime(num, msg){

  var divsArr = []

  try{
      if(num < 0){
        msg.reply("Try to give a positive integer")
      }else if(num == 0){
        msg.reply("Zero is not a prime number. For more info, visit: https://brilliant.org/wiki/is-0-prime/")
      }else if(num == 1){
        msg.reply(`
        The statement "1 is prime" is false.
        The **definition** of a **prime number** is a positive integer that has exactly **two positive divisors**. However, 1 only has one positive divisor (1 itself), so it is not prime.
        `)
      }else if(num % 2 == 0){
      
        var maxCheck = num/2
    
        for(i = 1; i <= maxCheck; i++){
          if(num % i == 0){
            divsArr.push(i)
          }
        }
    
      }else if(num % 2 != 0){
        
        var maxCheck = num/2
    
        for(i = 1; i <= maxCheck; i += 2){
          if(num % i == 0){
            divsArr.push(i)
          }
        }
    
      }
    
      if(divsArr.length != 0){
      
        if(divsArr.length >= 2){
          // setTimeout(function () {
          //   msg.reply("Couldn't do that")
          //   process.exit(1)
          // }, 5000);
          var numList = divsArr.join(", ")
          msg.reply(`
          ${num} is not a prime number. It is divisible by ${divsArr.length} integers. Those are ${numList}
          `)
        }else{
          // setTimeout(function () {
          //   msg.reply("Couldn't do that")
          //   process.exit(1) 
          // }, 5000);
          msg.reply(`${num} is a prime number`)
        }
        
      }
  }catch(err){
    console.log(err)
    msg.reply("Couldn't do that")
  }
  
}

module.exports = { checkPrime };