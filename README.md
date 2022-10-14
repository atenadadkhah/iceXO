# iceXO
Graphical tic toc toe game using minimax algorithm.

## web version

The web version of this tic toc toe game, has a beautiful graphical user interface and the ablity to change appearance and colors.
To use this version, you should have `iceXO.css` and `iceXO.js` in your project and then add them to the page.
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
<script>
    IceXO.play('main')
</script>
</body>
</html>
```

Then simply call the `iceXO` object.
``` html
<script>
    IceXO.play('main')
</script>
```
