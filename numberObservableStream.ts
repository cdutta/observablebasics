import { of, Observable, interval } from 'rxjs'; 
import { map,take } from 'rxjs/operators';

console.log('in numberObservableStream.ts file ');

export let evenNumberObservable = interval(1000).pipe(
  map(() => {return generateEvenNumbers();})
);

function generateEvenNumbers() {
    var range = 100;
    var number = Math.floor( Math.random() * range / 2 ) * 2;
    return number;
}; 

export let oddNumberObservable = interval(1000).pipe(
  map(() => {return generateOddNumbers();})
);

function generateOddNumbers() {
     var range = 100;
    var number = Math.floor( Math.random() * range / 2 ) * 2;
    return number+1;
}; 


