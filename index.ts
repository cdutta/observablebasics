import { of, Observable, interval, concat, combineLatest, from, forkJoin } from 'rxjs'; 
import { map,take, concatAll, concatMap, delay, tap, mergeMap, switchMap, catchError } from 'rxjs/operators';
import * as numberObservables from './numberObservableStream';

// const source = of('World').pipe(
//   map(x => `Hello ${x}!`)
// );

// source.subscribe(x => console.log(x));

// // Write the following in observables
// function foo() {
//   console.log('Hello');
//   return 42;
// }

// const x = foo.call(); // same as foo()
// console.log(x);
// const y = foo.call(); // same as foo()
// console.log(y);

// console.log('Foo from observable');

// const fooObservable = new Observable(subscriber => {
//   subscriber.next('Hello');
//   subscriber.next('42');
//   subscriber.complete();
// });
// fooObservable.subscribe({
//     next(val) {console.log(val)},
//     complete() {console.log('observable is complete')}
//   }
// );

// fooObservable.subscribe((object) => {
//   console.log('value', object);
//   },
//   () => {
//     console.log('in case an error happens');
//   },
//   () => {
//     console.log('When the observable is complete');
//   }
// );


// numberObservables.evenNumberObservable.pipe(
//  take(10)
// ).
// subscribe(
//   (evenNumber) => {
//     console.log('This is the value ->', evenNumber);
//   }
// );

// numberObservables.oddNumberObservable.pipe(
//  take(10)
// ).
// subscribe(
//   (oddNumber) => {
//     console.log('This is the value odd ->', oddNumber);
//   }
// );

// const concatObsevables = concat(numberObservables.evenNumberObservable,     numberObservables.oddNumberObservable).pipe(
//   take(30)
// );

// // concatObsevables.subscribe(
// //   (value) => {
// //     console.log('Merged value from concat operator is -->', value);
// //   }
// // );

// const combinedLatestObservables = combineLatest(numberObservables.evenNumberObservable,     numberObservables.oddNumberObservable).pipe(
//   take(30)
// );

// combinedLatestObservables.subscribe(
//   ([value,value1]) => {
//     console.log('Merged value from concat operator is -->', value, '********', value1);
//   }
// );

interface GoogleFile {
  id: number;
  snapshoturl: string;
}


const googleFiles: GoogleFile[] = [{id: 1, snapshoturl: 'url1' }, {id: 2, snapshoturl: 'url2' }];


const emptyGoogleFiles: GoogleFile[] = [];

const updateOwners = googleFiles.map((file) => {
  const docId = file.snapshoturl;
  return getFileDetails(docId).pipe(
    mergeMap((name: string) => updateOwner(name)),
    //catchError
  )
});

let someObservable$ = (googleFiles.length > 0) ? forkJoin(updateOwners):of(undefined);

someObservable$.pipe(
    mergeMap(() => updateReopenAssignment()),
    tap(() => refresh())
).subscribe();


function getFileDetails(name: string) {
  
  return of('dummy').pipe(
    delay(1000),
    tap(() => {console.log('Inside getFileDetails', name)})
    );
} 

function updateOwner(name: string) {
  
  return of('dummy1').pipe(
    delay(20),
    tap(() => {console.log('inside updateOwner', name)})
    );
} 

function updateReopenAssignment() {
  
  return of('dummy1').pipe(
    delay(100),
    tap(() => {console.log('Inside updateReopenAssignment')})
    );
} 


function refresh() {
  console.log('inside refresh');
  return of('dummy1').pipe(
    delay(100),
    tap(() => {console.log('Inside refresh')})
    );
} 

