function func() {}
console.log(func.prototype);

func.prototype.name = 'gildong';
console.log(func.prototype);

let a = new func();
console.log(a);
console.log(a.name);
func.prototype.name = 'fff';
console.log(a.name);

