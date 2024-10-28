export const document = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/p5.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.10.0/addons/p5.sound.min.js"></script>
    <meta charset="utf-8" />

  </head>
  <body>
    <main>
      <h1>Hello World</h1>
      <p>Hello World</p>
    </main>
  </body>
</html>
`


export function getP5Document (code: string) {
    let doc = document.replace(/"/g, '\\"')
    console.log(doc)
    return doc
}