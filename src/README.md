#WebCal Source

Webcal uses Model-View-Controller pattern to separate presentation from logic


#View

`index.html` and `style.css` contains all the styling details. 

#Presentation Model

`main.js` is the main driver, or the entry point of the script. It controls how data is presented in `index.html` and binds events from index.html to the controller `calculator.js`

#Control (and Model...)
`calculator.js` is written in _State Pattern_, in which it behaves differently according to the state it is in.

[`calStates/*`][1] contains different state objects. `calculator.js` will tell one of them to work when a event is triggered in `index.html`. In the event of calculating `1+1=2`, the calculator will go from `Start` state to `FirstNumber`, `Sign`, `SecondNumber`, `Answer` when respective buttons are pressed.

In `1+1+1=3`, the states will be  `Start`, `FirstNumber`, `Sign`, `SecondNumber`, `AnswerSign`,`SecondNumber`, `Answer`

`config.js` stores environment parameters for the program, to tweak its behaviour.

#Model (resides in Control...)

`calculator.js` has 3 main fields: `buffer`, `memory` and `answer`

The user will always be editing `buffer`, but not the other two.

When an operator ( + - * / ) is pressed, the `buffer` will be pushed into the `memory`, and the user will then provide another number for `buffer`

When `calculator.js` performs a calculation through `Calculator.commit()`, it calls `CalculationModelLocal.getCalculateResult()` for result from server, and provides an asynchronous callback for it.

answer from `CalculationModelLocal` is stored in `answer`. it can be used to perform further calculation by puting it back to `memory` whenever needed.

#(Mock) Delegate
`calculationModelLocal` works as a mock delegate that represents a server to do the calculation. Doing server-side is one of the requirements of the assignment.




[1]:https://github.com/vicksonzero/WebCal/tree/master/src/js/calStates
