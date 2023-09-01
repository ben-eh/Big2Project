


const divide = (numerator: number, denominator: number): number => {
    if (denominator === 0) throw new Error('Denominator cannot be 0');
    return numerator / denominator;
}



const start = () => {
    const a = 10;
    const b = 2;
    const c = 0;

    try {
        const valueAB = divide(a, b);
        console.log(valueAB); // 5
    } catch (error) {
        console.log('AB had an error');
    }

    try {
        const valueBC = divide(b, c); // should error
        console.log(valueBC);
    } catch (error) {
        // Show an error to the user that they cannot divide by 0
        console.log('BC had an error');
    }



}

start();




// MVC

// View       - The visual UI (HTML / React)
// Model      - The data being sent
// Controller - Backend

// View
//      | Player | Score | Goals |
//      | benno  | 300   | 3     |
//      | side   | 100   | 1     |

// Model
/*  
    [
        {
            player: benno,
            score: 300,
            gaols: 3,
        },
        ...
    ]
*/

// Controller
// Backend does everything
// All the main logic for the game.
// This includes reading DB, gathering data to show for the view.


/*
    (View / React)                        (Model)      (Controller / Backend)
    Game.tsx <---> socketContext.tsx <---> Model <---> socket-helper.ts <---> Game.ts

    Model = the data being passed between the sockets (A type for an object)
    Ex: sendEvent('skip_turn', {activePlayer, room});
        Here the {sendEvent('skip_turn', {activePlayer, room}); is your model
        We should make a model folder with this type in it.

    Game.ts = All the game logic possible
*/