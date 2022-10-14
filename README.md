# iceXO
Graphical tic toc toe game using minimax algorithm.

## Web version

The web version of this tic toc toe game, has a beautiful graphical user interface and the ablity to change appearance and colors.

To use this version, you should have `iceXO.css` and `iceXO.js` added in your project.
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="/scss/main.css">
</head>
<body>
<main>

</main>

<script src="./js/index.js"></script>
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
![Web version](https://user-images.githubusercontent.com/91287064/195767593-dc0c4cc3-1297-42ba-a1f5-09fc77fcc5b8.png)


## Python version
Thanks to Pygame, the Python version also has an interactive user interface.

To use the Python version, at first you should install libraries.
```
pip3 install -r requirements.txt
```
To play tic toc toe run the `runner.py` file.
