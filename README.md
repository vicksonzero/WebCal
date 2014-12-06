WebCal
======

A web calculator that demonstrates state pattern (and a little bit of ajax...) 

(CO539 Assignment2)


#How to use

Go to http://vicksonzero.github.io/WebCal/ to use it!

#How to use at home

Download the folder `build` and open `index.html`

#How to read Source

see [source][1]

#Versions

##v1.2
- Added real server support. see [`server_src/index.php`][2] and [`js/calculationModelAjax.js`][3].
- Added `addressBar.js`. _WebCal_ can now be customized through address bar
- Used signal for _model_ and _view_ communication

##v1.1
- Used _State Pattern_ !
- Have 2 line output
- Can use Mock Delegate for calculation
- Handles Errors gracefully




[1]:https://github.com/vicksonzero/WebCal/tree/master/src
[2]:https://github.com/vicksonzero/WebCal/tree/master/server_src/index.php
[3]:https://github.com/vicksonzero/WebCal/tree/master/src/js/calculationModelAjax.js