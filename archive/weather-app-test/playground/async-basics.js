console.log('starting app');

setTimeout(() => {console.log('inside of callback')}, 2000);



setTimeout(() => {console.log('Second of callback')}, 0);
console.log('finishing up');


/*
output:
starting app
finishing up
inside of callback
*/
/*
by using nonblocking i/o we dont need to wait two seconds to
print 'finishing up'
*/


/*
output:
starting app
finishing up
Second of callback
inside of callback

the reason why the output is due to the callstack
*/

/*
callstack keeps track of functions and statements fired
console.log('starting app') -> pushed into callstack then pops out
settimeout(2 sec) pushed into callstack then gets pushed into node api's and starts counting down and removed from callstack
settimeout(0 sec) pushed into callstack then gets pushed into node api's and removed from callstack
settimeout(0 sec) gets moved to callback queue, where callback queue and waits for callstack to be empty
console.log('finishing up') pushed into callstack then pops output
main() finishes and main() pops out of callstack
then event loop checks if callstack is empty
then callstack empty, so callback queue runs so settimeout(0 sec) gets moved to callstack
now nothing in callback queue and callstack so
settimeout(2) is moved to callback queue
then event loop checks if callstack is empty
and callbac() is added to callstack and settimeout is
moved to callstack and everything pops out and
terminates
*/
