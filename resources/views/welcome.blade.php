<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Sample Name</title>
        <!-- <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap" rel="stylesheet"> -->
        @vite('resources/css/app.css')
    </head>
    
    <body>
        <div id="app"></div>
        @vite('resources/js/app.js')
    </body>
</html>
