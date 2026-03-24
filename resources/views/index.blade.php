<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DIIL - Defects and Internal Interfaces Lab</title>
    <meta name="description" content="Defects and Internal Interfaces Lab - Tel Aviv University" />
    <style>
      input[type="file"] {
            background: #be6e38;
        color: #fff;
        padding: 6px;
        border-radius: 10px;
      }
    </style>
  </head>
  <body>
    <div id="root"></div>
    @viteReactRefresh
    @vite(['resources/js/main.tsx'])
  </body>
</html>
