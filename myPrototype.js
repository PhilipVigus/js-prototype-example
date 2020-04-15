function Dog(name, idNumber) {
  this.name = name;

  // a private variable (not attached to this)
  let _id = idNumber;

  // a public function that accesses the private variable
  this.confirmID = function(id) {
    return _id === id;
  };
}

// a 'class' property that is accessed by all instances of Dog
Dog.prototype.genus = 'Canus'

// a function that all instances of Dog share because it is defined on Dog's prototype
Dog.prototype.makeNoise = function() {
  console.log("Bark!")
}

biff = new Dog('biff', 123);
fido = new Dog('fido', 234);

console.log(biff.name);
console.log(biff.genus);
console.log(fido.name);
console.log(fido.genus);

console.log(fido.confirmID(234));
console.log(fido._id);

// fido doesn't have a makeNoise function defined, so javascript looks to fido's __proto__ property
// this points to Dog's prototype, which does have a makeNoise function specified. This is then called
fido.makeNoise();

// define a makeNoise function on biff
biff.makeNoise = function() {
  console.log("Hoooooowl!");
}

// now when we call makeNoise, javascript calls the function on the instance
biff.makeNoise();

// if we delete the instance function, it will go back to calling the prototype version instead.
delete biff.makeNoise;
biff.makeNoise();

// prototypal inheritance - a.k.a prototype chains
function Pug(name, id) {
  // calls Dog's constructor in the context of the pug object being created
  Dog.call(this, name, id);
}

// copies Dog's prototype into Pug's prototype
Object.assign(Pug.prototype, Dog.prototype);

// add a new makeNoise function into the Pug prototype
// this will now get called instead of the Dog one for
// all instances of Pug
Pug.prototype.makeNoise = function() {
  console.log('Squeak!');
}

piggles = new Pug('piggles', 1234);
console.log(piggles.name);
console.log(piggles.genus);
piggles.makeNoise();

///////////////////////////////////////////////////////////////////////////////////////////////////////
// counting dogs
// can't see any easy way of doing this as a 'static' hidden variable on Dog, as prototype variables
// dont seem to be accessible within function constructors.
function DogBreeder() {
  this.numDogs = 0;
}

DogBreeder.prototype.breedDog = function(name, id) {
  this.numDogs++;
  return new Dog(name, id)
;}

DogBreeder.prototype.dogsBred = function() {
  return this.numDogs;
};

breeder = new DogBreeder();
bob = breeder.breedDog("Bob", 678);
bob.makeNoise();
steve = breeder.breedDog("Steve", 1234);
console.log(breeder.dogsBred());