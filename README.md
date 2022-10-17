<h1 align="center">iceXO - A Tic tac toe game with AI</h1>
<p align="center">
  <img src="https://user-images.githubusercontent.com/91287064/196000241-68fe91d2-078f-4e91-9194-b88c572df7d6.png"/>
  <br>
  <em>Graphical Tic tac toe game using minimax algorithm</em>
</p>

<hr>
    
## About iceXO
This package is written in two Python and Web versions. Both types have an attractive and interactive user interface, and the web version is flexible and customizable.
In this project, the minimax algorithm is used in such a way that with every move you make on the screen, artificial intelligence predicts next moves and chooses the best move.

<ul>
  <li>A simple way to implement the MiniMax algorithm</li>
  <li>Customizable UI for web version</li>
  <li>Interactive UI/UX</li>
  <li>Web version has pure JavaScript (ES6+) with no libraries attached to it </li>
  <li>Ability to play in both X and O positions</li>
</ul>

## Web version

The web version of this Tic tac toe game, has a beautiful graphical user interface and the ablity to change appearance and colors.

To use this version, you should have `iceXO.css` and `iceXO.js` added in your project.
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>iceXO</title>
    <link rel="stylesheet" href="./css/iceXO.css">
</head>
<body>
    
<main></main>
    
<script src="./js/iceXO.js"></script>
</body>
</html>
```

Then simply call the `iceXO` object and pass the parent element to it (e.g .parent, #parent, div)
``` html
<script>
    IceXO.play('main')
</script>
```

You can also customize it by passing `settings` parameter to the object.
``` javascript
IceXO.play('main', {
    boardColor: '#EEEEEE',
    body: 'white',
    fancyColor: '#32E0C4',
    xColor: '#222831',
    oColor: '#393E46',
    gameOver: function (winner){
        alert(`${winner || 'No one'} wins the game.`)
    }
})
``` 
![iceXO web version](https://user-images.githubusercontent.com/91287064/195768633-196cfd41-cac1-4ef5-960e-1c513ec5f4ca.png)
![iceXO_tictactoe](https://user-images.githubusercontent.com/91287064/196238571-3bedb75c-d695-4aa6-a595-56815354cd91.gif)



## Python version
Thanks to Pygame, the Python version also has an interactive user interface.

To use the Python version, at first you should install libraries.
```
pip3 install -r requirements.txt
```
To play tic tac toe run the `runner.py` file.

![iceXO python version](https://user-images.githubusercontent.com/91287064/195768826-faac2288-6a66-48e3-8393-9129a24b167c.png)


