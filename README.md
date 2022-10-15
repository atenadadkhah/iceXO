<p align="center">
  <img src="https://user-images.githubusercontent.com/91287064/195996577-d0987c15-9af3-4a5a-8880-376cff343159.png"/>
  <h6>Graphical tic toc toe game using minimax algorithm.</h6>
</p>
<p align="center">
  <h1>iceXO</h1>
</p>



## Web version

The web version of this tic toc toe game, has a beautiful graphical user interface and the ablity to change appearance and colors.

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

Then simply call the `iceXO` object.
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



## Python version
Thanks to Pygame, the Python version also has an interactive user interface.

To use the Python version, at first you should install libraries.
```
pip3 install -r requirements.txt
```
To play tic toc toe run the `runner.py` file.

![iceXO python version](https://user-images.githubusercontent.com/91287064/195768826-faac2288-6a66-48e3-8393-9129a24b167c.png)


