interface Bird {
  swing: number;
}

interface Dog {
  leg: number;
}

//没有相同字段可以定义一个类型保护函数
function isBird(x: Bird | Dog): x is Bird {
  return (<Bird>x).swing == 2;
  // return (x as Bird).swing == 2;
}
function getAnimal(x: Bird | Dog) {
  if (isBird(x)) {
    return x.swing;
  }
  return x.leg;
}