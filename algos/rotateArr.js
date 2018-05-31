function GCD(a,b)
{
    if (a%b === 0)
    {
	return b
    }
    return GCD(b,a%b);
}


function rotateArr(a, d) {
    var v = a[0];
    var i = 0;
    var i_2 = 0;
    var c = 0;
    var e = 0;
    var n = a.length;
    var t;
    var gcd = GCD(n,d);
    console.log("GCD: ", gcd);
    while (e < gcd)
    {
	c = 0;
	    while(c <= n/gcd)
	    {
		if (i < d)
		{
		    t = a[i + n -d];
		    a[i + n -d] = v;
		    v = t;
		    i = i + n - d;
		}
		else
		{
		    t = a[i - d];
		    a[i - d] = v;
		    v = t;
		    i = i - d;
		}
		c++;
//		console.log(a);
	    }
	i++;
	e++;
    }

}

var main = () => {
    console.log(process.argv);
    var arr = [1,2,3,4,5,6,7,8,9,10];
    var d = process.argv[2];
    console.log(arr);
    console.log(d);
    rotateArr(arr, d);
    console.log(arr);
    console.log(GCD(18,27));
}

main();
